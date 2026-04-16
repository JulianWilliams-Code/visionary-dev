// ─────────────────────────────────────────────────────────────────────────────
// Onboarding state-machine types
// All types are exported — import from '@/lib/onboarding/types'
// ─────────────────────────────────────────────────────────────────────────────

export enum BusinessType {
  PERSONAL_TRAINER = 'PERSONAL_TRAINER',
  LIFE_COACH       = 'LIFE_COACH',
  NUTRITIONIST     = 'NUTRITIONIST',
  YOGA_INSTRUCTOR  = 'YOGA_INSTRUCTOR',
  THERAPIST        = 'THERAPIST',
  OTHER_SERVICE    = 'OTHER_SERVICE',
}

export enum StylePreference {
  CLEAN_PROFESSIONAL = 'CLEAN_PROFESSIONAL',
  BOLD_ENERGETIC     = 'BOLD_ENERGETIC',
  WARM_APPROACHABLE  = 'WARM_APPROACHABLE',
}

export type ContactMethod =
  | 'CONTACT_FORM'
  | 'PHONE'
  | 'FREE_CALL'
  | 'PAID_SESSION'
  | 'WHATSAPP'

export interface Service {
  name: string
  price?: string
  description?: string
}

export interface OnboardingData {
  businessType?:    BusinessType
  ownerName?:       string
  businessName?:    string
  tagline?:         string
  services:         Service[]
  locationCity?:    string
  locationState?:   string
  modality?:        'in_person' | 'online' | 'both'
  contactMethods:   ContactMethod[]
  phoneNumber?:     string
  bookingLink?:     string
  stylePreference?: StylePreference
}

export type StepId =
  | 'businessType'
  | 'nameAndBusiness'
  | 'tagline'
  | 'services'
  | 'locationAndModality'
  | 'contactMethod'
  | 'stylePreference'

export interface OnboardingStep {
  id:       StepId
  title:    string
  required: boolean
  validate: (data: OnboardingData) => boolean
}
