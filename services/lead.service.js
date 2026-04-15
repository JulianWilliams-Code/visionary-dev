import { createClient } from "@/lib/supabase/server"

/**
 * Fetch all leads for a site, newest first.
 * Only accessible by the site owner (enforced by RLS).
 */
export async function getSiteLeads(siteId) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .eq("site_id", siteId)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}

/**
 * Submit a lead from a public site contact/booking form.
 * Uses the anon key — RLS verifies the site is published.
 */
export async function submitLead(siteId, leadData) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("leads")
    .insert({
      site_id: siteId,
      name: leadData.name,
      email: leadData.email,
      phone: leadData.phone ?? null,
      message: leadData.message ?? null,
      metadata: leadData.metadata ?? {},
    })
    .select()
    .single()

  if (error) throw error
  return data
}

/**
 * Update the CRM status of a lead (new → contacted → converted → archived).
 * Only the site owner can do this (enforced by RLS).
 */
export async function updateLeadStatus(leadId, status) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("leads")
    .update({ status })
    .eq("id", leadId)
    .select()
    .single()

  if (error) throw error
  return data
}

/**
 * Count leads by status for a site — used for dashboard stats.
 */
export async function getLeadStats(siteId) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("leads")
    .select("status")
    .eq("site_id", siteId)

  if (error) throw error

  return data.reduce(
    (acc, lead) => {
      acc[lead.status] = (acc[lead.status] ?? 0) + 1
      acc.total++
      return acc
    },
    { total: 0, new: 0, contacted: 0, converted: 0, archived: 0 }
  )
}
