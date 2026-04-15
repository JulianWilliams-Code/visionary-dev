"use server"

import { redirect }         from "next/navigation"
import { stripe }           from "@/lib/stripe"
import { createClient }     from "@/lib/supabase/server"
import { APP_URL, STRIPE_PRICE_IDS } from "@/config"

// ── Helpers ──────────────────────────────────────────────────────────────────

async function getOrCreateStripeCustomer(supabase, user) {
  const { data: sub } = await supabase
    .from("subscriptions")
    .select("stripe_customer_id")
    .eq("user_id", user.id)
    .maybeSingle()

  if (sub?.stripe_customer_id) return sub.stripe_customer_id

  // First-time customer — create in Stripe and save immediately
  const { data: profile } = await supabase
    .from("profiles")
    .select("email, full_name")
    .eq("id", user.id)
    .maybeSingle()

  const customer = await stripe.customers.create({
    email:    profile?.email ?? user.email,
    name:     profile?.full_name ?? undefined,
    metadata: { user_id: user.id },
  })

  await supabase
    .from("subscriptions")
    .upsert(
      { user_id: user.id, stripe_customer_id: customer.id },
      { onConflict: "user_id" }
    )

  return customer.id
}

// ── Actions ───────────────────────────────────────────────────────────────────

// Redirects to Stripe Checkout for the given plan ("pro" | "agency").
export async function createCheckoutSessionAction(plan) {
  const priceId = STRIPE_PRICE_IDS[plan]
  if (!priceId) return { error: "Invalid plan." }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Not authenticated." }

  const customerId = await getOrCreateStripeCustomer(supabase, user)

  const session = await stripe.checkout.sessions.create({
    customer:             customerId,
    mode:                 "subscription",
    line_items:           [{ price: priceId, quantity: 1 }],
    client_reference_id:  user.id,
    allow_promotion_codes: true,
    success_url: `${APP_URL}/billing?success=1`,
    cancel_url:  `${APP_URL}/billing`,
  })

  redirect(session.url)
}

// Redirects to the Stripe Customer Portal (plan management, invoices, cancel).
export async function createPortalSessionAction() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Not authenticated." }

  const { data: sub } = await supabase
    .from("subscriptions")
    .select("stripe_customer_id")
    .eq("user_id", user.id)
    .maybeSingle()

  if (!sub?.stripe_customer_id) return { error: "No billing account found." }

  const session = await stripe.billingPortal.sessions.create({
    customer:   sub.stripe_customer_id,
    return_url: `${APP_URL}/billing`,
  })

  redirect(session.url)
}
