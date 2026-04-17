'use client'

import {
  useState, useRef, useCallback, useId,
}                                       from 'react'
import { motion, AnimatePresence }      from 'framer-motion'
import {
  ChevronDown, Plus, X,
  ChevronUp, Building2, Briefcase,
  Phone, Image as ImageIcon, Palette, Globe,
}                                       from 'lucide-react'
import { createBrowserClient }          from '@supabase/ssr'
import { updateSite }                   from '@/app/actions/updateSite'
import { ToastContainer, useToast }     from '@/components/ui/Toast'
import type { Site, ServiceRow, SubscriptionPlan } from '@/lib/supabase/types'

// ── Strings ───────────────────────────────────────────────────────────────────

const SAVE_STATUS_LABEL: Record<string, string> = {
  idle:    '',
  unsaved: 'Unsaved changes',
  saving:  'Saving…',
  saved:   'Saved',
  error:   'Save failed',
}

const CONTACT_OPTIONS = [
  { value: 'CONTACT_FORM',  label: 'Contact form (email)', reveals: null      as null   },
  { value: 'PHONE',         label: 'Phone number',         reveals: 'phone'   as 'phone' },
  { value: 'FREE_CALL',     label: 'Book a free call',     reveals: 'link'    as 'link'  },
  { value: 'PAID_SESSION',  label: 'Book a paid session',  reveals: 'link'    as 'link'  },
  { value: 'WHATSAPP',      label: 'WhatsApp',             reveals: null      as null   },
] as const

const STYLE_OPTIONS = [
  {
    value:       'CLEAN_PROFESSIONAL',
    label:       'Clean & Professional',
    description: 'Blue tones, structured layout',
    // Decorative preview gradient — intentional design values, not UI tokens
    gradient:    'linear-gradient(135deg, #1E3A8A 0%, #93C5FD 100%)',
  },
  {
    value:       'BOLD_ENERGETIC',
    label:       'Bold & Energetic',
    description: 'High contrast, strong presence',
    gradient:    'linear-gradient(135deg, #DC2626 0%, #1F2937 100%)',
  },
  {
    value:       'WARM_APPROACHABLE',
    label:       'Warm & Approachable',
    description: 'Amber tones, rounded corners',
    gradient:    'linear-gradient(135deg, #D97706 0%, #FEF3C7 100%)',
  },
]

// ── Shared input class ────────────────────────────────────────────────────────

const FIELD = `
  min-h-[44px] w-full rounded-[--radius-md]
  border border-[--color-border] bg-[--color-surface]
  px-3 py-2 text-sm
  text-[--color-text-primary] placeholder:text-[--color-text-muted]
  transition-all duration-150
  focus:border-[--color-brand] focus:outline-none
  focus:ring-2 focus:ring-[--color-brand] focus:ring-offset-0
  focus-visible:ring-2 ring-[--color-brand] ring-offset-2
`

// ── AccordionSection ──────────────────────────────────────────────────────────

