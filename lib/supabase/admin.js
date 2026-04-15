import { createClient } from "@supabase/supabase-js"

// Service-role client — bypasses RLS.
// Use ONLY in server-side contexts that don't have a user session,
// e.g. Stripe webhooks. Never expose to the browser.
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { persistSession: false } }
  )
}
