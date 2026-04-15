"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

// Called by SignupForm via useActionState.
// Receives (prevState, formData) — prevState is required by the hook contract.
export async function signUpAction(prevState, formData) {
  const supabase = await createClient()

  const email    = formData.get("email")
  const password = formData.get("password")
  const fullName = formData.get("full_name")

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
    },
  })

  if (error) return { error: error.message }

  // Don't redirect — Supabase sends a confirmation email.
  // The form switches to a "check your email" state on success.
  return { success: true }
}

// Called by LoginForm via useActionState.
export async function signInAction(prevState, formData) {
  const supabase = await createClient()

  const email    = formData.get("email")
  const password = formData.get("password")

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) return { error: error.message }

  // redirect() throws internally — React/Next catches it and navigates.
  redirect("/dashboard")
}

// Called by SignOutButton as a form action — no prevState needed.
export async function signOutAction() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect("/")
}
