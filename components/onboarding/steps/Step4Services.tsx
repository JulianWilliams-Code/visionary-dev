'use client'

import { useId, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus, X, ChevronDown, ChevronUp } from 'lucide-react'
import { useOnboardingStore } from '@/lib/onboarding/store'
import type { Service }       from '@/lib/onboarding/types'

const MAX_ROWS = 3

// ── ServiceRow ────────────────────────────────────────────────────────────────

function ServiceRow({
  service,
  index,
  canRemove,
  onUpdate,
  onRemove,
}: {
  service:   Service
  index:     number
  canRemove: boolean
  onUpdate:  (patch: Partial<Service>) => void
  onRemove:  () => void
}) {
  const [expanded, setExpanded] = useState(false)
  const nameId  = useId()
  const priceId = useId()
  const descId  = useId()

  const fieldClass = `
    min-h-[44px] w-full rounded-[--radius-md]
    border border-[--color-border] bg-[--color-surface]
    px-3 py-2 text-sm
    text-[--color-text-primary] placeholder:text-[--color-text-muted]
    transition-all duration-150
    focus:border-[--color-brand] focus:outline-none focus:ring-1 focus:ring-[--color-brand]
  `

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
      transition={{ duration: 0.2 }}
      className="rounded-[--radius-lg] border border-[--color-border] bg-[--color-surface] p-4 space-y-3"
    >
      {/* Name + Price + Remove row */}
      <div className="flex gap-3 items-end">
        <div className="flex-1 flex flex-col gap-1">
          <label htmlFor={nameId} className="text-xs font-medium text-[--color-text-muted]">
            Service {index + 1}
          </label>
          <input
            id={nameId}
            type="text"
            value={service.name}
            onChange={(e) => onUpdate({ name: e.target.value })}
            placeholder="e.g. 1-on-1 Coaching"
            className={fieldClass}
          />
        </div>

        <div className="w-28 shrink-0 flex flex-col gap-1">
          <label htmlFor={priceId} className="text-xs font-medium text-[--color-text-muted]">
            Price
          </label>
          <input
            id={priceId}
            type="text"
            value={service.price ?? ''}
            onChange={(e) => onUpdate({ price: e.target.value })}
            placeholder="$99/mo"
            className={fieldClass}
          />
        </div>

        <button
          type="button"
          onClick={onRemove}
          disabled={!canRemove}
          aria-label={`Remove service ${index + 1}`}
          className="
            mb-0.5 min-h-[44px] min-w-[44px] flex items-center justify-center
            rounded-[--radius-md] text-[--color-text-muted]
            hover:bg-red-50 hover:text-red-500
            disabled:cursor-not-allowed disabled:opacity-30
            transition-all duration-150
            focus-visible:ring-2 ring-[--color-brand] ring-offset-2 shrink-0
          "
        >
          <X size={16} aria-hidden="true" />
        </button>
      </div>

      {/* "Contact for pricing" pill — shows when price is empty */}
      {!service.price && service.name && (
        <p className="text-xs">
          <span className="
            inline-flex items-center gap-1 px-2 py-0.5 rounded-full
            border border-[--color-border] bg-[--color-surface-2]
            text-[--color-text-muted]
          ">
            Contact for pricing
          </span>
        </p>
      )}

      {/* Description toggle */}
      <div>
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          aria-controls={descId}
          className="
            inline-flex items-center gap-1 text-xs text-[--color-brand]
            hover:underline transition-all duration-150
            focus-visible:ring-2 ring-[--color-brand] ring-offset-1 rounded-sm
          "
        >
          {expanded
            ? <><ChevronUp size={12} aria-hidden="true" /> Hide description</>
            : <><ChevronDown size={12} aria-hidden="true" /> + Add description</>
          }
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              id={descId}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="overflow-hidden"
            >
              <div className="pt-2">
                <label htmlFor={`${descId}-input`} className="sr-only">
                  Description for {service.name || `service ${index + 1}`}
                </label>
                <textarea
                  id={`${descId}-input`}
                  rows={2}
                  value={service.description ?? ''}
                  onChange={(e) => onUpdate({ description: e.target.value })}
                  placeholder="Brief description of this service…"
                  className="
                    w-full resize-none rounded-[--radius-md]
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
    </motion.div>
  )
}

// ── Step4Services ─────────────────────────────────────────────────────────────

export function Step4Services() {
  const { data, updateData } = useOnboardingStore()

  // Ensure at least one row is always visible
  const services = data.services.length > 0 ? data.services : [{ name: '' }]

  // Stable keys — survive index shifts when rows are removed
  const keysRef = useRef<string[]>([])
  while (keysRef.current.length < services.length) {
    keysRef.current.push(crypto.randomUUID())
  }

  function updateService(i: number, patch: Partial<Service>) {
    updateData({ services: services.map((s, idx) => idx === i ? { ...s, ...patch } : s) })
  }

  function addService() {
    if (services.length >= MAX_ROWS) return
    keysRef.current.push(crypto.randomUUID())
    updateData({ services: [...services, { name: '' }] })
  }

  function removeService(i: number) {
    if (services.length <= 1) return
    keysRef.current.splice(i, 1)
    updateData({ services: services.filter((_, idx) => idx !== i) })
  }

  return (
    <div className="space-y-3">
      <AnimatePresence initial={false}>
        {services.map((service, i) => (
          <ServiceRow
            key={keysRef.current[i]}
            service={service}
            index={i}
            canRemove={services.length > 1}
            onUpdate={(patch) => updateService(i, patch)}
            onRemove={() => removeService(i)}
          />
        ))}
      </AnimatePresence>

      {services.length < MAX_ROWS && (
        <button
          type="button"
          onClick={addService}
          className="
            w-full min-h-[44px] flex items-center justify-center gap-2
            rounded-[--radius-lg] border-2 border-dashed border-[--color-border]
            text-sm text-[--color-text-muted]
            hover:border-[--color-brand] hover:text-[--color-brand]
            transition-all duration-150
            focus-visible:ring-2 ring-[--color-brand] ring-offset-2
          "
        >
          <Plus size={16} aria-hidden="true" />
          Add service
        </button>
      )}
    </div>
  )
}
