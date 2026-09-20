import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, CheckCircle2, Database, Keyboard, MousePointer2, Palette, RefreshCw, Server, Shapes, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

const sections = [
  {
    icon: Sparkles,
    title: 'The quick start',
    body: 'Name your canvas in the top bar, then choose a shape from the toolbar. New objects are placed on the artboard and selected immediately so you can keep designing without breaking flow.',
  },
  {
    icon: MousePointer2,
    title: 'Select, move, transform',
    body: 'Click any object to select it. Drag to reposition. Use the eight Transformer handles to resize, and rotate with the top handle. The inspector stays synchronized with every change.',
  },
  {
    icon: Palette,
    title: 'Edit with precision',
    body: 'Use the Properties inspector to update position, size, rotation, color, text copy, and font size. Numeric fields are constrained to safe values before they reach the canvas or API.',
  },
  {
    icon: RefreshCw,
    title: 'Save and continue later',
    body: 'Save creates a canvas the first time, then updates the same document on every subsequent save. Open Load to browse recent canvases, reload one, or delete an old draft.',
  },
]

const shortcuts = [
  ['Click', 'Select an object'],
  ['Drag', 'Move an object'],
  ['Double-click', 'Edit text directly'],
  ['Delete / Backspace', 'Remove the selection'],
  ['⌘ / Ctrl + Z', 'Undo the last change'],
  ['⌘ / Ctrl + Shift + Z', 'Redo a change'],
]

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-[#0b0d12] text-slate-100">
      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:py-12">
        <header className="flex items-center justify-between border-b border-white/10 pb-8">
          <Link href="/" className="flex items-center gap-3 text-sm font-semibold tracking-tight text-white">
            <span className="grid size-9 place-items-center rounded-xl bg-amber-300 text-[#17130d] shadow-[0_0_24px_rgba(252,211,77,0.2)]"><Shapes className="size-4" /></span>
            Design Canvas
          </Link>
          <Link href="/" className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-white/15 bg-white/[0.03] px-4 text-sm font-medium text-slate-200 transition hover:bg-white/10 hover:text-white"><ArrowLeft className="size-4" /> Back to studio</Link>
        </header>

        <section className="max-w-3xl py-16 sm:py-20">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/[0.08] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-200"><Sparkles className="size-3.5" /> Studio handbook</div>
          <h1 className="text-4xl font-semibold tracking-[-0.04em] text-white sm:text-6xl">Make ideas tangible.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">A practical guide to the canvas editor: create quickly, refine confidently, and keep every version safely persisted through the Express and MongoDB stack.</p>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          {sections.map(({ icon: Icon, title, body }) => (
            <article key={title} className="rounded-2xl border border-white/10 bg-white/[0.035] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.14)] transition hover:-translate-y-0.5 hover:border-amber-300/25 hover:bg-white/[0.05]">
              <div className="mb-5 grid size-10 place-items-center rounded-xl border border-amber-300/20 bg-amber-300/[0.09] text-amber-200"><Icon className="size-4" /></div>
              <h2 className="text-lg font-semibold text-white">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-400">{body}</p>
            </article>
          ))}
        </section>

        <section className="mt-16 grid gap-5 lg:grid-cols-[1.15fr_.85fr]">
          <article className="rounded-2xl border border-white/10 bg-[#141820] p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-3"><Keyboard className="size-5 text-amber-200" /><h2 className="text-xl font-semibold text-white">Keyboard shortcuts</h2></div>
            <div className="divide-y divide-white/8">{shortcuts.map(([key, label]) => <div key={key} className="flex items-center justify-between gap-4 py-3 text-sm"><span className="text-slate-400">{label}</span><kbd className="rounded-md border border-white/15 bg-black/20 px-2 py-1 font-mono text-[11px] text-amber-100">{key}</kbd></div>)}</div>
          </article>
          <article className="rounded-2xl border border-amber-300/20 bg-[linear-gradient(145deg,rgba(252,211,77,0.12),rgba(20,24,32,0.72))] p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-3"><Server className="size-5 text-amber-200" /><h2 className="text-xl font-semibold text-white">Built for safe persistence</h2></div>
            <div className="flex flex-col gap-4 text-sm leading-6 text-slate-300"><p><CheckCircle2 className="mr-2 inline size-4 text-emerald-300" />REST endpoints validate canvas names, element geometry, colors, text, and payload size before writes.</p><p><Database className="mr-2 inline size-4 text-amber-200" />MongoDB stores each canvas with timestamps, making Load sorting and refresh recovery predictable.</p><p><CheckCircle2 className="mr-2 inline size-4 text-emerald-300" />The frontend talks to the API through a small client layer; no canvas data is silently stored in localStorage.</p></div>
          </article>
        </section>

        <footer className="mt-20 border-t border-white/10 pt-6 text-xs text-slate-500"><Link href="/" className="transition hover:text-amber-200">Design Canvas</Link><span className="mx-2 text-white/20">/</span> Documentation · Built for focused visual thinking</footer>
      </div>
    </main>
  )
}

export const metadata: Metadata = {
  title: 'Documentation | Design Canvas',
  description: 'Learn how to create, edit, transform, and persist canvases in Design Canvas.',
}
