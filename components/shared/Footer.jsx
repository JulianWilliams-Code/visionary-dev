import Link from "next/link"
import { APP_NAME } from "@/config"

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
        </p>
        <div className="flex gap-6 text-sm text-gray-400">
          <Link href="/privacy" className="hover:text-gray-900 transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-gray-900 transition-colors">Terms</Link>
        </div>
      </div>
    </footer>
  )
}
