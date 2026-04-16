// ─────────────────────────────────────────────────────────────────────────────
// Onboarding state machine — Zustand store with localStorage persistence
// ─────────────────────────────────────────────────────────────────────────────
// Usage:
//   const { data, goNext, updateData, canAdvance } = useOnboardingStore()
//
// Persistence:
//   Only `data` and `currentStepIndex` are written to localStorage.
//   `steps` is never serialised — function references can't be JSON-stringified.
//   On rehydration the store merges persisted scalars with the live steps array.
// ─────────────────────────────────────────────────────────────────────────────

'use client'

import { create }   from 'zustand'
import { persist }  from 'zustand/middleware'
import type {
  OnboardingData,
  OnboardingStep,
} from './types'

// ── Initial data ──────────────────────────────────────────────────────────────

const INITIAL_DATA: OnboardingData = {
  services:       [],
  contactMethods: [],
}

// ── Step definitions ──────────────────────────────────────────────────────────
// Defined as a module-level constant so they are never persisted (functions
// cannot be serialised to JSON) but are always available after rehydration.

const STEPS: OnboardingStep[] = [
  {
    id:       'businessType',
    title:    'What kind of business do you run?',
    required: true,
    validate: (data) => data.businessType !== undefined,
  },
  {
    id:       'nameAndBusiness',
    title:    "What's your name and business name?",
    required: true,
    validate: (data) => (data.ownerName?.trim().length ?? 0) > 0,
  },
  {
    id:       'tagline',
    title:    'Who do you help and how?',
    required: true,
    validate: (data) => (data.tagline?.trim().length ?? 0) > 0,
  },
  {
    id:       'services',
    title:    'What services do you offer?',
    required: true,
    validate: (data) =>
      data.services.length >= 1 &&
      data.services[0].name.trim() !== '',
  },
  {
    id:       'locationAndModality',
    title:    'Where are you based?',
    required: true,
    validate: (data) =>
      (data.locationCity?.trim().length ?? 0) > 0 &&
      data.modality !== undefined,
  },
  {
    id:       'contactMethod',
    title:    'How should clients reach you?',
    required: true,
    validate: (data) => data.contactMethods.length >= 1,
  },
  {
    id:       'stylePreference',
    title:    'Pick your style',
    required: true,
    validate: (data) => data.stylePreference !== undefined,
  },
]

// ── Store interface ───────────────────────────────────────────────────────────

interface OnboardingStore {
  // ── State
  data:             OnboardingData
  currentStepIndex: number
  steps:            OnboardingStep[]

  // ── Navigation
  setStep:  (index: number) => void
  goNext:   () => void
  goBack:   () => void

  // ── Data
  updateData: (partial: Partial<OnboardingData>) => void
  reset:      () => void

  // ── Derived (run synchronously from current state)
  canAdvance: () => boolean
  isComplete: () => boolean
}

// ── Store ─────────────────────────────────────────────────────────────────────

export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    (set, get) => ({
      // ── Initial state ───────────────────────────────────────────────────────
      data:             INITIAL_DATA,
      currentStepIndex: 0,
      steps:            STEPS,

      // ── Navigation ──────────────────────────────────────────────────────────

      setStep: (index) => {
        const { steps } = get()
        if (index >= 0 && index < steps.length) {
          set({ currentStepIndex: index })
        }
      },

      goNext: () => {
        const { currentStepIndex, steps, canAdvance } = get()
        if (canAdvance() && currentStepIndex < steps.length - 1) {
          set({ currentStepIndex: currentStepIndex + 1 })
        }
      },

      goBack: () => {
        const { currentStepIndex } = get()
        if (currentStepIndex > 0) {
          set({ currentStepIndex: currentStepIndex - 1 })
        }
      },

      // ── Data ────────────────────────────────────────────────────────────────

      updateData: (partial) =>
        set((state) => ({
          data: { ...state.data, ...partial },
        })),

      reset: () =>
        set({
          data:             INITIAL_DATA,
          currentStepIndex: 0,
        }),

      // ── Derived ─────────────────────────────────────────────────────────────

      canAdvance: () => {
        const { steps, currentStepIndex, data } = get()
        const step = steps[currentStepIndex]
        // step is always defined — currentStepIndex is bounds-checked above
        return step?.validate(data) ?? false
      },

      isComplete: () => {
        const { steps, data } = get()
        return steps
          .filter((s) => s.required)
          .every((s)  => s.validate(data))
      },
    }),

    {
      // ── Persist config ──────────────────────────────────────────────────────
      name: 'vd-onboarding',

      // Only persist scalars — never the steps array (contains functions).
      // On rehydration Zustand merges these back into the live store shape.
      partialize: (state) => ({
        data:             state.data,
        currentStepIndex: state.currentStepIndex,
      }),
    },
  ),
)
