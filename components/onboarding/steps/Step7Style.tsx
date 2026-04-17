'use client'

import { useOnboardingStore } from '@/lib/onboarding/store'
import { StylePreference }    from '@/lib/onboarding/types'

// ── Option config ─────────────────────────────────────────────────────────────

const OPTIONS: {
  value:       StylePreference
  label:       string
  description: string
  accent:      string   // preview swatch colour
}[] = [
  {
    value:       StylePreference.CLEAN_PROFESSIONAL,
    label:       'Clean & Professional',
    description: 'Navy blue, sharp corners, Inter — polished and trustworthy.',
    accent:      '#1E3A8A',
  },
  {
    value:       StylePreference.BOLD_ENERGETIC,
    label:       'Bold & Energetic',
    description: 'Red, square corners, DM Sans — high-energy and direct.',
    accent:      '#DC2626',
  },
  {
    value:       StylePreference.WARM_APPROACHABLE,
    label:       'Warm & Approachable',
    description: 'Amber, rounded corners, Nunito — friendly and personal.',
    accent:      '#D97706',
  },
]

// ── Step7Style ────────────────────────────────────────────────────────────────

export function Step7Style() {
  const { data, updateData } = useOnboardingStore()

  return (
    <div className="space-y-3">
      {OPTIONS.map((option) => {
        const selected = data.stylePreference === option.value

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => updateData({ stylePreference: option.value })}
            aria-pressed={selected}
            className={`
              w-full text-left rounded-[--radius-lg] border-2 px-4 py-4
              transition-all duration-150
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-brand] focus-visible:ring-offset-2
              ${selected
                ? 'border-[--color-brand] bg-[--color-brand-light]'
                : 'border-[--color-border] bg-[--color-surface] hover:bg-[--color-surface-2]'
              }
            `}
          >
            <div className="flex items-center gap-3">
              {/* Colour swatch */}
              <span
                aria-hidden="true"
                className="h-8 w-8 shrink-0 rounded-full border border-black/10"
                style={{ backgroundColor: option.accent }}
              />

              <div className="min-w-0">
                <p className={`text-sm font-semibold ${selected ? 'text-[--color-brand]' : 'text-[--color-text-primary]'}`}>
                  {option.label}
                </p>
                <p className="mt-0.5 text-xs text-[--color-text-muted] leading-relaxed">
                  {option.description}
                </p>
              </div>

              {/* Selected indicator */}
              {selected && (
                <svg
                  className="ml-auto h-5 w-5 shrink-0 text-[--color-brand]"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  />
                </svg>
              )}
            </div>
          </button>
        )
      })}
    </div>
  )
}
