"use client"

import { useActionState } from "react"
import Link from "next/link"
import { signInAction } from "@/app/(auth)/actions"
import { Input } from "@/components/ui/Input"

export function LoginForm({ defaultEmail = "" }) {
  const [state, formAction, pending] = useActionState(signInAction, null)

  return (
    <form action={formAction} className="space-y-5">
      {state?.error && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {state.error}
        </div>
      )}

      <Input
        label="Email"
        name="email"
        type="email"
        defaultValue={defaultEmail}
        placeholder="you@example.com"
        required
        autoComplete="email"
      />

      <div className="space-y-1">
        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="••••••••"
          required
          autoComplete="current-password"
        />
        <div className="text-right">
          <Link
            href="/forgot-password"
            className="text-xs text-blue-600 hover:underline"
          >
            Forgot password?
          </Link>
        </div>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  )
}
