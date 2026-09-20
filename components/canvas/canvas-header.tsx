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
    <header className="border-b border-white/10 bg-[#11141b]/95 px-4 py-3 backdrop-blur-xl sm:px-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className="flex items-center gap-2 whitespace-nowrap"><div className="flex size-8 items-center justify-center rounded-lg bg-amber-300 text-[#11141b] shadow-[0_0_24px_rgba(252,211,77,0.18)]"><span className="text-sm font-black">C</span></div><h1 className="text-sm font-semibold tracking-tight text-white">Canvas</h1></div>
          <div className="h-6 w-px bg-white/10" />
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
              className="min-w-0 flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-sm text-white outline-none focus:border-amber-300/60"
              maxLength={120}
              placeholder="Canvas name..."
            />
          ) : (
            <button onClick={() => setEditingName(true)} className="min-w-0 flex-1 truncate py-1 text-left text-sm text-slate-300 hover:text-white">
              {canvas.name || 'Untitled Canvas'}
            </button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${status === 'Saved' ? 'border-emerald-400/20 bg-emerald-400/10 text-emerald-300' : status === 'Saving' ? 'border-amber-300/20 bg-amber-300/10 text-amber-200' : 'border-white/10 bg-white/5 text-slate-400'}`}>{statusLabel(status)}</span>
          <Button variant="ghost" size="sm" onClick={onNew} className="gap-2 text-slate-300 hover:bg-white/10 hover:text-white">
            <Plus className="size-4" /> New
          </Button>
          <Button size="sm" onClick={onSave} disabled={saving} className="gap-2">
            <Save className="size-4" /> {saving ? 'Saving…' : 'Save'}
          </Button>
          <Button variant="outline" size="sm" onClick={onLoad} className="gap-2 border-white/15 bg-white/5 text-slate-200 hover:bg-white/10 hover:text-white">
            <Upload className="size-4" /> Load
          </Button>
          {isSaved && (
            <Button variant="outline" size="sm" onClick={onDelete} className="gap-2 border-white/10 text-rose-300 hover:bg-rose-400/10 hover:text-rose-200">
              <Trash2 className="size-4" /> Delete
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
