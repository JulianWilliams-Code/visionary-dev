const features = [
  {
    title: "Done in minutes, not days",
    description:
      "Answer a few questions about your business and we generate a complete, live website instantly. No back and forth with a designer.",
  },
  {
    title: "Built for service businesses",
    description:
      "Fitness trainers, coaches, consultants — every site ships with booking and contact forms built in.",
  },
  {
    title: "No design decisions needed",
    description:
      "We handle layout, fonts, and colors. You focus on running your business, not managing a website.",
  },
]

export default function Features() {
  return (
    <section id="features" className="py-24 bg-gray-50 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
          Everything you need. Nothing you don&apos;t.
        </h2>
        <p className="text-center text-gray-500 mb-16 max-w-xl mx-auto">
          Built specifically for service-based business owners who want results, not a new hobby.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
