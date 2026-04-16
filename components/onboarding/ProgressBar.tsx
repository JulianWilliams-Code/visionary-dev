'use client'

import { motion } from 'framer-motion'
import { useOnboardingStore } from '@/lib/onboarding/store'

export function ProgressBar() {
  const { steps, currentStepIndex } = useOnboardingStore()

  const total   = steps.length
  const current = currentStepIndex + 1
  const pct     = Math.round((current / total) * 100)

  return (
    <div
      className="mb-8"
      role="progressbar"
      aria-valuenow={current}
      aria-valuemin={1}
      aria-valuemax={total}
      aria-label={`Question ${current} of ${total}`}
    >
      {/* Label */}
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[--color-text-muted]">
        Question {current} of {total}
      </p>

      {/* Animated fill track */}
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-[--color-border]">
        <motion.div
          className="h-full rounded-full bg-[--color-brand]"
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>

      {/* Step dots */}
      <div className="mt-3 flex items-center gap-2" aria-hidden="true">
        {steps.map((step, i) => (
          <motion.div
            key={step.id}
            className="rounded-full"
            initial={false}
            animate={{
              width:           i === currentStepIndex ? '1.25rem' : '0.5rem',
              height:          '0.5rem',
              backgroundColor: i <= currentStepIndex
                ? 'var(--color-brand)'
                : 'var(--color-border)',
            }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          />
        ))}
      </div>
    </div>
  )
}
