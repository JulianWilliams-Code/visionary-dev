const steps = [
  {
    number: "01",
    title: "Tell us about your business",
    description:
      "Answer 7 simple questions: what you do, who you help, what you charge, and how clients should reach you. Takes 2 minutes.",
    detail: "No technical knowledge needed",
  },
  {
    number: "02",
    title: "We build your website instantly",
    description:
      "Our system generates a complete, professional website tailored to your business — layout, copy, booking form, and all.",
    detail: "Done while you watch",
  },
  {
    number: "03",
    title: "Go live and start getting clients",
    description:
      "One click and your site is live at YourBusiness.visionarydev.com. Share it immediately. Start receiving bookings today.",
    detail: "Custom domain available on paid plans",
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white px-4 py-24">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest">
            How it works
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">
            From zero to live website in 3 steps.
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto">
            No tutorials. No YouTube videos. No tech headaches. Just answer a few questions and we take it from there.
          </p>
        </div>

        <div className="relative">
          {/* Connecting line — desktop only */}
          <div className="hidden md:block absolute top-12 left-[16.67%] right-[16.67%] h-px bg-gray-200 -z-0" />

          <div className="grid md:grid-cols-3 gap-10">
            {steps.map((step) => (
              <div key={step.number} className="relative text-center">
                {/* Step number circle */}
                <div className="mx-auto mb-6 h-24 w-24 rounded-full bg-blue-50 border-2 border-blue-100 flex items-center justify-center relative z-10">
                  <span className="text-2xl font-bold text-blue-600">{step.number}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-3">{step.description}</p>
                <span className="inline-block text-xs font-medium text-blue-600 bg-blue-50 rounded-full px-3 py-1">
                  {step.detail}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Demo CTA */}
        <div className="mt-16 bg-blue-50 border border-blue-100 rounded-2xl p-8 text-center">
          <p className="text-gray-700 font-medium mb-1">See it in action</p>
          <p className="text-gray-500 text-sm mb-6">
            Watch a real website go from 7 questions to live in under 3 minutes.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:underline"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white text-sm">
              ▶
            </span>
            Watch the demo (2:47)
          </a>
        </div>
      </div>
    </section>
  )
}
