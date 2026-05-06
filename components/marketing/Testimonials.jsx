import Link from "next/link"
import { Crown } from "lucide-react"

export default function Testimonials() {
  return (
    <section className="bg-[--color-surface] px-4 py-24">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span
            className="text-sm font-semibold uppercase tracking-widest"
            style={{ color: 'var(--color-brand)' }}
          >
            Early access
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[--color-text-primary]">
            Be part of something from the start.
          </h2>
          <p className="mt-4 text-[--color-text-muted]">
            We&rsquo;re just getting started — and founding members get the best deal we&rsquo;ll ever offer.
          </p>
        </div>

        {/* Founding member CTA block */}
        <div className="bg-[--color-brand-light] border border-[--color-border] rounded-2xl p-10 flex flex-col items-center text-center gap-5 shadow-sm">
          <Crown size={24} style={{ color: "var(--color-brand)" }} aria-hidden="true" />

          <h3 className="text-xl font-bold text-[--color-text-primary]">
            No testimonials yet — be the first.
          </h3>

          <p className="max-w-md text-sm leading-relaxed text-[--color-text-secondary]">
            We&rsquo;re in early access. The first 100 members get Pro pricing locked at{" "}
            <strong>$19/mo forever</strong> — no price increases, ever.
          </p>

          <Link
            href="/signup"
            className="inline-flex items-center justify-center min-h-[48px] rounded-lg px-8 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "var(--color-accent)" }}
          >
            Claim my founding member spot →
          </Link>

          {/* TODO: make this dynamic — pull remaining spots from DB */}
          <p className="text-xs text-[--color-text-muted]">62 of 100 spots remaining</p>
        </div>

        {/* Stats bar */}
        <div className="mt-12 grid grid-cols-3 gap-4 text-center border-t border-[--color-border] pt-12">
          <div>
            <p className="text-lg font-bold text-[--color-text-primary] leading-snug">Founding<br />100</p>
            <p className="text-sm text-[--color-text-muted] mt-1">Be one of our founding members</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-[--color-text-primary]">2 min</p>
            <p className="text-sm text-[--color-text-muted] mt-1">Average setup time</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-[--color-text-primary]">$19</p>
            <p className="text-sm text-[--color-text-muted] mt-1">Early access — limited spots</p>
          </div>
        </div>
      </div>
    </section>
  )
}
