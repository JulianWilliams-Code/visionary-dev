'use server'

import { createClient }          from '@/lib/supabase/server'
import { PLANS }                 from '@/config'
import { BusinessType, StylePreference } from '@/lib/onboarding/types'
import type { OnboardingData }   from '@/lib/onboarding/types'

// ── Types ─────────────────────────────────────────────────────────────────────

export interface CreateSiteResult {
  success:   true
  siteId:    string
  subdomain: string
}

export interface CreateSiteError {
  success: false
  error:   string
}

export type CreateSiteResponse = CreateSiteResult | CreateSiteError

// ── Constants ─────────────────────────────────────────────────────────────────

const BUSINESS_TYPE_LABEL: Record<BusinessType, string> = {
  [BusinessType.PERSONAL_TRAINER]: 'Personal Trainer',
  [BusinessType.LIFE_COACH]:       'Life Coach',
  [BusinessType.NUTRITIONIST]:     'Nutritionist',
  [BusinessType.YOGA_INSTRUCTOR]:  'Yoga Instructor',
  [BusinessType.THERAPIST]:        'Therapist / Counselor',
  [BusinessType.OTHER_SERVICE]:    'Service Provider',
}

const THEME_CONFIG: Record<StylePreference, { primary: string; font: string; radius: string }> = {
  [StylePreference.CLEAN_PROFESSIONAL]: { primary: '#1E3A8A', font: 'Inter',   radius: '4px'  },
  [StylePreference.BOLD_ENERGETIC]:     { primary: '#DC2626', font: 'DM Sans', radius: '0px'  },
  [StylePreference.WARM_APPROACHABLE]:  { primary: '#D97706', font: 'Nunito',  radius: '12px' },
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function toSubdomain(raw: string): string {
  return raw
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40)
}

function truncate(str: string, max: number): string {
  if (str.length <= max) return str
  return str.slice(0, max - 1).trimEnd() + '…'
}

function buildMetaTitle(
  businessName: string,
  businessType: BusinessType | undefined,
  city: string | undefined,
  state: string | undefined,
): string {
  const typeLabel = businessType ? BUSINESS_TYPE_LABEL[businessType] : 'Service Provider'
  const location  = [city, state].filter(Boolean).join(', ')
  const raw       = location
    ? `${businessName} — ${typeLabel} in ${location}`
    : `${businessName} — ${typeLabel}`
  return truncate(raw, 60)
}

function buildMetaDescription(
  tagline: string | undefined,
  city: string | undefined,
  state: string | undefined,
): string {
  const location = [city, state].filter(Boolean).join(', ')
  const parts    = [tagline, location ? `Based in ${location}.` : undefined].filter(Boolean)
  return truncate(parts.join(' '), 160)
}

// ── Server action ─────────────────────────────────────────────────────────────

export async function createSite(
  onboarding: OnboardingData,
): Promise<CreateSiteResponse> {
  try {
    const supabase = await createClient()

    // ── 1. Auth guard ──────────────────────────────────────────
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return { success: false, error: 'Not authenticated. Please sign in.' }
    }

    // ── 2. Server-side validation ──────────────────────────────
    if (!onboarding.businessType) {
      return { success: false, error: 'Business type is required.' }
    }
    if (!onboarding.ownerName?.trim() && !onboarding.businessName?.trim()) {
      return { success: false, error: 'A name or business name is required.' }
    }
    if (onboarding.contactMethods.length === 0) {
      return { success: false, error: 'At least one contact method is required.' }
    }

    // ── 3. Plan limit check ────────────────────────────────────
    const [{ data: subscription }, { count: siteCount }] = await Promise.all([
      supabase.from('subscriptions').select('plan').eq('user_id', user.id).maybeSingle(),
      supabase.from('sites').select('id', { count: 'exact', head: true }).eq('user_id', user.id),
    ])

    const plan      = (subscription?.plan ?? 'free') as keyof typeof PLANS
    const siteLimit = PLANS[plan]?.sites ?? 1

    if (siteLimit !== -1 && (siteCount ?? 0) >= siteLimit) {
      return {
        success: false,
        error: plan === 'free'
          ? `Free plan is limited to ${siteLimit} site. Upgrade to Pro to add more.`
          : `Your ${PLANS[plan].name} plan allows up to ${siteLimit} sites. Upgrade to Agency for unlimited.`,
      }
    }

    // ── 4. Collision-safe subdomain ────────────────────────────
    const displayName = (onboarding.businessName ?? onboarding.ownerName ?? 'my-site').trim()
    const base        = toSubdomain(displayName) || 'my-site'
    let   subdomain   = base

    for (let i = 2; i <= 10; i++) {
      const { data: taken } = await supabase
        .from('sites')
        .select('id')
        .eq('subdomain', subdomain)
        .maybeSingle()
      if (!taken) break
      subdomain = `${base}-${i}`
    }

    // ── 5. Theme config ────────────────────────────────────────
    const themeConfig = onboarding.stylePreference
      ? THEME_CONFIG[onboarding.stylePreference]
      : THEME_CONFIG[StylePreference.CLEAN_PROFESSIONAL]

    // ── 6. SEO fields ──────────────────────────────────────────
    const metaTitle = buildMetaTitle(
      displayName,
      onboarding.businessType,
      onboarding.locationCity,
      onboarding.locationState,
    )

    const metaDescription = buildMetaDescription(
      onboarding.tagline,
      onboarding.locationCity,
      onboarding.locationState,
    )

    // ── 7. Insert ──────────────────────────────────────────────
    const { data: site, error: insertError } = await supabase
      .from('sites')
      .insert({
        user_id:          user.id,
        subdomain,
        business_type:    onboarding.businessType,
        owner_name:       onboarding.ownerName    ?? null,
        business_name:    onboarding.businessName ?? onboarding.ownerName ?? displayName,
        tagline:          onboarding.tagline      ?? null,
        services:         onboarding.services.filter((s) => s.name.trim()),
        location_city:    onboarding.locationCity  ?? null,
        location_state:   onboarding.locationState ?? null,
        modality:         onboarding.modality      ?? null,
        contact_methods:  onboarding.contactMethods,
        phone_number:     onboarding.phoneNumber  ?? null,
        booking_link:     onboarding.bookingLink  ?? null,
        style_preference: onboarding.stylePreference ?? null,
        theme_config:     themeConfig,
        meta_title:       metaTitle       || null,
        meta_description: metaDescription || null,
        is_live:          true,
        published_at:     new Date().toISOString(),
        // Keep legacy published flag in sync
        published:        true,
      })
      .select('id, subdomain')
      .single()

    if (insertError) {
      console.error('[createSite] insert error:', insertError.message)
      return { success: false, error: 'Failed to create site. Please try again.' }
    }

    // ── 8. Return ──────────────────────────────────────────────
    return { success: true, siteId: site.id, subdomain: site.subdomain }

  } catch (err) {
    console.error('[createSite] unexpected error:', err)
    return { success: false, error: 'An unexpected error occurred. Please try again.' }
  }
}
