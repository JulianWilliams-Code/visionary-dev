import { TEMPLATES, DEFAULT_TEMPLATE_ID } from "@/config/templates"
import { SECTION_REGISTRY }               from "./registry"
import SiteNavbar                          from "./SiteNavbar"
import SiteFooter                          from "./SiteFooter"

// Server Component.
// Resolves the template, then composes the page from registry sections.
// Reused for: dashboard preview, public /s/[subdomain] route.
export function SiteRenderer({ site, isPreview = false }) {
  const { content } = site

  // Fall back to default if stored templateId is unknown or missing
  const templateId = content.templateId ?? DEFAULT_TEMPLATE_ID
  const template   = TEMPLATES[templateId] ?? TEMPLATES[DEFAULT_TEMPLATE_ID]
  const { theme }  = template

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* Preview banner — dashboard only */}
      {isPreview && (
        <div className="bg-blue-600 text-white text-center text-xs py-2 px-4 font-medium">
          Preview —{" "}
          <a href={`/s/${site.subdomain}`} target="_blank" className="underline">
            open live site →
          </a>
        </div>
      )}

      <SiteNavbar
        businessName={content.meta?.businessName}
        ctaText={content.hero?.ctaText}
        theme={theme}
      />

      {/* Render sections in template-defined order */}
      {template.sections.map(sectionId => {
        const Section       = SECTION_REGISTRY[sectionId]
        const sectionContent = content[sectionId]

        // Skip unknown or empty sections gracefully
        if (!Section || !sectionContent) return null

        return (
          <Section
            key={sectionId}
            content={sectionContent}
            theme={theme}
            siteId={site.id}
          />
        )
      })}

      <SiteFooter content={content.contact} meta={content.meta} theme={theme} />
    </div>
  )
}
