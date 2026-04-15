"use client"

import { useUser } from "@/hooks/useUser"
import { SignOutButton } from "@/components/auth/SignOutButton"

export default function Topbar() {
  const { user } = useUser()

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
      <div />
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <span className="hidden sm:block text-sm text-gray-500">{user?.email}</span>
          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-sm font-semibold">
            {user?.email?.[0]?.toUpperCase() ?? "U"}
          </div>
        </div>
        <div className="h-4 w-px bg-gray-200" />
        <SignOutButton />
      </div>
    </header>
  )
}
