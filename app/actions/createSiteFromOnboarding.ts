'use server'

import { createClient }                         from '@/lib/supabase/server'
import { generateSiteContent, toSubdomain }     from '@/services/generate.service'
import { PLANS }                                from '@/config'
import { BusinessType }                         from '@/lib/onboarding/types'
import type { OnboardingData }                  from '@/lib/onboarding/types'
import type { ActionResponse }                  from '@/types'

// ─────────────────────────────────────────────────────────────────────────────

export interface CreateSiteResult {
  siteId:    string
  subdomain: string
}

// Map enum values → lowercase strings the content generator expects
const BUSINESS_TYPE_LABEL: Record<BusinessType, string> = {
  [BusinessType.PERSONAL_TRAINER]: 'personal trainer',
  [BusinessType.LIFE_COACH]:       'life coach',
  [BusinessType.NUTRITIONIST]:     'nutritionist',
  [BusinessType.YOGA_INSTRUCTOR]:  'yoga instructor',
  [BusinessType.THERAPIST]:        'therapist / counselor',
  [BusinessType.OTHER_SERVICE]:    'other',
}

// ─────────────────────────────────────────────────────────────────────────────

export async function createSiteFromOnboarding(
  onboarding: OnboardingData,
): Promise<ActionResponse<CreateSiteResult>> {
  try {
    const supabase = await createClient()

    // Auth guard
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return { ok: false, error: 'Not authenticated. Please sign in.' }
    }

    // Plan limit check — run in parallel with profile fetch
    const [
      { data: subscription },
      { count: siteCount },
      { data: profile },
    ] = await Promise.all([
      supabase.from('subscriptions').select('plan').eq('user_id', user.id).maybeSingle(),
      supabase.from('sites').select('id', { count: 'exact', head: true }).eq('user_id', user.id),
      supabase.from('profiles').select('email').eq('id', user.id).maybeSingle(),
    ])

    const plan      = (subscription?.plan ?? 'free') as keyof typeof PLANS
    const siteLimit = PLANS[plan]?.sites ?? 1

    if (siteLimit !== -1 && (siteCount ?? 0) >= siteLimit) {
      return {
        ok: false,
        error: plan === 'free'
          ? `Free plan is limited to ${siteLimit} site. Upgrade to Pro to add more.`
          : `Your ${PLANS[plan].name} plan allows up to ${siteLimit} sites. Upgrade to Agency for unlimited.`,
      }
    }

    // Build unique subdomain — try base, then base-2 … base-10
    const base = toSubdomain(
      onboarding.businessName ?? onboarding.ownerName ?? 'my-site'
    )
    let subdomain = base
    for (let i = 1; i <= 10; i++) {
      const { data: taken } = await supabase
        .from('sites').select('id').eq('subdomain', subdomain).maybeSingle()
      if (!taken) break
      subdomain = `${base}-${i}`
    }

    // Derive location string
    const location =
      onboarding.modality === 'online'
        ? 'Online'
        : [onboarding.locationCity, onboarding.locationState]
            .filter(Boolean)
            .join(', ')

    // Shape the intake object the content generator expects
    const intake = {
      businessName: onboarding.businessName ?? onboarding.ownerName ?? '',
      businessType: onboarding.businessType
        ? BUSINESS_TYPE_LABEL[onboarding.businessType]
        : 'other',
      location,
      tagline:     onboarding.tagline     ?? '',
      description: '',   // new flow has no long bio
      services:    onboarding.services.filter((s) => s.name.trim()),
      contact: {
        email: profile?.email ?? user.email ?? '',
        phone: onboarding.phoneNumber ?? '',
      },
    }

    const content = generateSiteContent(intake)

    const { data: site, error } = await supabase
      .from('sites')
      .insert({
        user_id:       user.id,
        subdomain,
        business_name: intake.businessName || 'My Business',
        intake,
        content,
        published:     true,
      })
      .select('id, subdomain')
      .single()

    if (error) {
      console.error('[createSiteFromOnboarding]', error.message)
      return { ok: false, error: 'Failed to create site. Please try again.' }
    }

    return { ok: true, data: { siteId: site.id, subdomain: site.subdomain } }

  } catch (err) {
    console.error('[createSiteFromOnboarding] unexpected error:', err)
    return { ok: false, error: 'An unexpected error occurred. Please try again.' }
  }
}
