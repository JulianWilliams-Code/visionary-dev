// Server Component
import Image from 'next/image'
import Link  from 'next/link'
import { Zap, DollarSign, Heart } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title:       'About — Visionary Dev',
  description: 'Visionary Dev was built because a professional website should take minutes, not months — and definitely not thousands of dollars.',
}

// ── Values data ───────────────────────────────────────────────────────────────

const VALUES = [
  {
    Icon:    Zap,
    heading: 'Speed over complexity',
    body:    'A finished website in 2 minutes beats a customisable one that never gets launched.',
  },
  {
    Icon:    DollarSign,
    heading: 'Honest, simple pricing',
    body:    'No hidden fees. No gotchas. Free forever, upgrade when you\'re ready.',
  },
  {
    Icon:    Heart,
    heading: 'Built for humans, not developers',
    body:    'If you need to read a tutorial to use it, we haven\'t done our job.',
  },
] as const

// ── Page ──────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <>

      {/* ── 1. HERO ─────────────────────────────────────────────────── */}
      <section className="bg-[--color-surface] px-6 py-24 text-center">
        <div className="mx-auto max-w-3xl">
          <h1
            className="font-bold text-[--color-text-primary]"
            style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)', fontFamily: 'var(--font-display)', lineHeight: 1.15 }}
          >
            Built by someone who got tired of watching great businesses stay invisible online.
          </h1>
          <p
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[--color-text-secondary]"
          >
            Visionary Dev exists because building a professional website should take minutes,
            not months — and definitely not thousands of dollars.
          </p>
        </div>
      </section>

      {/* ── 2. FOUNDER ──────────────────────────────────────────────── */}
      <section className="bg-[--color-surface-2] px-6 py-20">
        <div className="mx-auto flex max-w-4xl flex-col gap-12 md:flex-row md:items-center">

          {/* Image (40%) */}
          <div className="flex shrink-0 justify-center md:w-[40%]">
            {/* TODO: replace /founder.jpg with the real founder photo in /public */}
            <div
              className="rounded-full p-1 shadow-md"
              style={{ background: 'var(--color-brand)' }}
            >
              <Image
                src="/founder.jpg"
                alt="Founder of Visionary Dev"
                width={200}
                height={200}
                className="h-48 w-48 rounded-full object-cover"
                priority
              />
            </div>
          </div>

          {/* Text (60%) */}
          <div className="space-y-5 text-base leading-relaxed text-[--color-text-secondary] md:w-[60%]">
            <p>
              I built Visionary Dev after watching too many talented trainers, coaches, and
              consultants lose clients to competitors with better websites — not better services.
            </p>
            <p>
              The existing tools either cost thousands of dollars or waste your weekends.
              Neither respects your time or your budget.
            </p>
            <p>
              Visionary Dev does something different: answer 7 questions about your business and
              get a complete, live, bookable website in under 2 minutes. No design decisions.
              No drag-and-drop. Just results.
            </p>
            <p>
              I read every email personally. Questions, feedback, or just want to say hi —{' '}
              <a
                href="mailto:hello@visionarydev.xyz"
                className="font-medium underline-offset-2 hover:underline"
                style={{ color: 'var(--color-brand)' }}
              >
                hello@visionarydev.xyz
              </a>
              . I&apos;d love to hear from you.
            </p>
          </div>

        </div>
      </section>

      {/* ── 3. VALUES ───────────────────────────────────────────────── */}
      <section className="bg-[--color-surface] px-6 py-20" aria-labelledby="values-heading">
        <div className="mx-auto max-w-4xl">

          <h2
            id="values-heading"
            className="mb-10 text-center font-bold text-[--color-text-primary]"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)' }}
          >
            What we believe
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            {VALUES.map(({ Icon, heading, body }) => (
              <div
                key={heading}
                className="
                  flex flex-col gap-4 rounded-[--radius-lg]
                  border border-[--color-border] bg-[--color-surface] p-6
                  transition-all duration-150 hover:shadow-md
                "
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{ backgroundColor: 'var(--color-brand-light)' }}
                  aria-hidden="true"
                >
                  <Icon size={20} style={{ color: 'var(--color-brand)' }} />
                </div>
                <h3 className="text-base font-semibold text-[--color-text-primary]">
                  {heading}
                </h3>
                <p className="text-sm leading-relaxed text-[--color-text-secondary]">
                  {body}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 4. CTA ──────────────────────────────────────────────────── */}
      <section className="bg-[--color-brand-light] px-6 py-20 text-center">
        <div className="mx-auto max-w-xl">
          <h2
            className="font-bold text-[--color-text-primary]"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)' }}
          >
            Ready to build yours?
          </h2>
          <p className="mt-4 text-base text-[--color-text-secondary]">
            Free forever. Live in 2 minutes. No credit card.
          </p>
          <Link
            href="/signup"
            className="
              mt-8 inline-flex min-h-[52px] items-center justify-center
              rounded-lg px-10 text-base font-semibold text-white
              transition-opacity duration-150 hover:opacity-90
            "
            style={{ backgroundColor: 'var(--color-accent)' }}
          >
            Get started free →
          </Link>
        </div>
      </section>

    </>
  )
}
