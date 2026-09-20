'use client'
import { useEffect, useState, useCallback } from 'react'
import { Undo2, Redo2, Layers, Download, Loader2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import CanvasHeader from '@/components/canvas/canvas-header'
import CanvasEditor from '@/components/canvas/canvas-editor'
import LoadDialog from '@/components/canvas/load-dialog'
import { CanvasDocument, HistoryState, canvasApi, defaultCanvas, getCanvasId, getErrorText, hasChanged, historyCanvas, historyState, makeSnapshot, removeElement, updateElement, moveElement, normalizeApiCanvas } from '@/lib/canvas-types'

export default function Page() {
  const [canvas, setCanvas] = useState<CanvasDocument>(defaultCanvas())
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [snapshot, setSnapshot] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [loadOpen, setLoadOpen] = useState(false)
  const [error, setError] = useState('')
  const [past, setPast] = useState<HistoryState[]>([])
  const [future, setFuture] = useState<HistoryState[]>([])
  const [showLayers, setShowLayers] = useState(false)

  const commit = useCallback((next: CanvasDocument, track = true) => {
    if (track) setPast((items) => [...items.slice(-49), historyState(canvas)])
    setFuture([])
    setCanvas(next)
    setError('')
  }, [canvas])

  const handleSave = async () => {
    if (!canvas.name.trim()) { setError('Canvas name is required.'); return }
    setSaving(true); setError('')
    try {
      const id = getCanvasId(canvas)
      const saved = id ? await canvasApi.update(id, canvas) : await canvasApi.create(canvas)
      const normalized = normalizeApiCanvas(saved)
      setCanvas(normalized)
      setSnapshot(makeSnapshot(normalized))
    } catch (err) { setError(getErrorText(err)) } finally { setSaving(false) }
  }

  const handleNew = () => {
    if (hasChanged(canvas, snapshot) && !confirm('Start a new canvas? Unsaved changes will be lost.')) return
    setCanvas(defaultCanvas()); setSelectedId(null); setSnapshot(null); setPast([]); setFuture([]); setError('')
  }

  const handleLoad = (loaded: CanvasDocument) => {
    const next = normalizeApiCanvas(loaded)
    setCanvas(next); setSelectedId(null); setSnapshot(makeSnapshot(next)); setPast([]); setFuture([]); setLoadOpen(false); setError('')
  }

  const handleDeleteCurrent = async () => {
    const id = getCanvasId(canvas)
    if (!id || !confirm('Delete this saved canvas? This cannot be undone.')) return
    try { await canvasApi.remove(id); handleNew() } catch (err) { setError(getErrorText(err)) }
  }

  const handleDeleteById = async (id: string) => { await canvasApi.remove(id) }

  const undo = () => {
    const previous = past[past.length - 1]
    if (!previous) return
    setFuture((items) => [historyState(canvas), ...items])
    setPast((items) => items.slice(0, -1))
    setCanvas(historyCanvas(previous))
    setSelectedId(null)
  }
  const redo = () => {
    const next = future[0]
    if (!next) return
    setPast((items) => [...items, historyState(canvas)])
    setFuture((items) => items.slice(1))
    setCanvas(historyCanvas(next))
    setSelectedId(null)
  }

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'z') { event.preventDefault(); event.shiftKey ? redo() : undo() }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  })

  return (
    <main className="min-h-screen bg-[#f5f1ea] text-slate-900">
      <CanvasHeader canvas={canvas} saving={saving} snapshot={snapshot} onNew={handleNew} onSave={handleSave} onLoad={() => setLoadOpen(true)} onDelete={handleDeleteCurrent} onNameChange={(name) => commit({ ...canvas, name })} />
      <div className="mx-auto max-w-[1500px] px-6 py-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Mini design editor</p>
            <p className="text-sm text-slate-600 mt-1">Create, transform, and persist structured canvas data.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={undo} disabled={!past.length} title="Undo (Ctrl/Cmd + Z)"><Undo2 className="size-4" /></Button>
            <Button variant="outline" size="sm" onClick={redo} disabled={!future.length} title="Redo (Ctrl/Cmd + Shift + Z)"><Redo2 className="size-4" /></Button>
            <Button variant="outline" size="sm" onClick={() => setShowLayers((value) => !value)} className="gap-2"><Layers className="size-4" /> Layers</Button>
          </div>
        </div>
        {error && <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"><AlertCircle className="size-4" /> {error}</div>}
        <div className="flex gap-4">
          <div className="flex-1 min-w-0"><CanvasEditor canvas={canvas} onUpdate={commit} selectedId={selectedId} onSelectElement={setSelectedId} /></div>
          {showLayers && <aside className="w-60 rounded-lg border border-slate-200 bg-white p-4 h-fit"><h2 className="text-sm font-semibold mb-3">Layers</h2><div className="flex flex-col gap-2">{canvas.elements.length === 0 ? <p className="text-xs text-slate-500">No elements yet.</p> : [...canvas.elements].reverse().map((element) => <div key={element.id} className={`flex items-center justify-between rounded border px-2 py-2 text-xs ${element.id === selectedId ? 'border-[#c9754d] bg-orange-50' : 'border-slate-200'}`}><button className="truncate text-left" onClick={() => setSelectedId(element.id)}>{element.type === 'text' ? element.text : element.type}</button><div className="flex gap-1"><button onClick={() => commit({ ...canvas, elements: moveElement(canvas.elements, element.id, 'front') })} aria-label="Bring layer to front">↑</button><button onClick={() => commit({ ...canvas, elements: moveElement(canvas.elements, element.id, 'back') })} aria-label="Send layer to back">↓</button></div></div>)}</div></aside>}
        </div>
        <div className="mt-4 flex items-center justify-between text-xs text-slate-500"><span>{canvas.elements.length} {canvas.elements.length === 1 ? 'element' : 'elements'} · Express API + MongoDB persistence</span><span>Double-click text to edit · Delete removes selection</span></div>
      </div>
      <LoadDialog isOpen={loadOpen} onClose={() => setLoadOpen(false)} onLoad={handleLoad} onDelete={handleDeleteById} />
    </main>
  )
}
