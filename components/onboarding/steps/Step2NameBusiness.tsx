'use client'

import { useId } from 'react'
import { useOnboardingStore } from '@/lib/onboarding/store'
import { BusinessType }       from '@/lib/onboarding/types'

// ── Helpers ───────────────────────────────────────────────────────────────────

const BUSINESS_SUFFIX: Partial<Record<BusinessType, string>> = {
  [BusinessType.PERSONAL_TRAINER]: 'Fitness',
  [BusinessType.LIFE_COACH]:       'Coaching',
  [BusinessType.NUTRITIONIST]:     'Nutrition',
  [BusinessType.YOGA_INSTRUCTOR]:  'Yoga',
  [BusinessType.THERAPIST]:        'Therapy & Wellness',
  [BusinessType.OTHER_SERVICE]:    'Services',
}

const inputClass = `
  min-h-[44px] w-full rounded-[--radius-lg]
  border border-[--color-border] bg-[--color-surface]
  px-4 py-2.5 text-sm
  text-[--color-text-primary] placeholder:text-[--color-text-muted]
  transition-all duration-150
  focus:border-[--color-brand] focus:outline-none
  focus:ring-2 focus:ring-[--color-brand] focus:ring-offset-0
`

// ── Component ─────────────────────────────────────────────────────────────────

export function Step2NameBusiness() {
  const { data, updateData } = useOnboardingStore()
  const ownerId    = useId()
  const businessId = useId()

  const suggested =
    data.ownerName?.trim() && data.businessType
      ? `${data.ownerName.trim()} ${BUSINESS_SUFFIX[data.businessType] ?? ''}`
      : ''

  return (
    <div className="space-y-6">
      {/* Owner name */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor={ownerId} className="text-sm font-medium text-[--color-text-primary]">
          Your name
        </label>
        <input
          id={ownerId}
          type="text"
          autoComplete="given-name"
          value={data.ownerName ?? ''}
          onChange={(e) => updateData({ ownerName: e.target.value })}
          placeholder="e.g. Marcus Johnson"
          className={inputClass}
        />
      </div>

      {/* Business name */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor={businessId} className="text-sm font-medium text-[--color-text-primary]">
          Business name
          <span className="ml-1.5 font-normal text-[--color-text-muted]">(optional)</span>
        </label>
        <input
          id={businessId}
          type="text"
          autoComplete="organization"
          value={data.businessName ?? ''}
          onChange={(e) => updateData({ businessName: e.target.value })}
          placeholder={suggested || 'e.g. Marcus Johnson Fitness'}
          className={inputClass}
        />

        {/* Auto-suggestion */}
        {suggested && !data.businessName && (
          <p className="text-xs text-[--color-text-muted]">
            Suggested:{' '}
            <button
              type="button"
              onClick={() => updateData({ businessName: suggested })}
              className="
                text-[--color-brand] hover:underline
                focus-visible:ring-2 ring-[--color-brand] ring-offset-1 rounded-sm
                transition-all duration-150
              "
            >
              {suggested}
            </button>
          </p>
        )}
      </div>
    </div>
  )
}
