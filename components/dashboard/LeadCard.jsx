import { updateLeadStatusAction } from "@/app/(dashboard)/dashboard/sites/[siteId]/leads/actions"
import { formatDate } from "@/lib/utils"

const STATUS_STYLES = {
  new:       "bg-blue-50  text-blue-700  border-blue-200",
  contacted: "bg-amber-50 text-amber-700 border-amber-200",
  converted: "bg-green-50 text-green-700 border-green-200",
  archived:  "bg-gray-100 text-gray-500  border-gray-200",
}

const STATUS_OPTIONS = ["new", "contacted", "converted", "archived"]

// Server Component — the status form uses a bound server action,
// so this page revalidates cleanly without any client-side JS.
export function LeadCard({ lead, siteId }) {
  const updateAction = updateLeadStatusAction.bind(null, lead.id, siteId)

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between gap-4">

        {/* Lead info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-semibold text-gray-900">{lead.name}</p>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${STATUS_STYLES[lead.status] ?? STATUS_STYLES.new}`}>
              {lead.status}
            </span>
          </div>

          <div className="mt-1 flex flex-wrap gap-x-4 gap-y-0.5 text-sm text-gray-500">
            <a
              href={`mailto:${lead.email}`}
              className="hover:text-blue-600 hover:underline transition-colors"
            >
              {lead.email}
            </a>
            {lead.phone && <span>{lead.phone}</span>}
          </div>

          {lead.message && (
            <p className="mt-3 text-sm text-gray-600 leading-relaxed line-clamp-3">
              &ldquo;{lead.message}&rdquo;
            </p>
          )}

          <p className="mt-2 text-xs text-gray-400">
            {formatDate(lead.created_at)}
          </p>
        </div>

        {/* Status update — plain form, works without JS */}
        <form action={updateAction} className="flex items-center gap-2 shrink-0">
          <select
            name="status"
            defaultValue={lead.status}
            className="rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-xs font-medium text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
          >
            {STATUS_OPTIONS.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <button
            type="submit"
            className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200 transition-colors"
          >
            Save
          </button>
        </form>

      </div>
    </div>
  )
}
