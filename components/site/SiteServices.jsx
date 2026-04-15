export default function SiteServices({ content, theme }) {
  if (!content?.items?.length) return null

  return (
    <section id="services" className="py-24 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">
          {content.heading}
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.items.map((service, i) => (
            <div
              key={i}
              className={`border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow`}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {service.name}
              </h3>
              {service.price && (
                <p className={`${theme.priceColor} font-bold text-lg mb-3`}>
                  {service.price}
                </p>
              )}
              {service.description && (
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  {service.description}
                </p>
              )}
              <a
                href="#contact"
                className={`text-sm font-medium ${theme.accentText} hover:underline`}
              >
                Book now →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
