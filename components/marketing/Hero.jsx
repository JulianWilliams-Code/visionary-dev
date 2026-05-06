export default function Hero() {
  return (
    <section className="bg-[--color-surface] px-4 pt-24 pb-20">
      <div className="mx-auto max-w-4xl text-center">

        {/* Eyebrow — honest early-access framing, no fake social proof */}
        <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-[--color-brand]">
          Early access · Founding member pricing
        </p>

        {/* Headline — "7 questions" is the concrete differentiator.
            It tells you exactly how the product works in one line.
            Positive, not fear-based. Stripe-level clarity. */}
        <h1
          className="font-bold tracking-tight text-[--color-text-primary]"
          style={{ fontSize: 'clamp(2.25rem, 6vw, 3.75rem)', lineHeight: 1.1 }}
        >
          Answer 7 questions.{' '}
          <br className="hidden sm:block" />
          <span style={{ color: 'var(--color-brand)' }}>
            Your website goes live in 2 minutes.
          </span>
        </h1>

        {/* Sub — audience, method, no defensive negatives */}
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[--color-text-secondary]">
          Built for personal trainers, coaches, and consultants.
          We handle the design, copy, and launch — automatically.
        </p>

        {/* Email capture — tokens throughout, no hardcoded blue */}
        <form
          action="/signup"
          method="get"
          className="mx-auto mt-10 flex max-w-sm flex-col gap-3 sm:flex-row"
        >
          <input
            type="email"
            name="email"
            placeholder="your@email.com"
            required
            className="
              flex-1 rounded-lg border border-[--color-border] bg-[--color-surface]
              px-4 py-3 text-sm text-[--color-text-primary]
              placeholder:text-[--color-text-muted]
              transition-all duration-150
              focus:border-[--color-brand] focus:outline-none
              focus:ring-2 focus:ring-[--color-brand] focus:ring-offset-0
            "
          />
          <button
            type="submit"
            className="whitespace-nowrap rounded-lg px-6 py-3 text-sm font-semibold text-white transition-opacity duration-150 hover:opacity-90"
            style={{ backgroundColor: 'var(--color-accent)' }}
          >
            Build my site free →
          </button>
        </form>

        <p className="mt-3 text-xs text-[--color-text-muted]">
          No credit card · Free plan, no expiry · Live in 2 minutes
        </p>

        {/* Site preview — skeleton uses design tokens so it
            matches whatever brand colour is set in globals.css */}
        <div className="mx-auto mt-16 max-w-3xl overflow-hidden rounded-2xl border border-[--color-border] shadow-xl">
          <div className="flex items-center gap-2 border-b border-[--color-border] bg-[--color-surface-2] px-4 py-3">
            <div className="flex gap-1.5" aria-hidden="true">
              <div className="h-3 w-3 rounded-full bg-red-400" />
              <div className="h-3 w-3 rounded-full bg-yellow-400" />
              <div className="h-3 w-3 rounded-full bg-green-400" />
            </div>
            <div className="mx-4 flex-1 rounded bg-[--color-surface] px-3 py-1 text-left text-xs text-[--color-text-muted]">
              yourname.visionarydev.org
            </div>
          </div>
          <div className="bg-[--color-surface] p-8 text-left">
            <div className="mb-8 flex items-center justify-between">
              <div className="h-3 w-28 rounded-sm bg-[--color-text-primary]" aria-hidden="true" />
              <div className="h-8 w-24 rounded-md" style={{ backgroundColor: 'var(--color-brand)' }} aria-hidden="true" />
            </div>
            <div className="mb-1.5 h-2.5 w-20 rounded-sm opacity-70" style={{ backgroundColor: 'var(--color-brand)' }} aria-hidden="true" />
            <div className="mb-2 h-7 w-3/4 rounded-sm bg-[--color-text-primary]" aria-hidden="true" />
            <div className="mb-5 h-7 w-1/2 rounded-sm bg-[--color-text-primary] opacity-40" aria-hidden="true" />
            <div className="mb-1.5 h-2.5 w-full rounded-sm bg-[--color-border]" aria-hidden="true" />
            <div className="mb-6 h-2.5 w-4/5 rounded-sm bg-[--color-border]" aria-hidden="true" />
            <div className="flex gap-3">
              <div className="h-9 w-32 rounded-md" style={{ backgroundColor: 'var(--color-brand)' }} aria-hidden="true" />
              <div className="h-9 w-28 rounded-md border border-[--color-border]" aria-hidden="true" />
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
