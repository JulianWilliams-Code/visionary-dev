'use client'

import { useState, useId } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useOnboardingStore } from '@/lib/onboarding/store'
import type { ContactMethod } from '@/lib/onboarding/types'

// ── Option config ─────────────────────────────────────────────────────────────

type RevealType = 'phone' | 'link' | null

const OPTIONS: {
  value:       ContactMethod
  label:       string
  reveals:     RevealType
  inputLabel?: string
  inputPlaceholder?: string
  inputType?: string
  inputAutoComplete?: string
}[] = [
  {
    value:  'CONTACT_FORM',
    label:  'Contact form (email)',
    reveals: null,
  },
  {
    value:             'PHONE',
    label:             'Phone number',
    reveals:           'phone',
    inputLabel:        'Your phone number',
    inputPlaceholder:  '(512) 555-0123',
    inputType:         'tel',
    inputAutoComplete: 'tel',
  },
  {
    value:             'FREE_CALL',
    label:             'Book a free call',
    reveals:           'link',
    inputLabel:        'Booking link',
    inputPlaceholder:  'https://calendly.com/yourname/free',
    inputType:         'url',
    inputAutoComplete: 'url',
  },
  {
    value:             'PAID_SESSION',
    label:             'Book a paid session',
    reveals:           'link',
    inputLabel:        'Booking link',
    inputPlaceholder:  'https://calendly.com/yourname/session',
    inputType:         'url',
    inputAutoComplete: 'url',
  },
  {
    value:  'WHATSAPP',
    label:  'WhatsApp',
    reveals: null,
  },
]

// ── CheckboxOption ────────────────────────────────────────────────────────────

function CheckboxOption({
  option,
  checked,
  onToggle,
  inputValue,
  onInputChange,
}: {
  option:        typeof OPTIONS[number]
  checked:       boolean
  onToggle:      () => void
  inputValue:    string
  onInputChange: (v: string) => void
}) {
  const checkId = useId()
  const inputId = useId()

  return (
    <div className="overflow-hidden rounded-[--radius-lg] border border-[--color-border] transition-colors duration-150">
      {/* Checkbox row */}
      <label
        htmlFor={checkId}
        className={`
          flex min-h-[52px] cursor-pointer items-center gap-3 px-4 py-3
          transition-all duration-150
          ${checked
            ? 'bg-[--color-brand-light]'
            : 'bg-[--color-surface] hover:bg-[--color-surface-2]'
          }
        `}
      >
        {/* Hidden native checkbox — accessible, styled via sibling span */}
        <input
          type="checkbox"
          id={checkId}
          checked={checked}
          onChange={onToggle}
          className="sr-only"
        />
        {/* Custom checkbox box */}
        <span
          aria-hidden="true"
          className={`
            flex h-5 w-5 shrink-0 items-center justify-center rounded-[--radius-sm]
            border-2 transition-all duration-150
            ${checked
              ? 'border-[--color-brand] bg-[--color-brand]'
              : 'border-[--color-border] bg-[--color-surface]'
            }
          `}
        >
          {checked && (
            <svg className="h-3 w-3 text-white" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path
                d="M2 6l3 3 5-5"
                stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"
              />
            </svg>
          )}
        </span>

        <span className={`text-sm font-medium ${checked ? 'text-[--color-brand]' : 'text-[--color-text-primary]'}`}>
          {option.label}
        </span>
      </label>

      {/* Revealed input */}
      <AnimatePresence>
        {checked && option.reveals && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="overflow-hidden border-t border-[--color-border]"
          >
            <div className="px-4 py-3">
              <label
                htmlFor={inputId}
                className="mb-1.5 block text-xs font-medium text-[--color-text-muted]"
              >
                {option.inputLabel}
              </label>
              <input
                id={inputId}
                type={option.inputType ?? 'text'}
                autoComplete={option.inputAutoComplete}
                value={inputValue}
                onChange={(e) => onInputChange(e.target.value)}
                placeholder={option.inputPlaceholder}
                className="
                  min-h-[44px] w-full rounded-[--radius-md]
                  border border-[--color-border] bg-[--color-surface]
                  px-3 py-2 text-sm
                  text-[--color-text-primary] placeholder:text-[--color-text-muted]
                  transition-all duration-150
                  focus:border-[--color-brand] focus:outline-none focus:ring-1 focus:ring-[--color-brand]
                "
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Step6Contact ──────────────────────────────────────────────────────────────

export function Step6Contact() {
  const { data, updateData } = useOnboardingStore()
  const [touched, setTouched] = useState(false)
  const showError = touched && data.contactMethods.length === 0

  function toggle(value: ContactMethod) {
    setTouched(true)
    const next = data.contactMethods.includes(value)
      ? data.contactMethods.filter((m) => m !== value)
      : [...data.contactMethods, value]
    updateData({ contactMethods: next })
  }

  function inputValueFor(option: typeof OPTIONS[number]): string {
    if (option.reveals === 'phone') return data.phoneNumber ?? ''
    if (option.reveals === 'link')  return data.bookingLink ?? ''
    return ''
  }

  function onInputChange(option: typeof OPTIONS[number], v: string) {
    if (option.reveals === 'phone') updateData({ phoneNumber: v })
    if (option.reveals === 'link')  updateData({ bookingLink: v })
  }

  return (
    <div className="space-y-2.5">
      {OPTIONS.map((option) => (
        <CheckboxOption
          key={option.value}
          option={option}
          checked={data.contactMethods.includes(option.value)}
          onToggle={() => toggle(option.value)}
          inputValue={inputValueFor(option)}
          onInputChange={(v) => onInputChange(option, v)}
        />
      ))}

      {/* Inline error */}
      {showError && (
        <p role="alert" className="pt-1 text-sm text-red-500">
          Please select at least one contact method.
        </p>
      )}
    </div>
  )
}
