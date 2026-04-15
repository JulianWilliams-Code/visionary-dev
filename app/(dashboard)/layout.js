import Sidebar from "@/components/dashboard/Sidebar"
import Topbar  from "@/components/dashboard/Topbar"

// Dashboard pages are auth-protected and user-specific — never statically render them.
export const dynamic = "force-dynamic"

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}
