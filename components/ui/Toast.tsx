'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence }           from 'framer-motion'
import { X }                                 from 'lucide-react'

// ── Types ─────────────────────────────────────────────────────────────────────

export type ToastVariant = 'success' | 'error' | 'info'

export interface ToastItem {
  id:      string
  message: string
  variant: ToastVariant
}

// ── Strings ───────────────────────────────────────────────────────────────────

const ICON: Record<ToastVariant, string> = {
  success: '✓',
  error:   '✕',
  info:    'ℹ',
}

// ── Variant colours (intentional — no design token covers toast state colours) ─

const BG: Record<ToastVariant, string> = {
  success: 'bg-green-600',
  error:   'bg-red-600',
  info:    'bg-[--color-brand]',
}

// ── Single Toast ──────────────────────────────────────────────────────────────

function Toast({
  item,
  onClose,
}: {
  item:    ToastItem
  onClose: (id: string) => void
}) {
  useEffect(() => {
    const t = setTimeout(() => onClose(item.id), 3000)
    return () => clearTimeout(t)
  }, [item.id, onClose])

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      animate={{ opacity: 1, y: 0,  scale: 1    }}
      exit={{    opacity: 0, y: 16, scale: 0.95, transition: { duration: 0.15 } }}
      transition={{ type: 'spring', damping: 24, stiffness: 320 }}
      role="status"
      aria-live="polite"
      className={`
        flex min-w-[220px] max-w-[340px] items-center justify-between gap-3
        rounded-[--radius-lg] px-4 py-3
        text-sm font-medium text-white shadow-lg
        ${BG[item.variant]}
      `}
    >
      <span className="flex items-center gap-2">
        <span aria-hidden="true">{ICON[item.variant]}</span>
        {item.message}
      </span>

      <button
        type="button"
        onClick={() => onClose(item.id)}
        aria-label="Dismiss notification"
        className="
          ml-1 flex h-6 w-6 shrink-0 items-center justify-center
          rounded transition-colors hover:bg-white/20
          focus-visible:ring-2 ring-white ring-offset-1
        "
      >
        <X size={13} aria-hidden="true" />
      </button>
    </motion.div>
  )
}

// ── Container ─────────────────────────────────────────────────────────────────

export function ToastContainer({
  toasts,
  onClose,
}: {
  toasts:  ToastItem[]
  onClose: (id: string) => void
}) {
  return (
    <div
      aria-label="Notifications"
      className="fixed bottom-6 right-4 z-[200] flex flex-col items-end gap-2 sm:right-6"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((t) => (
          <Toast key={t.id} item={t} onClose={onClose} />
        ))}
      </AnimatePresence>
    </div>
  )
}

// ── useToast hook ─────────────────────────────────────────────────────────────

export function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const showToast = useCallback((message: string, variant: ToastVariant = 'info') => {
    const id = crypto.randomUUID()
    setToasts((prev) => [...prev, { id, message, variant }])
  }, [])

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return { toasts, showToast, dismiss }
}
