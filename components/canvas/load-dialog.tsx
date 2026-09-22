'use client'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { CanvasDocument, canvasApi, dateLabel, getCanvasId, sortCanvases } from '@/lib/canvas-types'
import { Upload, Trash2, Loader2, AlertCircle } from 'lucide-react'

interface LoadDialogProps {
  isOpen: boolean
  onClose: () => void
  onLoad: (canvas: CanvasDocument) => void
  onDelete: (id: string) => Promise<void>
}

export default function LoadDialog({ isOpen, onClose, onLoad, onDelete }: LoadDialogProps) {
  const [canvases, setCanvases] = useState<CanvasDocument[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    if (!isOpen) return
    setLoading(true)
    setError('')
    canvasApi
      .list()
      .then((data) => setCanvases(sortCanvases(data)))
      .catch((err) => setError(err.message || 'Failed to load canvases'))
      .finally(() => setLoading(false))
  }, [isOpen])

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this canvas? This cannot be undone.')) return
    setDeletingId(id)
    try {
      await onDelete(id)
      setCanvases((prev) => prev.filter((c) => getCanvasId(c) !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete')
    } finally {
      setDeletingId(null)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0d10]/75 p-4 backdrop-blur-sm">
      <div className="flex max-h-[80vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-white/[.12] bg-[#15191d] text-[#f4f0e8] shadow-[0_30px_100px_rgba(0,0,0,.5)]">
        <div className="border-b border-white/[.08] px-6 py-4">
          <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-[#e29a63]">Your workspace</p><h2 className="mt-1 text-lg font-semibold">Load Canvas</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center gap-2 py-12 text-white/45">
              <Loader2 className="size-4 animate-spin" /> Loading canvases…
            </div>
          ) : error ? (
            <div className="flex items-start gap-3 rounded-xl border border-rose-300/20 bg-rose-300/[.06] p-4">
              <AlertCircle className="mt-0.5 size-5 flex-shrink-0 text-rose-300" />
              <div>
                <h3 className="font-medium text-rose-100">Error</h3>
                <p className="text-sm text-rose-200/80">{error}</p>
              </div>
            </div>
          ) : canvases.length === 0 ? (
            <div className="py-12 text-center text-white/45">
              <p className="text-sm">No saved canvases yet. Create a new canvas and save it to get started.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {canvases.map((canvas) => (
                <div key={getCanvasId(canvas)} className="flex items-center justify-between rounded-xl border border-white/[.08] bg-white/[.03] p-4 transition-colors hover:border-[#e29a63]/25 hover:bg-[#e29a63]/[.06]">
                  <div className="flex-1 min-w-0">
                    <h3 className="truncate font-medium text-[#f4f0e8]">{canvas.name}</h3>
                    <p className="text-xs text-white/40">{dateLabel(canvas.updatedAt)} · {canvas.elements.length} elements</p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <Button size="sm" onClick={() => onLoad(canvas)} className="gap-1">
                      <Upload className="size-3" /> Load
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(getCanvasId(canvas)!)}
                      disabled={deletingId === getCanvasId(canvas)}
                      className="gap-1 border-rose-300/20 text-rose-300 hover:bg-rose-300/10 hover:text-rose-200"
                    >
                      {deletingId === getCanvasId(canvas) ? <Loader2 className="size-3 animate-spin" /> : <Trash2 className="size-3" />}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex justify-end border-t border-white/[.08] px-6 py-4">
          <Button variant="outline" onClick={onClose} className="border-white/15 bg-white/[.03] text-white/70 hover:bg-white/[.08] hover:text-[#f4f0e8]">
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}
