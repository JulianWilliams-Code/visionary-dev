"use server"

import { createClient }    from "@/lib/supabase/server"
import { revalidatePath }  from "next/cache"

const VALID_STATUSES = ["new", "contacted", "converted", "archived"]

export async function updateLeadStatusAction(leadId, siteId, formData) {
  const status = formData.get("status")?.toString()

  if (!VALID_STATUSES.includes(status)) return { error: "Invalid status." }

  const supabase = await createClient()

  // Verify session
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Unauthorized." }

  // Confirm the site belongs to this user before touching any leads.
  // RLS is a second line of defense — this makes intent explicit.
  const { data: site } = await supabase
    .from("sites")
    .select("id")
    .eq("id", siteId)
    .eq("user_id", user.id)
    .maybeSingle()

  if (!site) return { error: "Site not found." }

  const { error } = await supabase
    .from("leads")
    .update({ status })
    .eq("id", leadId)
    .eq("site_id", siteId)   // belt-and-suspenders: leadId + siteId must match

  if (error) return { error: error.message }

  // Revalidate the leads page so the updated status reflects immediately
  revalidatePath(`/dashboard/sites/${siteId}/leads`)
}
