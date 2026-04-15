import { createClient } from "@/lib/supabase/server"
import { PLANS }        from "@/config"

export async function getUserSubscription(userId) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", userId)
    .single()

  // PGRST116 = no rows — not an error for us
  if (error && error.code !== "PGRST116") throw error
  return data ?? null
}

// Returns the user's current plan ("free" | "pro" | "agency").
export async function getUserPlan(userId) {
  const sub = await getUserSubscription(userId)
  return sub?.plan ?? "free"
}

// Returns the PLANS config object for the user's current plan.
export async function getPlanConfig(userId) {
  const plan = await getUserPlan(userId)
  return { plan, ...PLANS[plan] }
}

// Returns true only when the subscription row is present and status is active.
export async function isSubscriptionActive(userId) {
  const sub = await getUserSubscription(userId)
  return sub?.status === "active"
}

// Returns how many more sites this user can create, or Infinity for unlimited.
// Returns 0 if the limit is already reached.
export async function remainingSiteSlots(userId) {
  const { plan, sites: limit } = await getPlanConfig(userId)
  if (limit === -1) return Infinity

  const supabase = await createClient()
  const { count } = await supabase
    .from("sites")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId)

  return Math.max(0, limit - (count ?? 0))
}
