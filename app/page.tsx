'use client'

import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Check, Command, Layers3, MousePointer2, Sparkles, WandSparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import BrandMark from '@/components/brand/brand-mark'

const features = [
  { icon: MousePointer2, number: '01', title: 'Compose in context', text: 'Place the right primitive, move it with intention, and see the composition come together in real time.' },
  { icon: Layers3, number: '02', title: 'Keep the system visible', text: 'A calm workspace keeps hierarchy, spacing, and visual decisions close to the surface.' },
  { icon: WandSparkles, number: '03', title: 'Return to the work', text: 'Save boards, refine details, and pick up exactly where the thinking left off.' },
]

function Preview() {
  return (
    <div className="relative rounded-[28px] border border-white/[0.14] bg-[#15191d] p-3 shadow-[0_30px_90px_rgba(0,0,0,.42)] sm:p-4">
      <div className="flex items-center justify-between border-b border-white/10 px-3 pb-3 text-[10px] uppercase tracking-[0.2em] text-white/40">
        <span className="flex items-center gap-2"><span className="size-2 rounded-full bg-[#e29a63] shadow-[0_0_16px_#e29a63]" /> Canvas / studio</span><span>Untitled board</span>
      </div>
      <div className="relative mt-3 aspect-[1.28] overflow-hidden rounded-2xl bg-[#f4f0e8] p-6 text-[#1a2028] ring-1 ring-black/10 sm:p-9">
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'linear-gradient(rgba(26,32,40,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(26,32,40,.08) 1px, transparent 1px)', backgroundSize: '25px 25px' }} />
        <div className="relative flex h-full flex-col justify-between">
          <div><p className="text-[9px] font-semibold uppercase tracking-[0.26em] text-[#be6c43]">A flexible starting point</p><h3 className="mt-3 max-w-[320px] text-[clamp(2rem,4vw,3.6rem)] font-semibold leading-[.9] tracking-[-.07em]">Make room<br />for better work.</h3></div>
          <div className="flex items-end justify-between"><div className="size-16 rounded-full border-[8px] border-[#d27b4f] border-r-transparent sm:size-24" /><div className="rounded-xl bg-[#1a2028] px-3 py-2 text-[10px] font-medium text-white shadow-xl sm:px-4 sm:py-3">Move freely <ArrowUpRight className="ml-1 inline size-3" /></div></div>
        </div>
        <div className="absolute left-[44%] top-[46%] size-12 rounded-lg border-2 border-[#c96f48] bg-white/40 shadow-[0_0_0_5px_rgba(201,111,72,.12)] sm:size-16" />
      </div>
      <div className="flex items-center justify-between px-3 pt-3 text-[9px] font-medium uppercase tracking-[0.18em] text-white/35"><span>Drag to explore</span><span>100% focused</span></div>
    </div>
  )
}

