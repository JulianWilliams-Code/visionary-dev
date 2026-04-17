// Server Component — all interactivity is href anchors (no JS needed).
import Image from 'next/image'

// ── CTA helpers ───────────────────────────────────────────────────────────────

function primaryCtaLabel(methods: string[]): string {
  const first = methods[0]
  if (first === 'FREE_CALL')    return 'Book a free call'
  if (first === 'PAID_SESSION') return 'Book a session'
  if (first === 'PHONE')        return 'Call me'
  return 'Get in touch'
}

// ── Modality / location badges ────────────────────────────────────────────────

const MODALITY_LABEL: Record<string, string> = {
  in_person: 'In Person',
  online:    'Online',
  both:      'In Person & Online',
}

function Badges({
  modality,
  city,
  state,
}: {
  modality: string | null
  city:     string | null
  state:    string | null
}) {
  const pills: string[] = []
  if (modality) pills.push(MODALITY_LABEL[modality] ?? modality)
  const location = [city, state].filter(Boolean).join(', ')
  if (location)  pills.push(location)
  if (pills.length === 0) return null

  return (
    <div className="flex flex-wrap justify-center gap-2 md:justify-start" aria-label="Location and modality">
      {pills.map((pill) => (
        <span
          key={pill}
          className="
            rounded-full border border-black/10 bg-white/60
            px-3 py-1 text-xs font-medium
            text-[--color-text-secondary] backdrop-blur-sm
          "
        >
          {pill}
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
  businessName,
  tagline,
  modality,
  locationCity,
  locationState,
  contactMethods,
  avatarUrl,
}: Props) {
  const ctaLabel = primaryCtaLabel(contactMethods)

  return (
    <section
      id="hero"
      className="
        flex min-h-[85vh] items-center
        bg-[--color-surface] px-6 py-20
      "
    >
      <div className="mx-auto w-full max-w-5xl">
        <div className="flex flex-col-reverse items-center gap-10 md:flex-row">

          {/* ── Text column ── */}
          <div className="flex flex-1 flex-col items-center gap-5 text-center md:items-start md:text-left">

            <Badges
              modality={modality}
              city={locationCity}
              state={locationState}
            />

            <h1
              className="font-bold leading-tight tracking-tight"
              style={{
                fontSize: 'clamp(2rem, 6vw, 4rem)',
                color: 'var(--brand, #2563eb)',
              }}
            >
              {businessName}
            </h1>

            {tagline && (
              <p className="max-w-lg text-lg leading-relaxed text-[--color-text-secondary]">
                I help {tagline}
              </p>
            )}

            {/* CTAs */}
            <div className="mt-2 flex flex-wrap justify-center gap-3 md:justify-start">
              <a
                href="#contact"
                className="
                  inline-flex min-h-[48px] items-center justify-center
                  rounded-[var(--radius,0.5rem)] px-7 text-sm font-semibold text-white
                  transition-opacity duration-150 hover:opacity-90
                "
                style={{ backgroundColor: 'var(--brand, #2563eb)' }}
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
                See my services ↓
              </a>
            </div>
          </div>

          {/* ── Avatar column ── */}
          {avatarUrl && (
            <div className="shrink-0">
              <Image
                src={avatarUrl}
                alt={businessName}
                width={224}
                height={224}
                priority
                className="h-44 w-44 rounded-full object-cover shadow-lg md:h-56 md:w-56"
              />
            </div>
          )}

        </div>
      </div>
    </section>
  )
}
