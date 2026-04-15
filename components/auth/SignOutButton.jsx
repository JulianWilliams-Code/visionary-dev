import { signOutAction } from "@/app/(auth)/actions"

// Server Component — uses a form so it works without JS.
export function SignOutButton() {
  return (
    <form action={signOutAction}>
      <button
        type="submit"
        className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
      >
        Sign out
      </button>
    </form>
  )
}
