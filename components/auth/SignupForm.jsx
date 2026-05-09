"use client"

import { useActionState } from "react"
import Link from "next/link"
import { signUpAction } from "@/app/(auth)/actions"
import { Input } from "@/components/ui/Input"

export function SignupForm({ defaultEmail = "" }) {
  const [state, formAction, pending] = useActionState(signUpAction, null)

  // After successful signup Supabase sends a confirmation email.
  // Swap the form for a confirmation message.
  if (state?.success) {
    return (
      <div className="px-6 py-8 text-center">
        <div className="mb-4 text-5xl" aria-hidden="true">📬</div>
        <h2 className="mb-2 text-lg font-semibold text-[--color-text-primary]">
          Check your email
        </h2>
        <p className="text-sm leading-relaxed text-[--color-text-muted]">
          We sent a confirmation link to your inbox.
          Click it to activate your account and get started.
        </p>
        <p className="mt-4 text-xs text-[--color-text-muted]">
          Didn&apos;t receive it?{" "}
          <button
            onClick={() => window.location.reload()}
            className="font-medium hover:underline"
            style={{ color: 'var(--color-brand)' }}
          >
            Try again
          </button>
        </p>
      </div>
    )
  }

  return (
    <form action={formAction} className="space-y-5">
      {state?.error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {typeof state.error === "string" ? state.error : "Something went wrong. Please try again."}
        </div>
      )}

      <Input
        label="Full name"
        name="full_name"
        type="text"
        placeholder="Jane Smith"
        required
        autoComplete="name"
      />

      <Input
        label="Email"
        name="email"
        type="email"
        defaultValue={defaultEmail}
        placeholder="you@example.com"
        required
        autoComplete="email"
      />

      <Input
        label="Password"
        name="password"
        type="password"
        placeholder="Min. 8 characters"
        required
        minLength={8}
        autoComplete="new-password"
      />

      <button
        type="submit"
        disabled={pending}
        className="
          w-full rounded-lg py-3 text-sm font-medium text-white
          transition-all duration-150
          hover:opacity-90
          disabled:cursor-not-allowed disabled:opacity-50
        "
        style={{ backgroundColor: 'var(--color-accent)' }}
      >
        {pending ? "Creating account…" : "Create free account →"}
      </button>
    </form>
  )
}
