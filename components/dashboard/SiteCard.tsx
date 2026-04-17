'use client'

import { useState }           from 'react'
import Link                   from 'next/link'
import { ExternalLink, Edit2, Share2, Globe } from 'lucide-react'
import type { Site }          from '@/lib/supabase/types'

// ── Strings ───────────────────────────────────────────────────────────────────

const STYLE_LABEL: Record<string, string> = {
  CLEAN_PROFESSIONAL: 'Clean',
  BOLD_ENERGETIC:     'Bold',
  WARM_APPROACHABLE:  'Warm',
}

// ── Sub-components ────────────────────────────────────────────────────────────

function BrowserChrome({ subdomain }: { subdomain: string }) {
  return (
    <div className="
      mb-4 rounded-[--radius-md]
      border border-[--color-border] bg-[--color-surface-2] p-3
    ">
      {/* Traffic lights */}
      <div className="mb-2 flex gap-1.5" aria-hidden="true">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400"   />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
      </div>
      {/* URL bar */}
      <div className="
        flex items-center gap-1.5
        rounded-[--radius-sm] bg-[--color-surface] px-2 py-1
        text-xs text-[--color-text-muted]
      ">
        <Globe size={10} aria-hidden="true" className="shrink-0" />
        <span className="truncate">{subdomain}.visionarydev.com</span>
      </div>
      {/* Fake content lines */}
      <div className="mt-3 space-y-1.5" aria-hidden="true">
        <div className="h-2 w-3/4 rounded-full bg-[--color-border]" />
        <div className="h-2 w-1/2 rounded-full bg-[--color-border]" />
      </div>
    </div>
  )
}

// ── Props ─────────────────────────────────────────────────────────────────────

interface Props {
  site: Pick<
    Site,
    | 'id' | 'subdomain' | 'business_name' | 'is_live'
    | 'style_preference' | 'created_at'
  >
}

// ── Component ─────────────────────────────────────────────────────────────────

export function SiteCard({ site }: Props) {
  const [copied, setCopied] = useState(false)

  const publicUrl  = `https://${site.subdomain}.visionarydev.com`
  const previewUrl = `/sites/${site.subdomain}`
  const editUrl    = `/dashboard/site/${site.id}/edit`

  function handleShare() {
    navigator.clipboard.writeText(publicUrl).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const styleLabel  = site.style_preference ? STYLE_LABEL[site.style_preference] : null
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  }).format(new Date(site.created_at))

  return (
    <article
      className="
        flex flex-col rounded-[--radius-xl]
        border border-[--color-border] bg-[--color-surface] p-5
        shadow-[--shadow-sm] transition-all duration-200
        hover:-translate-y-1 hover:shadow-[--shadow-md]
      "
    >
      <BrowserChrome subdomain={site.subdomain} />

      {/* Business name */}
      <h3 className="mb-1 text-base font-semibold text-[--color-text-primary] leading-snug">
        {site.business_name ?? site.subdomain}
      </h3>

      {/* Subdomain link */}
      <a
        href={previewUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="
          mb-3 text-xs text-[--color-brand]
          hover:underline underline-offset-2 transition-colors
          focus-visible:ring-2 ring-[--color-brand] ring-offset-1 rounded-sm
        "
      >
        {site.subdomain}.visionarydev.com ↗
      </a>

      {/* Badges row */}
      <div className="mb-4 flex flex-wrap gap-2">
        <span className={`
          inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
          ${site.is_live
            ? 'bg-green-50 text-green-700'
            : 'bg-[--color-surface-2] text-[--color-text-muted]'
          }
        `}>
          {site.is_live ? 'Live' : 'Draft'}
        </span>

        {styleLabel && (
          <span className="
            inline-flex items-center rounded-full
            border border-[--color-border]
            bg-[--color-surface-2] px-2.5 py-0.5
            text-xs font-medium text-[--color-text-muted]
          ">
            {styleLabel}
          </span>
        )}

        <span className="ml-auto text-xs text-[--color-text-muted]">
          {formattedDate}
        </span>
      </div>

      {/* Action buttons */}
      <div className="mt-auto flex gap-2">
        <Link
          href={editUrl}
          className="
            flex min-h-[40px] flex-1 items-center justify-center gap-1.5
            rounded-[--radius-md] bg-[--color-brand] px-3
            text-xs font-semibold text-white
            hover:bg-[--color-brand-dark] transition-all duration-150
            focus-visible:ring-2 ring-[--color-brand] ring-offset-2
          "
        >
          <Edit2 size={13} aria-hidden="true" />
          Edit
        </Link>

        <a
          href={previewUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${site.business_name ?? site.subdomain} live site`}
          className="
            flex min-h-[40px] w-10 items-center justify-center
            rounded-[--radius-md]
            border border-[--color-border] bg-[--color-surface]
            text-[--color-text-secondary]
            hover:bg-[--color-surface-2] transition-all duration-150
            focus-visible:ring-2 ring-[--color-brand] ring-offset-2
          "
        >
          <ExternalLink size={14} aria-hidden="true" />
        </a>

        <button
          type="button"
          onClick={handleShare}
          aria-label={copied ? 'URL copied!' : `Copy URL for ${site.business_name ?? site.subdomain}`}
          aria-live="polite"
          className="
            flex min-h-[40px] w-10 items-center justify-center
            rounded-[--radius-md]
            border border-[--color-border] bg-[--color-surface]
            text-[--color-text-secondary]
            hover:bg-[--color-surface-2] transition-all duration-150
            focus-visible:ring-2 ring-[--color-brand] ring-offset-2
          "
        >
          {copied
            ? <span className="text-xs font-semibold text-green-600" aria-hidden="true">✓</span>
            : <Share2 size={14} aria-hidden="true" />
          }
        </button>
      </div>
    </article>
  )
}
