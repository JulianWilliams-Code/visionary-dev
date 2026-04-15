import { notFound, redirect } from "next/navigation"
import Link                   from "next/link"
import { createClient }       from "@/lib/supabase/server"
import { SiteRenderer }       from "@/components/site/SiteRenderer"

export default async function SitePage({ params }) {
  const { siteId } = await params
  const supabase   = await createClient()

  // Verify ownership — never show another user's site
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const { data: site } = await supabase
    .from("sites")
    .select("*")
    .eq("id", siteId)
    .eq("user_id", user.id)
    .single()

  if (!site) notFound()

  return (
    <div className="-m-6">
      {/* Management bar above the preview */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            ← Back
          </Link>
          <div className="h-4 w-px bg-gray-200" />
          <span className="text-sm font-medium text-gray-900">
            {site.business_name}
          </span>
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
            site.published
              ? "bg-green-50 text-green-700"
              : "bg-gray-100 text-gray-500"
          }`}>
            {site.published ? "Live" : "Draft"}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href={`/dashboard/sites/${site.id}/leads`}
            className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
          >
            📋 Leads
          </Link>
          <a
            href={`/s/${site.subdomain}`}
            target="_blank"
            className="text-sm text-blue-600 hover:underline"
          >
            View live site →
          </a>
        </div>
      </div>

      {/* Full site preview */}
      <SiteRenderer site={site} isPreview />
    </div>
  )
}
