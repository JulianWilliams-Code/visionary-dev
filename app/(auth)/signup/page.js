import Link from "next/link"
import { SignupForm } from "@/components/auth/SignupForm"

export const metadata = { title: "Create account — Visionary Dev" }

// searchParams is a Promise in Next.js 15+
export default async function SignupPage({ searchParams }) {
  const params = await searchParams
  // Hero CTA passes ?email= so the field is pre-filled
  const defaultEmail = params?.email ?? ""

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Create your account</h1>
      <p className="text-sm text-gray-500 mb-8">
        Your website will be live in 2 minutes
      </p>

      <SignupForm defaultEmail={defaultEmail} />

      <p className="mt-6 text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-600 hover:underline font-medium">
          Sign in
        </Link>
      </p>
    </div>
  )
}
