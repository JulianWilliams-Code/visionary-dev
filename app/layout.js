import "./globals.css"

export const metadata = {
  title: "Visionary Dev",
  description: "Your website, live in 2 minutes.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
