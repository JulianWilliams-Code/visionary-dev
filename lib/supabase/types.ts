// ─────────────────────────────────────────────────────────────────────────────
// Supabase row types
// These mirror the database schema exactly so server code stays type-safe
// without needing the generated Supabase CLI types.
// ─────────────────────────────────────────────────────────────────────────────

// ── Shared primitives ─────────────────────────────────────────────────────────

export type SubscriptionPlan   = 'free' | 'pro' | 'agency'
export type SubscriptionStatus = 'active' | 'canceled' | 'past_due' | 'trialing' | 'incomplete'
export type LeadStatus         = 'new' | 'contacted' | 'converted' | 'archived'

// ── profiles ──────────────────────────────────────────────────────────────────

export interface Profile {
  id:          string
  email:       string
  full_name:   string | null
  avatar_url:  string | null
  created_at:  string
  updated_at:  string
}

// ── subscriptions ─────────────────────────────────────────────────────────────

export interface Subscription {
  id:                     string
  user_id:                string
  plan:                   SubscriptionPlan
  status:                 SubscriptionStatus
  stripe_customer_id:     string | null
  stripe_subscription_id: string | null
  current_period_start:   string | null
  current_period_end:     string | null
  created_at:             string
  updated_at:             string
}

// ── sites ─────────────────────────────────────────────────────────────────────

export interface ServiceRow {
  name:         string
  price?:       string
  description?: string
}

export interface ThemeConfig {
  primary: string
  font:    string
  radius:  string
}

export interface Site {
  // Core identity
  id:           string
  user_id:      string
  subdomain:    string
  custom_domain: string | null

  // Business details (flat columns from onboarding)
  business_type:    string | null
  owner_name:       string | null
  business_name:    string | null
  tagline:          string | null
  services:         ServiceRow[]
  location_city:    string | null
  location_state:   string | null
  modality:         'in_person' | 'online' | 'both' | null
  contact_methods:  string[]
  phone_number:     string | null
  booking_link:     string | null
  style_preference: string | null

  // Live / publishing
  is_live:      boolean
  published_at: string | null
  published:    boolean          // legacy column kept for compatibility

  // Branding
  avatar_url: string | null
  theme_config: ThemeConfig | Record<string, never>

  // SEO
  meta_title:       string | null
  meta_description: string | null

  // Legacy intake/content JSONB (preserved for existing sites)
  intake:   Record<string, unknown>
  content:  Record<string, unknown>

  // Timestamps
  created_at: string
  updated_at: string
}

// ── leads ─────────────────────────────────────────────────────────────────────

export interface Lead {
  id:         string
  site_id:    string
  name:       string
  email:      string
  phone:      string | null
  message:    string | null
  status:     LeadStatus
  metadata:   Record<string, unknown>
  created_at: string
}
