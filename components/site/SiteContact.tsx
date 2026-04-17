'use client'

import { useState, useId } from 'react'

// ── Types ─────────────────────────────────────────────────────────────────────

interface Props {
  siteId:         string
  contactMethods: string[]
  phoneNumber:    string | null
  bookingLink:    string | null
}

type FormState = 'idle' | 'submitting' | 'success' | 'error'

// ── Input styles (shared across fields) ───────────────────────────────────────

const INPUT_CLASS = `
  min-h-[44px] w-full rounded-[var(--radius,0.5rem)]
  border border-[--color-border] bg-[--color-surface]
  px-4 py-2.5 text-sm text-[--color-text-primary]
  placeholder:text-[--color-text-muted]
  transition-colors duration-150
  focus:border-[color:var(--brand,#2563eb)] focus:outline-none
  focus:ring-2 focus:ring-[color:var(--brand,#2563eb)] focus:ring-offset-0
`

// ── Sub-renderers ─────────────────────────────────────────────────────────────

function ContactForm({ siteId }: { siteId: string }) {
  const nameId    = useId()
  const emailId   = useId()
  const messageId = useId()

  const [state,   setState]   = useState<FormState>('idle')
  const [errMsg,  setErrMsg]  = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('submitting')
    setErrMsg(null)

    const form = e.currentTarget
    const body = {
      siteId,
      name:    (form.elements.namedItem('name')    as HTMLInputElement).value.trim(),
      email:   (form.elements.namedItem('email')   as HTMLInputElement).value.trim(),
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value.trim(),
    }

    try {
      const res = await fetch('/api/leads', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(body),
      })
      const json = await res.json()

      if (!res.ok) {
        setErrMsg(json.error ?? 'Something went wrong. Please try again.')
        setState('error')
      } else {
        setState('success')
      }
    } catch {
      setErrMsg('Network error. Please try again.')
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <div
        className="rounded-[var(--radius,0.5rem)] border border-green-200 bg-green-50 px-6 py-8 text-center"
        role="status"
      >
        <p className="text-base font-semibold text-green-800">
          Thanks! I&rsquo;ll be in touch soon.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor={nameId} className="text-sm font-medium text-[--color-text-primary]">
          Your name
        </label>
        <input
          id={nameId}
          name="name"
          type="text"
          autoComplete="name"
          required
          placeholder="Jane Smith"
          className={INPUT_CLASS}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={emailId} className="text-sm font-medium text-[--color-text-primary]">
          Email address
        </label>
        <input
          id={emailId}
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="jane@example.com"
          className={INPUT_CLASS}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={messageId} className="text-sm font-medium text-[--color-text-primary]">
          Message
        </label>
        <textarea
          id={messageId}
          name="message"
          rows={4}
          placeholder="Tell me what you're looking for…"
          className={`${INPUT_CLASS} resize-none`}
        />
      </div>

      {state === 'error' && errMsg && (
        <p role="alert" className="text-sm text-red-600">{errMsg}</p>
      )}

      <button
        type="submit"
        disabled={state === 'submitting'}
        className="
          inline-flex min-h-[48px] items-center justify-center
          rounded-[var(--radius,0.5rem)] text-sm font-semibold text-white
          transition-opacity duration-150 hover:opacity-90
          disabled:opacity-50
        "
        style={{ backgroundColor: 'var(--brand, #2563eb)' }}
      >
        {state === 'submitting' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  )
}

function PhoneButton({ phone }: { phone: string }) {
  return (
    <a
      href={`tel:${phone.replace(/\s/g, '')}`}
      className="
        inline-flex min-h-[48px] w-full items-center justify-center gap-2
        rounded-[var(--radius,0.5rem)] border border-[--color-border]
        bg-[--color-surface] text-sm font-semibold text-[--color-text-primary]
        transition-colors hover:bg-[--color-surface-2]
      "
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.06 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Call {phone}
    </a>
  )
}

function BookingEmbed({ link, label }: { link: string; label: string }) {
  // Render as iframe for booking tools (Calendly etc.); fallback to button if not a URL
  if (!link.startsWith('http')) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="
          inline-flex min-h-[48px] w-full items-center justify-center
          rounded-[var(--radius,0.5rem)] text-sm font-semibold text-white
          transition-opacity hover:opacity-90
        "
        style={{ backgroundColor: 'var(--brand, #2563eb)' }}
      >
        {label}
      </a>
    )
  }

  return (
    <iframe
      src={link}
      className="w-full rounded-[var(--radius,0.5rem)] border border-[--color-border]"
      height={700}
      title={label}
      loading="lazy"
    />
  )
}

function WhatsAppButton({ phone }: { phone: string | null }) {
  const number = phone?.replace(/\D/g, '') ?? ''
  const href   = number
    ? `https://wa.me/${number}`
    : 'https://wa.me/'

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="
        inline-flex min-h-[48px] w-full items-center justify-center gap-2
        rounded-[var(--radius,0.5rem)] bg-[--color-whatsapp] text-sm font-semibold text-white
        transition-opacity hover:opacity-90
      "
    >
      {/* WhatsApp icon */}
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
      Message on WhatsApp
    </a>
  )
}

// ── Divider ───────────────────────────────────────────────────────────────────

function Divider() {
  return (
    <div className="flex items-center gap-3" aria-hidden="true">
      <div className="h-px flex-1 bg-[--color-border]" />
      <span className="text-xs text-[--color-text-muted]">or</span>
      <div className="h-px flex-1 bg-[--color-border]" />
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export function SiteContact({ siteId, contactMethods, phoneNumber, bookingLink }: Props) {
  const methods = contactMethods.length > 0 ? contactMethods : ['CONTACT_FORM']

  const renderers: React.ReactNode[] = []

  methods.forEach((method, i) => {
    if (i > 0) renderers.push(<Divider key={`divider-${i}`} />)

    switch (method) {
      case 'CONTACT_FORM':
        renderers.push(<ContactForm key="form" siteId={siteId} />)
        break

      case 'PHONE':
        if (phoneNumber) {
          renderers.push(<PhoneButton key="phone" phone={phoneNumber} />)
        }
        break

      case 'FREE_CALL':
        if (bookingLink) {
          renderers.push(
            <BookingEmbed key="free-call" link={bookingLink} label="Book a free call" />
          )
        }
        break

      case 'PAID_SESSION':
        if (bookingLink) {
          renderers.push(
            <BookingEmbed key="paid-session" link={bookingLink} label="Book a session" />
          )
        }
        break

      case 'WHATSAPP':
        renderers.push(<WhatsAppButton key="whatsapp" phone={phoneNumber} />)
        break
    }
  })

  return (
    <section
      id="contact"
      className="bg-[--color-surface-2] px-6 py-20"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-lg">
        <h2
          id="contact-heading"
          className="mb-8 text-center font-bold text-[--color-text-primary]"
          style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)' }}
        >
          Get in touch
        </h2>

        <div className="flex flex-col gap-5">
          {renderers}
        </div>
      </div>
    </section>
  )
}
