import Link            from "next/link"
import { redirect }    from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Button }       from "@/components/ui/Button"

export const metadata = { title: "Dashboard — Visionary Dev" }

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const { data: sites } = await supabase
    .from("sites")
    .select("id, business_name, subdomain, published, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  const hasSites = sites && sites.length > 0

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Your Websites</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Manage and preview your generated sites.
          </p>
        </div>
        <Link href="/dashboard/new">
          <Button>+ New website</Button>
        </Link>
      </div>

      {!hasSites ? (
        <div className="border-2 border-dashed border-gray-200 rounded-2xl p-16 text-center">
          <div className="text-4xl mb-4">🌐</div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            No websites yet
          </h2>
          <p className="text-gray-500 text-sm mb-6 max-w-xs mx-auto">
            Answer 7 questions and your first site will be live in under 2 minutes.
          </p>
          <Link href="/dashboard/new">
            <Button>Create your first website →</Button>
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sites.map(site => (
            <Link
              key={site.id}
              href={`/dashboard/sites/${site.id}`}
              className="group block bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-md transition-shadow"
            >
              {/* Fake browser chrome */}
              <div className="bg-gray-50 rounded-lg p-3 mb-4 border border-gray-100">
                <div className="flex gap-1 mb-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-gray-300" />
                  <div className="h-1.5 w-1.5 rounded-full bg-gray-300" />
                  <div className="h-1.5 w-1.5 rounded-full bg-gray-300" />
                </div>
                <div className="text-xs text-gray-400 truncate">
                  {site.subdomain}.visionarydev.com
                </div>
                <div className="mt-3 space-y-1.5">
                  <div className="h-2 w-3/4 bg-gray-200 rounded" />
                  <div className="h-2 w-1/2 bg-gray-200 rounded" />
                </div>
              </div>

              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {site.business_name}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {site.subdomain}.visionarydev.com
                  </p>
                </div>
                <span className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full ${
                  site.published
                    ? "bg-green-50 text-green-700"
                    : "bg-gray-100 text-gray-500"
                }`}>
                  {site.published ? "Live" : "Draft"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
