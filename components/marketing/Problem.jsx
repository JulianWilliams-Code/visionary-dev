const problems = [
  {
    icon: "💸",
    heading: "Hiring a designer costs $3,000–$10,000",
    body: "And that's before the endless revision rounds, missed deadlines, and the site that's already outdated by launch day.",
  },
  {
    icon: "😩",
    heading: "Wix and Squarespace waste your weekends",
    body: "Dozens of hours picking templates, writing copy you hate, and still ending up with something that looks like every other business.",
  },
  {
    icon: "📵",
    heading: "No website means invisible to 97% of clients",
    body: "When someone needs a trainer, coach, or consultant, they search online first. If you're not there, your competitor gets the call.",
  },
]

export default function Problem() {
  return (
    <section className="bg-gray-950 px-4 py-24">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-red-400 uppercase tracking-widest">
            The problem
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-white">
            Most service businesses are{" "}
            <span className="text-red-400">hemorrhaging clients</span>{" "}
            because of their online presence.
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto">
            Your website is your 24/7 salesperson. Right now, it might be costing you more than it earns.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {problems.map((p) => (
            <div
              key={p.heading}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-6"
            >
              <div className="text-3xl mb-4">{p.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2">{p.heading}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-gray-500 text-sm">
          Sound familiar? There&apos;s a better way.
          <span className="ml-2 text-blue-400">↓</span>
        </p>
      </div>
    </section>
  )
}
