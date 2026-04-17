'use client'

import { useState, useEffect }        from 'react'
import Link                           from 'next/link'
import { usePathname }                from 'next/navigation'
import { motion, AnimatePresence }    from 'framer-motion'
import { LayoutGrid, Settings, HelpCircle, Menu, X } from 'lucide-react'
import type { SubscriptionPlan }      from '@/lib/supabase/types'

// ── Strings ───────────────────────────────────────────────────────────────────

const APP_NAME = 'Visionary Dev'

const NAV_ITEMS = [
  { label: 'My Sites', href: '/dashboard',  icon: LayoutGrid  },
  { label: 'Account',  href: '/settings',   icon: Settings    },
  { label: 'Help',     href: '/help',        icon: HelpCircle  },
] as const

const PLAN_LABELS: Record<SubscriptionPlan, string> = {
  free:   'Free Plan',
  pro:    'Pro Plan',
  agency: 'Agency Plan',
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function isActive(pathname: string, href: string): boolean {
  if (href === '/dashboard') return pathname === '/dashboard'
  return pathname.startsWith(href)
}

// ── Sub-components ────────────────────────────────────────────────────────────

function NavLink({
  item,
  active,
  onClick,
}: {
  item:    (typeof NAV_ITEMS)[number]
  active:  boolean
  onClick?: () => void
}) {
  const Icon = item.icon
  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={`
        flex min-h-[44px] items-center gap-3 rounded-[--radius-lg] px-3 py-2.5
        text-sm font-medium transition-all duration-150
        focus-visible:ring-2 ring-[--color-brand] ring-offset-2
        ${active
          ? 'bg-[--color-brand-light] text-[--color-brand]'
          : 'text-[--color-text-secondary] hover:bg-[--color-surface-2] hover:text-[--color-text-primary]'
        }
      `}
      aria-current={active ? 'page' : undefined}
    >
      <Icon size={18} aria-hidden="true" />
      {item.label}
    </Link>
  )
}

function PlanBadge({ plan }: { plan: SubscriptionPlan }) {
  return (
    <div className="space-y-2 px-2">
      <span className="
        inline-block rounded-full px-2.5 py-1
        text-xs font-medium
        bg-[--color-surface-2] text-[--color-text-muted]
      ">
        {PLAN_LABELS[plan]}
      </span>

      {plan === 'free' && (
        <Link
          href="/billing"
          className="
            flex min-h-[44px] w-full items-center justify-center
            rounded-[--radius-lg] bg-[--color-accent] px-4
            text-sm font-semibold text-white
            hover:bg-[--color-accent-dark] transition-all duration-150
            focus-visible:ring-2 ring-[--color-brand] ring-offset-2
          "
        >
          Upgrade to Pro
        </Link>
      )}
    </div>
  )
}

// ── Wordmark ──────────────────────────────────────────────────────────────────

function Wordmark() {
  return (
    <div className="flex items-center gap-2.5">
      <span
        className="
          flex h-8 w-8 items-center justify-center
          rounded-[--radius-md] bg-[--color-brand]
          text-sm font-bold text-white select-none
        "
        aria-hidden="true"
      >
        V
      </span>
      <span className="text-sm font-bold text-[--color-text-primary]">{APP_NAME}</span>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

interface Props {
  plan: SubscriptionPlan
}

export function DashboardNav({ plan }: Props) {
  const pathname      = usePathname()
  const [open, setOpen] = useState(false)

  // Close drawer on route change
  useEffect(() => { setOpen(false) }, [pathname])

  // Close drawer on resize to desktop
  useEffect(() => {
    function onResize() { if (window.innerWidth >= 1024) setOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const navLinks = NAV_ITEMS.map((item) => (
    <NavLink
      key={item.href}
      item={item}
      active={isActive(pathname, item.href)}
      onClick={() => setOpen(false)}
    />
  ))

  return (
    <>
      {/* ── Desktop sidebar (lg+) ── */}
      <aside
        className="
          hidden lg:flex
          fixed left-0 top-0 z-40
          h-screen w-60 flex-col
          border-r border-[--color-border]
          bg-[--color-surface]
        "
        aria-label="Dashboard navigation"
      >
        {/* Logo */}
        <div className="flex h-16 shrink-0 items-center border-b border-[--color-border] px-5">
          <Link href="/dashboard" className="focus-visible:ring-2 ring-[--color-brand] rounded-[--radius-sm]">
            <Wordmark />
          </Link>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navLinks}
        </nav>

        {/* Plan badge */}
        <div className="shrink-0 border-t border-[--color-border] px-2 py-4">
          <PlanBadge plan={plan} />
        </div>
      </aside>

      {/* ── Mobile top bar (<lg) ── */}
      <header
        className="
          sticky top-0 z-40
          flex h-14 items-center justify-between
          border-b border-[--color-border]
          bg-[--color-surface] px-4
          lg:hidden
        "
        aria-label="Dashboard top bar"
      >
        <Link href="/dashboard" className="focus-visible:ring-2 ring-[--color-brand] rounded-[--radius-sm]">
          <Wordmark />
        </Link>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav-drawer"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          className="
            flex h-10 w-10 items-center justify-center
            rounded-[--radius-md] text-[--color-text-secondary]
            hover:bg-[--color-surface-2] transition-colors
            focus-visible:ring-2 ring-[--color-brand] ring-offset-2
          "
        >
          {open
            ? <X size={20} aria-hidden="true" />
            : <Menu size={20} aria-hidden="true" />
          }
        </button>
      </header>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-40 bg-black/30 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.div
              id="mobile-nav-drawer"
              key="drawer"
              className="
                fixed left-0 top-0 z-50
                flex h-full w-72 flex-col
                bg-[--color-surface]
                border-r border-[--color-border]
                shadow-xl lg:hidden
              "
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            >
              {/* Logo */}
              <div className="flex h-14 shrink-0 items-center justify-between border-b border-[--color-border] px-4">
                <Wordmark />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close navigation"
                  className="
                    flex h-10 w-10 items-center justify-center
                    rounded-[--radius-md] text-[--color-text-muted]
                    hover:bg-[--color-surface-2] transition-colors
                    focus-visible:ring-2 ring-[--color-brand] ring-offset-2
                  "
                >
                  <X size={18} aria-hidden="true" />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1" aria-label="Mobile navigation">
                {navLinks}
              </nav>

              {/* Plan badge */}
              <div className="shrink-0 border-t border-[--color-border] px-2 py-4">
                <PlanBadge plan={plan} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
