'use client'

import { Box, Palette, Type as TypeIcon } from 'lucide-react'
import { CanvasElement, elementLabel, isText, safeColor, safeFontSize, safeRotation, safeSize, safePosition, toInput } from '@/lib/canvas-types'

interface PropertiesPanelProps { element: CanvasElement | null; onUpdate: (patch: Partial<CanvasElement>) => void }

const fieldClass = 'h-9 w-full rounded-lg border border-white/[.1] bg-[#0b111a] px-2.5 text-xs text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-[#e7a77b]/70 focus:bg-[#0d1520] focus:ring-2 focus:ring-[#e7a77b]/10'
const labelClass = 'mb-1.5 block text-[9px] font-semibold uppercase tracking-[.14em] text-slate-500'

export default function PropertiesPanel({ element, onUpdate }: PropertiesPanelProps) {
  if (!element) return <aside className="flex min-h-[260px] w-full shrink-0 flex-col rounded-2xl border border-white/[.09] bg-[#121a26]/90 p-5 text-sm shadow-[0_18px_46px_rgba(0,0,0,.18)] xl:w-72"><div className="mb-5 flex items-center justify-between"><div><p className="text-[10px] font-semibold uppercase tracking-[.18em] text-slate-500">Inspector</p><h3 className="mt-1 text-sm font-semibold text-slate-200">Nothing selected</h3></div><span className="grid size-9 place-items-center rounded-xl border border-dashed border-white/15 text-slate-500">＋</span></div><div className="mt-auto rounded-xl border border-white/[.06] bg-white/[.025] p-3.5"><p className="text-xs font-medium text-slate-300">Select an object to edit it</p><p className="mt-1 text-[11px] leading-5 text-slate-500">Position, size, color, and text controls will appear here.</p></div></aside>

  const handleNumberChange = (key: keyof Pick<CanvasElement, 'x' | 'y' | 'width' | 'height' | 'rotation' | 'fontSize'>, value: string) => {
    let parsed = 0
    if (key === 'rotation') parsed = safeRotation(value, element[key] ?? 0)
    else if (key === 'fontSize') parsed = safeFontSize(value, element[key] ?? 24)
    else if (key === 'width' || key === 'height') parsed = safeSize(value, element[key] ?? 100)
    else parsed = safePosition(value, element[key] ?? 0)
    onUpdate({ [key]: parsed })
  }

  return (
    <aside className="flex max-h-[620px] w-full shrink-0 flex-col overflow-y-auto rounded-2xl border border-white/[.09] bg-[#121a26]/90 p-4 text-slate-100 shadow-[0_18px_46px_rgba(0,0,0,.18)] xl:w-72">
      <div className="flex items-start justify-between border-b border-white/[.08] pb-4"><div><p className="text-[10px] font-semibold uppercase tracking-[.18em] text-slate-500">Inspector</p><h3 className="mt-1 text-sm font-semibold text-white">{elementLabel(element.type)} properties</h3></div><span className="rounded-full border border-[#e7a77b]/20 bg-[#e7a77b]/[.08] px-2 py-1 text-[9px] font-semibold uppercase tracking-[.12em] text-[#f0bd98]">Active</span></div>
      <section className="mt-4"><div className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.16em] text-slate-400"><Box className="size-3.5 text-[#9db7d0]" /> Geometry</div><div className="grid grid-cols-2 gap-2.5"><div><label className={labelClass}>Position X</label><input type="number" value={toInput(element.x)} onChange={(e) => handleNumberChange('x', e.target.value)} className={fieldClass} /></div><div><label className={labelClass}>Position Y</label><input type="number" value={toInput(element.y)} onChange={(e) => handleNumberChange('y', e.target.value)} className={fieldClass} /></div><div><label className={labelClass}>Width</label><input type="number" value={toInput(element.width)} onChange={(e) => handleNumberChange('width', e.target.value)} className={fieldClass} /></div><div><label className={labelClass}>Height</label><input type="number" value={toInput(element.height)} onChange={(e) => handleNumberChange('height', e.target.value)} className={fieldClass} /></div><div className="col-span-2"><label className={labelClass}>Rotation</label><div className="relative"><input type="number" value={toInput(element.rotation)} onChange={(e) => handleNumberChange('rotation', e.target.value)} className={fieldClass} /><span className="pointer-events-none absolute right-3 top-2.5 text-[10px] text-slate-600">deg</span></div></div></div></section>
      <section className="mt-5 border-t border-white/[.08] pt-4"><div className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.16em] text-slate-400"><Palette className="size-3.5 text-[#e7a77b]" /> Appearance</div><label className={labelClass}>Fill color</label><div className="flex gap-2"><input type="color" value={safeColor(element.fill)} onChange={(e) => onUpdate({ fill: e.target.value })} className="size-9 cursor-pointer rounded-lg border border-white/10 bg-transparent p-0.5" /><input type="text" value={element.fill} onChange={(e) => onUpdate({ fill: safeColor(e.target.value) })} className={`${fieldClass} flex-1 font-mono`} /></div></section>
      {isText(element) && <section className="mt-5 border-t border-white/[.08] pt-4"><div className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.16em] text-slate-400"><TypeIcon className="size-3.5 text-[#d4b7ff]" /> Text style</div><label className={labelClass}>Content</label><textarea value={element.text ?? ''} onChange={(e) => onUpdate({ text: e.target.value.slice(0, 500) })} className={`${fieldClass} h-20 resize-none py-2`} placeholder="Enter text..." /><label className={`${labelClass} mt-3`}>Font size</label><input type="number" value={toInput(element.fontSize ?? 24)} onChange={(e) => handleNumberChange('fontSize', e.target.value)} className={fieldClass} /></section>}
    </aside>
  )
}
