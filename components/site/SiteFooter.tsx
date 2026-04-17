// Server Component.

interface Props {
  businessName:  string | null
  locationCity:  string | null
  locationState: string | null
  showBranding:  boolean
}

export function SiteFooter({
  businessName,
  locationCity,
  locationState,
  showBranding,
}: Props) {
  const year     = new Date().getFullYear()
  const location = [locationCity, locationState].filter(Boolean).join(', ')

  const parts = [
    businessName,
    location || null,
    `© ${year}`,
  ].filter(Boolean)

  return (
    <footer className="border-t border-[--color-border] bg-[--color-surface] px-6 py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 text-center">

        <p className="text-sm text-[--color-text-muted]">
          {parts.join(' · ')}
        </p>

        {showBranding && (
          <p className="text-xs text-[--color-text-muted]">
            Built with{' '}
            <a
              href="https://visionarydev.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-2 hover:underline"
              style={{ color: 'var(--brand, #2563eb)' }}
            >
              Visionary Dev
            </a>
          </p>
        )}

      </div>
    </footer>
  )
}