function VisualLayerPreview() {
  return (
    <div className="relative min-h-[300px] overflow-hidden rounded-[28px] border border-black/10 bg-[#f4f0e8] p-5 shadow-[0_24px_70px_rgba(23,27,32,.12)] sm:min-h-[360px] sm:p-7">
      <div className="absolute inset-0 opacity-35" style={{ backgroundImage: 'linear-gradient(rgba(26,32,40,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(26,32,40,.08) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
      <div className="relative flex items-center justify-between text-[9px] font-semibold uppercase tracking-[.22em] text-black/45"><span className="flex items-center gap-2"><span className="size-2 rounded-full bg-[#e29a63]" /> Canvas / studio</span><span>01 — visual layer</span></div>
      <div className="absolute inset-x-8 bottom-8 top-16 rounded-2xl border border-black/10 bg-white/75 p-5 shadow-[0_18px_40px_rgba(23,27,32,.12)] sm:inset-x-12 sm:bottom-10 sm:top-20 sm:p-7">
        <div className="flex items-start justify-between"><div><p className="text-[9px] font-semibold uppercase tracking-[.2em] text-[#be6c43]">A flexible starting point</p><h3 className="mt-2 max-w-[230px] text-3xl font-semibold leading-[.88] tracking-[-.07em] text-[#171b20] sm:text-4xl">Make room<br />for better work.</h3></div><span className="rounded-full bg-[#e29a63]/15 px-2.5 py-1 text-[9px] font-semibold text-[#9d512e]">Draft 01</span></div>
        <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between sm:bottom-7 sm:left-7 sm:right-7"><div className="size-16 rounded-full border-[9px] border-[#d27b4f] border-r-transparent sm:size-20" /><div className="rounded-xl bg-[#1a2028] px-3 py-2 text-[10px] font-medium text-[#f4f0e8] shadow-lg sm:px-4 sm:py-3">Move freely <ArrowUpRight className="ml-1 inline size-3" /></div></div>
        <div className="absolute left-[46%] top-[48%] size-12 rotate-6 rounded-lg border-2 border-[#c96f48] bg-[#e29a63]/20 shadow-[0_0_0_5px_rgba(201,111,72,.12)] sm:size-16" />
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#0a0d10] text-[#f4f0e8] selection:bg-[#e29a63] selection:text-[#17100c]">
      <div className="border-b border-white/[0.08] bg-white/[0.025] px-5 py-2.5 text-center text-[10px] font-medium uppercase tracking-[0.22em] text-white/45">A quieter way to shape the next idea <span className="mx-2 text-[#e29a63]">/</span> Public preview
      </div>
      <nav className="mx-auto flex max-w-7xl items-center justify-between border-b border-white/10 px-5 py-5 lg:px-10">
        <Link href="/" className="flex items-center gap-3 text-sm font-semibold tracking-tight"><span className="grid size-9 place-items-center rounded-xl bg-[#e29a63] text-[#17110d] shadow-[0_0_26px_rgba(226,154,99,.2)]"><BrandMark className="size-[18px]" /></span><span>canvas / studio</span></Link>
        <div className="hidden items-center gap-8 text-[10px] font-medium uppercase tracking-[0.2em] text-white/45 md:flex"><a href="#why" className="transition hover:text-white">Why canvas</a><a href="#toolkit" className="transition hover:text-white">Toolkit</a><Link href="/docs" className="transition hover:text-white">Docs</Link></div>
        <Button render={<Link href="/editor" />} size="sm" className="h-10 rounded-xl bg-[#f4f0e8] px-5 text-[11px] font-semibold text-[#15181b] shadow-lg hover:bg-[#e29a63] focus-visible:ring-2 focus-visible:ring-[#e29a63] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0d10]">Open canvas <ArrowUpRight data-icon="inline-end" /></Button>
      </nav>

      <section className="relative mx-auto grid max-w-7xl gap-14 px-5 pb-24 pt-20 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-16 lg:px-10 lg:pb-32 lg:pt-28">
        <div className="pointer-events-none absolute -right-48 top-10 size-[550px] rounded-full bg-[#be6c43]/15 blur-[140px]" />
        <div className="relative z-[1]"><p className="mb-7 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#e29a63]"><span className="h-px w-10 bg-[#e29a63]" />A calmer place to make</p><h1 className="max-w-2xl text-[clamp(4.2rem,8.5vw,8.7rem)] font-semibold leading-[.82] tracking-[-.09em]">Make space<br /><span className="font-serif font-normal italic text-[#e29a63]">for the idea.</span></h1><p className="mt-9 max-w-md text-[15px] leading-7 text-white/55">A focused visual workspace for early thoughts, clear systems, and the satisfying moment when everything clicks.</p><div className="mt-9 flex flex-col gap-3 sm:flex-row"><Button render={<Link href="/editor" />} size="lg" className="h-13 rounded-xl bg-[#e29a63] px-7 text-[#1a120d] shadow-[0_14px_34px_rgba(226,154,99,.2)] hover:bg-[#f2b27b] focus-visible:ring-2 focus-visible:ring-[#f2b27b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0d10]">Start designing <ArrowRight data-icon="inline-end" /></Button><Button render={<a href="#why" />} variant="outline" size="lg" className="h-13 rounded-xl border-white/15 bg-white/[0.035] px-6 text-white hover:border-white/30 hover:bg-white/[0.08] focus-visible:ring-2 focus-visible:ring-[#e29a63] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0d10]">Explore the method</Button></div><div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-[11px] text-white/42"><span className="flex items-center gap-2"><Check className="size-3 text-[#e29a63]" /> No setup ceremony</span><span className="flex items-center gap-2"><Check className="size-3 text-[#e29a63]" /> Built for iteration</span></div></div>
        <div className="relative z-[1]"><Preview /></div>
      </section>

      <section id="why" className="overflow-hidden border-y border-black/10 bg-[#e9e4da] px-5 py-20 text-[#171b20] lg:px-10 lg:py-28"><div className="mx-auto grid min-w-0 max-w-7xl gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center"><div className="min-w-0"><VisualLayerPreview /></div><div className="min-w-0"><p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.3em] text-black/45">The visual layer</p><h2 className="max-w-4xl break-words text-4xl font-semibold leading-[.92] tracking-[-.065em] sm:text-6xl">Good ideas deserve a room that gets out of the way.</h2><p className="mt-7 max-w-xl text-base leading-7 text-black/55">No ceremony between you and the work. Compose with intention, test the edges, and save the frames worth returning to.</p></div></div></section>
      <section id="toolkit" className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28"><div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#e29a63]">The toolkit</p><h2 className="text-4xl font-semibold leading-[.9] tracking-[-.06em] sm:text-6xl">Less friction.<br /><span className="text-white/40">More making.</span></h2></div><p className="max-w-xs text-sm leading-6 text-white/45">A compact set of interactions that keeps your attention on the composition.</p></div><div className="grid overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-3">{features.map(({ icon: Icon, number, title, text }) => <article key={title} className="group border-white/10 bg-[#111519] p-7 transition hover:bg-[#171d20] md:border-r last:border-r-0 sm:p-9"><div className="mb-16 flex items-center justify-between"><Icon className="size-5 text-[#e29a63]" /><span className="font-mono text-xs text-white/30">{number}</span></div><h3 className="text-xl font-medium tracking-tight">{title}</h3><p className="mt-4 text-sm leading-6 text-white/45">{text}</p></article>)}</div></section>
      <section className="mx-4 mb-5 overflow-hidden rounded-[28px] bg-[#e29a63] px-6 py-16 text-[#1d1510] sm:mx-6 sm:px-12 lg:mx-10 lg:px-20 lg:py-20"><div className="flex flex-col justify-between gap-8 md:flex-row md:items-end"><div><p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.3em] text-black/55">Begin anywhere</p><h2 className="max-w-2xl text-4xl font-semibold leading-[.9] tracking-[-.06em] sm:text-6xl">Your next clear thought is closer than it looks.</h2></div><Button render={<Link href="/editor" />} size="lg" className="h-13 w-fit rounded-xl bg-[#15191d] px-7 text-[#f4f0e8] hover:bg-[#2b3033] focus-visible:ring-2 focus-visible:ring-[#15191d] focus-visible:ring-offset-2 focus-visible:ring-offset-[#e29a63]">Enter canvas <ArrowUpRight data-icon="inline-end" /></Button></div></section>
      <footer className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between lg:px-10"><span className="font-semibold text-white/70">canvas / studio</span><div className="flex items-center gap-6"><span className="hidden items-center gap-2 sm:flex"><Command className="size-3" /> Built for focused work</span><Link href="/docs" className="transition hover:text-[#e29a63]">Documentation <ArrowUpRight className="ml-1 inline size-3" /></Link></div></footer>
    </main>
  )
}
