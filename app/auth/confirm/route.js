import { createClient } from "@/lib/supabase/server"
import { NextResponse }  from "next/server"

// Handles email confirmation links sent by Supabase.
// Supabase emails link to: /auth/confirm?token_hash=...&type=signup
// This route verifies the token and redirects into the app.
export async function GET(request) {
  const { searchParams, origin } = new URL(request.url)
  const token_hash = searchParams.get("token_hash")
  const type       = searchParams.get("type")
  const next       = searchParams.get("next") ?? "/dashboard"

  if (token_hash && type) {
    const supabase = await createClient()
    const { error } = await supabase.auth.verifyOtp({ type, token_hash })

    if (!error) {
      // For signup confirmations, send new users straight to onboarding.
      // For other token types (e.g. password reset), respect the next param.
      if (type === 'signup') {
        return NextResponse.redirect(`${origin}/onboarding`)
      }
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  return NextResponse.redirect(`${origin}/login?error=confirmation_failed`)
}
