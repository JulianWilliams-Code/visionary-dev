// ─────────────────────────────────────────────────────────────────────────────
// Domain types — mirrors the Supabase schema exactly.
// Import from here rather than re-declaring shapes in components.
// ─────────────────────────────────────────────────────────────────────────────

// ── Auth / User ───────────────────────────────────────────────────────────────

export interface UserProfile {
  id: string             // UUID — FK → auth.users
  email: string
  full_name: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}

// ── Subscriptions ─────────────────────────────────────────────────────────────

export type SubscriptionPlan =
  | 'free'
  | 'pro'
  | 'agency'

export type SubscriptionStatus =
  | 'active'
  | 'canceled'
  | 'past_due'
  | 'trialing'
  | 'incomplete'

export interface Subscription {
  id: string
  user_id: string
  plan: SubscriptionPlan
  status: SubscriptionStatus
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
  current_period_start: string | null
  current_period_end: string | null
  created_at: string
  updated_at: string
}

// ── Sites ─────────────────────────────────────────────────────────────────────

export interface ServiceItem {
  name: string
  price: string
  description?: string
}

export interface SiteIntake {
  businessName: string
  businessType: string    // e.g. "personal trainer"
  location: string
  tagline: string
  description: string
  services: ServiceItem[]
  contact: {
    email: string
    phone?: string
  }
}

export interface SiteContent {
  templateId: string
  hero: {
    headline: string
    subheadline: string
    ctaText: string
    ctaHref: string
  }
  services: {
    heading: string
    items: ServiceItem[]
  }
  about: {
    heading: string
    bio: string
    ctaText: string
    ctaHref: string
  }
  contact: {
    heading: string
    subheading: string
    email: string
    phone: string
    location: string
  }
  meta: {
    businessName: string
    businessType: string
  }
}

export interface Site {
  id: string
  user_id: string
  subdomain: string        // unique, e.g. "sarahs-training"
  custom_domain: string | null
  business_name: string
  published: boolean
  intake: SiteIntake
  content: SiteContent
  created_at: string
  updated_at: string
}

// ── Leads ─────────────────────────────────────────────────────────────────────

export type LeadStatus = 'new' | 'contacted' | 'converted' | 'archived'

export interface Lead {
  id: string
  site_id: string
  name: string
  email: string
  phone: string | null
  message: string | null
  status: LeadStatus
  metadata: Record<string, string | null>
  created_at: string
}

export interface LeadStats {
  total: number
  new: number
  contacted: number
  converted: number
  archived: number
}

// ── Server Action helpers ─────────────────────────────────────────────────────

/** Standard return shape for all Server Actions. */
export interface ActionResult<T = void> {
  data?: T
  error?: string
}

/** Discriminated union — use when success carries a payload. */
export type ActionResponse<T = void> =
  | { ok: true;  data: T }
  | { ok: false; error: string }
