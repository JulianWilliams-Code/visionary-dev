-- =============================================================
-- Visionary Dev — Initial Schema
-- =============================================================
-- Run this in Supabase SQL Editor or via: supabase db push
-- =============================================================


-- =============================================================
-- EXTENSIONS
-- =============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- =============================================================
-- ENUM TYPES
-- =============================================================

CREATE TYPE subscription_plan   AS ENUM ('free', 'pro', 'agency');
CREATE TYPE subscription_status AS ENUM ('active', 'canceled', 'past_due', 'trialing', 'incomplete');
CREATE TYPE lead_status         AS ENUM ('new', 'contacted', 'converted', 'archived');


-- =============================================================
-- TABLES
-- =============================================================

-- profiles
-- Extends auth.users. Supabase owns auth.users — we never add
-- columns to it. This table is 1:1 with auth.users and is the
-- identity record the rest of the schema references.
-- -----------------------------------------------------------
CREATE TABLE public.profiles (
  id           UUID        REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email        TEXT        NOT NULL,
  full_name    TEXT,
  avatar_url   TEXT,
  created_at   TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at   TIMESTAMPTZ DEFAULT NOW() NOT NULL
);


-- subscriptions
-- One subscription per user, always. Even free-tier users get
-- a row so the rest of the app can query plan status without
-- null checks. Stripe IDs stored here for webhook reconciliation.
-- -----------------------------------------------------------
CREATE TABLE public.subscriptions (
  id                     UUID              DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id                UUID              REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL UNIQUE,
  plan                   subscription_plan DEFAULT 'free'   NOT NULL,
  status                 subscription_status DEFAULT 'active' NOT NULL,
  stripe_customer_id     TEXT              UNIQUE,
  stripe_subscription_id TEXT              UNIQUE,
  current_period_start   TIMESTAMPTZ,
  current_period_end     TIMESTAMPTZ,
  created_at             TIMESTAMPTZ       DEFAULT NOW() NOT NULL,
  updated_at             TIMESTAMPTZ       DEFAULT NOW() NOT NULL
);


-- sites
-- The generated website. Schema-on-write via two JSONB columns:
--   intake  — the user's raw answers to the 7 intake questions
--   content — the AI-generated website content derived from intake
-- Separating them lets us regenerate content without losing source data.
-- subdomain and custom_domain are unique for routing.
-- -----------------------------------------------------------
CREATE TABLE public.sites (
  id              UUID    DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id         UUID    REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  subdomain       TEXT    UNIQUE NOT NULL,
  custom_domain   TEXT    UNIQUE,
  business_name   TEXT    NOT NULL,
  published       BOOLEAN DEFAULT FALSE NOT NULL,
  intake          JSONB   DEFAULT '{}' NOT NULL,
  content         JSONB   DEFAULT '{}' NOT NULL,
  created_at      TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at      TIMESTAMPTZ DEFAULT NOW() NOT NULL
);


-- leads
-- A lead is a form submission from a published site.
-- site_id links every lead back to the site it came from.
-- metadata stores UTM params, referrer, and any extra fields
-- without requiring schema changes as intake forms evolve.
-- -----------------------------------------------------------
CREATE TABLE public.leads (
  id         UUID        DEFAULT uuid_generate_v4() PRIMARY KEY,
  site_id    UUID        REFERENCES public.sites(id) ON DELETE CASCADE NOT NULL,
  name       TEXT        NOT NULL,
  email      TEXT        NOT NULL,
  phone      TEXT,
  message    TEXT,
  status     lead_status DEFAULT 'new' NOT NULL,
  metadata   JSONB       DEFAULT '{}' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);


-- =============================================================
-- INDEXES
-- =============================================================

-- sites: user_id is the primary lookup (dashboard fetches "my sites")
CREATE INDEX idx_sites_user_id         ON public.sites(user_id);

-- sites: subdomain + custom_domain are hit on every page request
-- (routing layer resolves which site to render)
CREATE INDEX idx_sites_subdomain       ON public.sites(subdomain);
CREATE INDEX idx_sites_custom_domain   ON public.sites(custom_domain) WHERE custom_domain IS NOT NULL;

-- leads: site_id is the primary lookup (dashboard fetches "my leads")
CREATE INDEX idx_leads_site_id         ON public.leads(site_id);

-- leads: sorted newest-first in the dashboard; DESC index avoids sort
CREATE INDEX idx_leads_created_at      ON public.leads(created_at DESC);

-- leads: status filter for pipeline views (new, contacted, converted)
CREATE INDEX idx_leads_status          ON public.leads(status);

-- subscriptions: webhook handler looks up by stripe_customer_id
CREATE INDEX idx_subs_stripe_customer  ON public.subscriptions(stripe_customer_id) WHERE stripe_customer_id IS NOT NULL;


-- =============================================================
-- UPDATED_AT TRIGGER
-- =============================================================

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_subscriptions_updated_at
  BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_sites_updated_at
  BEFORE UPDATE ON public.sites
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


-- =============================================================
-- AUTO-PROVISION TRIGGER
-- Fires when a new row is inserted into auth.users (i.e. signup).
-- Creates a matching profile row and a free subscription row
-- so the app never has to handle a user with no subscription.
-- =============================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );

  INSERT INTO public.subscriptions (user_id, plan, status)
  VALUES (NEW.id, 'free', 'active');

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- =============================================================
-- ROW LEVEL SECURITY
-- Every table has RLS enabled. Default = deny.
-- Policies below grant minimum necessary access.
-- =============================================================

ALTER TABLE public.profiles      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sites         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads         ENABLE ROW LEVEL SECURITY;


-- profiles
-- -------
CREATE POLICY "profiles: owner can select"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "profiles: owner can update"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);


-- subscriptions
-- -------------
-- Read-only for the user. All writes go through the Stripe
-- webhook handler using the service role key (bypasses RLS).
CREATE POLICY "subscriptions: owner can select"
  ON public.subscriptions FOR SELECT
  USING (auth.uid() = user_id);


-- sites
-- -----
CREATE POLICY "sites: owner can select"
  ON public.sites FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "sites: owner can insert"
  ON public.sites FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "sites: owner can update"
  ON public.sites FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "sites: owner can delete"
  ON public.sites FOR DELETE
  USING (auth.uid() = user_id);

-- Published sites must be readable by the public (unauthenticated)
-- so the site renderer can fetch content for visitors.
CREATE POLICY "sites: published are publicly readable"
  ON public.sites FOR SELECT
  USING (published = TRUE);


-- leads
-- -----
-- Site owners read and update their own leads.
-- Unauthenticated visitors can insert a lead only on a published site.
-- No one can delete leads (audit trail).
CREATE POLICY "leads: owner can select"
  ON public.leads FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.sites
      WHERE sites.id  = leads.site_id
        AND sites.user_id = auth.uid()
    )
  );

CREATE POLICY "leads: owner can update status"
  ON public.leads FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.sites
      WHERE sites.id  = leads.site_id
        AND sites.user_id = auth.uid()
    )
  );

-- Public insert: only allowed when the target site is published.
-- This is what fires when a visitor fills out the contact/booking form.
CREATE POLICY "leads: public can insert on published sites"
  ON public.leads FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.sites
      WHERE sites.id      = leads.site_id
        AND sites.published = TRUE
    )
  );
