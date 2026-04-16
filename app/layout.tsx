import type { Metadata }       from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"

// ── Fonts ─────────────────────────────────────────────────────────────────────
// next/font injects CSS variables on <html> at build time — zero layout shift.
// globals.css maps: --font-display / --font-body → var(--font-inter)
//                   --font-mono               → var(--font-mono-code)

const inter = Inter({
  subsets:  ["latin"],
  variable: "--font-inter",
  display:  "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets:  ["latin"],
  variable: "--font-mono-code",
  display:  "swap",
  weight:   ["400", "500"],
})

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: {
    default:  "Visionary Dev",
    template: "%s — Visionary Dev",
  },
  description: "Your website, live in 2 minutes.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"
  ),
}

// ── Layout ────────────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  )
}
