import Stripe from "stripe"

// Singleton — imported wherever Stripe API calls are needed.
// Never import this in client components.
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
})