function AccordionSection({
  id, title, icon, isOpen, onToggle, children,
}: {
  id:       string
  title:    string
  icon:     React.ReactNode
  isOpen:   boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  return (
    <div className="overflow-hidden rounded-[--radius-lg] border border-[--color-border] bg-[--color-surface]">
      <button
        type="button"
        id={`section-btn-${id}`}
        aria-expanded={isOpen}
        aria-controls={`section-body-${id}`}
        onClick={onToggle}
        className="
          flex w-full items-center justify-between px-5 py-4 text-left
          hover:bg-[--color-surface-2] transition-colors duration-150
          focus-visible:ring-2 ring-[--color-brand] ring-offset-2
        "
      >
        <div className="flex items-center gap-3 text-[--color-text-primary]">
          {icon}
          <span className="text-sm font-semibold">{title}</span>
        </div>
        <ChevronDown
          size={16}
          aria-hidden="true"
          className={`text-[--color-text-muted] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`section-body-${id}`}
            role="region"
            aria-labelledby={`section-btn-${id}`}
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0, transition: { duration: 0.15 } }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="border-t border-[--color-border] px-5 py-5 space-y-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── BasicsSection ─────────────────────────────────────────────────────────────

function BasicsSection({
  businessName, ownerName, tagline,
  onChange, onBlur,
}: {
  businessName: string
  ownerName:    string
  tagline:      string
  onChange:     (patch: { business_name?: string; owner_name?: string; tagline?: string }) => void
  onBlur:       (patch: { business_name?: string; owner_name?: string; tagline?: string }) => void
}) {
  const bnId  = useId()
  const onId  = useId()
  const tgId  = useId()

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor={bnId} className="text-xs font-medium text-[--color-text-muted]">
          Business name
        </label>
        <input
          id={bnId} type="text" value={businessName}
          onChange={(e) => onChange({ business_name: e.target.value })}
          onBlur={(e)   => onBlur({ business_name: e.target.value })}
          placeholder="e.g. Sarah's Fitness Studio"
          className={FIELD}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={onId} className="text-xs font-medium text-[--color-text-muted]">
          Your name
        </label>
        <input
          id={onId} type="text" value={ownerName}
          onChange={(e) => onChange({ owner_name: e.target.value })}
          onBlur={(e)   => onBlur({ owner_name: e.target.value })}
          placeholder="e.g. Sarah Johnson"
          className={FIELD}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={tgId} className="text-xs font-medium text-[--color-text-muted]">
          Tagline / what you do
        </label>
        <textarea
          id={tgId} rows={2} value={tagline}
          onChange={(e) => onChange({ tagline: e.target.value })}
          onBlur={(e)   => onBlur({ tagline: e.target.value })}
          placeholder="busy professionals build strength without a gym…"
          className={`${FIELD} resize-none`}
        />
      </div>
    </div>
  )
}

// ── ServicesSection ───────────────────────────────────────────────────────────

function ServiceRow({
  service, index, canRemove,
  onUpdate, onRemove, onBlur,
}: {
  service:   ServiceRow
  index:     number
  canRemove: boolean
  onUpdate:  (patch: Partial<ServiceRow>) => void
  onRemove:  () => void
  onBlur:    () => void
}) {
  const [expanded, setExpanded] = useState(false)
  const nameId  = useId()
  const priceId = useId()
  const descId  = useId()

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6, transition: { duration: 0.12 } }}
      className="rounded-[--radius-md] border border-[--color-border] p-4 space-y-3"
    >
      <div className="flex items-end gap-2">
        <div className="flex-1 flex flex-col gap-1">
          <label htmlFor={nameId} className="text-xs font-medium text-[--color-text-muted]">
            Service {index + 1}
          </label>
          <input
            id={nameId} type="text" value={service.name}
            onChange={(e) => onUpdate({ name: e.target.value })}
            onBlur={onBlur}
            placeholder="e.g. 1-on-1 Coaching"
            className={FIELD}
          />
        </div>

        <div className="w-24 shrink-0 flex flex-col gap-1">
          <label htmlFor={priceId} className="text-xs font-medium text-[--color-text-muted]">
            Price
          </label>
          <input
            id={priceId} type="text" value={service.price ?? ''}
            onChange={(e) => onUpdate({ price: e.target.value })}
            onBlur={onBlur}
            placeholder="$99"
            className={FIELD}
          />
        </div>

        <button
          type="button"
          onClick={onRemove}
          disabled={!canRemove}
          aria-label={`Remove service ${index + 1}`}
          className="
            mb-0.5 flex min-h-[44px] min-w-[44px] items-center justify-center
            rounded-[--radius-md] text-[--color-text-muted]
            hover:bg-red-50 hover:text-red-500
            disabled:cursor-not-allowed disabled:opacity-30
            transition-all duration-150
            focus-visible:ring-2 ring-[--color-brand] ring-offset-2
          "
        >
          <X size={15} aria-hidden="true" />
        </button>
      </div>

      {!service.price && service.name && (
        <p className="text-xs text-[--color-text-muted]">Contact for pricing</p>
      )}

      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        aria-controls={descId}
        className="
          inline-flex items-center gap-1 text-xs text-[--color-brand]
          hover:underline transition-colors
          focus-visible:ring-2 ring-[--color-brand] ring-offset-1 rounded-sm
        "
      >
        {expanded
          ? <><ChevronUp size={11} aria-hidden="true" /> Hide description</>
          : <><ChevronDown size={11} aria-hidden="true" /> Add description</>
        }
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            id={descId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="overflow-hidden"
          >
            <label htmlFor={`${descId}-inp`} className="sr-only">
              Description for {service.name || `service ${index + 1}`}
            </label>
            <textarea
              id={`${descId}-inp`}
              rows={2}
              value={service.description ?? ''}
              onChange={(e) => onUpdate({ description: e.target.value })}
              onBlur={onBlur}
              placeholder="Brief description…"
              className={`${FIELD} resize-none`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function ServicesSection({
  services,
  onChange,
  onBlur,
}: {
  services: ServiceRow[]
  onChange: (s: ServiceRow[]) => void
  onBlur:   (s: ServiceRow[]) => void
}) {
  const keysRef = useRef<string[]>([])
  while (keysRef.current.length < services.length) keysRef.current.push(crypto.randomUUID())

  const MAX = 6

  return (
    <div className="space-y-3">
      <AnimatePresence initial={false}>
        {services.map((svc, i) => (
          <ServiceRow
            key={keysRef.current[i]}
            service={svc}
            index={i}
            canRemove={services.length > 1}
            onUpdate={(patch) => {
              const next = services.map((s, idx) => idx === i ? { ...s, ...patch } : s)
              onChange(next)
            }}
            onRemove={() => {
              keysRef.current.splice(i, 1)
              const next = services.filter((_, idx) => idx !== i)
              onChange(next)
              onBlur(next)
            }}
            onBlur={() => onBlur(services)}
          />
        ))}
      </AnimatePresence>

      {services.length < MAX && (
        <button
          type="button"
          onClick={() => {
            keysRef.current.push(crypto.randomUUID())
            onChange([...services, { name: '' }])
          }}
          className="
            flex min-h-[44px] w-full items-center justify-center gap-2
            rounded-[--radius-md] border-2 border-dashed border-[--color-border]
            text-sm text-[--color-text-muted]
            hover:border-[--color-brand] hover:text-[--color-brand]
            transition-all duration-150
            focus-visible:ring-2 ring-[--color-brand] ring-offset-2
          "
        >
          <Plus size={15} aria-hidden="true" />
          Add service
        </button>
      )}
    </div>
  )
}

// ── ContactSection ────────────────────────────────────────────────────────────

function ContactSection({
  contactMethods, phoneNumber, bookingLink, onChange,
}: {
  contactMethods: string[]
  phoneNumber:    string
  bookingLink:    string
  onChange: (patch: {
    contact_methods?: string[]
    phone_number?:    string
    booking_link?:    string
  }) => void
}) {
  return (
    <div className="space-y-2.5">
      {CONTACT_OPTIONS.map((opt) => {
        const checked = contactMethods.includes(opt.value)
        const inputId = `contact-${opt.value}`

        return (
          <div
            key={opt.value}
            className="overflow-hidden rounded-[--radius-md] border border-[--color-border]"
          >
            <label
              htmlFor={inputId}
              className={`
                flex min-h-[52px] cursor-pointer items-center gap-3 px-4 py-3
                transition-colors duration-150
                ${checked ? 'bg-[--color-brand-light]' : 'bg-[--color-surface] hover:bg-[--color-surface-2]'}
              `}
            >
              <input
                type="checkbox"
                id={inputId}
                checked={checked}
                className="sr-only"
                onChange={() => {
                  const next = checked
                    ? contactMethods.filter((m) => m !== opt.value)
                    : [...contactMethods, opt.value]
                  onChange({ contact_methods: next })
                }}
              />
              <span
                aria-hidden="true"
                className={`
                  flex h-5 w-5 shrink-0 items-center justify-center rounded-[--radius-sm] border-2
                  transition-all duration-150
                  ${checked ? 'border-[--color-brand] bg-[--color-brand]' : 'border-[--color-border]'}
                `}
              >
                {checked && (
                  <svg viewBox="0 0 12 12" className="h-3 w-3 text-white" fill="none" aria-hidden="true">
                    <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                )}
              </span>
              <span className={`text-sm font-medium ${checked ? 'text-[--color-brand]' : 'text-[--color-text-primary]'}`}>
                {opt.label}
              </span>
            </label>

            <AnimatePresence>
              {checked && opt.reveals && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="overflow-hidden border-t border-[--color-border]"
                >
                  <div className="px-4 py-3">
                    <label
                      htmlFor={`${inputId}-input`}
                      className="mb-1.5 block text-xs font-medium text-[--color-text-muted]"
                    >
                      {opt.reveals === 'phone' ? 'Your phone number' : 'Booking link'}
                    </label>
                    <input
                      id={`${inputId}-input`}
                      type={opt.reveals === 'phone' ? 'tel' : 'url'}
                      value={opt.reveals === 'phone' ? phoneNumber : bookingLink}
                      onChange={(e) => onChange(
                        opt.reveals === 'phone'
                          ? { phone_number: e.target.value }
                          : { booking_link: e.target.value }
                      )}
                      onBlur={(e) => onChange(
                        opt.reveals === 'phone'
                          ? { phone_number: e.target.value }
                          : { booking_link: e.target.value }
                      )}
                      placeholder={opt.reveals === 'phone' ? '(512) 555-0123' : 'https://calendly.com/…'}
                      className={FIELD}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

// ── PhotoSection ──────────────────────────────────────────────────────────────

function PhotoSection({
  avatarUrl, userId, siteId,
  onChange, onError,
}: {
  avatarUrl: string | null
  userId:    string
  siteId:    string
  onChange:  (url: string) => void
  onError:   (msg: string) => void
}) {
  const [uploading, setUploading] = useState(false)
  const [preview,   setPreview]   = useState<string | null>(avatarUrl)
  const inputId = useId()

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    // Optimistic preview
    const objectUrl = URL.createObjectURL(file)
    setPreview(objectUrl)
    setUploading(true)

    try {
      const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg'
      const path = `${userId}/${siteId}/avatar.${ext}`

      // NEXT_PUBLIC env vars are guaranteed present by deployment configuration.
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL     ?? '',
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
      )

      const { error: uploadError } = await supabase.storage
        .from('site-assets')
        .upload(path, file, { upsert: true, contentType: file.type })

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('site-assets')
        .getPublicUrl(path)

      onChange(publicUrl)
    } catch (err) {
      setPreview(avatarUrl)  // revert on failure
      onError('Photo upload failed. Please try again.')
      console.error('[PhotoSection] upload failed:', err)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="flex items-center gap-5">
      {/* Preview */}
      <div className="shrink-0">
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={preview}
            alt="Your profile photo preview"
            className="h-20 w-20 rounded-full object-cover border-2 border-[--color-border]"
          />
        ) : (
          <div
            className="
              flex h-20 w-20 items-center justify-center
              rounded-full bg-[--color-brand-light]
              text-xl font-bold text-[--color-brand]
            "
            aria-hidden="true"
          >
            ?
          </div>
        )}
      </div>

      {/* Upload control */}
      <div className="flex flex-col gap-2">
        <label htmlFor={inputId} className="text-xs font-medium text-[--color-text-muted]">
          Profile photo (optional)
        </label>
        <label
          htmlFor={inputId}
          className="
            inline-flex min-h-[40px] cursor-pointer items-center gap-2 px-4
            rounded-[--radius-md]
            border border-[--color-border] bg-[--color-surface]
            text-sm font-medium text-[--color-text-primary]
            hover:bg-[--color-surface-2] transition-all duration-150
            focus-within:ring-2 ring-[--color-brand] ring-offset-2
          "
        >
          <ImageIcon size={14} aria-hidden="true" />
          {uploading ? 'Uploading…' : 'Choose photo'}
          <input
            id={inputId}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={handleFile}
            disabled={uploading}
            className="sr-only"
          />
        </label>
        <p className="text-xs text-[--color-text-muted]">PNG, JPG or WebP · max 5 MB</p>
      </div>
    </div>
  )
}

// ── StyleSection ──────────────────────────────────────────────────────────────

function StyleSection({
  stylePreference,
  onChange,
}: {
  stylePreference: string
  onChange: (style: string) => void
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-3" role="radiogroup" aria-label="Site style">
      {STYLE_OPTIONS.map((opt) => {
        const active = stylePreference === opt.value
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(opt.value)}
            className={`
              flex flex-col overflow-hidden rounded-[--radius-lg]
              border-2 text-left transition-all duration-150
              focus-visible:ring-2 ring-[--color-brand] ring-offset-2
              ${active ? 'border-[--color-brand]' : 'border-[--color-border] hover:border-[--color-brand]'}
            `}
          >
            {/* Gradient strip */}
            <div
              className="h-10 w-full"
              style={{ background: opt.gradient }}
              aria-hidden="true"
            />
            <div className="p-3">
              <p className="text-xs font-semibold text-[--color-text-primary]">{opt.label}</p>
              <p className="mt-0.5 text-xs text-[--color-text-muted]">{opt.description}</p>
            </div>
          </button>
        )
      })}
    </div>
  )
}

// ── DomainSection ─────────────────────────────────────────────────────────────

function DomainSection({
  customDomain, plan,
  onChange, onBlur,
}: {
  customDomain: string
  plan:         SubscriptionPlan
  onChange:     (v: string) => void
  onBlur:       (v: string) => void
}) {
  const domainId = useId()
  const isPaid   = plan === 'pro' || plan === 'agency'

  if (!isPaid) {
    return (
      <div className="rounded-[--radius-md] border border-dashed border-[--color-border] bg-[--color-surface-2] px-5 py-6 text-center">
        <Globe size={20} className="mx-auto mb-2 text-[--color-text-muted]" aria-hidden="true" />
        <p className="mb-1 text-sm font-medium text-[--color-text-primary]">
          Custom domain is a Pro feature
        </p>
        <p className="mb-4 text-xs text-[--color-text-muted]">
          Connect your own domain on the Pro or Agency plan.
        </p>
        <a
          href="/billing"
          className="
            inline-flex min-h-[40px] items-center justify-center rounded-[--radius-md]
            bg-[--color-accent] px-5 text-sm font-semibold text-white
            hover:bg-[--color-accent-dark] transition-all duration-150
            focus-visible:ring-2 ring-[--color-brand] ring-offset-2
          "
        >
          Upgrade to Pro
        </a>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor={domainId} className="text-xs font-medium text-[--color-text-muted]">
          Custom domain
        </label>
        <input
          id={domainId}
          type="text"
          value={customDomain}
          onChange={(e) => onChange(e.target.value)}
          onBlur={(e)   => onBlur(e.target.value)}
          placeholder="yourdomain.com"
          className={FIELD}
        />
      </div>

      {customDomain && (
        <div className="rounded-[--radius-md] bg-[--color-surface-2] px-4 py-3 text-xs text-[--color-text-secondary] space-y-1.5">
          <p className="font-semibold text-[--color-text-primary]">DNS instructions</p>
          <p>Add a <strong>CNAME</strong> record pointing <code className="font-mono">{customDomain}</code> → <code className="font-mono">cname.visionarydev.com</code></p>
          <p className="text-[--color-text-muted]">Changes may take up to 48 hours to propagate.</p>
        </div>
      )}
    </div>
  )
}

// ── SaveIndicator ─────────────────────────────────────────────────────────────

function SaveIndicator({ status }: { status: string }) {
  if (status === 'idle') return null
  return (
    <p
      aria-live="polite"
      className={`text-xs ${
        status === 'error'  ? 'text-red-500' :
        status === 'saved'  ? 'text-green-600' :
        'text-[--color-text-muted]'
      }`}
    >
      {SAVE_STATUS_LABEL[status] ?? ''}
    </p>
  )
}

// ── SiteEditor ────────────────────────────────────────────────────────────────

interface Props {
  site: Site
  plan: SubscriptionPlan
}

type SaveStatus = 'idle' | 'unsaved' | 'saving' | 'saved' | 'error'

export function SiteEditor({ site, plan }: Props) {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(['basics']))
  const [saveStatus,   setSaveStatus]   = useState<SaveStatus>('idle')

  // Section state
  const [businessName, setBusinessName] = useState(site.business_name    ?? '')
  const [ownerName,    setOwnerName]    = useState(site.owner_name        ?? '')
  const [tagline,      setTagline]      = useState(site.tagline           ?? '')
  const [services,     setServices]     = useState<ServiceRow[]>((site.services as ServiceRow[]) ?? [{ name: '' }])
  const [methods,      setMethods]      = useState<string[]>((site.contact_methods as string[]) ?? [])
  const [phoneNumber,  setPhoneNumber]  = useState(site.phone_number      ?? '')
  const [bookingLink,  setBookingLink]  = useState(site.booking_link      ?? '')
  const [avatarUrl,    setAvatarUrl]    = useState<string | null>(site.avatar_url)
  const [styleChoice,  setStyleChoice]  = useState(site.style_preference  ?? '')
  const [customDomain, setCustomDomain] = useState(site.custom_domain     ?? '')

  // Debounce refs
  const pendingRef = useRef<Record<string, unknown>>({})
  const timerRef   = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const { toasts, showToast, dismiss } = useToast()

  const triggerSave = useCallback((patch: Record<string, unknown>) => {
    Object.assign(pendingRef.current, patch)
    clearTimeout(timerRef.current)
    setSaveStatus('unsaved')
    timerRef.current = setTimeout(async () => {
      const changes = { ...pendingRef.current }
      pendingRef.current = {}
      setSaveStatus('saving')
      const result = await updateSite(site.id, changes as Partial<Site>)
      if (result.success) {
        setSaveStatus('saved')
        showToast('Changes saved', 'success')
      } else {
        setSaveStatus('error')
        showToast(result.error ?? 'Failed to save', 'error')
      }
    }, 800)
  }, [site.id, showToast])

  function toggleSection(id: string) {
    setOpenSections((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-[--color-text-primary]">Edit site</h2>
        <div className="flex items-center gap-3">
          <SaveIndicator status={saveStatus} />
          <button
            type="button"
            onClick={() => timerRef.current && clearTimeout(timerRef.current)}
            className="
              min-h-[40px] rounded-[--radius-md] bg-[--color-brand] px-5
              text-sm font-semibold text-white
              hover:bg-[--color-brand-dark] transition-all duration-150
              focus-visible:ring-2 ring-[--color-brand] ring-offset-2
              lg:hidden
            "
          >
            Save
          </button>
        </div>
      </div>

      {/* Accordion */}
      <div className="space-y-3">

        <AccordionSection
          id="basics" title="Business basics"
          icon={<Building2 size={16} aria-hidden="true" />}
          isOpen={openSections.has('basics')}
          onToggle={() => toggleSection('basics')}
        >
          <BasicsSection
            businessName={businessName}
            ownerName={ownerName}
            tagline={tagline}
            onChange={(p) => {
              if (p.business_name !== undefined) setBusinessName(p.business_name)
              if (p.owner_name    !== undefined) setOwnerName(p.owner_name)
              if (p.tagline       !== undefined) setTagline(p.tagline)
            }}
            onBlur={(p) => triggerSave(p)}
          />
        </AccordionSection>

        <AccordionSection
          id="services" title="Services"
          icon={<Briefcase size={16} aria-hidden="true" />}
          isOpen={openSections.has('services')}
          onToggle={() => toggleSection('services')}
        >
          <ServicesSection
            services={services}
            onChange={setServices}
            onBlur={(s) => triggerSave({ services: s })}
          />
        </AccordionSection>

        <AccordionSection
          id="contact" title="Contact methods"
          icon={<Phone size={16} aria-hidden="true" />}
          isOpen={openSections.has('contact')}
          onToggle={() => toggleSection('contact')}
        >
          <ContactSection
            contactMethods={methods}
            phoneNumber={phoneNumber}
            bookingLink={bookingLink}
            onChange={(p) => {
              if (p.contact_methods !== undefined) { setMethods(p.contact_methods); triggerSave({ contact_methods: p.contact_methods }) }
              if (p.phone_number    !== undefined) { setPhoneNumber(p.phone_number); triggerSave({ phone_number: p.phone_number }) }
              if (p.booking_link    !== undefined) { setBookingLink(p.booking_link); triggerSave({ booking_link: p.booking_link }) }
            }}
          />
        </AccordionSection>

        <AccordionSection
          id="photo" title="Profile photo"
          icon={<ImageIcon size={16} aria-hidden="true" />}
          isOpen={openSections.has('photo')}
          onToggle={() => toggleSection('photo')}
        >
          <PhotoSection
            avatarUrl={avatarUrl}
            userId={site.user_id}
            siteId={site.id}
            onChange={(url) => { setAvatarUrl(url); triggerSave({ avatar_url: url }) }}
            onError={(msg) => showToast(msg, 'error')}
          />
        </AccordionSection>

        <AccordionSection
          id="style" title="Style"
          icon={<Palette size={16} aria-hidden="true" />}
          isOpen={openSections.has('style')}
          onToggle={() => toggleSection('style')}
        >
          <StyleSection
            stylePreference={styleChoice}
            onChange={(s) => { setStyleChoice(s); triggerSave({ style_preference: s }) }}
          />
        </AccordionSection>

        <AccordionSection
          id="domain" title="Custom domain"
          icon={<Globe size={16} aria-hidden="true" />}
          isOpen={openSections.has('domain')}
          onToggle={() => toggleSection('domain')}
        >
          <DomainSection
            customDomain={customDomain}
            plan={plan}
            onChange={setCustomDomain}
            onBlur={(v) => triggerSave({ custom_domain: v })}
          />
        </AccordionSection>

      </div>

      <ToastContainer toasts={toasts} onClose={dismiss} />
    </div>
  )
}
