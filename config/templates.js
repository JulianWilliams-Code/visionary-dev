// A template is config, not code.
// It declares: which sections, in what order, with what visual theme.
// SiteRenderer reads this and composes the page dynamically.
//
// IMPORTANT: All Tailwind classes must be complete strings here so
// the JIT compiler includes them in the bundle during static analysis.

export const TEMPLATES = {

  bold: {
    id:          "bold",
    name:        "Bold",
    description: "High energy, dark hero, strong contrast. Ideal for fitness and training.",
    // Section IDs in render order — SiteRenderer resolves these to components
    sections: ["hero", "services", "about", "contact"],
    theme: {
      heroStyle: "dark",   // "dark" | "light" | "warm" — drives hero layout variant

      // Full button class strings. Complete strings required for Tailwind JIT.
      primaryBtn:        "bg-blue-600 hover:bg-blue-700 text-white",
      primaryBtnOutline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50",

      accentText:   "text-blue-600",
      accentBg:     "bg-blue-50",
      accentBorder: "border-blue-600",

      // Form input focus ring — matched to accent color
      inputFocus: "focus:border-blue-500 focus:ring-blue-500",

      // Service card price color
      priceColor: "text-blue-600",

      // Section backgrounds (alternating rhythm)
      sectionBgAlt: "bg-gray-50",
    },
  },

  clean: {
    id:          "clean",
    name:        "Clean",
    description: "Minimal, light, professional. Ideal for coaches and consultants.",
    // About before services — personal connection first for coaching businesses
    sections: ["hero", "about", "services", "contact"],
    theme: {
      heroStyle: "light",

      primaryBtn:        "bg-emerald-600 hover:bg-emerald-700 text-white",
      primaryBtnOutline: "border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50",

      accentText:   "text-emerald-600",
      accentBg:     "bg-emerald-50",
      accentBorder: "border-emerald-600",

      inputFocus: "focus:border-emerald-500 focus:ring-emerald-500",
      priceColor: "text-emerald-600",
      sectionBgAlt: "bg-gray-50",
    },
  },

  warm: {
    id:          "warm",
    name:        "Warm",
    description: "Friendly, inviting, personal. Ideal for wellness and nutrition.",
    sections: ["hero", "about", "services", "contact"],
    theme: {
      heroStyle: "warm",

      primaryBtn:        "bg-amber-500 hover:bg-amber-600 text-white",
      primaryBtnOutline: "border-2 border-amber-500 text-amber-600 hover:bg-amber-50",

      accentText:   "text-amber-600",
      accentBg:     "bg-amber-50",
      accentBorder: "border-amber-500",

      inputFocus: "focus:border-amber-500 focus:ring-amber-500",
      priceColor: "text-amber-600",
      sectionBgAlt: "bg-orange-50",
    },
  },
}

export const DEFAULT_TEMPLATE_ID = "bold"

// Which template to assign based on business type
export const TEMPLATE_BY_TYPE = {
  "personal trainer":      "bold",
  "life coach":            "clean",
  "business coach":        "clean",
  "nutritionist":          "warm",
  "yoga instructor":       "warm",
  "therapist / counselor": "clean",
  "consultant":            "clean",
  "other":                 "bold",
}
