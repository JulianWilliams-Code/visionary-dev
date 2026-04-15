import Link from "next/link"
import { Button } from "@/components/ui/Button"

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center px-4 py-32">
      <h1 className="text-5xl font-bold tracking-tight text-gray-900 max-w-3xl leading-tight">
        Your business website,{" "}
        <span className="text-blue-600">live in 2 minutes.</span>
      </h1>
      <p className="mt-6 text-xl text-gray-500 max-w-xl">
        Answer 7 questions. Get a professional, bookable website instantly.
        No designers. No drag-and-drop. No waiting.
      </p>
      <div className="mt-10 flex flex-wrap gap-4 justify-center">
        <Link href="/signup">
          <Button size="lg">Get your website free</Button>
        </Link>
        <Link href="#features">
          <Button variant="outline" size="lg">See how it works</Button>
        </Link>
      </div>
    </section>
  )
}
