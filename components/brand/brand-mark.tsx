import type { SVGProps } from 'react'

export default function BrandMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M7.25 4.75h8.5a2 2 0 0 1 2 2v8.5a2 2 0 0 1-2 2h-8.5a2 2 0 0 1-2-2v-8.5a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M4.75 8.25v8.5a2 2 0 0 0 2 2h8.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" opacity=".55" />
      <path d="M10 9.25h5M10 12h3.25M10 14.75h5" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" opacity=".9" />
      <path d="M7.25 4.75h8.5a2 2 0 0 1 2 2v8.5a2 2 0 0 1-2 2h-8.5a2 2 0 0 1-2-2v-8.5a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth=".6" strokeLinejoin="round" opacity=".25" />
    </svg>
  )
}
