"use client"

import { useState, useTransition } from "react"
import { createSiteAction } from "@/app/(dashboard)/dashboard/new/actions"
import { Input } from "@/components/ui/Input"

const STEPS = [
  { id: "basics",   title: "Your Business",  description: "Let's start with the basics." },
  { id: "offer",    title: "Your Offer",      description: "What transformation do you provide?" },
  { id: "services", title: "Your Services",   description: "What do you offer and at what price?" },
  { id: "contact",  title: "Contact Details", description: "How should clients reach you?" },
]

const BUSINESS_TYPES = [
  "Personal Trainer",
  "Life Coach",
  "Business Coach",
  "Nutritionist",
  "Yoga Instructor",
  "Therapist / Counselor",
  "Consultant",
  "Other",
]

const EMPTY_SERVICES = [
  { name: "", price: "" },
  { name: "", price: "" },
  { name: "", price: "" },
]

export function IntakeForm() {
  const [step, setStep]   = useState(0)
  const [error, setError] = useState(null)
  const [pending, startTransition] = useTransition()

  const [data, setData] = useState({
    businessName: "",
    businessType: "",
    location:     "",
    tagline:      "",
    description:  "",
    services:     EMPTY_SERVICES,
    contact:      { email: "", phone: "" },
  })

  const set = (field, value) =>
    setData(prev => ({ ...prev, [field]: value }))

  const setService = (i, field, value) =>
    setData(prev => {
      const services = [...prev.services]
      services[i] = { ...services[i], [field]: value }
      return { ...prev, services }
    })

  const setContact = (field, value) =>
    setData(prev => ({ ...prev, contact: { ...prev.contact, [field]: value } }))

  const isValid = () => {
    if (step === 0) return data.businessName.trim() && data.businessType
    if (step === 1) return data.tagline.trim() || data.description.trim()
    if (step === 2) return data.services.some(s => s.name.trim())
    if (step === 3) return data.contact.email.trim()
    return true
  }

  const next = () => {
    if (!isValid()) return
    if (step < STEPS.length - 1) {
      setStep(s => s + 1)
    } else {
      handleSubmit()
    }
  }

  const handleSubmit = () => {
    setError(null)
    startTransition(async () => {
      const result = await createSiteAction(data)
      // redirect() in the action throws before returning — only
      // errors make it back here.
      if (result?.error) setError(result.error)
    })
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Progress bar */}
      <div className="h-1 bg-gray-100">
        <div
          className="h-full bg-blue-600 transition-all duration-300"
          style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
        />
      </div>

      <div className="p-8">
        {/* Step header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-widest">
              Step {step + 1} of {STEPS.length}
            </span>
          </div>
          <h2 className="text-xl font-bold text-gray-900">{STEPS[step].title}</h2>
          <p className="text-sm text-gray-500 mt-0.5">{STEPS[step].description}</p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Steps */}
        <div className="space-y-5">
          {step === 0 && (
            <>
              <Input
                label="Business name"
                placeholder="e.g. Sarah's Personal Training"
                value={data.businessName}
                onChange={e => set("businessName", e.target.value)}
                required
              />
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                  What type of business?
                </label>
                <select
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                  value={data.businessType}
                  onChange={e => set("businessType", e.target.value)}
                  required
                >
                  <option value="">Select a type…</option>
                  {BUSINESS_TYPES.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <Input
                label="Location"
                placeholder="e.g. Austin, TX  (or 'Online')"
                value={data.location}
                onChange={e => set("location", e.target.value)}
              />
            </>
          )}

          {step === 1 && (
            <>
              <Input
                label="Your tagline"
                placeholder="e.g. Transform your body, transform your life"
                value={data.tagline}
                onChange={e => set("tagline", e.target.value)}
              />
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                  Tell visitors about you{" "}
                  <span className="font-normal text-gray-400">(optional)</span>
                </label>
                <textarea
                  rows={4}
                  placeholder="Share your background, credentials, and why clients choose you…"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                  value={data.description}
                  onChange={e => set("description", e.target.value)}
                />
              </div>
            </>
          )}

          {step === 2 && (
            <div className="space-y-3">
              <p className="text-xs text-gray-400">
                Add up to 3 services. At least one is required.
              </p>
              {data.services.map((service, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div className="flex-1">
                    <Input
                      placeholder={`Service ${i + 1} (e.g. 1-on-1 Training)`}
                      value={service.name}
                      onChange={e => setService(i, "name", e.target.value)}
                    />
                  </div>
                  <div className="w-32">
                    <Input
                      placeholder="Price"
                      value={service.price}
                      onChange={e => setService(i, "price", e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {step === 3 && (
            <>
              <Input
                label="Your email"
                type="email"
                placeholder="you@yourbusiness.com"
                value={data.contact.email}
                onChange={e => setContact("email", e.target.value)}
                required
              />
              <Input
                label="Phone number"
                type="tel"
                placeholder="(512) 555-0123"
                value={data.contact.phone}
                onChange={e => setContact("phone", e.target.value)}
              />
            </>
          )}
        </div>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setStep(s => s - 1)}
            className={`text-sm text-gray-500 hover:text-gray-900 transition-colors ${step === 0 ? "invisible" : ""}`}
          >
            ← Back
          </button>

          <button
            type="button"
            onClick={next}
            disabled={!isValid() || pending}
            className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {pending
              ? "Generating your site…"
              : step === STEPS.length - 1
                ? "Generate my website →"
                : "Continue →"}
          </button>
        </div>
      </div>
    </div>
  )
}
