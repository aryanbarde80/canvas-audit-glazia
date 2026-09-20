'use client'
import { CanvasElement, elementLabel, toInput, safeColor, safeFontSize, safeRotation, safeSize, safePosition, isText } from '@/lib/canvas-types'

interface PropertiesPanelProps { element: CanvasElement | null; onUpdate: (patch: Partial<CanvasElement>) => void }

export default function PropertiesPanel({ element, onUpdate }: PropertiesPanelProps) {
  if (!element) return <div className="w-72 shrink-0 rounded-2xl border border-white/10 bg-[#141820] p-5 text-sm text-slate-500 shadow-[0_16px_40px_rgba(0,0,0,0.16)]"><div className="mb-8 flex size-10 items-center justify-center rounded-xl border border-dashed border-white/15 text-slate-500">＋</div><p className="font-medium text-slate-300">Nothing selected</p><p className="mt-1 text-xs leading-5 text-slate-500">Select an object on the canvas to inspect and edit its properties.</p></div>

  const handleNumberChange = (key: keyof Pick<CanvasElement, 'x' | 'y' | 'width' | 'height' | 'rotation' | 'fontSize'>, value: string) => {
    let parsed = 0
    if (key === 'rotation') parsed = safeRotation(value, element[key] ?? 0)
    else if (key === 'fontSize') parsed = safeFontSize(value, element[key] ?? 24)
    else if (key === 'width' || key === 'height') parsed = safeSize(value, element[key] ?? 100)
    else parsed = safePosition(value, element[key] ?? 0)
    onUpdate({ [key]: parsed })
  }

  return (
    <aside className="w-72 shrink-0 rounded-2xl border border-white/10 bg-[#141820] p-5 text-slate-100 shadow-[0_16px_40px_rgba(0,0,0,0.16)] space-y-4 overflow-y-auto max-h-[600px]">
      <div>
        <h3 className="font-semibold text-sm tracking-tight text-white mb-2">{elementLabel(element.type)} Properties</h3>
      </div>
      <div className="space-y-3">
        <div>
          <label className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500 block mb-1">Position X</label>
          <input type="number" value={toInput(element.x)} onChange={(e) => handleNumberChange('x', e.target.value)} className="w-full px-2 py-1 text-sm border border-white/10 rounded-lg focus:outline-none focus:border-amber-300/70 bg-[#0e1117] text-slate-200" />
        </div>
        <div>
          <label className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500 block mb-1">Position Y</label>
          <input type="number" value={toInput(element.y)} onChange={(e) => handleNumberChange('y', e.target.value)} className="w-full px-2 py-1 text-sm border border-white/10 rounded-lg focus:outline-none focus:border-amber-300/70 bg-[#0e1117] text-slate-200" />
        </div>
        <div>
          <label className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500 block mb-1">Width</label>
          <input type="number" value={toInput(element.width)} onChange={(e) => handleNumberChange('width', e.target.value)} className="w-full px-2 py-1 text-sm border border-white/10 rounded-lg focus:outline-none focus:border-amber-300/70 bg-[#0e1117] text-slate-200" />
        </div>
        <div>
          <label className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500 block mb-1">Height</label>
          <input type="number" value={toInput(element.height)} onChange={(e) => handleNumberChange('height', e.target.value)} className="w-full px-2 py-1 text-sm border border-white/10 rounded-lg focus:outline-none focus:border-amber-300/70 bg-[#0e1117] text-slate-200" />
        </div>
        <div>
          <label className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500 block mb-1">Rotation (°)</label>
          <input type="number" value={toInput(element.rotation)} onChange={(e) => handleNumberChange('rotation', e.target.value)} className="w-full px-2 py-1 text-sm border border-white/10 rounded-lg focus:outline-none focus:border-amber-300/70 bg-[#0e1117] text-slate-200" />
        </div>
        <div>
          <label className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500 block mb-1">Color</label>
          <div className="flex gap-2">
            <input type="color" value={safeColor(element.fill)} onChange={(e) => onUpdate({ fill: e.target.value })} className="size-9 rounded-lg border border-white/10 bg-transparent cursor-pointer" />
            <input type="text" value={element.fill} onChange={(e) => onUpdate({ fill: safeColor(e.target.value) })} className="flex-1 px-2 py-1 text-sm border border-white/10 rounded-lg focus:outline-none focus:border-amber-300/70 bg-[#0e1117] text-slate-200 font-mono" />
          </div>
        </div>
        {isText(element) && (
          <>
            <div>
              <label className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500 block mb-1">Text Content</label>
              <textarea value={element.text ?? ''} onChange={(e) => onUpdate({ text: e.target.value.slice(0, 500) })} className="w-full px-2 py-1 text-sm border border-white/10 rounded-lg focus:outline-none focus:border-amber-300/70 bg-[#0e1117] text-slate-200 resize-none h-16" placeholder="Enter text..." />
            </div>
            <div>
              <label className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500 block mb-1">Font Size</label>
              <input type="number" value={toInput(element.fontSize ?? 24)} onChange={(e) => handleNumberChange('fontSize', e.target.value)} className="w-full px-2 py-1 text-sm border border-white/10 rounded-lg focus:outline-none focus:border-amber-300/70 bg-[#0e1117] text-slate-200" />
            </div>
          </>
        )}
      </div>
    </aside>
  )
}
