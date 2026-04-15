import { createClient } from "@/lib/supabase/server"

export async function getUserSubscription(userId) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", userId)
    .single()

  // PGRST116 = no rows found — not an error for us
  if (error && error.code !== "PGRST116") throw error
  return data ?? null
}

export async function isSubscriptionActive(userId) {
  const subscription = await getUserSubscription(userId)
  return subscription?.status === "active"
}
