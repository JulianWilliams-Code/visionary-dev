import { notFound }       from 'next/navigation'
import { Inter, DM_Sans, Nunito } from 'next/font/google'
import { createClient }   from '@/lib/supabase/server'
import { SiteNav }        from '@/components/site/SiteNav'
import { SiteHero }       from '@/components/site/SiteHero'
import { SiteServices }   from '@/components/site/SiteServices'
import { SiteAbout }      from '@/components/site/SiteAbout'
import { SiteContact }    from '@/components/site/SiteContact'
import { SiteFooter }     from '@/components/site/SiteFooter'
import type { Site, ThemeConfig, ServiceRow } from '@/lib/supabase/types'

// ── Font definitions (must be module-level for next/font static analysis) ─────

const inter  = Inter({ subsets: ['latin'], display: 'swap' })
const dmSans = DM_Sans({ subsets: ['latin'], display: 'swap' })
const nunito = Nunito({ subsets: ['latin'], display: 'swap' })

const FONT_CLASS: Record<string, string> = {
  'Inter':    inter.className,
  'DM Sans':  dmSans.className,
  'Nunito':   nunito.className,
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function resolveTheme(raw: unknown): ThemeConfig {
  const t = raw as Partial<ThemeConfig> | null
  return {
    primary: t?.primary ?? '#2563eb',
    font:    t?.font    ?? 'Inter',
    radius:  t?.radius  ?? '0.5rem',
  }
}

// ── Metadata ──────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subdomain: string }>
}) {
  const { subdomain } = await params
  const supabase      = await createClient()

  const { data } = await supabase
    .from('sites')
    .select('meta_title, meta_description, business_name')
    .eq('subdomain', subdomain)
    .eq('is_live', true)
    .single()

  if (!data) return { title: 'Site not found' }

  return {
    title:       data.meta_title       ?? data.business_name ?? subdomain,
    description: data.meta_description ?? undefined,
  }
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function PublicSitePage({
  params,
}: {
  params: Promise<{ subdomain: string }>
}) {
  const { subdomain } = await params
  const supabase      = await createClient()

  const { data: raw } = await supabase
    .from('sites')
    .select('*')
    .eq('subdomain', subdomain)
    .eq('is_live', true)
    .single()

  if (!raw) notFound()

  const site  = raw as unknown as Site
  const theme = resolveTheme(site.theme_config)

  // Fetch subscription to decide whether to show branding
  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('plan')
    .eq('user_id', site.user_id)
    .maybeSingle()

  const plan       = subscription?.plan ?? 'free'
  const fontClass  = FONT_CLASS[theme.font] ?? inter.className
  const services   = (site.services ?? []) as ServiceRow[]
  const methods    = (site.contact_methods ?? []) as string[]

  return (
    <div
      className={fontClass}
      style={{
        '--brand':  theme.primary,
        '--radius': theme.radius,
      } as React.CSSProperties}
    >
      <SiteNav
        businessName={site.business_name ?? site.owner_name ?? subdomain}
        contactMethods={methods}
      />

      <main>
        <SiteHero
          businessName={site.business_name ?? site.owner_name ?? ''}
          tagline={site.tagline}
          modality={site.modality}
          locationCity={site.location_city}
          locationState={site.location_state}
          contactMethods={methods}
          avatarUrl={site.avatar_url}
        />

        {services.length > 0 && (
          <SiteServices services={services} />
        )}

        <SiteAbout
          ownerName={site.owner_name}
          businessName={site.business_name}
          tagline={site.tagline}
          avatarUrl={site.avatar_url}
        />

        <SiteContact
          siteId={site.id}
          contactMethods={methods}
          phoneNumber={site.phone_number}
          bookingLink={site.booking_link}
        />
      </main>

      <SiteFooter
        businessName={site.business_name ?? site.owner_name}
        locationCity={site.location_city}
        locationState={site.location_state}
        showBranding={plan === 'free'}
      />
    </div>
  )
}
