"use client"

import { useTransition }                                   from "react"
import { createCheckoutSessionAction, createPortalSessionAction } from "./actions"

export function CheckoutButton({ plan, label }) {
  const [pending, startTransition] = useTransition()

  return (
    <button
      onClick={() => startTransition(() => createCheckoutSessionAction(plan))}
      disabled={pending}
      className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      {pending ? "Redirecting…" : label}
    </button>
  )
}

export function PortalButton() {
  const [pending, startTransition] = useTransition()

  return (
    <button
      onClick={() => startTransition(() => createPortalSessionAction())}
      disabled={pending}
      className="text-sm text-blue-600 hover:underline disabled:opacity-50"
    >
      {pending ? "Opening portal…" : "Manage billing →"}
    </button>
  )
}
