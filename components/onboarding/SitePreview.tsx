'use client'

import { motion } from 'framer-motion'
import { useOnboardingStore } from '@/lib/onboarding/store'
import { StylePreference }    from '@/lib/onboarding/types'

// ── Preview theme map ────────────────────────────────────────────────────────
// Defined at module level — never inline hex values in JSX.

const PREVIEW_THEMES: Record<StylePreference, {
  gradient: string
  primary:  string
  label:    string
}> = {
  [StylePreference.CLEAN_PROFESSIONAL]: {
    gradient: 'linear-gradient(135deg, #0f172a 0%, #475569 100%)',
    primary:  '#0f172a',
    label:    'Clean & Professional',
  },
  [StylePreference.BOLD_ENERGETIC]: {
    gradient: 'linear-gradient(135deg, #dc2626 0%, #1f2937 100%)',
    primary:  '#dc2626',
    label:    'Bold & Energetic',
  },
  [StylePreference.WARM_APPROACHABLE]: {
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #fef3c7 100%)',
    primary:  '#f59e0b',
    label:    'Warm & Approachable',
  },
}

const DEFAULT_THEME = {
  gradient: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
  primary:  '#2563eb',
  label:    '',
}

function slugify(name: string): string {
  return (
    name
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .slice(0, 30) || 'your-site'
  )
}

export function SitePreview() {
  const { data } = useOnboardingStore()

  const theme = data.stylePreference
    ? PREVIEW_THEMES[data.stylePreference]
    : DEFAULT_THEME

  const slug = slugify(data.businessName ?? '')
  const url  = `${slug}.visionarydev.org`

  return (
    <div className="flex flex-col h-full p-6" aria-label="Live site preview" aria-live="polite">
      <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[--color-text-muted]">
        Preview
      </p>

      {/* Browser chrome mockup */}
      <div className="rounded-[--radius-xl] border border-[--color-border] shadow-[--shadow-lg] overflow-hidden flex flex-col">

        {/* Chrome bar */}
        <div className="flex items-center gap-3 border-b border-[--color-border] bg-[--color-surface-2] px-4 py-3">
          {/* Traffic lights */}
          <div className="flex gap-1.5 shrink-0" aria-hidden="true">
            <span className="h-3 w-3 rounded-full bg-rose-400" />
            <span className="h-3 w-3 rounded-full bg-amber-400" />
            <span className="h-3 w-3 rounded-full bg-green-400" />
          </div>
          {/* URL bar */}
          <div className="min-w-0 flex-1 truncate rounded-md bg-[--color-surface] px-3 py-1 text-xs text-[--color-text-muted]">
            {url}
          </div>
        </div>

        {/* Site content */}
        <div className="bg-white overflow-hidden">

          {/* Hero */}
          <motion.div
            className="px-6 py-8 text-white"
            animate={{ background: theme.gradient }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            style={{ background: theme.gradient }}
            aria-hidden="true"
          >
            {theme.label && (
              <p className="mb-1.5 text-xs font-semibold uppercase tracking-widest opacity-60">
                {theme.label}
              </p>
            )}
            <h3 className="mb-1 text-base font-bold leading-snug" style={{ fontSize: 'inherit' }}>
              {data.businessName || 'Your business name'}
            </h3>
            {data.ownerName && (
              <p className="text-xs opacity-75">by {data.ownerName}</p>
            )}
          </motion.div>

          {/* Tagline */}
          <div className="border-b border-gray-100 px-6 py-4" aria-hidden="true">
            <p className="text-sm italic leading-relaxed text-gray-500">
              {data.tagline
                ? `"I help ${data.tagline}"`
                : <span className="text-gray-300">Your tagline will appear here…</span>
              }
            </p>
          </div>

          {/* Services */}
          {data.services.some(s => s.name) && (
            <div className="px-6 py-4" aria-hidden="true">
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gray-400">
                Services
              </p>
              <div className="space-y-1.5">
                {data.services
                  .filter(s => s.name)
                  .slice(0, 3)
                  .map((s, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <span className="text-gray-700 truncate">{s.name}</span>
                      <span className="ml-2 shrink-0 text-xs text-gray-400">
                        {s.price || 'Contact for pricing'}
                      </span>
                    </div>
                  ))
                }
              </div>
            </div>
          )}

          {/* Location */}
          {(data.locationCity || data.modality) && (
            <div className="border-t border-gray-100 px-6 py-3" aria-hidden="true">
              <p className="text-xs text-gray-400">
                {[data.locationCity, data.locationState].filter(Boolean).join(', ')}
                {data.locationCity && data.modality && ' · '}
                {data.modality === 'in_person' ? 'In Person'
                  : data.modality === 'online' ? 'Online'
                  : data.modality === 'both'   ? 'In Person & Online'
                  : ''}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
