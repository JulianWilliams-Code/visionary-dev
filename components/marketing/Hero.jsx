import Link from "next/link"
import { Button } from "@/components/ui/Button"

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white px-4 pt-24 pb-20">
      {/* Background gradient blob */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-blue-50 blur-3xl opacity-60" />
      </div>

      <div className="max-w-4xl mx-auto text-center">
        {/* Trust badge */}
        <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 mb-8">
          <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm text-blue-700 font-medium">Be one of our founding 100 members</span>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900 leading-[1.1]">
          Stop losing clients to
          <br />
          <span className="text-blue-600">competitors with better websites.</span>
        </h1>

        <p className="mt-6 text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
          Visionary Dev builds your complete, bookable website in 2 minutes.
          Answer 7 questions — we handle design, copy, and launch. No designers. No drag-and-drop. No waiting.
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
            className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="whitespace-nowrap rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
          >
            Build my site free →
          </button>
        </form>

        <p className="mt-3 text-xs text-gray-400">
          No credit card required · Live in 2 minutes · Cancel anytime
        </p>

        {/* Browser mockup */}
        <div className="mt-16 mx-auto max-w-3xl rounded-2xl border border-gray-200 shadow-2xl overflow-hidden">
          <div className="bg-gray-100 px-4 py-3 flex items-center gap-2 border-b border-gray-200">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-red-400" />
              <div className="h-3 w-3 rounded-full bg-yellow-400" />
              <div className="h-3 w-3 rounded-full bg-green-400" />
            </div>
            <div className="flex-1 mx-4 bg-white rounded-md px-3 py-1 text-xs text-gray-400 text-left">
              yourname.visionarydev.org
            </div>
          </div>
          <div className="bg-white p-8 text-left">
            <div className="h-4 w-32 bg-gray-900 rounded mb-6" />
            <div className="h-8 w-64 bg-blue-600 rounded mb-2" />
            <div className="h-8 w-48 bg-blue-600/20 rounded mb-6" />
            <div className="h-3 w-full bg-gray-100 rounded mb-2" />
            <div className="h-3 w-4/5 bg-gray-100 rounded mb-2" />
            <div className="h-3 w-3/5 bg-gray-100 rounded mb-8" />
            <div className="flex gap-3">
              <div className="h-10 w-36 bg-blue-600 rounded-lg" />
              <div className="h-10 w-28 bg-gray-100 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
