"use server"

import { createClient }                      from "@/lib/supabase/server"
import { generateSiteContent, toSubdomain }  from "@/services/generate.service"
import { redirect }                          from "next/navigation"
import { PLANS }                             from "@/config"

export async function createSiteAction(intake) {
  const supabase = await createClient()

  // Verify session — never trust client-supplied user IDs
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) return { error: "Not authenticated. Please sign in." }

  // ── Plan limit check ──────────────────────────────────────────────────────
  // Fetch subscription and existing site count in parallel.
  const [{ data: subscription }, { count: siteCount }] = await Promise.all([
    supabase
      .from("subscriptions")
      .select("plan")
      .eq("user_id", user.id)
      .maybeSingle(),
    supabase
      .from("sites")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id),
  ])

  const plan      = subscription?.plan ?? "free"
  const siteLimit = PLANS[plan]?.sites ?? 1   // fallback: free limit

  if (siteLimit !== -1 && (siteCount ?? 0) >= siteLimit) {
    return {
      error:
        plan === "free"
          ? `Free plan is limited to ${siteLimit} site. Upgrade to Pro to add more.`
          : `Your ${PLANS[plan].name} plan allows up to ${siteLimit} sites. Upgrade to Agency for unlimited.`,
    }
  }

  // Build a unique subdomain: try base, then base-2, base-3, …
  const base = toSubdomain(intake.businessName)
  let subdomain = base
  for (let i = 1; i <= 10; i++) {
    const { data: taken } = await supabase
      .from("sites")
      .select("id")
      .eq("subdomain", subdomain)
      .maybeSingle()

    if (!taken) break
    subdomain = `${base}-${i}`
  }

  // Generate structured content from raw intake answers
  const content = generateSiteContent(intake)

  // Strip empty service rows before persisting
  const cleanIntake = {
    ...intake,
    services: intake.services?.filter(s => s.name?.trim()) ?? [],
  }

  const { data: site, error } = await supabase
    .from("sites")
    .insert({
      user_id:       user.id,
      subdomain,
      business_name: intake.businessName,
      intake:        cleanIntake,
      content,
      published:     true,
    })
    .select()
    .single()

  if (error) return { error: error.message }

  redirect(`/dashboard/sites/${site.id}`)
}
