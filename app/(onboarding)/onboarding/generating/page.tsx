'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter }                   from 'next/navigation'
import { useOnboardingStore }          from '@/lib/onboarding/store'
import { GenerationScreen }            from '@/components/onboarding/GenerationScreen'
import { createSiteFromOnboarding }    from '@/app/actions/createSiteFromOnboarding'
import type { CreateSiteResult }       from '@/app/actions/createSiteFromOnboarding'
import type { ActionResponse }         from '@/types'

// ── Constants ─────────────────────────────────────────────────────────────────

const MIN_DISPLAY_MS = 3_500

const delay = (ms: number) => new Promise<void>((res) => setTimeout(res, ms))

function makePromise(
  data: Parameters<typeof createSiteFromOnboarding>[0],
): Promise<ActionResponse<CreateSiteResult>> {
  return Promise.all([
    createSiteFromOnboarding(data),
    delay(MIN_DISPLAY_MS),
  ]).then(([result]) => result)
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function GeneratingPage() {
  const router    = useRouter()
  const { data }  = useOnboardingStore()

  const [attempt, setAttempt] = useState(0)
  const [promise, setPromise] =
    useState<Promise<ActionResponse<CreateSiteResult>> | null>(null)

  const startedRef = useRef(false)

  useEffect(() => {
    // Guard: send back to onboarding if store is empty (direct URL nav)
    if (!data.businessType) {
      router.replace('/onboarding')
      return
    }
    // Strict-mode safe — only fire the action once
    if (startedRef.current) return
    startedRef.current = true
    setPromise(makePromise(data))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  function handleRetry() {
    setAttempt((a) => a + 1)
    setPromise(makePromise(data))
  }

  // Nothing to show until effect has run and promise is set
  if (!promise) return null

  return (
    <GenerationScreen
      key={attempt}
      promise={promise}
      businessName={data.businessName ?? data.ownerName ?? 'Your business'}
      onRetry={handleRetry}
    />
  )
}
