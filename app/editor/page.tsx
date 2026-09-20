'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import CanvasEditor from '@/components/canvas/canvas-editor'
import { CanvasDocument, defaultCanvas } from '@/lib/canvas-types'

export default function EditorPage() {
  const [canvas, setCanvas] = useState<CanvasDocument>(defaultCanvas())
  const [selectedId, setSelectedId] = useState<string | null>(null)

  return (
    <main className="min-h-screen bg-[#0b0d12] p-4 text-slate-100 sm:p-6">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-5">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"><ArrowLeft className="size-4" /> Back to home</Link>
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-amber-300">Canvas workspace</span>
        </div>
        <CanvasEditor canvas={canvas} onUpdate={setCanvas} selectedId={selectedId} onSelectElement={setSelectedId} />
      </div>
    </main>
  )
}
