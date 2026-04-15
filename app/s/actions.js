"use server"

import { createClient } from "@/lib/supabase/server"

// Regex — intentionally permissive, catches obvious typos
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Strip HTML tags to prevent stored XSS
function sanitize(str) {
  return str?.replace(/<[^>]*>/g, "").trim() ?? ""
}

function validateLead({ name, email, phone, message }) {
  if (!name)                      return "Name is required."
  if (name.length > 100)          return "Name is too long."
  if (!email)                     return "Email is required."
  if (!EMAIL_RE.test(email))      return "Please enter a valid email address."
  if (email.length > 255)         return "Email is too long."
  if (phone  && phone.length > 30)  return "Phone number is too long."
  if (message && message.length > 2000) return "Message is too long (max 2000 characters)."
  return null
}

// Bound with siteId before being passed to useActionState:
//   submitLeadAction.bind(null, siteId)
// Signature: (siteId, prevState, formData)
export async function submitLeadAction(siteId, prevState, formData) {
  const supabase = await createClient()

  const name    = sanitize(formData.get("name")?.toString())
  const email   = sanitize(formData.get("email")?.toString()).toLowerCase()
  const phone   = sanitize(formData.get("phone")?.toString()) || null
  const message = sanitize(formData.get("message")?.toString()) || null

  // Field-level validation
  const validationError = validateLead({ name, email, phone, message })
  if (validationError) return { error: validationError }

  // Duplicate detection — same email + site within 24 hours.
  // Prevents double-submits and spam without being overly aggressive.
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  const { data: existing } = await supabase
    .from("leads")
    .select("id")
    .eq("site_id", siteId)
    .eq("email", email)
    .gte("created_at", since)
    .maybeSingle()

  if (existing) {
    return { success: true, duplicate: true }   // silent success — don't expose internals
  }

  // Collect attribution metadata from hidden fields
  const metadata = {
    referrer:    formData.get("referrer")    ?? null,
    utm_source:  formData.get("utm_source")  ?? null,
    utm_campaign: formData.get("utm_campaign") ?? null,
  }

  const { error } = await supabase
    .from("leads")
    .insert({ site_id: siteId, name, email, phone, message, metadata })

  if (error) {
    console.error("[submitLeadAction]", error.message)
    return { error: "Something went wrong. Please try again." }
  }

  return { success: true }
}
