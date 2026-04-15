import { NextResponse }      from "next/server"
import { stripe }            from "@/lib/stripe"
import { createAdminClient } from "@/lib/supabase/admin"
import { STRIPE_PRICE_IDS }  from "@/config"

// Resolve a Stripe price ID back to our internal plan name.
function planFromPriceId(priceId) {
  if (priceId === STRIPE_PRICE_IDS.pro)    return "pro"
  if (priceId === STRIPE_PRICE_IDS.agency) return "agency"
  return "free"
}

function toISO(epoch) {
  return new Date(epoch * 1000).toISOString()
}

export async function POST(request) {
  const body = await request.text()
  const sig  = request.headers.get("stripe-signature")

  let event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    console.error("[stripe webhook] signature verification failed:", err.message)
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 })
  }

  const supabase = createAdminClient()

  switch (event.type) {
    // ----------------------------------------------------------------
    // Checkout completed — user just paid for the first time.
    // Retrieve the full subscription object so we have period dates.
    // ----------------------------------------------------------------
    case "checkout.session.completed": {
      const session = event.data.object
      if (session.mode !== "subscription") break

      const userId         = session.client_reference_id
      const customerId     = session.customer
      const subscriptionId = session.subscription

      if (!userId) {
        console.error("[stripe webhook] checkout.session.completed missing client_reference_id")
        break
      }

      const sub  = await stripe.subscriptions.retrieve(subscriptionId)
      const plan = planFromPriceId(sub.items.data[0].price.id)

      const { error } = await supabase
        .from("subscriptions")
        .upsert({
          user_id:               userId,
          stripe_customer_id:    customerId,
          stripe_subscription_id: subscriptionId,
          plan,
          status:                sub.status,
          current_period_start:  toISO(sub.current_period_start),
          current_period_end:    toISO(sub.current_period_end),
          updated_at:            new Date().toISOString(),
        }, { onConflict: "user_id" })

      if (error) console.error("[stripe webhook] upsert failed:", error.message)
      break
    }

    // ----------------------------------------------------------------
    // Subscription changed — plan upgrade/downgrade or renewal.
    // ----------------------------------------------------------------
    case "customer.subscription.updated": {
      const sub  = event.data.object
      const plan = planFromPriceId(sub.items.data[0].price.id)

      const { error } = await supabase
        .from("subscriptions")
        .update({
          plan,
          status:               sub.status,
          current_period_start: toISO(sub.current_period_start),
          current_period_end:   toISO(sub.current_period_end),
          updated_at:           new Date().toISOString(),
        })
        .eq("stripe_subscription_id", sub.id)

      if (error) console.error("[stripe webhook] update failed:", error.message)
      break
    }

    // ----------------------------------------------------------------
    // Subscription cancelled — downgrade to free, keep the row.
    // ----------------------------------------------------------------
    case "customer.subscription.deleted": {
      const sub = event.data.object

      const { error } = await supabase
        .from("subscriptions")
        .update({
          plan:       "free",
          status:     "canceled",
          stripe_subscription_id: null,
          updated_at: new Date().toISOString(),
        })
        .eq("stripe_subscription_id", sub.id)

      if (error) console.error("[stripe webhook] delete update failed:", error.message)
      break
    }

    default:
      // Silently ignore events we don't handle
      break
  }

  return NextResponse.json({ received: true })
}
