import { IntakeForm } from "@/components/dashboard/IntakeForm"

export const metadata = { title: "Create your website — Visionary Dev" }

export default function NewSitePage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Create your website</h1>
        <p className="mt-1 text-gray-500">
          Answer a few questions — your site will be live in under 2 minutes.
        </p>
      </div>
      <IntakeForm />
    </div>
  )
}
