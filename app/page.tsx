'use client'

import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Check, Command, Layers3, Move3d, MousePointer2, Play, Sparkles, WandSparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

const features = [
  { icon: MousePointer2, title: 'Direct manipulation', text: 'Move, resize, and refine every object exactly where the idea needs it.' },
  { icon: Layers3, title: 'A clear visual system', text: 'Keep hierarchy, spacing, and composition visible while you explore.' },
  { icon: WandSparkles, title: 'Made to keep momentum', text: 'From the first rough block to a thoughtful final frame, stay in flow.' },
]

function CanvasPreview() {
  return (
    <div className="relative mx-auto w-full max-w-[560px] rounded-[1.5rem] border border-white/15 bg-[#15191d] p-3 shadow-[0_30px_100px_rgba(0,0,0,.35)] sm:p-4">
      <div className="flex items-center justify-between border-b border-white/10 px-2 pb-3 text-[9px] uppercase tracking-[0.2em] text-white/45">
        <span className="flex items-center gap-2"><span className="size-2 rounded-full bg-[#f0a15f]" /> Untitled canvas</span>
        <span>100%</span>
      </div>
      <div className="relative mt-3 aspect-[1.38] overflow-hidden rounded-xl bg-[#f1eee8] p-5 text-[#18202b] sm:p-8">
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'linear-gradient(rgba(24,32,43,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(24,32,43,.08) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="relative flex h-full flex-col justify-between">
          <div><p className="text-[9px] uppercase tracking-[0.25em] text-[#d47745]">A simple system</p><h3 className="mt-2 max-w-[250px] text-2xl font-semibold leading-[.95] tracking-[-.06em] sm:text-4xl">Make room<br />for better work.</h3></div>
          <div className="flex items-end justify-between"><div className="h-14 w-14 rounded-full border-[7px] border-[#d47745]/80 border-r-transparent sm:h-20 sm:w-20" /><div className="rounded-lg bg-[#18202b] px-3 py-2 text-[9px] text-white sm:px-4 sm:py-3">move freely <ArrowUpRight className="ml-1 inline size-3" /></div></div>
        </div>
        <div className="absolute left-[43%] top-[48%] size-10 rounded-md border-2 border-[#d47745] bg-white/40 shadow-[0_0_0_4px_rgba(212,119,69,.12)] sm:size-14" />
      </div>
      <div className="flex items-center justify-between px-2 pt-3 text-[9px] uppercase tracking-[0.18em] text-white/35"><span>Drag to explore</span><span className="flex items-center gap-1"><Move3d className="size-3" /> Responsive workspace</span></div>
    </div>
  )
}

