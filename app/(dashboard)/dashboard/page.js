import Link            from 'next/link'
import { redirect }    from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { SiteCard }    from '@/components/dashboard/SiteCard'
import { PLANS }       from '@/config'

// ── Strings ───────────────────────────────────────────────────────────────────

const STRINGS = {
  heading:        'My Sites',
  subheading:     'Manage and preview your generated sites.',
  newSite:        '+ New site',
  upgradeBtn:     'Upgrade to add more',
  emptyHeading:   'No sites yet',
  emptyBody:      'Answer 7 questions and your first site will be live in under 2 minutes.',
  emptyCta:       'Build your first site →',
  atLimitHeading: (plan, limit) => `You've reached the ${limit}-site limit on the ${PLANS[plan]?.name} plan.`,
  atLimitCta:     'Upgrade →',
}

// ── Plan limit bar ────────────────────────────────────────────────────────────

function PlanLimitBar({ siteCount, plan }) {
  const limit       = PLANS[plan]?.sites ?? 1
  const isUnlimited = limit === -1
  const pct         = isUnlimited ? 0 : Math.min((siteCount / limit) * 100, 100)
  const atLimit     = !isUnlimited && siteCount >= limit

  const label = isUnlimited
    ? `${siteCount} site${siteCount !== 1 ? 's' : ''}`
    : `${siteCount} of ${limit} site${limit !== 1 ? 's' : ''} used`

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs text-[--color-text-muted]">
        <span>{label}</span>
        {atLimit && (
          <Link href="/billing" className="font-semibold text-[--color-brand] hover:underline">
            {STRINGS.atLimitCta}
          </Link>
        )}
      </div>
      {!isUnlimited && (
        <div className="h-1.5 overflow-hidden rounded-full bg-[--color-surface-2]">
          <div
            className={`h-full rounded-full transition-all duration-300 ${atLimit ? 'bg-red-500' : 'bg-[--color-brand]'}`}
            style={{ width: `${pct}%` }}
            role="progressbar"
            aria-valuenow={siteCount}
            aria-valuemin={0}
            aria-valuemax={limit}
            aria-label={label}
          />
        </div>
      )}
    </div>
  )
}

// ── Empty state ───────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-[--radius-xl] border-2 border-dashed border-[--color-border] px-6 py-20 text-center">
      {/* Illustration */}
      <svg
        viewBox="0 0 80 80"
        className="mb-5 h-20 w-20 text-[--color-text-muted]"
        fill="none"
        aria-hidden="true"
      >
        <rect x="8"  y="14" width="64" height="52" rx="6" stroke="currentColor" strokeWidth="2.5" />
        <rect x="8"  y="14" width="64" height="14" rx="6" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="18" cy="21" r="2.5" fill="currentColor" />
        <circle cx="26" cy="21" r="2.5" fill="currentColor" />
        <circle cx="34" cy="21" r="2.5" fill="currentColor" />
        <rect x="18" y="38" width="30" height="4" rx="2" fill="currentColor" opacity=".4" />
        <rect x="18" y="48" width="20" height="3" rx="1.5" fill="currentColor" opacity=".25" />
      </svg>

      <h2 className="mb-2 text-lg font-semibold text-[--color-text-primary]">
        {STRINGS.emptyHeading}
      </h2>
      <p className="mb-6 max-w-xs text-sm text-[--color-text-muted]">
        {STRINGS.emptyBody}
      </p>
      <Link
        href="/onboarding"
        className="
          inline-flex min-h-[44px] items-center justify-center
          rounded-[--radius-lg] bg-[--color-brand] px-7
          text-sm font-semibold text-white
          hover:bg-[--color-brand-dark] transition-all duration-150
          focus-visible:ring-2 ring-[--color-brand] ring-offset-2
        "
      >
        {STRINGS.emptyCta}
      </Link>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export const metadata = { title: 'My Sites — Visionary Dev' }

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const [
    { data: sites },
    { data: subscription },
  ] = await Promise.all([
    supabase
      .from('sites')
      .select('id, subdomain, business_name, is_live, style_preference, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false }),
    supabase
      .from('subscriptions')
      .select('plan')
      .eq('user_id', user.id)
      .maybeSingle(),
  ])

  const plan      = subscription?.plan ?? 'free'
  const siteList  = sites ?? []
  const siteCount = siteList.length
  const siteLimit = PLANS[plan]?.sites ?? 1
  const atLimit   = siteLimit !== -1 && siteCount >= siteLimit

  // New users have no sites — send them straight into onboarding
  // instead of showing an empty dashboard.
  if (siteCount === 0) redirect('/onboarding')

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1
            className="font-bold text-[--color-text-primary]"
            style={{ fontSize: 'clamp(1.375rem, 3vw, 1.75rem)' }}
          >
            {STRINGS.heading}
          </h1>
          <p className="mt-1 text-sm text-[--color-text-muted]">
            {STRINGS.subheading}
          </p>
        </div>

        {atLimit ? (
          <Link
            href="/billing"
            className="
              inline-flex min-h-[44px] items-center justify-center
              rounded-[--radius-lg] border border-[--color-border]
              bg-[--color-surface] px-5
              text-sm font-medium text-[--color-text-primary]
              hover:bg-[--color-surface-2] transition-all duration-150
              focus-visible:ring-2 ring-[--color-brand] ring-offset-2
            "
          >
            {STRINGS.upgradeBtn}
          </Link>
        ) : (
          <Link
            href="/onboarding"
            className="
              inline-flex min-h-[44px] items-center justify-center
              rounded-[--radius-lg] bg-[--color-brand] px-5
              text-sm font-semibold text-white
              hover:bg-[--color-brand-dark] transition-all duration-150
              focus-visible:ring-2 ring-[--color-brand] ring-offset-2
            "
          >
            {STRINGS.newSite}
          </Link>
        )}
      </div>

      {/* At-limit upgrade nudge */}
      {atLimit && siteCount > 0 && (
        <div
          className="
            flex flex-wrap items-center justify-between gap-4
            rounded-[--radius-lg] border border-amber-200
            bg-amber-50 px-4 py-3
          "
          role="alert"
        >
          <p className="text-sm text-amber-800">
            {STRINGS.atLimitHeading(plan, siteLimit)}
          </p>
          <Link
            href="/billing"
            className="shrink-0 text-sm font-semibold text-amber-900 hover:underline"
          >
            {STRINGS.atLimitCta}
          </Link>
        </div>
      )}

      {/* Plan limit bar */}
      <PlanLimitBar siteCount={siteCount} plan={plan} />

      {/* Sites grid or empty state */}
      {siteCount === 0 ? (
        <EmptyState />
      ) : (
        <ul
          className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
          aria-label="Your sites"
        >
          {siteList.map((site) => (
            <li key={site.id}>
              <SiteCard site={site} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
