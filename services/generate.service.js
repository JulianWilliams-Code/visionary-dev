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

// Niche-specific about bios — honest, human-sounding, not boilerplate.
// Each one communicates a distinct positioning and personality.
// These are the fallback when the user hasn't written their own description.
const BIO_BY_TYPE = {
  "personal trainer":
    "I build programs that fit around your life — not the other way around. Whether you're just starting out or stuck at a plateau, I'll meet you where you are and build a plan that actually works for your body, schedule, and goals.",
  "life coach":
    "I work with people who are done settling for average. Through structured sessions and honest accountability, we close the gap between where you are and where you know you should be.",
  "business coach":
    "I work closely with founders and leaders to cut through the noise. My approach is direct: we identify what's slowing you down, build a clear plan, and execute. No vague frameworks.",
  "nutritionist":
    "Food should make you feel good — not anxious. I help clients build a sustainable, enjoyable relationship with eating that's based on how their body actually works, not the latest trend.",
  "yoga instructor":
    "My classes are for real people, not Instagram athletes. Whether you're stiff, stressed, or simply curious, I'll meet you where you are and help you build a practice that sticks.",
  "therapist / counselor":
    "I create a space where you can be honest without judgment. Together we work through what's heavy, build real coping tools, and find a path forward that's grounded and lasting.",
  "consultant":
    "I don't do vague strategy decks. I work directly with teams to find what's broken, fix it, and leave you with the clarity to keep moving forward without me.",
  "other":
    "I work closely with each client to understand what they actually need — then deliver results without the unnecessary complexity.",
}

// Hero subheadlines — short, punchy, niche-specific.
// Used as the meta description and fallback content heading.
const SUBHEADLINE_BY_TYPE = {
  "personal trainer":      "Personal training tailored to your goals, your schedule, and your life.",
  "life coach":            "Structured coaching to help you move from where you are to where you want to be.",
  "business coach":        "Practical business coaching for founders and leaders who want real results.",
  "nutritionist":          "Nutrition guidance built around how you actually live — not how you wish you did.",
  "yoga instructor":       "Yoga classes for every level, every body, and every schedule.",
  "therapist / counselor": "A safe, professional space to work through life's hardest challenges.",
  "consultant":            "Focused consulting to solve the problems that matter most to your business.",
  "other":                 "Professional services tailored to your specific goals and situation.",
}

export function generateSiteContent(intake) {
  const type        = intake.businessType?.toLowerCase() ?? "other"
  const ctaText     = CTA_BY_TYPE[type]         ?? "Book a Free Consultation"
  const bio         = BIO_BY_TYPE[type]         ?? BIO_BY_TYPE["other"]
  const subheadline = SUBHEADLINE_BY_TYPE[type] ?? SUBHEADLINE_BY_TYPE["other"]
  const location    = intake.location ? ` in ${intake.location}` : ""
  const templateId  = TEMPLATE_BY_TYPE[type] ?? DEFAULT_TEMPLATE_ID

  return {
    templateId,

    hero: {
      headline:    intake.tagline?.trim() || `Professional ${intake.businessType ?? 'services'}${location}.`,
      subheadline,
      ctaText,
      ctaHref:     "#contact",
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
      // Use the user's own description if provided; fall back to niche-specific bio.
      bio: intake.description?.trim() || `${bio}${location ? ` Based ${location}.` : ''}`,
      ctaText,
      ctaHref: "#contact",
    },

    contact: {
      heading:    "Let's Work Together",
      subheading: `Ready to get started? Reach out and I'll get back to you within 24 hours.`,
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
