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
      <div className="py-4 text-center">
        <div className="mb-4 text-5xl">📬</div>
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Check your email
        </h2>
        <p className="text-sm text-gray-500 leading-relaxed">
          We sent a confirmation link to your inbox.
          Click it to activate your account and get started.
        </p>
        <p className="mt-4 text-xs text-gray-400">
          Didn&apos;t receive it?{" "}
          <button
            onClick={() => window.location.reload()}
            className="text-blue-600 hover:underline"
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
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {state.error}
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
        className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {pending ? "Creating account…" : "Create free account"}
      </button>

      <p className="text-center text-xs text-gray-400">
        By signing up you agree to our{" "}
        <Link href="/terms" className="text-blue-600 hover:underline">
          Terms
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="text-blue-600 hover:underline">
          Privacy Policy
        </Link>
        .
      </p>
    </form>
  )
}
