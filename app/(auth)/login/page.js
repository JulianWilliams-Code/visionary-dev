import Link from "next/link"
import { LoginForm } from "@/components/auth/LoginForm"

export const metadata = { title: "Sign in — Visionary Dev" }

// searchParams is a Promise in Next.js 15+
export default async function LoginPage({ searchParams }) {
  const params = await searchParams
  const defaultEmail = params?.email ?? ""
  const authError   = params?.error ?? null

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome back</h1>
      <p className="text-sm text-gray-500 mb-8">Sign in to your Visionary Dev account</p>

      {/* Surface errors forwarded from the callback route */}
      {authError && (
        <div className="mb-6 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          Authentication failed. Please try again.
        </div>
      )}

      <LoginForm defaultEmail={defaultEmail} />

      <p className="mt-6 text-center text-sm text-gray-500">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-blue-600 hover:underline font-medium">
          Sign up free
        </Link>
      </p>
    </div>
  )
}
