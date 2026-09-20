'use client'

import { Button } from '@/components/ui/button'
import { Circle, MousePointer2, Square, Trash2, Type } from 'lucide-react'

interface ElementToolbarProps { onAdd: (type: 'rectangle' | 'circle' | 'text') => void; onDelete: () => void; canDelete: boolean }

const tools = [
  { type: 'rectangle' as const, label: 'Rectangle', hint: 'Add a rectangle', icon: Square, tone: 'text-[#9db7d0]' },
  { type: 'circle' as const, label: 'Circle', hint: 'Add a circle', icon: Circle, tone: 'text-[#e7a77b]' },
  { type: 'text' as const, label: 'Text', hint: 'Add a text layer', icon: Type, tone: 'text-[#d4b7ff]' },
]

export default function ElementToolbar({ onAdd, onDelete, canDelete }: ElementToolbarProps) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-white/[.09] bg-[#121a26]/90 p-2.5 shadow-[0_18px_46px_rgba(0,0,0,.2)] sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2 px-2 sm:px-1"><span className="grid size-7 place-items-center rounded-lg bg-white/[.06] text-slate-400"><MousePointer2 className="size-3.5" /></span><div><p className="text-[11px] font-semibold text-slate-200">Add to canvas</p><p className="text-[10px] text-slate-500">Choose a primitive to start composing</p></div></div>
      <div className="flex flex-wrap items-center gap-1.5">
        {tools.map(({ type, label, hint, icon: Icon, tone }) => <Button key={type} variant="ghost" size="sm" onClick={() => onAdd(type)} title={hint} className="h-9 gap-2 rounded-lg border border-transparent px-3 text-xs font-medium text-slate-300 transition hover:border-white/10 hover:bg-white/[.08] hover:text-white"><Icon className={`size-3.5 ${tone}`} /> {label}</Button>)}
        <span className="mx-1 hidden h-6 w-px bg-white/10 sm:block" />
        <Button variant="ghost" size="sm" onClick={onDelete} disabled={!canDelete} title={canDelete ? 'Delete selected element' : 'Select an element to delete'} className="h-9 gap-2 rounded-lg px-3 text-xs font-medium text-rose-300 transition hover:bg-rose-400/10 hover:text-rose-200 disabled:opacity-35"><Trash2 className="size-3.5" /> Delete</Button>
      </div>
    </div>
  )
}
