import { DollarSign, Clock, Search } from 'lucide-react'

const problems = [
  {
    Icon:    DollarSign,
    heading: 'A designer costs $3,000–$10,000 and takes months',
    body:    "Revision cycles, missed deadlines, a site that's outdated by launch day. Most service businesses can't justify it.",
  },
  {
    Icon:    Clock,
    heading: 'Wix and Squarespace cost you your weekends',
    body:    'Hours picking templates, rewriting copy you hate, and still ending up with something that looks like every other local business.',
  },
  {
    Icon:    Search,
    heading: 'No website means invisible to potential clients',
    body:    'When someone needs a trainer, coach, or consultant, they search online first. If you have no presence, the next person gets the call.',
  },
]

export default function Problem() {
  return (
    <section className="px-4 py-24" style={{ backgroundColor: 'var(--color-text-primary)' }}>
      <div className="mx-auto max-w-5xl">

        <div className="mb-16 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-red-400">
            The problem
          </p>
          <h2
            className="font-bold text-white"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)' }}
          >
            Getting online as a service business is harder than it should be.
          </h2>
          <p
            className="mx-auto mt-4 max-w-xl text-sm leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.5)' }}
          >
            The tools that exist are either too expensive, too slow, or built for people who aren&apos;t you.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {problems.map(({ Icon, heading, body }) => (
            <div
              key={heading}
              className="rounded-xl border p-6"
              style={{
                borderColor:     'rgba(255,255,255,0.07)',
                backgroundColor: 'rgba(255,255,255,0.03)',
              }}
            >
              <div
                className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg"
                style={{ backgroundColor: 'rgba(255,255,255,0.07)' }}
                aria-hidden="true"
              >
                <Icon size={18} className="text-red-400" />
              </div>
              <h3 className="mb-2 text-base font-semibold text-white">{heading}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                {body}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>
          There&apos;s a simpler way. ↓
        </p>

      </div>
    </section>
  )
}
