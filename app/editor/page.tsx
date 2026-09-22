'use client'

import Link from 'next/link'
import { ArrowLeft, CheckCircle2, CircleHelp, Command, Layers3, Share2, Sparkles, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import CanvasEditor from '@/components/canvas/canvas-editor'
import { CanvasDocument, defaultCanvas } from '@/lib/canvas-types'

const shortcutRows = [
  ['⌘ / Ctrl + Z', 'Undo last change'],
  ['⌘ / Ctrl + Shift + Z', 'Redo last change'],
  ['Delete / Backspace', 'Delete selected object'],
  ['Double-click', 'Edit a text layer'],
  ['Esc', 'Clear the current selection'],
  ['? ', 'Open this shortcuts panel'],
]

export default function EditorPage() {
  const [canvas, setCanvas] = useState<CanvasDocument>(defaultCanvas())
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [shareCopied, setShareCopied] = useState(false)
  const [shortcutsOpen, setShortcutsOpen] = useState(false)

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

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      const typing = target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA'
      if (!typing && event.key === '?') setShortcutsOpen(true)
      if (event.key === 'Escape') setShortcutsOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <main className="min-h-screen overflow-x-clip bg-[#0a0d10] text-[#f4f0e8] selection:bg-[#e29a63] selection:text-[#17100c]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_70%_0%,rgba(226,154,99,.10),transparent_32%),radial-gradient(circle_at_10%_100%,rgba(190,108,67,.08),transparent_28%)]" />
      <div className="relative mx-auto flex min-h-screen max-w-[1680px] flex-col px-3 py-3 sm:px-5 sm:py-5 lg:px-7">
        <header className="rounded-2xl border border-white/[.1] bg-[#15191d]/90 shadow-[0_20px_70px_rgba(0,0,0,.24)] backdrop-blur-xl">
          <div className="flex flex-col gap-4 border-b border-white/[.08] px-4 py-3.5 sm:px-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex min-w-0 items-center gap-3">
              <Link href="/" className="inline-flex shrink-0 items-center gap-2 rounded-lg px-2 py-2 text-xs font-medium text-white/45 transition hover:bg-white/[.06] hover:text-white"><ArrowLeft className="size-3.5" /> Home</Link>
              <span className="hidden h-5 w-px bg-white/10 sm:block" />
              <div className="flex min-w-0 items-center gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#e29a63] text-[#17100c] shadow-[0_0_28px_rgba(226,154,99,.18)]"><Sparkles className="size-4" /></span>
                <div className="min-w-0"><p className="truncate text-sm font-semibold tracking-tight text-[#f4f0e8]">Canvas workspace</p><p className="mt-0.5 truncate text-[10px] uppercase tracking-[.2em] text-white/35">{canvas.name || 'Untitled board'}</p></div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden items-center gap-2 rounded-full border border-[#e29a63]/20 bg-[#e29a63]/[.06] px-3 py-2 text-[10px] font-semibold uppercase tracking-[.12em] text-[#f2b27b]/80 sm:inline-flex"><CheckCircle2 className="size-3.5" /> Local draft</span>
              <button type="button" onClick={() => setShortcutsOpen(true)} className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-white/55 transition hover:border-[#e29a63]/40 hover:bg-[#e29a63]/[.08] hover:text-[#f4f0e8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e29a63]"><CircleHelp className="size-3.5" /> Shortcuts</button>
              <button type="button" onClick={handleShare} className="inline-flex items-center gap-2 rounded-lg bg-[#e29a63] px-3.5 py-2 text-xs font-semibold text-[#17100c] transition hover:bg-[#f2b27b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e29a63] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0d10]"><Share2 className="size-3.5" /> {shareCopied ? 'Link copied' : 'Share'}</button>
            </div>
          </div>
          <div className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div className="flex items-center gap-3"><span className="flex size-8 items-center justify-center rounded-lg bg-[#e29a63]/10 text-[#e29a63]"><Layers3 className="size-4" /></span><div><p className="text-xs font-semibold text-[#f4f0e8]">Design surface</p><p className="text-[11px] text-white/40">Place, shape, and refine your composition.</p></div></div>
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-[.16em] text-white/35"><span>{canvas.elements.length} {canvas.elements.length === 1 ? 'layer' : 'layers'}</span><span className="size-1 rounded-full bg-white/25" /><span className="flex items-center gap-1.5"><Command className="size-3" /> Focused mode</span></div>
          </div>
        </header>

        <section className="mt-4 flex-1 rounded-[22px] border border-white/[.08] bg-[#111519]/80 p-3 shadow-[0_28px_90px_rgba(0,0,0,.2)] sm:mt-5 sm:p-4 lg:p-5">
          <CanvasEditor canvas={canvas} onUpdate={setCanvas} selectedId={selectedId} onSelectElement={setSelectedId} />
        </section>

        <footer className="flex flex-col gap-2 px-1 py-4 text-[10px] text-white/35 sm:flex-row sm:items-center sm:justify-between sm:px-2"><span className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-[#e29a63] shadow-[0_0_10px_#e29a63]" /> All changes live in this session</span><span>Click an object to inspect · Drag to move · Double-click text to edit</span></footer>
      </div>

      {shortcutsOpen && <div className="fixed inset-0 z-50 grid place-items-center bg-[#0a0d10]/75 p-4 backdrop-blur-sm" role="presentation" onMouseDown={(event) => { if (event.currentTarget === event.target) setShortcutsOpen(false) }}><section role="dialog" aria-modal="true" aria-labelledby="shortcuts-title" className="w-full max-w-md overflow-hidden rounded-2xl border border-white/[.12] bg-[#15191d] text-[#f4f0e8] shadow-[0_30px_100px_rgba(0,0,0,.5)]"><div className="flex items-start justify-between border-b border-white/[.08] px-5 py-4"><div><p className="text-[10px] font-semibold uppercase tracking-[.22em] text-[#e29a63]">Quick reference</p><h2 id="shortcuts-title" className="mt-1 text-lg font-semibold tracking-tight">Keyboard shortcuts</h2><p className="mt-1 text-xs text-white/45">Move through the canvas without breaking focus.</p></div><button type="button" aria-label="Close shortcuts" onClick={() => setShortcutsOpen(false)} className="grid size-8 place-items-center rounded-lg text-white/45 transition hover:bg-white/[.08] hover:text-white"><X className="size-4" /></button></div><div className="space-y-1 p-3">{shortcutRows.map(([key, label]) => <div key={key} className="flex items-center justify-between rounded-xl px-3 py-3 transition hover:bg-white/[.04]"><span className="text-sm text-white/65">{label}</span><kbd className="rounded-md border border-white/10 bg-[#0a0d10] px-2 py-1 font-mono text-[10px] text-[#f2b27b]">{key}</kbd></div>)}</div><div className="flex justify-end border-t border-white/[.08] px-5 py-3"><button type="button" onClick={() => setShortcutsOpen(false)} className="rounded-lg bg-[#e29a63] px-3.5 py-2 text-xs font-semibold text-[#17100c] transition hover:bg-[#f2b27b]">Done</button></div></section></div>}
    </main>
  )
}
