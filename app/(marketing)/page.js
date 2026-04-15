import Hero from "@/components/marketing/Hero"
import Problem from "@/components/marketing/Problem"
import HowItWorks from "@/components/marketing/HowItWorks"
import Features from "@/components/marketing/Features"
import Testimonials from "@/components/marketing/Testimonials"
import Pricing from "@/components/marketing/Pricing"
import FinalCTA from "@/components/marketing/FinalCTA"

export const metadata = {
  title: "Visionary Dev — Your website, live in 2 minutes",
  description:
    "Answer 7 questions. Get a professional, bookable website instantly. Built for fitness trainers, coaches, and service businesses.",
}

export default function LandingPage() {
  return (
    <>
      <Hero />
      <Problem />
      <HowItWorks />
      <Features />
      <Testimonials />
      <Pricing />
      <FinalCTA />
    </>
  )
}
