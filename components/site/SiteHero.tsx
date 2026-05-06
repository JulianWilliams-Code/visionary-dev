// Server Component — no JS required, all interactivity is plain anchors.
import Image from 'next/image'

// ── CTA label ─────────────────────────────────────────────────────────────────

function primaryCtaLabel(methods: string[]): string {
  const first = methods[0]
  if (first === 'FREE_CALL')    return 'Book a free call'
  if (first === 'PAID_SESSION') return 'Book a session'
  if (first === 'PHONE')        return 'Call me'
  return 'Get in touch'
}

// ── Location / modality badges ────────────────────────────────────────────────

const MODALITY_LABEL: Record<string, string> = {
  in_person: 'In Person',
  online:    'Online',
  both:      'In Person & Online',
}

function LocationBadges({
  modality, city, state,
}: { modality: string | null; city: string | null; state: string | null }) {
  const parts: string[] = []
  if (modality) parts.push(MODALITY_LABEL[modality] ?? modality)
  const loc = [city, state].filter(Boolean).join(', ')
  if (loc) parts.push(loc)
  if (parts.length === 0) return null

  return (
    <div className="flex flex-wrap justify-center gap-2 md:justify-start" aria-label="Service area">
      {parts.map((p) => (
        <span
          key={p}
          className="rounded-full border border-[--color-border] bg-[--color-surface-2] px-3 py-1 text-xs font-medium text-[--color-text-muted]"
        >
          {p}
        </span>
      ))}
    </div>
  )
}

// ── Props ─────────────────────────────────────────────────────────────────────

interface Props {
  businessName:   string
  tagline:        string | null
  modality:       string | null
  locationCity:   string | null
  locationState:  string | null
  contactMethods: string[]
  avatarUrl:      string | null
}

// ── Component ─────────────────────────────────────────────────────────────────

export function SiteHero({
  businessName, tagline, modality, locationCity, locationState,
  contactMethods, avatarUrl,
}: Props) {
  const ctaLabel = primaryCtaLabel(contactMethods)

  // The value proposition is the headline — not the brand name.
  // A visitor cares about "I help busy professionals lose weight"
  // before they care about "Sarah's Training Studio."
  // If there's no tagline, fall back to businessName as the H1.
  const headline      = tagline ? `I help ${tagline}.` : businessName
  const showNameLabel = Boolean(tagline)

  return (
    <section
      id="hero"
      className="flex min-h-[80vh] items-center bg-[--color-surface] px-6 py-20"
    >
      <div className="mx-auto w-full max-w-5xl">
        <div className="flex flex-col-reverse items-center gap-12 md:flex-row">

          {/* ── Text ── */}
          <div className="flex flex-1 flex-col items-center gap-4 text-center md:items-start md:text-left">

            {/* Business name — small label, not the headline */}
            {showNameLabel && (
              <p
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: 'var(--brand, #1E3A8A)' }}
              >
                {businessName}
              </p>
            )}

            {/* H1 — the value proposition */}
            <h1
              className="font-bold leading-tight tracking-tight text-[--color-text-primary]"
              style={{ fontSize: 'clamp(2rem, 5.5vw, 3.5rem)' }}
            >
              {headline}
            </h1>

            {/* Location/modality context — below the headline, not above */}
            <LocationBadges
              modality={modality}
              city={locationCity}
              state={locationState}
            />

            {/* CTAs */}
            <div className="mt-3 flex flex-wrap justify-center gap-3 md:justify-start">
              <a
                href="#contact"
                className="
                  inline-flex min-h-[48px] items-center justify-center
                  rounded-[var(--radius,0.5rem)] px-7 text-sm font-semibold text-white
                  transition-opacity duration-150 hover:opacity-90
                "
                style={{ backgroundColor: 'var(--brand, #1E3A8A)' }}
              >
                {ctaLabel}
              </a>
              <a
                href="#services"
                className="
                  inline-flex min-h-[48px] items-center justify-center
                  rounded-[var(--radius,0.5rem)]
                  border border-[--color-border] bg-[--color-surface]
                  px-7 text-sm font-semibold text-[--color-text-primary]
                  transition-colors duration-150 hover:bg-[--color-surface-2]
                "
              >
                See my services
              </a>
            </div>

          </div>

          {/* ── Avatar ── */}
          {avatarUrl && (
            <div className="shrink-0">
              <div
                className="rounded-full p-1"
                style={{ backgroundColor: 'var(--brand, #1E3A8A)' }}
              >
                <Image
                  src={avatarUrl}
                  alt={businessName}
                  width={224}
                  height={224}
                  priority
                  className="h-44 w-44 rounded-full object-cover shadow-md md:h-52 md:w-52"
                />
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  )
}
