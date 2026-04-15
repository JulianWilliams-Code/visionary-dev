import Link from "next/link"

export const metadata = { title: "Sign in — Visionary Dev" }

export default function LoginPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back</h1>
      <p className="text-sm text-gray-500 mb-8">Sign in to your account</p>
      {/* TODO: <LoginForm /> */}
      <p className="mt-6 text-center text-sm text-gray-500">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-blue-600 hover:underline font-medium">
          Sign up free
        </Link>
      </p>
    </div>
  )
}
