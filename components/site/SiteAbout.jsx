export default function SiteAbout({ content, ctaText }) {
  return (
    <section id="about" className="py-24 px-4 bg-gray-50">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          {content?.heading}
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-line">
          {content?.bio}
        </p>
        <a
          href="#contact"
          className="mt-10 inline-block rounded-lg bg-gray-900 px-8 py-4 text-base font-semibold text-white hover:bg-gray-700 transition-colors"
        >
          {ctaText ?? "Get in Touch"}
        </a>
      </div>
    </section>
  )
}
