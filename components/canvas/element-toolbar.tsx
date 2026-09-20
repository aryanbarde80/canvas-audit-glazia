'use client'
import { Button } from '@/components/ui/button'
import { Square, Circle, Type, Trash2 } from 'lucide-react'

interface ElementToolbarProps { onAdd: (type: 'rectangle' | 'circle' | 'text') => void; onDelete: () => void; canDelete: boolean }

export default function ElementToolbar({ onAdd, onDelete, canDelete }: ElementToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-white/10 bg-[#141820] p-2 shadow-[0_16px_40px_rgba(0,0,0,0.18)]">
      <div className="flex gap-1">
        <Button variant="ghost" size="sm" onClick={() => onAdd('rectangle')} title="Add rectangle" className="gap-2 text-slate-300 hover:bg-white/10 hover:text-white">
          <Square className="size-4" /> Rectangle
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onAdd('circle')} title="Add circle" className="gap-2 text-slate-300 hover:bg-white/10 hover:text-white">
          <Circle className="size-4" /> Circle
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onAdd('text')} title="Add text" className="gap-2 text-slate-300 hover:bg-white/10 hover:text-white">
          <Type className="size-4" /> Text
        </Button>
      </div>
      <div className="mx-1 h-6 w-px bg-white/10" />
      <Button variant="ghost" size="sm" onClick={onDelete} disabled={!canDelete} className="gap-2 text-rose-300 hover:bg-rose-400/10 hover:text-rose-200">
        <Trash2 className="size-4" /> Delete
      </Button>
    </div>
  )
}
