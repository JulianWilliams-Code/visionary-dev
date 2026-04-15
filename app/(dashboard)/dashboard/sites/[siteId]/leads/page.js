import { notFound, redirect } from "next/navigation"
import Link                   from "next/link"
import { createClient }       from "@/lib/supabase/server"
import { LeadCard }           from "@/components/dashboard/LeadCard"

export const metadata = { title: "Leads — Visionary Dev" }

const STATUS_STATS = [
  { key: "total",     label: "Total",     color: "text-gray-900" },
  { key: "new",       label: "New",       color: "text-blue-600" },
  { key: "contacted", label: "Contacted", color: "text-amber-600" },
  { key: "converted", label: "Converted", color: "text-green-600" },
]

export default async function LeadsPage({ params }) {
  const { siteId } = await params
  const supabase   = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  // Fetch site — ownership check
  const { data: site } = await supabase
    .from("sites")
    .select("id, business_name, subdomain")
    .eq("id", siteId)
    .eq("user_id", user.id)
    .single()

  if (!site) notFound()

  // Fetch leads + stats in parallel
  const [{ data: leads }, { data: allLeads }] = await Promise.all([
    supabase
      .from("leads")
      .select("*")
      .eq("site_id", siteId)
      .order("created_at", { ascending: false })
      .limit(100),
    supabase
      .from("leads")
      .select("status")
      .eq("site_id", siteId),
  ])

  // Compute stats client-side from fetched data — avoids a third query
  const stats = (allLeads ?? []).reduce(
    (acc, l) => { acc[l.status] = (acc[l.status] ?? 0) + 1; acc.total++; return acc },
    { total: 0, new: 0, contacted: 0, converted: 0, archived: 0 }
  )

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link href={`/dashboard/sites/${siteId}`} className="text-sm text-gray-500 hover:text-gray-900">
              ← {site.business_name}
            </Link>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            People who contacted you through your website.
          </p>
        </div>
        <a
          href={`/s/${site.subdomain}`}
          target="_blank"
          className="text-sm text-blue-600 hover:underline"
        >
          View live site →
        </a>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {STATUS_STATS.map(({ key, label, color }) => (
          <div key={key} className="bg-white rounded-xl border border-gray-200 p-4 text-center">
            <p className={`text-3xl font-bold ${color}`}>{stats[key] ?? 0}</p>
            <p className="text-sm text-gray-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Lead list */}
      {!leads?.length ? (
        <div className="border-2 border-dashed border-gray-200 rounded-2xl p-16 text-center">
          <div className="text-4xl mb-3">📭</div>
          <p className="font-semibold text-gray-900 mb-1">No leads yet</p>
          <p className="text-sm text-gray-500">
            When visitors fill out your contact form, they&apos;ll appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {leads.map(lead => (
            <LeadCard key={lead.id} lead={lead} siteId={siteId} />
          ))}
          {(allLeads?.length ?? 0) > 100 && (
            <p className="text-center text-sm text-gray-400 pt-4">
              Showing the most recent 100 leads.
            </p>
          )}
        </div>
      )}
    </div>
  )
}
