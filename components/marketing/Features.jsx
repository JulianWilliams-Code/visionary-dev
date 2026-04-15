const features = [
  {
    icon: "⚡",
    title: "Generated in minutes",
    description:
      "No templates to customize. No design decisions to agonize over. Your site is built automatically, tailored to your exact business.",
  },
  {
    icon: "📅",
    title: "Built-in booking system",
    description:
      "Clients can schedule directly from your website, 24/7. Wake up to new appointments without lifting a finger.",
  },
  {
    icon: "📬",
    title: "Automated lead capture",
    description:
      "Every inquiry hits your inbox instantly. Auto-replies keep leads warm while you're busy with your actual clients.",
  },
  {
    icon: "📱",
    title: "Mobile-first by default",
    description:
      "80% of your future clients will find you on their phone. Every Visionary Dev site looks perfect on every screen, always.",
  },
  {
    icon: "🌐",
    title: "Custom domain ready",
    description:
      "Start on your free subdomain, then connect YourBusiness.com when you're ready. We handle all the technical setup.",
  },
  {
    icon: "🔒",
    title: "We handle everything else",
    description:
      "Security patches, speed optimization, uptime monitoring — all taken care of. You never think about the website again.",
  },
]

export default function Features() {
  return (
    <section id="features" className="bg-gray-50 px-4 py-24">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest">
            Features
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">
            Everything your website needs to turn{" "}
            <span className="text-blue-600">visitors into clients.</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto">
            Built specifically for service businesses. Not a generic tool — a revenue-generating machine for your specific type of work.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-2xl mb-4">{feature.icon}</div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
