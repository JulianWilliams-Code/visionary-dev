// Pure function: intake answers → structured site content.
// No side effects, no DB calls, no API calls.
// Swap the body for an AI call later without touching anything else.

import { TEMPLATE_BY_TYPE, DEFAULT_TEMPLATE_ID } from "@/config/templates"

const CTA_BY_TYPE = {
  "personal trainer":      "Book a Free Fitness Consult",
  "life coach":            "Book a Free Discovery Call",
  "business coach":        "Book a Strategy Session",
  "nutritionist":          "Book a Free Nutrition Consult",
  "yoga instructor":       "Book Your First Class",
  "therapist / counselor": "Schedule a Free 15-min Call",
  "consultant":            "Book a Free Consultation",
  "other":                 "Book a Free Consultation",
}

const ABOUT_OPENER_BY_TYPE = {
  "personal trainer":      "I help people build strength, lose weight, and feel confident",
  "life coach":            "I help people break through limitations and live with intention",
  "business coach":        "I help entrepreneurs and leaders grow smarter and faster",
  "nutritionist":          "I help people build sustainable relationships with food",
  "yoga instructor":       "I help people find strength, flexibility, and inner calm",
  "therapist / counselor": "I help people work through challenges and find balance",
  "consultant":            "I help businesses solve complex problems and grow",
  "other":                 "I help clients achieve their most important goals",
}

export function generateSiteContent(intake) {
  const type       = intake.businessType?.toLowerCase() ?? "other"
  const ctaText    = CTA_BY_TYPE[type]  ?? "Book a Free Consultation"
  const opener     = ABOUT_OPENER_BY_TYPE[type] ?? "I help clients achieve their most important goals"
  const location   = intake.location ? ` in ${intake.location}` : ""
  const templateId = TEMPLATE_BY_TYPE[type] ?? DEFAULT_TEMPLATE_ID

  return {
    // Template ID is stored in content so the renderer can resolve it
    // without a separate DB column — changing templates is a content update.
    templateId,

    hero: {
      headline:    intake.tagline?.trim() || `${opener}${location}.`,
      subheadline: `${intake.businessName} — professional ${intake.businessType} services${location}.`,
      ctaText,
      ctaHref: "#contact",
    },

    services: {
      heading: "What I Offer",
      items: intake.services
        ?.filter(s => s.name?.trim())
        .map(s => ({
          name:        s.name.trim(),
          price:       s.price?.trim() || "",
          description: s.description?.trim() || "",
        })) ?? [],
    },

    about: {
      heading: `About ${intake.businessName}`,
      bio:     intake.description?.trim() ||
        `${opener}${location}. With a personalized approach tailored to your unique situation, I provide the tools, accountability, and expertise you need to succeed.`,
      // SiteAbout reads ctaText from content, not from a separate prop
      ctaText,
      ctaHref: "#contact",
    },

    contact: {
      heading:    "Let's Get Started",
      subheading: "Ready to begin? Reach out and I'll get back to you within 24 hours.",
      email:    intake.contact?.email ?? "",
      phone:    intake.contact?.phone ?? "",
      location: intake.location ?? "",
    },

    meta: {
      businessName: intake.businessName,
      businessType: intake.businessType,
    },
  }
}

// Derive a URL-safe subdomain from the business name.
// "Sarah's Personal Training!" → "sarahs-personal-training"
export function toSubdomain(businessName) {
  return (businessName ?? "my-site")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 40) || "my-site"
}
