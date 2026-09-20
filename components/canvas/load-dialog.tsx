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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full mx-4 max-h-[80vh] flex flex-col">
        <div className="px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">Load Canvas</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12 gap-2 text-slate-500">
              <Loader2 className="size-4 animate-spin" /> Loading canvases…
            </div>
          ) : error ? (
            <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="size-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-red-900">Error</h3>
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
          ) : canvases.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <p className="text-sm">No saved canvases yet. Create a new canvas and save it to get started.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {canvases.map((canvas) => (
                <div key={getCanvasId(canvas)} className="flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-slate-900 truncate">{canvas.name}</h3>
                    <p className="text-xs text-slate-500">{dateLabel(canvas.updatedAt)} · {canvas.elements.length} elements</p>
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
                      className="text-red-600 hover:text-red-700 gap-1"
                    >
                      {deletingId === getCanvasId(canvas) ? <Loader2 className="size-3 animate-spin" /> : <Trash2 className="size-3" />}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="px-6 py-4 border-t border-slate-200 flex justify-end">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}
