'use client'

import type { ComponentType } from 'react'
import { useRouter }           from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'

import { useOnboardingStore }  from '@/lib/onboarding/store'
import type { StepId }         from '@/lib/onboarding/types'

import { ProgressBar }         from './ProgressBar'
import { SitePreview }         from './SitePreview'
import { Step1BusinessType }   from './steps/Step1BusinessType'
import { Step2NameBusiness }   from './steps/Step2NameBusiness'
import { Step3Tagline }        from './steps/Step3Tagline'
import { Step4Services }       from './steps/Step4Services'
import { Step5Location }       from './steps/Step5Location'
import { Step6Contact }        from './steps/Step6Contact'
import { Step7Style }          from './steps/Step7Style'

// ── Step registry ─────────────────────────────────────────────────────────────

const STEP_MAP: Record<StepId, ComponentType> = {
  businessType:        Step1BusinessType,
  nameAndBusiness:     Step2NameBusiness,
  tagline:             Step3Tagline,
  services:            Step4Services,
  locationAndModality: Step5Location,
  contactMethod:       Step6Contact,
  stylePreference:     Step7Style,
}

// ── Motion variants ───────────────────────────────────────────────────────────

const slideVariants = {
  enter: {
    x: 40,
    opacity: 0,
  },
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.22, ease: [0.4, 0, 0.2, 1] as const },
  },
  exit: {
    x: -40,
    opacity: 0,
    transition: { duration: 0.16, ease: [0.4, 0, 1, 1] as const },
  },
}

// ── Shell ─────────────────────────────────────────────────────────────────────

export function OnboardingShell() {
  const router = useRouter()
  const { steps, currentStepIndex, goNext, goBack, canAdvance, reset } = useOnboardingStore()

  const step = steps[currentStepIndex]
  if (!step) return null

  const StepComponent = STEP_MAP[step.id]
  const isFirst   = currentStepIndex === 0
  const isLast    = currentStepIndex === steps.length - 1
  const advance   = canAdvance()

  function handleNext() {
    if (!advance) return
    if (isLast) {
      router.push('/onboarding/generating')
    } else {
      goNext()
    }
  }

  return (
    <div className="flex flex-1 min-h-0">

      {/* ── Left panel ──────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 lg:max-w-[60%] min-h-0">

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-xl px-6 pt-10 pb-6">
            <div className="flex items-center justify-between mb-2">
              <ProgressBar />
              {currentStepIndex > 0 && (
                <button
                  type="button"
                  onClick={reset}
                  className="text-xs text-[--color-text-muted] hover:text-[--color-text-secondary] transition-colors"
                >
                  Start over
                </button>
              )}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentStepIndex}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                {/* Step heading */}
                <h2 className="mb-6 text-xl font-bold text-[--color-text-primary] sm:text-2xl">
                  {step.title}
                </h2>

                {/* Step body */}
                <StepComponent />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── Navigation bar ─────────────────────────────────────── */}
        <div
          className="
            shrink-0
            border-t border-[--color-border] bg-[--color-surface]
            px-6 py-4
            flex items-center justify-between gap-4
          "
        >
          {/* Back button — hidden on step 1 */}
          {isFirst ? (
            <div aria-hidden="true" />
          ) : (
            <button
              type="button"
              onClick={goBack}
              className="
                min-h-[44px] px-4 rounded-[--radius-lg]
                text-sm font-medium text-[--color-text-secondary]
                hover:bg-[--color-surface-2]
                transition-all duration-150
                focus-visible:ring-2 ring-[--color-brand] ring-offset-2
              "
            >
              ← Back
            </button>
          )}

          {/* Next / Build button */}
          <button
            type="button"
            onClick={handleNext}
            disabled={!advance}
            aria-disabled={!advance}
            className="
              min-h-[44px] min-w-[120px] px-6 rounded-[--radius-lg]
              text-sm font-semibold text-white
              bg-[--color-accent] hover:bg-[--color-accent-dark]
              disabled:cursor-not-allowed disabled:opacity-40
              disabled:hover:bg-[--color-accent]
              transition-all duration-150
              focus-visible:ring-2 ring-[--color-brand] ring-offset-2
            "
          >
            {isLast ? 'Build my site →' : 'Continue →'}
          </button>
        </div>
      </div>

      {/* ── Right panel — desktop only ───────────────────────────── */}
      <aside
        className="
          hidden lg:flex lg:flex-col
          lg:w-[40%] lg:border-l lg:border-[--color-border]
          bg-[--color-surface-2] overflow-y-auto
        "
        aria-label="Live site preview"
      >
        <SitePreview />
      </aside>
    </div>
  )
}
