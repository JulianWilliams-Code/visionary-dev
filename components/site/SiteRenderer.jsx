import SiteHero     from "./SiteHero"
import SiteServices from "./SiteServices"
import SiteAbout    from "./SiteAbout"
import SiteContact  from "./SiteContact"

// Server Component — receives the full site record from the DB.
// Reused for both the dashboard preview and the live public site.
export function SiteRenderer({ site, isPreview = false }) {
  const { content } = site

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Preview banner */}
      {isPreview && (
        <div className="bg-blue-600 text-white text-center text-sm py-2 px-4 font-medium">
          Preview mode — this is how your site looks to visitors.{" "}
          <a href={`/s/${site.subdomain}`} target="_blank" className="underline">
            View live site →
          </a>
        </div>
      )}

      {/* Site navbar */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <span className="font-bold text-gray-900 text-lg">
            {content.meta?.businessName}
          </span>
          <a
            href="#contact"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
          >
            {content.hero?.ctaText}
          </a>
        </div>
      </header>

      <SiteHero     content={content.hero} />
      <SiteServices content={content.services} />
      <SiteAbout    content={content.about} ctaText={content.hero?.ctaText} />
      <SiteContact  content={content.contact} siteId={site.id} />

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-400 py-10 px-4 text-center text-sm">
        <p className="font-semibold text-white mb-1">
          {content.meta?.businessName}
        </p>
        {content.contact?.location && <p>{content.contact.location}</p>}
        {content.contact?.email    && <p>{content.contact.email}</p>}
      </footer>
    </div>
  )
}
