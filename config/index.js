export const APP_NAME    = "Visionary Dev"
export const APP_DESCRIPTION = "Your website, live in 2 minutes."
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"

export const PLANS = {
  free: {
    name: "Free",
    price: 0,
    sites: 1,
    formSubmissions: 10,
    customDomain: false,
    removeBranding: false,
  },
  pro: {
    name: "Pro",
    price: 19,
    sites: 10,
    formSubmissions: -1,
    customDomain: true,
    removeBranding: true,
  },
  agency: {
    name: "Agency",
    price: 39,
    sites: -1,
    formSubmissions: -1,
    customDomain: true,
    removeBranding: true,
  },
}

// Stripe price IDs — set in .env.local (test) and production env vars.
// -1 as a sentinel means "unlimited".
export const STRIPE_PRICE_IDS = {
  pro:    process.env.STRIPE_PRICE_PRO_MONTHLY,
  agency: process.env.STRIPE_PRICE_AGENCY_MONTHLY,
}

export const NAV_LINKS = [
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/pricing" },
]

export const DASHBOARD_NAV = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Settings", href: "/settings" },
  { label: "Billing", href: "/billing" },
]
