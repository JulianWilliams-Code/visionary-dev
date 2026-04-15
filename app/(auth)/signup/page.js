import Link from "next/link"

export const metadata = { title: "Create account — Visionary Dev" }

export default function SignupPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Create your account</h1>
      <p className="text-sm text-gray-500 mb-8">Get your website live in 2 minutes</p>
      {/* TODO: <SignupForm /> */}
      <p className="mt-6 text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-600 hover:underline font-medium">
          Sign in
        </Link>
      </p>
    </div>
  )
}
