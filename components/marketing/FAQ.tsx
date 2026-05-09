'use client'

import { useState, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

// ── FAQ data ──────────────────────────────────────────────────────────────────

const ITEMS = [
  {
    q: 'Will my generated site actually look professional?',
    a: 'Yes. Every site is generated from a template system built specifically for service businesses — not a generic drag-and-drop tool. We show you live examples before you sign up so there are no surprises.',
  },
  {
    q: 'Can I edit my site after it\'s generated?',
    a: 'Yes. Your dashboard has a structured editor for everything: your services, contact info, photos, and style preference. No code needed.',
  },
  {
    q: 'What happens to my site if I cancel?',
    a: 'Your site stays live on its free subdomain as long as you keep a free account. Cancelling Pro removes the custom domain and paid features — your site and content stay intact.',
  },
  {
    q: 'Can I use my own domain name?',
    a: 'Yes, on the Pro plan ($19/mo). We give you step-by-step DNS setup instructions and handle the SSL certificate automatically.',
  },
  {
    q: 'What kinds of businesses is this for?',
    a: 'Personal trainers, life and business coaches, nutritionists, yoga instructors, therapists, and consultants. If you sell a service and need clients to find and book you online, it\'s for you.',
  },
  {
    q: 'How is this different from Wix or Squarespace?',
    a: 'Wix and Squarespace give you a blank canvas and hope for the best. We give you a finished, professional site. Answer 7 questions and we write the copy, set the layout, and wire up your booking — in 2 minutes, not 2 weekends.',
  },
] as const

// ── FAQ ───────────────────────────────────────────────────────────────────────

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const baseId = useId()

  function toggle(i: number) {
    setOpenIndex((prev) => (prev === i ? null : i))
  }

  function handleKeyDown(e: React.KeyboardEvent, i: number) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggle(i)
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = (i + 1) % ITEMS.length
      document.getElementById(`faq-trigger-${baseId}-${next}`)?.focus()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const prev = (i - 1 + ITEMS.length) % ITEMS.length
      document.getElementById(`faq-trigger-${baseId}-${prev}`)?.focus()
    }
  }

  return (
    <section className="bg-[--color-surface-2] px-4 py-24" aria-labelledby="faq-heading">
      <div className="mx-auto max-w-[720px]">

        {/* Heading */}
        <div className="mb-12 text-center">
          <h2
            id="faq-heading"
            className="font-bold text-[--color-text-primary]"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)' }}
          >
            Questions? Answered.
          </h2>
          <p className="mt-3 text-base text-[--color-text-muted]">
            Everything you need to know before you build.
          </p>
        </div>

        {/* Accordion */}
        <div className="divide-y divide-[--color-border] rounded-2xl border border-[--color-border] bg-[--color-surface] overflow-hidden">
          {ITEMS.map((item, i) => {
            const isOpen    = openIndex === i
            const triggerId = `faq-trigger-${baseId}-${i}`
            const panelId   = `faq-panel-${baseId}-${i}`

            return (
              <div key={i}>
                {/* Trigger */}
                <div
                  id={triggerId}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  className="
                    flex min-h-[52px] w-full cursor-pointer items-center
                    justify-between gap-4 px-5 py-4
                    text-left transition-colors duration-150
                    hover:bg-[--color-surface-2]
                    focus-visible:outline-none focus-visible:ring-2
                    focus-visible:ring-[--color-brand] focus-visible:ring-inset
                  "
                >
                  <span className="text-sm font-medium text-[--color-text-primary] lg:text-base">
                    {item.q}
                  </span>

                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] as const }}
                    className="shrink-0 text-[--color-text-muted]"
                    aria-hidden="true"
                  >
                    <ChevronDown size={18} />
                  </motion.span>
                </div>

                {/* Answer */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={triggerId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] as const }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 pt-1 text-sm leading-relaxed text-[--color-text-secondary] lg:text-base">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
