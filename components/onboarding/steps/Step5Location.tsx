'use client'

import { useId } from 'react'
import { useOnboardingStore } from '@/lib/onboarding/store'

type Modality = 'in_person' | 'online' | 'both'

const MODALITY_OPTIONS: { value: Modality; label: string }[] = [
  { value: 'in_person', label: 'In Person' },
  { value: 'online',    label: 'Online'    },
  { value: 'both',      label: 'Both'      },
]

const inputClass = `
  min-h-[44px] w-full rounded-[--radius-lg]
  border border-[--color-border] bg-[--color-surface]
  px-4 py-2.5 text-sm
  text-[--color-text-primary] placeholder:text-[--color-text-muted]
  transition-all duration-150
  focus:border-[--color-brand] focus:outline-none
  focus:ring-2 focus:ring-[--color-brand] focus:ring-offset-0
`

export function Step5Location() {
  const { data, updateData } = useOnboardingStore()
  const cityId  = useId()
  const stateId = useId()

  return (
    <div className="space-y-6">
      {/* City + State */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex flex-1 flex-col gap-1.5">
          <label htmlFor={cityId} className="text-sm font-medium text-[--color-text-primary]">
            City
          </label>
          <input
            id={cityId}
            type="text"
            autoComplete="address-level2"
            value={data.locationCity ?? ''}
            onChange={(e) => updateData({ locationCity: e.target.value })}
            placeholder="e.g. Austin"
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1.5 sm:w-28">
          <label htmlFor={stateId} className="text-sm font-medium text-[--color-text-primary]">
            State
          </label>
          <input
            id={stateId}
            type="text"
            autoComplete="address-level1"
            maxLength={3}
            value={data.locationState ?? ''}
            onChange={(e) => updateData({ locationState: e.target.value })}
            placeholder="TX"
            className={inputClass}
          />
        </div>
      </div>

      {/* Modality segmented control */}
      <div>
        <p className="mb-2 text-sm font-medium text-[--color-text-primary]">
          How do you work with clients?
        </p>

        <div
          role="radiogroup"
          aria-label="Working modality"
          className="
            flex w-full overflow-hidden
            rounded-[--radius-lg] border border-[--color-border]
          "
        >
          {MODALITY_OPTIONS.map(({ value, label }, i) => {
            const active = data.modality === value
            const isLast = i === MODALITY_OPTIONS.length - 1
            return (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => updateData({ modality: value })}
                className={`
                  flex-1 min-h-[44px] text-sm font-medium
                  transition-all duration-150
                  focus-visible:ring-2 focus-visible:ring-inset ring-[--color-brand]
                  ${!isLast ? 'border-r border-[--color-border]' : ''}
                  ${active
                    ? 'bg-[--color-brand] text-white'
                    : 'bg-[--color-surface] text-[--color-text-secondary] hover:bg-[--color-surface-2]'
                  }
                `}
              >
                {label}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
