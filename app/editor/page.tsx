'use client'

import Link from 'next/link'
import { ArrowLeft, Command, HelpCircle, Share2 } from 'lucide-react'
import { useState } from 'react'
import CanvasEditor from '@/components/canvas/canvas-editor'
import { CanvasDocument, defaultCanvas } from '@/lib/canvas-types'

export default function EditorPage() {
  const [canvas, setCanvas] = useState<CanvasDocument>(defaultCanvas())
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [shareCopied, setShareCopied] = useState(false)

  const handleShare = async () => {
    const shareUrl = window.location.href
    try {
      await navigator.clipboard.writeText(shareUrl)
      setShareCopied(true)
      window.setTimeout(() => setShareCopied(false), 2200)
    } catch {
      window.prompt('Copy this canvas link', shareUrl)
    }
  }

  return (
    <main className="min-h-screen bg-[#090b0f] p-3 text-slate-100 sm:p-5 lg:p-7">
      <div className="mx-auto flex max-w-[1680px] flex-col gap-5">
        <header className="flex flex-col gap-4 rounded-2xl border border-white/[0.09] bg-white/[0.025] px-4 py-3 shadow-[0_18px_60px_rgba(0,0,0,0.18)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div className="flex items-center gap-4">
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition hover:text-white"><ArrowLeft className="size-4" /> Home</Link>
            <span className="h-5 w-px bg-white/10" aria-hidden="true" />
            <div className="flex items-center gap-2"><span className="grid size-7 place-items-center rounded-lg bg-amber-300 text-slate-950"><Command className="size-3.5" /></span><div><p className="text-sm font-semibold tracking-tight">Canvas workspace</p><p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">Untitled board</p></div></div>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-slate-400 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white"><HelpCircle className="size-3.5" /> Shortcuts</button>
            <button type="button" onClick={handleShare} className="inline-flex items-center gap-2 rounded-lg bg-amber-300 px-3 py-2 text-xs font-semibold text-slate-950 transition hover:bg-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200 focus-visible:ring-offset-2 focus-visible:ring-offset-[#090b0f]"><Share2 className="size-3.5" /> {shareCopied ? 'Link copied' : 'Share'}</button>
          </div>
        </header>
        <CanvasEditor canvas={canvas} onUpdate={setCanvas} selectedId={selectedId} onSelectElement={setSelectedId} />
      </div>
    </main>
  )
}
