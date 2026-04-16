'use client'

import { useId } from 'react'
import { useOnboardingStore } from '@/lib/onboarding/store'

const MAX_CHARS  = 120
const WARN_CHARS = 100

export function Step3Tagline() {
  const { data, updateData } = useOnboardingStore()
  const id    = useId()
  const value = data.tagline ?? ''
  const count = value.length

  const counterColour =
    count >= MAX_CHARS  ? 'text-red-500' :
    count >= WARN_CHARS ? 'text-[--color-accent]' :
                          'text-[--color-text-muted]'

  function handleChange(raw: string) {
    if (raw.length <= MAX_CHARS) updateData({ tagline: raw })
  }

  function handleSuggest() {
    // TODO: call AI suggestion action
    console.log('[Step3] AI tagline suggestion — not yet implemented')
  }

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-[--color-text-muted]">
        Finish this sentence:
      </p>

      {/* Prefix + textarea combined */}
      <div
        className="
          rounded-[--radius-lg] border border-[--color-border] bg-[--color-surface]
          transition-all duration-150
          focus-within:border-[--color-brand]
          focus-within:ring-2 focus-within:ring-[--color-brand]
        "
      >
        {/* "I help" prefix */}
        <div className="px-4 pt-3 pb-0">
          <span
            className="text-lg italic font-medium text-[--color-text-muted] select-none"
            aria-hidden="true"
          >
            I&nbsp;help&nbsp;
          </span>
        </div>

        <label htmlFor={id} className="sr-only">
          Complete the sentence: I help…
        </label>
        <textarea
          id={id}
          rows={3}
          maxLength={MAX_CHARS}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="busy professionals escape burnout and reclaim their energy"
          aria-describedby={`${id}-count`}
          className="
            w-full resize-none bg-transparent
            px-4 pb-3 pt-1 text-sm leading-relaxed
            text-[--color-text-primary] placeholder:text-[--color-text-muted]
            focus:outline-none
          "
        />
      </div>

      {/* Footer: suggest button + counter */}
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={handleSuggest}
          className="
            text-xs text-[--color-brand] hover:underline
            transition-all duration-150
            focus-visible:ring-2 ring-[--color-brand] ring-offset-1 rounded-sm
          "
        >
          Suggest one for me →
        </button>

        <span
          id={`${id}-count`}
          role="status"
          aria-live="polite"
          aria-label={`${count} of ${MAX_CHARS} characters`}
          className={`text-xs tabular-nums transition-colors duration-150 ${counterColour}`}
        >
          {count}/{MAX_CHARS}
        </span>
      </div>
    </div>
  )
}
