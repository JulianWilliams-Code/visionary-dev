'use client'

import { useState, useEffect }          from 'react'
import { useRouter }                    from 'next/navigation'
import { motion, AnimatePresence }      from 'framer-motion'
import confetti                         from 'canvas-confetti'
import { useOnboardingStore }           from '@/lib/onboarding/store'
import type { CreateSiteResult }        from '@/app/actions/createSiteFromOnboarding'
import type { ActionResponse }          from '@/types'

// ── Strings ───────────────────────────────────────────────────────────────────

const BUILD_STEPS = [
  'Choosing your layout',
  'Writing your headlines',
  'Building your services section',
  'Setting up your contact',
  'Adding the finishing touches',
  'Taking your site live',
] as const

const STEP_INTERVAL_MS = 600

// ── Sub-components ────────────────────────────────────────────────────────────

function Wordmark() {
  return (
    <motion.div
      className="mx-auto mb-10 flex items-center justify-center gap-3"
      animate={{ opacity: [1, 0.45, 1], scale: [1, 0.97, 1] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    >
      <span
        className="flex h-10 w-10 items-center justify-center rounded-[--radius-lg] bg-[--color-brand] text-lg font-bold text-white select-none"
        aria-hidden="true"
      >
        V
      </span>
      <span className="text-xl font-bold text-[--color-text-primary]">
        Visionary Dev
      </span>
    </motion.div>
  )
}

function AnimatedCheck() {
  return (
    <span
      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[--color-brand]"
      aria-hidden="true"
    >
      <motion.svg viewBox="0 0 12 12" className="h-3 w-3 text-white" fill="none">
        <motion.path
          d="M2 6l3 3 5-5"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </motion.svg>
    </span>
  )
}

function BuildingView({ visibleSteps }: { visibleSteps: number }) {
  return (
    <div className="w-full max-w-sm mx-auto">
      <Wordmark />

      <ul className="space-y-4" aria-label="Site generation progress" aria-live="polite">
        <AnimatePresence initial={false}>
          {BUILD_STEPS.slice(0, visibleSteps).map((step) => (
            <motion.li
              key={step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', damping: 22, stiffness: 280 }}
              className="flex items-center gap-3"
            >
              <AnimatedCheck />
              <span className="text-sm font-medium text-[--color-text-secondary]">
                {step}
              </span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  )
}

function SuccessView({
  result,
  businessName,
}: {
  result:       CreateSiteResult
  businessName: string
}) {
  const router  = useRouter()
  const { reset } = useOnboardingStore()
  const [copied, setCopied] = useState(false)

  const publicUrl = `https://${result.subdomain}.visionarydev.com`
  const previewPath = `/s/${result.subdomain}`

  function handleCopy() {
    navigator.clipboard.writeText(publicUrl).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  function handleDashboard() {
    reset()
    router.push('/dashboard')
  }

  return (
    <motion.div
      className="w-full max-w-md mx-auto text-center"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Big success checkmark */}
      <motion.div
        className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 14, stiffness: 200 }}
        aria-hidden="true"
      >
        <motion.svg viewBox="0 0 24 24" className="h-10 w-10 text-green-600" fill="none">
          <motion.path
            d="M4 12l5 5L20 7"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.25, duration: 0.45, ease: 'easeOut' }}
          />
        </motion.svg>
      </motion.div>

      {/* Headline */}
      <h1 className="mb-2 text-3xl font-bold text-[--color-text-primary]">
        Your site is live!
      </h1>

      {/* Subline */}
      <p className="mb-8 text-sm text-[--color-text-muted]">
        <span className="font-medium text-[--color-text-secondary]">{businessName}</span>
        {' · '}
        <span className="font-mono">{result.subdomain}.visionarydev.com</span>
      </p>

      {/* Action buttons — stacked on mobile, row on sm+ */}
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
        <a
          href={previewPath}
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-flex min-h-[44px] items-center justify-center
            rounded-[--radius-lg] bg-[--color-accent] px-6
            text-sm font-semibold text-white
            hover:bg-[--color-accent-dark]
            transition-all duration-150
            focus-visible:ring-2 ring-[--color-brand] ring-offset-2
          "
        >
          View my site →
        </a>

        <button
          type="button"
          onClick={handleCopy}
          aria-live="polite"
          aria-label={copied ? 'URL copied to clipboard' : 'Copy site URL to clipboard'}
          className="
            inline-flex min-h-[44px] items-center justify-center
            rounded-[--radius-lg] border border-[--color-border]
            bg-[--color-surface] px-6
            text-sm font-semibold text-[--color-text-primary]
            hover:bg-[--color-surface-2]
            transition-all duration-150
            focus-visible:ring-2 ring-[--color-brand] ring-offset-2
          "
        >
          {copied ? 'Copied!' : 'Share my site'}
        </button>

        <button
          type="button"
          onClick={handleDashboard}
          className="
            inline-flex min-h-[44px] items-center justify-center
            rounded-[--radius-lg] px-6
            text-sm font-medium text-[--color-text-muted]
            hover:bg-[--color-surface-2] hover:text-[--color-text-primary]
            transition-all duration-150
            focus-visible:ring-2 ring-[--color-brand] ring-offset-2
          "
        >
          Go to dashboard
        </button>
      </div>

      {/* Footnote */}
      <p className="mt-6 text-xs text-[--color-text-muted]">
        You can edit everything from your dashboard.
      </p>
    </motion.div>
  )
}

function ErrorView({
  message,
  onRetry,
}: {
  message: string
  onRetry: () => void
}) {
  return (
    <motion.div
      className="w-full max-w-sm mx-auto text-center"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-100"
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 24" className="h-8 w-8 text-red-500" fill="none">
          <path
            d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
            stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round"
          />
        </svg>
      </div>

      <h2 className="mb-2 text-xl font-bold text-[--color-text-primary]">
        Something went wrong
      </h2>
      <p className="mb-6 text-sm text-[--color-text-muted]" role="alert">
        {message}
      </p>

      <button
        type="button"
        onClick={onRetry}
        className="
          inline-flex min-h-[44px] items-center justify-center
          rounded-[--radius-lg] bg-[--color-brand] px-8
          text-sm font-semibold text-white
          hover:bg-[--color-brand-dark]
          transition-all duration-150
          focus-visible:ring-2 ring-[--color-brand] ring-offset-2
        "
      >
        Try again
      </button>
    </motion.div>
  )
}

// ── GenerationScreen ──────────────────────────────────────────────────────────

type Phase = 'building' | 'success' | 'error'

interface Props {
  promise:      Promise<ActionResponse<CreateSiteResult>>
  businessName: string
  onRetry:      () => void
}

export function GenerationScreen({ promise, businessName, onRetry }: Props) {
  const [phase,        setPhase]        = useState<Phase>('building')
  const [result,       setResult]       = useState<CreateSiteResult | null>(null)
  const [errorMsg,     setErrorMsg]     = useState<string | null>(null)
  const [visibleSteps, setVisibleSteps] = useState(0)

  // Reveal build steps one by one
  useEffect(() => {
    if (visibleSteps >= BUILD_STEPS.length) return
    const timer = setTimeout(
      () => setVisibleSteps((n) => n + 1),
      STEP_INTERVAL_MS,
    )
    return () => clearTimeout(timer)
  }, [visibleSteps])

  // Resolve promise
  useEffect(() => {
    promise.then((res) => {
      if (res.ok) {
        setResult(res.data)
        setPhase('success')
      } else {
        setErrorMsg(res.error ?? 'Something went wrong.')
        setPhase('error')
      }
    })
  }, [promise])

  // Confetti on success — fires once, respects reduced-motion
  useEffect(() => {
    if (phase !== 'success') return
    confetti({
      particleCount:           150,
      spread:                  90,
      origin:                  { y: 0.55 },
      colors:                  ['#2563eb', '#f59e0b', '#10b981', '#8b5cf6', '#ef4444'],
      disableForReducedMotion: true,
    })
  }, [phase])

  return (
    <div
      className="
        flex flex-1 items-center justify-center
        bg-[--color-surface] px-6 py-12
      "
      aria-live="polite"
    >
      <AnimatePresence mode="wait">
        {phase === 'building' && (
          <motion.div
            key="building"
            className="w-full"
            exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
          >
            <BuildingView visibleSteps={visibleSteps} />
          </motion.div>
        )}

        {phase === 'success' && result && (
          <motion.div key="success" className="w-full">
            <SuccessView result={result} businessName={businessName} />
          </motion.div>
        )}

        {phase === 'error' && errorMsg && (
          <motion.div key="error" className="w-full">
            <ErrorView message={errorMsg} onRetry={onRetry} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
