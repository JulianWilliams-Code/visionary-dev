'use client'

import { useEffect } from 'react'
import { OnboardingShell }    from '@/components/onboarding/OnboardingShell'
import { useOnboardingStore } from '@/lib/onboarding/store'

// Reset the store on every fresh visit to /onboarding so stale
// localStorage state from previous sessions doesn't break the flow.
export default function OnboardingPage() {
  const reset = useOnboardingStore((s) => s.reset)

  useEffect(() => {
    reset()
  }, [reset])

  return <OnboardingShell />
}
