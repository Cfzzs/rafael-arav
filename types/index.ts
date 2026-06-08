// ─────────────────────────────────────────────
// types/index.ts
// Central TypeScript definitions for the portal
// ─────────────────────────────────────────────

/** A single stat displayed in the Hero section */
export interface HeroStat {
  value: number
  suffix: string
  label: string
}

/** A pain-vs-solution card */
export interface PainSolutionCard {
  icon: string
  pain: string
  solution: string
}

/** A show format card */
export interface ShowFormat {
  id: string
  icon: string
  title: string
  description: string
  idealFor: string
  duration: string
  ctaLabel: string
  accent: boolean
}

/** Attendee range options */
export type AttendeeRange = '50-100' | '100-300' | '300-500' | '500-1000' | '1000+'

/** Event type options */
export type EventType =
  | 'convention'
  | 'party'
  | 'sipat'
  | 'training'
  | 'kickoff'
  | 'other'

/** How they found Rafael */
export type HowFound =
  | 'instagram'
  | 'referral'
  | 'google'
  | 'linkedin'
  | 'seen_live'
  | 'other'

/** Date status */
export type DateStatus = 'confirmed' | 'planning' | 'flexible'

// ── Multi-step form data ──────────────────────

export interface Step1Data {
  fullName:  string
  role:      string
  company:   string
  cnpj?:     string
  email:     string
  phone:     string
}

export interface Step2Data {
  eventType:      EventType
  eventTypeOther?: string
  eventDate:      string
  city:           string
  attendees:      AttendeeRange
  customTheme?:   boolean
}

export interface Step3Data {
  howFound?:          HowFound
  hasConfirmedDate:   DateStatus
  additionalMessage?: string
}

export type BudgetFormData = Step1Data & Step2Data & Step3Data

/** Client logo entry */
export interface ClientLogo {
  name:   string
  sector: string
}

/** Testimonial */
export interface Testimonial {
  quote:    string
  name:     string
  role:     string
  company:  string
}
