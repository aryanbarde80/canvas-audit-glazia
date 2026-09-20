'use client'
import { Button } from '@/components/ui/button'
import { Square, Circle, Type, Trash2 } from 'lucide-react'

interface ElementToolbarProps { onAdd: (type: 'rectangle' | 'circle' | 'text') => void; onDelete: () => void; canDelete: boolean }

export default function ElementToolbar({ onAdd, onDelete, canDelete }: ElementToolbarProps) {
  return (
    <div className="flex gap-2 items-center bg-slate-50 p-3 rounded-lg border border-slate-200">
      <div className="flex gap-1">
        <Button variant="outline" size="sm" onClick={() => onAdd('rectangle')} title="Add rectangle" className="gap-2">
          <Square className="size-4" /> Rectangle
        </Button>
        <Button variant="outline" size="sm" onClick={() => onAdd('circle')} title="Add circle" className="gap-2">
          <Circle className="size-4" /> Circle
        </Button>
        <Button variant="outline" size="sm" onClick={() => onAdd('text')} title="Add text" className="gap-2">
          <Type className="size-4" /> Text
        </Button>
      </div>
      <div className="w-px h-6 bg-slate-300" />
      <Button variant="outline" size="sm" onClick={onDelete} disabled={!canDelete} className="gap-2 text-red-600 hover:text-red-700">
        <Trash2 className="size-4" /> Delete
      </Button>
    </div>
  )
}
