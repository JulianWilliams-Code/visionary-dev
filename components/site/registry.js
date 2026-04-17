// Section registry: maps section IDs → React components.
//
// SiteRenderer loops through template.sections, looks up each ID here,
// and renders the component with { content, theme }.
//
// To add a new section:
//   1. Create the component in components/site/
//   2. Add it here
//   3. Add it to whichever template sections arrays want it
//   4. Generate its content in generate.service.js
// That's the entire surface area of a new section.

// SiteHero/Services/About/Contact use named exports (TypeScript .tsx files).
// SiteStats still uses default export (.jsx) — update when migrated.
import { SiteHero }     from "./SiteHero"
import { SiteServices } from "./SiteServices"
import { SiteAbout }    from "./SiteAbout"
import { SiteContact }  from "./SiteContact"
import SiteStats        from "./SiteStats"

export const SECTION_REGISTRY = {
  hero:     SiteHero,
  services: SiteServices,
  about:    SiteAbout,
  contact:  SiteContact,
  stats:    SiteStats,    // future-ready — add to a template's sections array to activate
}
