import { redirect }      from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { PLANS }         from "@/config"
import { CheckoutButton, PortalButton } from "./BillingClient"

export const metadata = { title: "Billing — Visionary Dev" }

const PLAN_FEATURES = {
  pro: [
    "Up to 10 websites",
    "Unlimited leads",
    "Custom domain",
    "Remove branding",
  ],
  agency: [
    "Unlimited websites",
    "Unlimited leads",
    "Custom domain",
    "Remove branding",
    "Priority support",
  ],
}

export default async function BillingPage({ searchParams }) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("plan, status, current_period_end")
    .eq("user_id", user.id)
    .maybeSingle()

  const plan   = subscription?.plan   ?? "free"
  const status = subscription?.status ?? "active"
  const renewalDate = subscription?.current_period_end
    ? new Date(subscription.current_period_end).toLocaleDateString("en-US", {
        month: "long", day: "numeric", year: "numeric",
      })
    : null

  // Unwrap searchParams — may be a Promise in Next.js 15
  const sp      = await searchParams
  const success = sp?.success === "1"

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Billing</h1>
      <p className="text-sm text-gray-500 mb-8">Manage your plan and payment details.</p>

      {/* Success banner */}
      {success && (
        <div className="mb-6 rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">
          You&apos;re now on the <strong>{PLANS[plan]?.name}</strong> plan. Thank you!
        </div>
      )}

      {/* Current plan card */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
          Current plan
        </p>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-gray-900">{PLANS[plan]?.name}</p>
            {plan === "free" ? (
              <p className="text-sm text-gray-400 mt-1">
                1 site &middot; 10 leads / month
              </p>
            ) : renewalDate ? (
              <p className="text-sm text-gray-400 mt-1">
                {status === "canceled" ? "Access ends" : "Renews"} {renewalDate}
              </p>
            ) : null}
          </div>
          <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
            plan === "free"
              ? "bg-gray-100 text-gray-600"
              : status === "active"
                ? "bg-green-50 text-green-700"
                : "bg-amber-50 text-amber-700"
          }`}>
            {plan === "free" ? "Free" : status === "active" ? "Active" : status}
          </span>
        </div>

        {plan !== "free" && (
          <div className="mt-5 pt-5 border-t border-gray-100">
            <PortalButton />
            <p className="mt-1 text-xs text-gray-400">
              Change plan, view invoices, or cancel in the billing portal.
            </p>
          </div>
        )}
      </div>

      {/* Upgrade options — only shown to free users */}
      {plan === "free" && (
        <>
          <p className="text-sm font-semibold text-gray-700 mb-4">Upgrade your plan</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {(["pro", "agency"]).map(p => (
              <div
                key={p}
                className={`relative bg-white rounded-2xl border p-6 ${
                  p === "pro" ? "border-blue-200" : "border-gray-200"
                }`}
              >
                {p === "pro" && (
                  <span className="absolute -top-2.5 left-4 text-xs font-semibold bg-blue-600 text-white px-2.5 py-0.5 rounded-full">
                    Most popular
                  </span>
                )}
                <p className="font-bold text-gray-900 text-lg">{PLANS[p].name}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  ${PLANS[p].price}
                  <span className="text-sm font-normal text-gray-400"> / mo</span>
                </p>
                <ul className="mt-4 mb-6 space-y-2">
                  {PLAN_FEATURES[p].map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-green-500 font-bold">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <CheckoutButton
                  plan={p}
                  label={`Upgrade to ${PLANS[p].name} →`}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
