'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ── CTA label ─────────────────────────────────────────────────────────────────

function ctaLabel(methods: string[]): string {
  const first = methods[0]
  if (first === 'FREE_CALL')    return 'Book a free call'
  if (first === 'PAID_SESSION') return 'Book a session'
  return 'Get in touch'
}

// ── Props ─────────────────────────────────────────────────────────────────────

interface Props {
  businessName:   string
  contactMethods: string[]
}

// ── Component ─────────────────────────────────────────────────────────────────

export function SiteNav({ businessName, contactMethods }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [open,     setOpen]     = useState(false)

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 10) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close drawer on resize to desktop
  useEffect(() => {
    function onResize() { if (window.innerWidth >= 768) setOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const label = ctaLabel(contactMethods)

  return (
    <>
      <header
        className={`
          sticky top-0 z-50 w-full
          transition-all duration-200
          ${scrolled
            ? 'border-b border-black/5 bg-white/80 shadow-sm backdrop-blur-md'
            : 'bg-transparent'
          }
        `}
      >
        <nav
          className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6"
          aria-label="Site navigation"
        >
          {/* Logo */}
          <a
            href="#"
            className="text-base font-bold text-[--color-text-primary] hover:opacity-80 transition-opacity"
          >
            {businessName}
          </a>

          {/* Desktop CTA */}
          <a
            href="#contact"
            className="
              hidden md:inline-flex min-h-[44px] items-center justify-center
              rounded-[var(--radius,0.5rem)] px-5 text-sm font-semibold text-white
              transition-opacity duration-150 hover:opacity-90
            "
            style={{ backgroundColor: 'var(--brand, #2563eb)' }}
          >
            {label}
          </a>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="
              md:hidden flex h-10 w-10 items-center justify-center
              rounded-lg text-[--color-text-secondary]
              hover:bg-gray-100 transition-colors
            "
          >
            {open ? (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </nav>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-40 bg-black/20 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.div
              id="mobile-menu"
              key="drawer"
              className="
                fixed inset-x-0 top-16 z-40 border-b border-gray-200
                bg-white px-6 py-6 md:hidden
              "
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
            >
              <nav className="flex flex-col gap-4" aria-label="Mobile navigation">
                {['Services', 'About', 'Contact'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setOpen(false)}
                    className="text-base font-medium text-[--color-text-secondary] hover:text-[--color-text-primary] transition-colors"
                  >
                    {item}
                  </a>
                ))}
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="
                    mt-2 inline-flex min-h-[44px] items-center justify-center
                    rounded-[var(--radius,0.5rem)] px-5 text-sm font-semibold text-white
                    transition-opacity hover:opacity-90
                  "
                  style={{ backgroundColor: 'var(--brand, #2563eb)' }}
                >
                  {label}
                </a>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
