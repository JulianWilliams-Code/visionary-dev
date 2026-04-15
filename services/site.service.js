import { createClient } from "@/lib/supabase/server"

export async function getUserSites(userId) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("sites")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}

export async function getSiteById(siteId) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("sites")
    .select("*")
    .eq("id", siteId)
    .single()

  if (error) throw error
  return data
}

export async function createSite(userId, siteData) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("sites")
    .insert({ ...siteData, user_id: userId })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateSite(siteId, updates) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("sites")
    .update(updates)
    .eq("id", siteId)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteSite(siteId) {
  const supabase = createClient()
  const { error } = await supabase
    .from("sites")
    .delete()
    .eq("id", siteId)

  if (error) throw error
}
