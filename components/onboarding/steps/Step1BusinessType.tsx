'use client'

import type { LucideIcon }  from 'lucide-react'
import { Dumbbell, Lightbulb, Apple, Wind, Heart, Briefcase } from 'lucide-react'
import { useOnboardingStore } from '@/lib/onboarding/store'
import { BusinessType }       from '@/lib/onboarding/types'

// ── Option config ─────────────────────────────────────────────────────────────

const OPTIONS: {
  value: BusinessType
  label: string
  Icon:  LucideIcon
}[] = [
  { value: BusinessType.PERSONAL_TRAINER, label: 'Personal Trainer / Fitness Coach', Icon: Dumbbell  },
  { value: BusinessType.LIFE_COACH,       label: 'Life or Business Coach',           Icon: Lightbulb },
  { value: BusinessType.NUTRITIONIST,     label: 'Nutritionist or Dietitian',        Icon: Apple     },
  { value: BusinessType.YOGA_INSTRUCTOR,  label: 'Yoga or Pilates Instructor',       Icon: Wind      },
  { value: BusinessType.THERAPIST,        label: 'Therapist or Counselor',           Icon: Heart     },
  { value: BusinessType.OTHER_SERVICE,    label: 'Other service business',           Icon: Briefcase },
]

// ── Component ─────────────────────────────────────────────────────────────────

export function Step1BusinessType() {
  const { data, updateData } = useOnboardingStore()

  return (
    <div
      role="radiogroup"
      aria-label="Business type"
      className="grid grid-cols-2 md:grid-cols-3 gap-3"
    >
      {OPTIONS.map(({ value, label, Icon }) => {
        const selected = data.businessType === value

        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => updateData({ businessType: value })}
            className={`
              relative flex flex-col items-start gap-3 p-4
              rounded-[--radius-xl] border-2 text-left
              min-h-[100px]
              transition-all duration-150
              focus-visible:ring-2 ring-[--color-brand] ring-offset-2
              ${selected
                ? 'border-[--color-brand] bg-[--color-brand-light] scale-[1.02]'
                : 'border-[--color-border] bg-[--color-surface] hover:border-[--color-brand] hover:bg-[--color-brand-light]'
              }
            `}
          >
            <Icon
              size={20}
              aria-hidden="true"
              className={selected ? 'text-[--color-brand]' : 'text-[--color-text-muted]'}
            />
            <span
              className={`
                text-sm font-medium leading-snug
                ${selected ? 'text-[--color-brand]' : 'text-[--color-text-primary]'}
              `}
            >
              {label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
