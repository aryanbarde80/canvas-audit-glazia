'use client'

import Link from 'next/link'
import { ArrowUpRight, Check, Command, Layers3, Move3d, MousePointer2, Play, Sparkles, WandSparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

const features = [
  { icon: MousePointer2, title: 'Direct manipulation', text: 'Move, resize, and refine every object exactly where the idea needs it.' },
  { icon: Layers3, title: 'A clear visual system', text: 'Keep hierarchy, spacing, and composition visible while you explore.' },
  { icon: WandSparkles, title: 'Made to keep momentum', text: 'From the first rough block to a thoughtful final frame, stay in flow.' },
]

export default function Page() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#0b0d0f] text-[#f3f0e8] selection:bg-[#f0a15f] selection:text-[#16100c]">
      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <Link href="/" className="flex items-center gap-3 text-sm font-semibold tracking-[-0.02em]">
          <span className="grid size-8 place-items-center rounded-full bg-[#f0a15f] text-[#13100d]"><Sparkles className="size-4" /></span>
          <span>canvas / studio</span>
        </Link>
        <div className="hidden items-center gap-8 text-[11px] uppercase tracking-[0.22em] text-white/55 md:flex">
          <a href="#manifesto" className="transition hover:text-white">Manifesto</a>
          <a href="#features" className="transition hover:text-white">Toolkit</a>
          <Link href="/docs" className="transition hover:text-white">Docs</Link>
        </div>
        <Button asChild className="rounded-full bg-[#f3f0e8] px-5 text-xs font-semibold text-[#111315] hover:bg-[#f0a15f]">
          <a href="#start">Open canvas <ArrowUpRight data-icon="inline-end" /></a>
        </Button>
      </nav>

      <section className="relative mx-auto flex min-h-[680px] max-w-7xl flex-col justify-center px-6 pb-24 pt-20 lg:px-10 lg:pb-32">
        <div className="pointer-events-none absolute -right-40 top-10 size-[520px] rounded-full bg-[#d47745]/15 blur-[110px]" />
        <div className="relative max-w-5xl">
          <p className="mb-8 flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-[#f0a15f]"><span className="h-px w-10 bg-[#f0a15f]" />A calmer place to make</p>
          <h1 className="max-w-5xl text-[clamp(4.4rem,11vw,10.5rem)] font-semibold leading-[0.82] tracking-[-0.085em] text-[#f3f0e8]">Make space<br /><span className="font-serif font-normal italic text-[#f0a15f]">for the idea.</span></h1>
          <div className="mt-12 flex max-w-2xl flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-sm text-base leading-7 text-white/55">Canvas is a focused visual workspace for early thoughts, clear systems, and the satisfying moment when everything clicks.</p>
            <div id="start" className="flex shrink-0 gap-3"><Button asChild size="lg" className="rounded-full bg-[#f0a15f] px-6 text-[#1a120d] hover:bg-[#ffc188]"><Link href="/editor">Start designing <ArrowUpRight data-icon="inline-end" /></Link></Button><Button variant="outline" size="lg" className="rounded-full border-white/15 bg-white/[0.03] px-5 text-white hover:bg-white/10"><Play data-icon="inline-start" /> See the approach</Button></div>
          </div>
        </div>
        <div className="relative mt-20 grid gap-3 sm:grid-cols-3">
          {['No noise, just signal', 'Persistent by design', 'Built for the next move'].map((label, index) => <div key={label} className="border-t border-white/15 pt-4 text-[11px] uppercase tracking-[0.2em] text-white/45"><span className="mr-3 text-[#f0a15f]">0{index + 1}</span>{label}</div>)}
        </div>
      </section>

      <section id="manifesto" className="border-y border-white/10 bg-[#e9e4da] px-6 py-24 text-[#17191b] lg:px-10 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <p className="text-[11px] uppercase tracking-[0.3em] text-black/45">The visual layer</p>
          <div><h2 className="max-w-4xl text-5xl font-semibold leading-[0.95] tracking-[-0.06em] sm:text-7xl">Good ideas deserve a room that gets out of the way.</h2><p className="mt-8 max-w-xl text-base leading-7 text-black/55">A premium canvas without the ceremony. Compose with intention, test the edges, and save the work that is worth returning to.</p></div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="mb-14 flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-[#f0a15f]">The toolkit</p><h2 className="text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">Less friction.<br /><span className="text-white/45">More making.</span></h2></div><p className="max-w-xs text-sm leading-6 text-white/45">Everything you need to turn a blank surface into a point of view.</p></div>
        <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-3">{features.map(({ icon: Icon, title, text }, index) => <article key={title} className="group bg-[#111416] p-8 transition hover:bg-[#171b1e] sm:p-10"><div className="mb-16 flex items-center justify-between"><Icon className="size-5 text-[#f0a15f]" /><span className="font-mono text-xs text-white/30">0{index + 1}</span></div><h3 className="text-xl font-medium tracking-tight">{title}</h3><p className="mt-4 text-sm leading-6 text-white/45">{text}</p></article>)}</div>
      </section>

      <section className="mx-6 mb-6 overflow-hidden rounded-3xl bg-[#f0a15f] px-6 py-20 text-[#1c130e] sm:px-12 lg:mx-10 lg:px-20"><div className="flex flex-col justify-between gap-10 md:flex-row md:items-end"><div><p className="mb-5 text-[11px] uppercase tracking-[0.3em] text-black/55">Begin anywhere</p><h2 className="max-w-2xl text-5xl font-semibold leading-[0.9] tracking-[-0.06em] sm:text-7xl">Your next clear thought is closer than it looks.</h2></div><Button asChild size="lg" className="w-fit rounded-full bg-[#151719] px-6 text-[#f3f0e8] hover:bg-[#2c3033]"><Link href="/editor">Enter canvas <ArrowUpRight data-icon="inline-end" /></Link></Button></div></section>

      <footer className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-8 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between lg:px-10"><span className="font-medium text-white/70">canvas / studio</span><div className="flex items-center gap-6"><span className="flex items-center gap-2"><Command className="size-3" /> Built for focused work</span><Link href="/docs" className="transition hover:text-[#f0a15f]">Documentation <ArrowUpRight className="ml-1 inline size-3" /></Link></div></footer>
    </main>
  )
}
