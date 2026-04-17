// Dashboard pages are auth-protected and user-specific — never statically render them.
// Auth check and navigation are handled by the nested dashboard/layout.tsx.
// TODO: add DashboardNav to /billing and /settings when those pages are updated.
export const dynamic = "force-dynamic"

export default function DashboardGroupLayout({ children }) {
  return children
}