export default function Page() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#0b0d0f] text-[#f3f0e8] selection:bg-[#f0a15f] selection:text-[#16100c]">
      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between border-b border-white/10 px-5 py-5 lg:px-10">
        <Link href="/" className="flex items-center gap-3 text-sm font-semibold tracking-[-0.02em]"><span className="grid size-8 place-items-center rounded-full bg-[#f0a15f] text-[#13100d]"><Sparkles className="size-4" /></span><span>canvas / studio</span></Link>
        <div className="hidden items-center gap-8 text-[10px] uppercase tracking-[0.22em] text-white/50 md:flex"><a href="#manifesto" className="transition hover:text-white">Manifesto</a><a href="#features" className="transition hover:text-white">Toolkit</a><Link href="/docs" className="transition hover:text-white">Docs</Link></div>
        <Button asChild className="rounded-full bg-[#f3f0e8] px-4 text-xs font-semibold text-[#111315] hover:bg-[#f0a15f]"><Link href="/editor">Open canvas <ArrowUpRight data-icon="inline-end" /></Link></Button>
      </nav>

      <section className="relative mx-auto grid max-w-7xl gap-14 px-5 pb-20 pt-16 lg:grid-cols-[.92fr_1.08fr] lg:items-center lg:gap-10 lg:px-10 lg:pb-28 lg:pt-24">
        <div className="pointer-events-none absolute -right-40 top-20 size-[500px] rounded-full bg-[#d47745]/15 blur-[120px]" />
        <div className="relative z-[1]">
          <p className="mb-7 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-[#f0a15f]"><span className="h-px w-9 bg-[#f0a15f]" />A calmer place to make</p>
          <h1 className="max-w-2xl text-[clamp(3.8rem,8vw,7.8rem)] font-semibold leading-[.84] tracking-[-.085em] text-[#f3f0e8]">Make space<br /><span className="font-serif font-normal italic text-[#f0a15f]">for the idea.</span></h1>
          <p className="mt-8 max-w-md text-base leading-7 text-white/55">A focused visual workspace for early thoughts, clear systems, and the satisfying moment when everything clicks.</p>
          <div className="mt-8 flex flex-wrap gap-3"><Button asChild size="lg" className="rounded-full bg-[#f0a15f] px-6 text-[#1a120d] hover:bg-[#ffc188]"><Link href="/editor">Start designing <ArrowRight data-icon="inline-end" /></Link></Button><Button asChild variant="outline" size="lg" className="rounded-full border-white/15 bg-white/[0.03] px-5 text-white hover:bg-white/10"><a href="#manifesto"><Play data-icon="inline-start" /> See the approach</a></Button></div>
          <div className="mt-12 flex flex-wrap gap-x-6 gap-y-3 text-[10px] uppercase tracking-[0.18em] text-white/40"><span className="flex items-center gap-2"><Check className="size-3 text-[#f0a15f]" /> No noise</span><span className="flex items-center gap-2"><Check className="size-3 text-[#f0a15f]" /> Persistent</span><span className="flex items-center gap-2"><Check className="size-3 text-[#f0a15f]" /> Built to flow</span></div>
        </div>
        <div className="relative z-[1] lg:pt-8"><CanvasPreview /></div>
      </section>

      <section id="manifesto" className="border-y border-white/10 bg-[#e9e4da] px-5 py-20 text-[#17191b] lg:px-10 lg:py-28"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end"><p className="text-[10px] uppercase tracking-[0.3em] text-black/45">The visual layer</p><div><h2 className="max-w-4xl text-4xl font-semibold leading-[.95] tracking-[-.06em] sm:text-6xl">Good ideas deserve a room that gets out of the way.</h2><p className="mt-7 max-w-xl text-base leading-7 text-black/55">A premium canvas without the ceremony. Compose with intention, test the edges, and save the work that is worth returning to.</p></div></div></section>

      <section id="features" className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28"><div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-[#f0a15f]">The toolkit</p><h2 className="text-4xl font-semibold tracking-[-.05em] sm:text-6xl">Less friction.<br /><span className="text-white/45">More making.</span></h2></div><p className="max-w-xs text-sm leading-6 text-white/45">Everything you need to turn a blank surface into a point of view.</p></div><div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-3">{features.map(({ icon: Icon, title, text }, index) => <article key={title} className="group bg-[#111416] p-7 transition hover:bg-[#171b1e] sm:p-9"><div className="mb-14 flex items-center justify-between"><Icon className="size-5 text-[#f0a15f]" /><span className="font-mono text-xs text-white/30">0{index + 1}</span></div><h3 className="text-xl font-medium tracking-tight">{title}</h3><p className="mt-4 text-sm leading-6 text-white/45">{text}</p></article>)}</div></section>

      <section className="mx-4 mb-5 overflow-hidden rounded-3xl bg-[#f0a15f] px-5 py-16 text-[#1c130e] sm:mx-6 sm:px-12 lg:mx-10 lg:px-20 lg:py-20"><div className="flex flex-col justify-between gap-8 md:flex-row md:items-end"><div><p className="mb-5 text-[10px] uppercase tracking-[0.3em] text-black/55">Begin anywhere</p><h2 className="max-w-2xl text-4xl font-semibold leading-[.9] tracking-[-.06em] sm:text-6xl">Your next clear thought is closer than it looks.</h2></div><Button asChild size="lg" className="w-fit rounded-full bg-[#151719] px-6 text-[#f3f0e8] hover:bg-[#2c3033]"><Link href="/editor">Enter canvas <ArrowUpRight data-icon="inline-end" /></Link></Button></div></section>

      <footer className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between lg:px-10"><span className="font-medium text-white/70">canvas / studio</span><div className="flex items-center gap-6"><span className="hidden items-center gap-2 sm:flex"><Command className="size-3" /> Built for focused work</span><Link href="/docs" className="transition hover:text-[#f0a15f]">Documentation <ArrowUpRight className="ml-1 inline size-3" /></Link></div></footer>
    </main>
  )
}
