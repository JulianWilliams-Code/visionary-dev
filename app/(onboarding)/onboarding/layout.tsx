import type { Metadata }  from 'next'
import type { ReactNode } from 'react'
import Link               from 'next/link'

export const metadata: Metadata = {
  title: 'Create your website — Visionary Dev',
}

export default function OnboardingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-dvh flex flex-col bg-[--color-surface] overflow-hidden">
      {/* ── Header ──────────────────────────────────────────────── */}
      <header className="shrink-0 border-b border-[--color-border] px-6 py-4">
        <Link
          href="/"
          className="
            inline-flex items-center gap-2 rounded-[--radius-md]
            transition-all duration-150
            focus-visible:ring-2 ring-[--color-brand] ring-offset-2
          "
          aria-label="Visionary Dev — return to home page"
        >
          <span
            className="
              flex h-7 w-7 items-center justify-center
              rounded-[--radius-md] bg-[--color-brand]
              text-white text-xs font-bold select-none
            "
            aria-hidden="true"
          >
            V
          </span>
          <span className="text-sm font-semibold text-[--color-text-primary]">
            Visionary Dev
          </span>
        </Link>
      </header>

      {/* ── Content ─────────────────────────────────────────────── */}
      <div className="flex flex-1 min-h-0">
        {children}
      </div>
    </div>
  )
}
