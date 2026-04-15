export default function FinalCTA() {
  return (
    <section className="bg-gray-950 px-4 py-24">
      <div className="max-w-3xl mx-auto text-center">
        <span className="text-sm font-semibold text-blue-400 uppercase tracking-widest">
          Ready?
        </span>
        <h2 className="mt-4 text-4xl md:text-5xl font-bold text-white leading-tight">
          Your first website is{" "}
          <span className="text-blue-400">completely free.</span>
        </h2>
        <p className="mt-6 text-lg text-gray-400 max-w-xl mx-auto">
          No credit card. No commitment. No designer required. Just 7 questions
          and 2 minutes of your time — and your business goes from invisible to unstoppable.
        </p>

        {/* Lead capture form */}
        <form
          action="/signup"
          method="get"
          className="mt-10 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            className="flex-1 rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="whitespace-nowrap rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-500 transition-colors"
          >
            Get started free →
          </button>
        </form>

        <p className="mt-4 text-xs text-gray-600">
          Join 500+ fitness trainers, coaches, and consultants already growing with Visionary Dev.
        </p>

        {/* Risk reversal */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <span className="text-green-400">✓</span> No credit card required
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-400">✓</span> Live in 2 minutes
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-400">✓</span> Cancel anytime
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-400">✓</span> Free plan forever
          </div>
        </div>
      </div>
    </section>
  )
}
