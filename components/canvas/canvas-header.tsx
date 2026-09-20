'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { CanvasDocument, getCanvasId, saveStatus, statusLabel, hasChanged } from '@/lib/canvas-types'
import { Plus, Save, Upload, Trash2, MoreVertical } from 'lucide-react'

interface CanvasHeaderProps {
  canvas: CanvasDocument
  saving: boolean
  snapshot: string | null
  onNew: () => void
  onSave: () => void
  onLoad: () => void
  onDelete: () => void
  onNameChange: (name: string) => void
}

export default function CanvasHeader({ canvas, saving, snapshot, onNew, onSave, onLoad, onDelete, onNameChange }: CanvasHeaderProps) {
  const [editingName, setEditingName] = useState(false)
  const status = saveStatus(canvas, snapshot, saving)
  const isDirty = hasChanged(canvas, snapshot)
  const isSaved = Boolean(getCanvasId(canvas))

  return (
    <div className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <h1 className="text-lg font-semibold text-slate-900 whitespace-nowrap">Design Canvas</h1>
          <div className="h-6 w-px bg-slate-200" />
          {editingName ? (
            <input
              autoFocus
              type="text"
              value={canvas.name}
              onChange={(e) => onNameChange(e.target.value)}
              onBlur={() => setEditingName(false)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') setEditingName(false)
                if (e.key === 'Escape') setEditingName(false)
              }}
              className="px-3 py-1 text-sm border border-slate-300 rounded focus:outline-none focus:border-blue-500 flex-1 min-w-0"
              maxLength={120}
              placeholder="Canvas name..."
            />
          ) : (
            <button onClick={() => setEditingName(true)} className="text-sm text-slate-600 hover:text-slate-900 truncate flex-1 text-left py-1">
              {canvas.name || 'Untitled Canvas'}
            </button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-medium px-2 py-1 rounded ${status === 'Saved' ? 'text-green-700 bg-green-50' : status === 'Saving' ? 'text-amber-700 bg-amber-50' : 'text-slate-600 bg-slate-50'}`}>{statusLabel(status)}</span>
          <Button variant="outline" size="sm" onClick={onNew} className="gap-2">
            <Plus className="size-4" /> New
          </Button>
          <Button size="sm" onClick={onSave} disabled={saving} className="gap-2">
            <Save className="size-4" /> {saving ? 'Saving…' : 'Save'}
          </Button>
          <Button variant="outline" size="sm" onClick={onLoad} className="gap-2">
            <Upload className="size-4" /> Load
          </Button>
          {isSaved && (
            <Button variant="outline" size="sm" onClick={onDelete} className="gap-2 text-red-600 hover:text-red-700">
              <Trash2 className="size-4" /> Delete
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
