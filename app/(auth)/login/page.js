import Link from "next/link"
import { LoginForm } from "@/components/auth/LoginForm"

export const metadata = { title: "Sign in — Visionary Dev" }

// searchParams is a Promise in Next.js 15+
export default async function LoginPage({ searchParams }) {
  const params    = await searchParams
  const defaultEmail = params?.email ?? ""
  const authError    = params?.error ?? null

  return (
    <div className="min-h-screen flex items-center justify-center bg-[--color-surface-2] px-4 py-12">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="mb-8 flex items-center justify-center gap-2 text-xl font-bold text-[--color-text-primary]"
        >
          {/* Logo mark */}
          <span
            className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-black text-white"
            style={{ backgroundColor: 'var(--color-brand)' }}
            aria-hidden="true"
          >
            V
          </span>
          Visionary Dev
        </Link>

        <div className="rounded-2xl border border-[--color-border] bg-[--color-surface] p-8 shadow-sm">
          <h1 className="mb-1 text-2xl font-bold text-[--color-text-primary]">Welcome back</h1>
          <p className="mb-8 text-sm text-[--color-text-muted]">Sign in to your Visionary Dev account</p>

          {authError && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              Authentication failed. Please try again.
            </div>
          )}

          <LoginForm defaultEmail={defaultEmail} />

          <p className="mt-6 text-center text-sm text-[--color-text-muted]">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-medium hover:underline"
              style={{ color: 'var(--color-brand)' }}
            >
              Sign up free
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
