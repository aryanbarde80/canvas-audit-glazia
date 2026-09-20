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
  const [showShortcuts, setShowShortcuts] = useState(false)

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
    <main className="min-h-screen bg-[#0b0d12] text-slate-100 selection:bg-amber-400/30">
      <CanvasHeader canvas={canvas} saving={saving} snapshot={snapshot} onNew={handleNew} onSave={handleSave} onLoad={() => setLoadOpen(true)} onDelete={handleDeleteCurrent} onNameChange={(name) => commit({ ...canvas, name })} />
      <div className="mx-auto max-w-[1600px] px-4 py-5 sm:px-6 lg:px-8">
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-amber-300/80"><span className="size-1.5 rounded-full bg-amber-300 shadow-[0_0_12px_rgba(252,211,77,0.9)]" /> Studio workspace</div>
            <h2 className="text-2xl font-semibold tracking-tight text-white">Shape your next idea.</h2>
            <p className="mt-1 text-sm text-slate-400">A focused canvas for fast visual thinking.</p>
          </div>
          <div className="flex items-center gap-2 self-start rounded-xl border border-white/10 bg-white/[0.03] p-1 sm:self-auto">
            <Button variant="ghost" size="sm" onClick={undo} disabled={!past.length} title="Undo (Ctrl/Cmd + Z)" className="text-slate-400 hover:bg-white/10 hover:text-white"><Undo2 className="size-4" /></Button>
            <Button variant="ghost" size="sm" onClick={redo} disabled={!future.length} title="Redo (Ctrl/Cmd + Shift + Z)" className="text-slate-400 hover:bg-white/10 hover:text-white"><Redo2 className="size-4" /></Button>
            <Button variant="ghost" size="sm" onClick={() => setShowLayers((value) => !value)} className="gap-2 text-slate-300 hover:bg-white/10 hover:text-white"><Layers className="size-4" /> Layers</Button>
            <Button variant="ghost" size="sm" onClick={() => setShowShortcuts((value) => !value)} className="hidden text-slate-400 hover:bg-white/10 hover:text-white sm:inline-flex">{showShortcuts ? 'Hide tips' : 'Tips'}</Button>
          </div>
        </div>
        {error && <div className="mb-4 flex items-center gap-2 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200"><AlertCircle className="size-4" /> {error}</div>}
        {showShortcuts && <div className="mb-4 grid grid-cols-1 gap-2 rounded-xl border border-amber-300/15 bg-amber-300/[0.06] px-4 py-3 text-xs text-slate-300 sm:grid-cols-3"><span><strong className="text-amber-200">Click</strong> to select</span><span><strong className="text-amber-200">Drag</strong> to reposition</span><span><strong className="text-amber-200">Double-click</strong> text to edit</span></div>}
        <div className="flex gap-4">
          <div className="flex-1 min-w-0"><CanvasEditor canvas={canvas} onUpdate={commit} selectedId={selectedId} onSelectElement={setSelectedId} /></div>
          {showLayers && <aside className="w-60 h-fit rounded-2xl border border-white/10 bg-[#141820] p-4 text-slate-100 shadow-[0_16px_40px_rgba(0,0,0,0.16)]"><h2 className="mb-3 text-sm font-semibold text-white">Layers</h2><div className="flex flex-col gap-2">{canvas.elements.length === 0 ? <p className="text-xs text-slate-500">No elements yet.</p> : [...canvas.elements].reverse().map((element) => <div key={element.id} className={`flex items-center justify-between rounded border px-2 py-2 text-xs ${element.id === selectedId ? 'border-amber-300/50 bg-amber-300/10' : 'border-white/10 bg-white/[0.02]'}`}><button className="truncate text-left" onClick={() => setSelectedId(element.id)}>{element.type === 'text' ? element.text : element.type}</button><div className="flex gap-1"><button onClick={() => commit({ ...canvas, elements: moveElement(canvas.elements, element.id, 'front') })} aria-label="Bring layer to front">↑</button><button onClick={() => commit({ ...canvas, elements: moveElement(canvas.elements, element.id, 'back') })} aria-label="Send layer to back">↓</button></div></div>)}</div></aside>}
        </div>
        <div className="mt-4 flex items-center justify-between text-[11px] tracking-wide text-slate-500"><span>{canvas.elements.length} {canvas.elements.length === 1 ? 'element' : 'elements'} · Express API + MongoDB persistence</span><span>Double-click text to edit · Delete removes selection</span></div>
      </div>
      <LoadDialog isOpen={loadOpen} onClose={() => setLoadOpen(false)} onLoad={handleLoad} onDelete={handleDeleteById} />
    </main>
  )
}
