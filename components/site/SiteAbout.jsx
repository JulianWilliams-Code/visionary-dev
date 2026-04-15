export default function SiteAbout({ content, theme }) {
  return (
    <section id="about" className={`py-24 px-4 ${theme.sectionBgAlt}`}>
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          {content?.heading}
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-line">
          {content?.bio}
        </p>
        <a
          href={content?.ctaHref ?? "#contact"}
          className={`mt-10 inline-block rounded-lg px-8 py-4 text-base font-semibold transition-colors ${theme.primaryBtn}`}
        >
          {content?.ctaText ?? "Get in Touch"}
        </a>
      </div>
    </section>
  )
}
