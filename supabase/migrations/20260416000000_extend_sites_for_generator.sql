-- =============================================================
-- Visionary Dev — Extend sites table for the onboarding generator
-- =============================================================
-- The initial migration created sites with:
--   id, user_id, subdomain, custom_domain, business_name,
--   published, intake, content, created_at, updated_at
--
-- This migration promotes intake JSONB fields to first-class
-- columns so they can be indexed / filtered cheaply, and adds
-- theme / SEO / live-status columns required by the generator.
-- =============================================================


-- ── New flat columns ──────────────────────────────────────────

ALTER TABLE public.sites
  ADD COLUMN IF NOT EXISTS business_type    TEXT,
  ADD COLUMN IF NOT EXISTS owner_name       TEXT,
  ADD COLUMN IF NOT EXISTS tagline          TEXT,
  ADD COLUMN IF NOT EXISTS services         JSONB        DEFAULT '[]',
  ADD COLUMN IF NOT EXISTS location_city    TEXT,
  ADD COLUMN IF NOT EXISTS location_state   TEXT,
  ADD COLUMN IF NOT EXISTS modality         TEXT,
  ADD COLUMN IF NOT EXISTS contact_methods  JSONB        DEFAULT '[]',
  ADD COLUMN IF NOT EXISTS phone_number     TEXT,
  ADD COLUMN IF NOT EXISTS booking_link     TEXT,
  ADD COLUMN IF NOT EXISTS style_preference TEXT,
  ADD COLUMN IF NOT EXISTS is_live          BOOLEAN      DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS published_at     TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS avatar_url       TEXT,
  ADD COLUMN IF NOT EXISTS theme_config     JSONB        DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS meta_title       TEXT,
  ADD COLUMN IF NOT EXISTS meta_description TEXT;


-- ── Indexes ───────────────────────────────────────────────────
-- idx_sites_user_id and idx_sites_subdomain already exist from
-- the initial migration — no need to recreate them.

-- Filter live sites without a full-table scan (public renderer,
-- admin dashboards).
CREATE INDEX IF NOT EXISTS idx_sites_is_live
  ON public.sites(is_live) WHERE is_live = TRUE;

-- Lookup by business type for analytics / filtering.
CREATE INDEX IF NOT EXISTS idx_sites_business_type
  ON public.sites(business_type) WHERE business_type IS NOT NULL;


-- ── Public read policy for live sites ────────────────────────
-- The initial migration has "sites: published are publicly readable"
-- using the legacy `published` flag. Add an equivalent policy for
-- the new `is_live` column so the public renderer works with either.
CREATE POLICY "Public can view live sites"
  ON public.sites
  FOR SELECT
  USING (is_live = TRUE);
