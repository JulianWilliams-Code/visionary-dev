import { Check } from 'lucide-react'

const reassurances = [
  'No credit card required',
  'Free plan, no expiry',
  'Live in 2 minutes',
  'Cancel anytime',
]

export default function FinalCTA() {
  return (
    <section className="px-4 py-24" style={{ backgroundColor: 'var(--color-text-primary)' }}>
      <div className="mx-auto max-w-2xl text-center">

        <p className="mb-4 text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--color-brand-light)' }}>
          Get started
        </p>

        <h2
          className="font-bold text-white"
          style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1.15 }}
        >
          Your first website is{' '}
          <span style={{ color: 'var(--color-brand-light)' }}>completely free.</span>
        </h2>

        <p className="mx-auto mt-5 max-w-md text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
          No credit card. No designer. Just 7 questions and your business is online.
        </p>

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
              flex-1 rounded-lg px-4 py-3 text-sm text-white
              placeholder:text-white/40
              transition-all duration-150
              focus:outline-none focus:ring-2 focus:ring-white/40
            "
            style={{ backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
          />
          <button
            type="submit"
            className="whitespace-nowrap rounded-lg px-6 py-3 text-sm font-semibold text-white transition-opacity duration-150 hover:opacity-90"
            style={{ backgroundColor: 'var(--color-accent)' }}
          >
            Get started free →
          </button>
        </form>

        <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {reassurances.map((text) => (
            <li key={text} className="flex items-center gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
              <Check size={14} className="text-green-400 shrink-0" aria-hidden="true" />
              {text}
            </li>
          ))}
        </ul>

      </div>
    </section>
  )
}
