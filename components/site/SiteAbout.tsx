// Server Component.
import Image from 'next/image'

interface Props {
  ownerName:    string | null
  businessName: string | null
  tagline:      string | null
  avatarUrl:    string | null
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('')
}

export function SiteAbout({ ownerName, businessName, tagline, avatarUrl }: Props) {
  const displayName = ownerName ?? businessName ?? ''
  const abbr        = initials(displayName)

  return (
    <section
      id="about"
      className="px-6 py-20"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-12 md:flex-row">

        {/* ── Avatar or initials circle ── */}
        <div className="shrink-0">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt={displayName}
              width={200}
              height={200}
              className="h-48 w-48 rounded-full object-cover shadow-md"
            />
          ) : (
            <div
              className="flex h-48 w-48 items-center justify-center rounded-full text-3xl font-bold text-white shadow-md"
              style={{ backgroundColor: 'var(--brand, #2563eb)' }}
              aria-hidden="true"
            >
              {abbr}
            </div>
          )}
        </div>

        {/* ── Text ── */}
        <div className="text-center md:text-left">
          <h2
            id="about-heading"
            className="mb-4 font-bold text-[--color-text-primary]"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)' }}
          >
            {displayName ? `Hi, I'm ${displayName}` : 'About me'}
          </h2>

          {tagline && (
            <p className="max-w-prose text-base leading-relaxed text-[--color-text-secondary]">
              {tagline}
            </p>
          )}
        </div>

      </div>
    </section>
  )
}
