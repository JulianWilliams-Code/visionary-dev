import Link from "next/link"
import { PLANS } from "@/config"
import { Button } from "@/components/ui/Button"

const planFeatures = {
  free: [
    "1 website",
    "Free subdomain (yourname.visionarydev.com)",
    "Built-in contact form",
    "10 form submissions/month",
    "Mobile optimized",
    "Visionary Dev branding",
  ],
  pro: [
    "Up to 10 websites",
    "Custom domain included",
    "Built-in booking system",
    "Unlimited form submissions",
    "Automated lead follow-up emails",
    "No Visionary Dev branding",
    "Priority support",
  ],
  agency: [
    "Unlimited websites",
    "Custom domain on every site",
    "Everything in Pro",
    "Client management dashboard",
    "White-label option",
    "Dedicated account manager",
  ],
}

function Check() {
  return (
    <svg className="h-4 w-4 text-blue-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  )
}

export default function Pricing() {
  return (
    <section id="pricing" className="bg-gray-50 px-4 py-24">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest">
            Pricing
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">
            Simple, honest pricing.
          </h2>
          <p className="mt-4 text-gray-500">
            Start free. Upgrade when you&apos;re ready. No surprise charges, ever.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          {Object.entries(PLANS).map(([key, plan]) => (
            <div
              key={key}
              className={`rounded-2xl p-6 border bg-white flex flex-col ${
                key === "pro"
                  ? "border-blue-600 shadow-xl ring-1 ring-blue-600 relative"
                  : "border-gray-200 shadow-sm"
              }`}
            >
              {key === "pro" && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-blue-600 text-white text-xs font-semibold px-4 py-1 rounded-full whitespace-nowrap">
                    Most popular
                  </span>
                </div>
              )}

              <div>
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">{plan.name}</p>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                  <span className="text-gray-400 text-sm">/month</span>
                </div>
                <p className="mt-1 text-xs text-gray-400">
                  {plan.price === 0 ? "Free forever" : "Billed monthly, cancel anytime"}
                </p>
              </div>

              <ul className="mt-6 space-y-3 flex-1">
                {planFeatures[key].map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <Check />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link href="/signup" className="block mt-8">
                <Button
                  variant={key === "pro" ? "primary" : "outline"}
                  className="w-full"
                >
                  {plan.price === 0 ? "Get started free" : `Start ${plan.name} — $${plan.price}/mo`}
                </Button>
              </Link>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-gray-400">
          All plans include SSL, hosting, and automatic updates.
          Questions?{" "}
          <a href="mailto:hello@visionarydev.xyz" className="text-blue-600 hover:underline">
            Talk to us.
          </a>
        </p>
      </div>
    </section>
  )
}
