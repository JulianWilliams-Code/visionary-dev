import Link from "next/link"
import { PLANS } from "@/config"
import { Button } from "@/components/ui/Button"

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
          Simple, honest pricing
        </h2>
        <p className="text-center text-gray-500 mb-16">
          Start free. Upgrade when your business grows.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {Object.entries(PLANS).map(([key, plan]) => (
            <div
              key={key}
              className={`rounded-2xl p-6 border ${
                key === "pro"
                  ? "border-blue-600 shadow-lg ring-1 ring-blue-600"
                  : "border-gray-200"
              }`}
            >
              {key === "pro" && (
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                  Most popular
                </span>
              )}
              <p className="text-sm font-medium text-gray-500 uppercase mt-1">{plan.name}</p>
              <p className="mt-2 text-4xl font-bold text-gray-900">
                ${plan.price}
                <span className="text-lg font-normal text-gray-400">/mo</span>
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-600 mb-6">
                <li>{plan.sites === -1 ? "Unlimited" : plan.sites} site{plan.sites !== 1 ? "s" : ""}</li>
                <li>{plan.customDomain ? "Custom domain" : "Subdomain only"}</li>
                <li>{plan.removeBranding ? "No Visionary Dev branding" : "Includes branding"}</li>
              </ul>
              <Link href="/signup">
                <Button variant={key === "pro" ? "primary" : "outline"} className="w-full">
                  {plan.price === 0 ? "Get started free" : `Start ${plan.name}`}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
