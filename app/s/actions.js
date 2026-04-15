"use server"

import { createClient } from "@/lib/supabase/server"

// Bound with siteId before being passed to useActionState:
//   submitLeadAction.bind(null, siteId)
// So the signature is (siteId, prevState, formData).
export async function submitLeadAction(siteId, prevState, formData) {
  const supabase = await createClient()

  const name    = formData.get("name")?.toString().trim()
  const email   = formData.get("email")?.toString().trim()
  const phone   = formData.get("phone")?.toString().trim() || null
  const message = formData.get("message")?.toString().trim() || null

  if (!name || !email) return { error: "Name and email are required." }

  // Collect basic attribution metadata
  const metadata = {
    referrer:   formData.get("referrer") ?? null,
    utm_source: formData.get("utm_source") ?? null,
  }

  const { error } = await supabase
    .from("leads")
    .insert({ site_id: siteId, name, email, phone, message, metadata })

  if (error) return { error: "Something went wrong. Please try again." }

  return { success: true }
}
