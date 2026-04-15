"use client"

import { useActionState } from "react"
import { submitLeadAction } from "@/app/s/actions"

export default function SiteContact({ content, siteId }) {
  const [state, formAction, pending] = useActionState(
    submitLeadAction.bind(null, siteId),
    null
  )

  return (
    <section id="contact" className="py-24 px-4 bg-white">
      <div className="max-w-xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">
          {content?.heading}
        </h2>
        <p className="text-gray-500 text-center mb-10">
          {content?.subheading}
        </p>

        {state?.success ? (
          <div className="rounded-2xl bg-green-50 border border-green-200 p-8 text-center">
            <div className="text-4xl mb-3">✅</div>
            <p className="font-semibold text-gray-900">Message sent!</p>
            <p className="text-sm text-gray-500 mt-1">
              Expect a reply within 24 hours.
            </p>
          </div>
        ) : (
          <form action={formAction} className="space-y-4">
            {state?.error && (
              <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                {state.error}
              </div>
            )}

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Name</label>
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="Jane Smith"
                  className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Email</label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="jane@example.com"
                  className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Phone</label>
              <input
                name="phone"
                type="tel"
                placeholder="(512) 555-0123 (optional)"
                className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Message</label>
              <textarea
                name="message"
                rows={4}
                placeholder="Tell me about your goals…"
                className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={pending}
              className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {pending ? "Sending…" : "Send message →"}
            </button>
          </form>
        )}

        {/* Contact details */}
        <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-gray-400">
          {content?.email    && <span>✉ {content.email}</span>}
          {content?.phone    && <span>📞 {content.phone}</span>}
          {content?.location && <span>📍 {content.location}</span>}
        </div>
      </div>
    </section>
  )
}
