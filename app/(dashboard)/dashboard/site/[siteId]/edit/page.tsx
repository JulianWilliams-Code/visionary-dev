import { notFound, redirect } from 'next/navigation'
import Link                    from 'next/link'
import { ChevronLeft }         from 'lucide-react'
import { createClient }        from '@/lib/supabase/server'
import { SiteEditor }          from '@/components/dashboard/SiteEditor'
import type { Site, SubscriptionPlan } from '@/lib/supabase/types'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ siteId: string }>
}) {
  const { siteId } = await params
  const supabase   = await createClient()
  const { data }   = await supabase
    .from('sites')
    .select('business_name')
    .eq('id', siteId)
    .maybeSingle()

  return {
    title: data?.business_name
      ? `Edit ${data.business_name} — Visionary Dev`
      : 'Edit site — Visionary Dev',
  }
}

export default async function SiteEditPage({
  params,
}: {
  params: Promise<{ siteId: string }>
}) {
  const { siteId } = await params
  const supabase   = await createClient()

  // Auth guard
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Fetch site and subscription in parallel
  const [{ data: raw }, { data: subscription }] = await Promise.all([
    supabase
      .from('sites')
      .select('*')
      .eq('id', siteId)
      .eq('user_id', user.id)  // ownership enforced at DB level
      .single(),
    supabase
      .from('subscriptions')
      .select('plan')
      .eq('user_id', user.id)
      .maybeSingle(),
  ])

  if (!raw) notFound()

  const site = raw as unknown as Site
  const plan = (subscription?.plan ?? 'free') as SubscriptionPlan

  return (
    <div className="space-y-6">
      {/* Back navigation */}
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard"
          className="
            inline-flex min-h-[40px] items-center gap-1.5
            text-sm font-medium text-[--color-text-muted]
            hover:text-[--color-text-primary] transition-colors
            focus-visible:ring-2 ring-[--color-brand] ring-offset-2 rounded-[--radius-sm]
          "
        >
          <ChevronLeft size={16} aria-hidden="true" />
          My Sites
        </Link>

        <span className="text-[--color-text-muted]" aria-hidden="true">/</span>

        <span className="text-sm font-medium text-[--color-text-primary] truncate">
          {site.business_name ?? site.subdomain}
        </span>

        {/* Live badge */}
        <span className={`
          shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium
          ${site.is_live
            ? 'bg-green-50 text-green-700'
            : 'bg-[--color-surface-2] text-[--color-text-muted]'
          }
        `}>
          {site.is_live ? 'Live' : 'Draft'}
        </span>

        {/* View live link */}
        <a
          href={`/sites/${site.subdomain}`}
          target="_blank"
          rel="noopener noreferrer"
          className="
            ml-auto shrink-0 text-xs font-medium text-[--color-brand]
            hover:underline underline-offset-2 transition-colors
            focus-visible:ring-2 ring-[--color-brand] ring-offset-2 rounded-sm
          "
        >
          View live site ↗
        </a>
      </div>

      {/* Two-column layout on desktop: editor left, preview hint right */}
      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <SiteEditor site={site} plan={plan} />

        {/* Right panel — quick info */}
        <aside className="hidden lg:block space-y-4">
          <div className="rounded-[--radius-lg] border border-[--color-border] bg-[--color-surface] p-5 space-y-3">
            <h3 className="text-sm font-semibold text-[--color-text-primary]">Site info</h3>

            <dl className="space-y-2 text-xs">
              <div className="flex justify-between gap-2">
                <dt className="text-[--color-text-muted]">URL</dt>
                <dd className="truncate font-mono text-[--color-text-secondary]">
                  {site.subdomain}.visionarydev.com
                </dd>
              </div>
              {site.style_preference && (
                <div className="flex justify-between gap-2">
                  <dt className="text-[--color-text-muted]">Style</dt>
                  <dd className="text-[--color-text-secondary]">{site.style_preference.replace('_', ' ').toLowerCase()}</dd>
                </div>
              )}
              <div className="flex justify-between gap-2">
                <dt className="text-[--color-text-muted]">Plan</dt>
                <dd className="capitalize text-[--color-text-secondary]">{plan}</dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>
    </div>
  )
}
