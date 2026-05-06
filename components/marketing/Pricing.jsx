import Link from "next/link"
import { PLANS } from "@/config"
import { Button } from "@/components/ui/Button"

const planFeatures = {
  free: [
    "1 website",
    "Free subdomain (yourname.visionarydev.org)",
    "Built-in contact form",
    "10 form submissions/month",
    "Mobile optimized",
    "Visionary Dev branding",
  ],
  pro: [
    "Up to 10 websites",
    "Custom domain included",
    "Unlimited form submissions",
    "No Visionary Dev branding",
    "Priority support",
    "Early access to new features",
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
    <svg
      className="h-4 w-4 shrink-0"
      style={{ color: 'var(--color-brand)' }}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  )
}

export default function Pricing() {
  return (
    <section id="pricing" className="bg-[--color-surface-2] px-4 py-24">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span
            className="text-sm font-semibold uppercase tracking-widest"
            style={{ color: 'var(--color-brand)' }}
          >
            Pricing
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[--color-text-primary]">
            Simple, honest pricing.
          </h2>
          <p className="mt-4 text-[--color-text-muted]">
            Start free. Upgrade when you&apos;re ready. No surprise charges, ever.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          {Object.entries(PLANS).map(([key, plan]) => (
            <div
              key={key}
              className={`rounded-2xl p-6 border bg-[--color-surface] flex flex-col ${
                key === "pro"
                  ? "shadow-xl relative"
                  : "border-[--color-border] shadow-sm"
              }`}
              style={key === "pro" ? {
                borderColor: 'var(--color-brand)',
                boxShadow: '0 0 0 1px var(--color-brand), 0 20px 25px -5px rgba(0,0,0,0.1)',
              } : {}}
            >
              {key === "pro" && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span
                    className="text-white text-xs font-semibold px-4 py-1 rounded-full whitespace-nowrap"
                    style={{ backgroundColor: 'var(--color-brand)' }}
                  >
                    Most popular
                  </span>
                </div>
              )}

              <div>
                <p className="text-sm font-semibold text-[--color-text-muted] uppercase tracking-wide">{plan.name}</p>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-[--color-text-primary]">${plan.price}</span>
                  <span className="text-[--color-text-muted] text-sm">/month</span>
                </div>
                <p className="mt-1 text-xs text-[--color-text-muted]">
                  {plan.price === 0 ? "Free forever" : "Billed monthly, cancel anytime"}
                </p>
              </div>

              <ul className="mt-6 space-y-3 flex-1">
                {planFeatures[key].map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-[--color-text-secondary]">
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

        <p className="mt-8 text-center text-sm text-[--color-text-muted]">
          All plans include SSL, hosting, and automatic updates.
          Questions?{" "}
          <a
            href="mailto:hello@visionarydev.xyz"
            className="hover:underline"
            style={{ color: 'var(--color-brand)' }}
          >
            Talk to us.
          </a>
        </p>
      </div>
    </section>
  )
}
