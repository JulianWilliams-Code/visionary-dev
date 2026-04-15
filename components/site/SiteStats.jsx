// Future-ready section — not in any template's sections array yet.
// To activate: add "stats" to a template's sections array in config/templates.js
// and add a stats object to generateSiteContent() output.
//
// Expected content shape:
// { heading: "By the numbers", items: [{ value: "10+", label: "Years experience" }] }

export default function SiteStats({ content, theme }) {
  if (!content?.items?.length) return null

  return (
    <section className={`py-16 px-4 ${theme.accentBg}`}>
      <div className="max-w-4xl mx-auto">
        {content.heading && (
          <h2 className="text-center text-sm font-semibold text-gray-500 uppercase tracking-widest mb-10">
            {content.heading}
          </h2>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {content.items.map((stat, i) => (
            <div key={i}>
              <p className={`text-4xl font-bold ${theme.accentText}`}>{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
