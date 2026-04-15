export default function SiteHero({ content }) {
  return (
    <section className="bg-gray-950 text-white px-4 py-32 text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">
          {content?.headline}
        </h1>
        <p className="mt-6 text-lg text-gray-400 max-w-xl mx-auto leading-relaxed">
          {content?.subheadline}
        </p>
        <div className="mt-10">
          <a
            href={content?.ctaHref ?? "#contact"}
            className="inline-block rounded-lg bg-blue-600 px-8 py-4 text-base font-semibold text-white hover:bg-blue-500 transition-colors"
          >
            {content?.ctaText}
          </a>
        </div>
      </div>
    </section>
  )
}
