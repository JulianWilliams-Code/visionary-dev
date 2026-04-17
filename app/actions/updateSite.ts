'use server'

import { createClient } from '@/lib/supabase/server'
import type { Site }    from '@/lib/supabase/types'

// ── Allowlist ─────────────────────────────────────────────────────────────────
// Only these columns may be updated via this action.
// System columns (user_id, subdomain, id, created_at, is_live) are excluded.

const UPDATABLE = new Set<keyof Site>([
  'business_name',
  'owner_name',
  'tagline',
  'services',
  'contact_methods',
  'phone_number',
  'booking_link',
  'style_preference',
  'theme_config',
  'avatar_url',
  'custom_domain',
  'meta_title',
  'meta_description',
])

// ── Response type ─────────────────────────────────────────────────────────────

export type UpdateSiteResponse =
  | { success: true }
  | { success: false; error: string }

// ── Action ────────────────────────────────────────────────────────────────────

export async function updateSite(
  siteId: string,
  patch:  Partial<Site>,
): Promise<UpdateSiteResponse> {
  try {
    const supabase = await createClient()

    // Auth guard
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return { success: false, error: 'Not authenticated. Please sign in.' }
    }

    // Ownership check — prevents updating another user's site
    const { data: existing } = await supabase
      .from('sites')
      .select('id')
      .eq('id', siteId)
      .eq('user_id', user.id)
      .single()

    if (!existing) {
      return { success: false, error: 'Site not found.' }
    }

    // Build safe payload — only allowlisted fields, skip undefined values
    const payload: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(patch) as [keyof Site, unknown][]) {
      if (UPDATABLE.has(key) && value !== undefined) {
        payload[key] = value
      }
    }

    if (Object.keys(payload).length === 0) {
      // Nothing to update — not an error
      return { success: true }
    }

    const { error: updateError } = await supabase
      .from('sites')
      .update(payload)
      .eq('id', siteId)

    if (updateError) {
      console.error('[updateSite]', updateError.message)
      return { success: false, error: 'Failed to save changes. Please try again.' }
    }

    return { success: true }

  } catch (err) {
    console.error('[updateSite] unexpected:', err)
    return { success: false, error: 'An unexpected error occurred.' }
  }
}
