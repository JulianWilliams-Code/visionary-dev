import Link from "next/link"
import { Check } from "lucide-react"
import { SignupForm } from "@/components/auth/SignupForm"

export const metadata = { title: "Create account — Visionary Dev" }

const BULLETS = [
  "No credit card required",
  "Free plan — no expiry",
  "Live in under 2 minutes",
  "Cancel or delete anytime",
]

// searchParams is a Promise in Next.js 15+
export default async function SignupPage({ searchParams }) {
  const params       = await searchParams
  const defaultEmail = params?.email ?? ""

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">

      {/* ── Right column: form — first on mobile ──────────────────────── */}
      <div className="order-1 lg:order-2 lg:w-[45%] flex items-center justify-center bg-[--color-surface] px-6 py-14 lg:py-20">
        <div className="w-full max-w-sm">

          {/* Mobile-only logo */}
          <Link
            href="/"
            className="mb-8 flex items-center gap-2 text-lg font-bold text-[--color-text-primary] lg:hidden"
          >
            <span
              className="flex h-7 w-7 items-center justify-center rounded-md text-xs font-black text-white"
              style={{ backgroundColor: 'var(--color-brand)' }}
              aria-hidden="true"
            >
              V
            </span>
            Visionary Dev
          </Link>

          <h1
            className="mb-2 font-bold text-[--color-text-primary]"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontFamily: 'var(--font-display)' }}
          >
            Create your free account
          </h1>
          <p className="mb-8 text-sm text-[--color-text-muted]">
            Your website will be live in 2 minutes.
          </p>

          <SignupForm defaultEmail={defaultEmail} />

          <p className="mt-6 text-center text-sm text-[--color-text-muted]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium hover:underline"
              style={{ color: 'var(--color-brand)' }}
            >
              Sign in
            </Link>
          </p>

          <p className="mt-8 text-center text-xs text-[--color-text-muted]">
            By signing up you agree to our{" "}
            <Link href="/terms" className="hover:underline" style={{ color: 'var(--color-brand)' }}>
              Terms
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="hover:underline" style={{ color: 'var(--color-brand)' }}>
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>

      {/* ── Left column: trust panel — second on mobile ────────────────── */}
      <div
        className="order-2 lg:order-1 lg:w-[55%] flex flex-col px-8 py-12 lg:px-14 lg:py-16"
        style={{ backgroundColor: 'var(--color-brand-dark)' }}
      >
        {/* Logo — desktop only */}
        <Link href="/" className="mb-12 hidden items-center gap-2.5 lg:flex">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-lg text-sm font-black"
            style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#fff' }}
            aria-hidden="true"
          >
            V
          </span>
          <span className="text-xl font-bold text-white">Visionary Dev</span>
        </Link>

        {/* Headline */}
        <h2
          className="font-bold text-white"
          style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontFamily: 'var(--font-display)', lineHeight: 1.15 }}
        >
          Your website goes live<br className="hidden lg:block" /> in 2 minutes
        </h2>

        {/* Subheadline */}
        <p
          className="mt-4 text-base"
          style={{ color: 'var(--color-brand-light)' }}
        >
          Join our founding members — limited spots
        </p>

        {/* Bullets */}
        <ul className="mt-8 space-y-3 lg:mt-10 lg:space-y-4">
          {BULLETS.map((text) => (
            <li key={text} className="flex items-center gap-3">
              <Check
                size={18}
                className="shrink-0 text-green-400"
                aria-hidden="true"
              />
              <span className="text-sm text-white lg:text-base">{text}</span>
            </li>
          ))}
        </ul>

        {/* Browser mockup — desktop only */}
        <div className="mt-auto hidden pt-14 lg:block">
          <div className="overflow-hidden rounded-xl shadow-2xl" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
            {/* Window chrome */}
            <div
              className="flex items-center gap-2 px-4 py-3"
              style={{ backgroundColor: 'rgba(0,0,0,0.25)' }}
            >
              <div className="flex gap-1.5" aria-hidden="true">
                <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
              </div>
              <div
                className="mx-2 flex-1 rounded px-3 py-1 text-xs"
                style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)' }}
              >
                yourbusiness.visionarydev.org
              </div>
            </div>

            {/* Browser content */}
            <div className="p-5">
              {/* Nav / header bar */}
              <div
                className="mb-4 h-8 rounded-md"
                style={{ backgroundColor: 'var(--color-brand)' }}
                aria-hidden="true"
              />
              {/* Headline block */}
              <div className="mb-1.5 h-4 w-3/4 rounded" style={{ backgroundColor: 'rgba(255,255,255,0.3)' }} aria-hidden="true" />
              <div className="mb-5 h-4 w-1/2 rounded"   style={{ backgroundColor: 'rgba(255,255,255,0.2)' }} aria-hidden="true" />
              {/* Service cards */}
              <div className="grid grid-cols-2 gap-3" aria-hidden="true">
                <div className="h-16 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.12)' }} />
                <div className="h-16 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.12)' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
