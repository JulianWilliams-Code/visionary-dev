// Hero appearance is driven by theme.heroStyle.
// "dark"  → gray-950 bg, white text (high energy — Bold template)
// "light" → white bg, dark text (professional — Clean template)
// "warm"  → amber-50 bg, dark text (friendly — Warm template)

const HERO_VARIANTS = {
  dark: {
    section:     "bg-gray-950 text-white",
    subheadline: "text-gray-400",
  },
  light: {
    section:     "bg-white text-gray-900",
    subheadline: "text-gray-500",
  },
  warm: {
    section:     "bg-amber-50 text-gray-900",
    subheadline: "text-gray-600",
  },
}

export default function SiteHero({ content, theme }) {
  const variant = HERO_VARIANTS[theme.heroStyle] ?? HERO_VARIANTS.dark

  return (
    <section className={`${variant.section} px-4 py-32 text-center`}>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">
          {content?.headline}
        </h1>
        <p className={`mt-6 text-lg ${variant.subheadline} max-w-xl mx-auto leading-relaxed`}>
          {content?.subheadline}
        </p>
        <div className="mt-10">
          <a
            href={content?.ctaHref ?? "#contact"}
            className={`inline-block rounded-lg px-8 py-4 text-base font-semibold transition-colors ${theme.primaryBtn}`}
          >
            {content?.ctaText}
          </a>
        </div>
      </div>
    </section>
  )
}
