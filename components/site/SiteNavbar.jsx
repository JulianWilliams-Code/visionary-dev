// Extracted from SiteRenderer so it can be theme-aware independently.
export default function SiteNavbar({ businessName, ctaText, theme }) {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <span className="font-bold text-gray-900 text-lg">{businessName}</span>
        <a
          href="#contact"
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${theme.primaryBtn}`}
        >
          {ctaText}
        </a>
      </div>
    </header>
  )
}
