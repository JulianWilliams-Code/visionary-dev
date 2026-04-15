import { NextResponse } from "next/server"

export async function POST(request) {
  const body = await request.text()
  const sig = request.headers.get("stripe-signature")

  // TODO: verify + handle stripe events
  // const event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET)
  // switch (event.type) {
  //   case "checkout.session.completed": ...
  //   case "customer.subscription.deleted": ...
  // }

  return NextResponse.json({ received: true })
}
