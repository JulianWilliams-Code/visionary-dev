# Visionary Dev — Architecture

## Stack
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS v4
- **Auth + Database:** Supabase
- **Payments:** Stripe
- **Animations:** Framer Motion

---

## Folder Structure

```
visionary-dev/
├── app/
│   ├── (marketing)/          # Public landing pages — marketing layout
│   │   ├── page.js           # / — landing page
│   │   ├── pricing/page.js   # /pricing
│   │   └── layout.js         # Navbar + Footer
│   ├── (auth)/               # Auth flow — centered card layout
│   │   ├── login/page.js
│   │   ├── signup/page.js
│   │   ├── callback/route.js # Supabase OAuth callback
│   │   └── layout.js
│   ├── (dashboard)/          # Protected app — sidebar layout
│   │   ├── dashboard/page.js
│   │   ├── settings/page.js
│   │   ├── billing/page.js
│   │   └── layout.js
│   ├── api/
│   │   └── webhooks/stripe/route.js
│   ├── layout.js             # Root layout
│   └── globals.css
│
├── components/
│   ├── ui/                   # Primitives — know nothing about the app
│   ├── marketing/            # Landing page sections
│   ├── dashboard/            # Dashboard-specific UI
│   └── shared/               # Used in both (Navbar, Footer)
│
├── lib/
│   ├── supabase/
│   │   ├── client.js         # Browser client
│   │   ├── server.js         # Server Component client
│   │   └── middleware.js     # Middleware session handler
│   ├── stripe.js
│   └── utils.js
│
├── services/                 # All data fetching + business logic
│   ├── user.service.js
│   ├── subscription.service.js
│   └── site.service.js
│
├── hooks/                    # Client-side React hooks
│   ├── useUser.js
│   └── useSubscription.js
│
├── types/                    # JSDoc type definitions
│   └── index.js
│
├── config/                   # App-wide constants (plans, nav, etc.)
│   └── index.js
│
├── middleware.js              # Auth guard — protects /dashboard, /settings, /billing
└── docs/                     # Architecture + prompt history
```

---

## Key Rules

1. **Route groups** `(marketing)` `(auth)` `(dashboard)` each have their own layout. They don't share one.
2. **`lib/`** = SDK clients and utilities. No business logic.
3. **`services/`** = All Supabase queries. Components never query the DB directly.
4. **Two Supabase clients** — `lib/supabase/client.js` for browser, `lib/supabase/server.js` for Server Components.
5. **Middleware** intercepts at the edge — unauthenticated users never reach dashboard routes.
6. **`config/index.js`** is the single source of truth for plans, pricing, and nav links.

---

## Data Flow

```
User Request
  → middleware.js (auth check)
    → app/(dashboard)/layout.js (sidebar + topbar)
      → page.js (Server Component)
        → services/*.service.js (Supabase query)
          → lib/supabase/server.js (client)
```
