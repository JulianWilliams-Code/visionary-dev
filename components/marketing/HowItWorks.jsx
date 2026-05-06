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
      "Our system generates a complete, professional website tailored to your business — layout, copy, contact form, and all.",
    detail: "Done while you watch",
  },
  {
    number: "03",
    title: "Go live and start getting clients",
    description:
      "One click and your site is live at YourBusiness.visionarydev.org. Share it immediately. Start receiving inquiries today.",
    detail: "Custom domain available on paid plans",
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-[--color-surface] px-4 py-24">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span
            className="text-sm font-semibold uppercase tracking-widest"
            style={{ color: 'var(--color-brand)' }}
          >
            How it works
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[--color-text-primary]">
            From zero to live website in 3 steps.
          </h2>
          <p className="mt-4 text-[--color-text-muted] max-w-xl mx-auto">
            No tutorials. No YouTube videos. No tech headaches. Just answer a few questions and we take it from there.
          </p>
        </div>

        <div className="relative">
          {/* Connecting line — desktop only */}
          <div className="hidden md:block absolute top-12 left-[16.67%] right-[16.67%] h-px bg-[--color-border] -z-0" />

          <div className="grid md:grid-cols-3 gap-10">
            {steps.map((step) => (
              <div key={step.number} className="relative text-center">
                {/* Step number circle */}
                <div
                  className="mx-auto mb-6 h-24 w-24 rounded-full flex items-center justify-center relative z-10 border-2"
                  style={{
                    backgroundColor: 'var(--color-brand-light)',
                    borderColor: 'var(--color-brand-light)',
                  }}
                >
                  <span
                    className="text-2xl font-bold"
                    style={{ color: 'var(--color-brand)' }}
                  >
                    {step.number}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-[--color-text-primary] mb-2">{step.title}</h3>
                <p className="text-[--color-text-muted] text-sm leading-relaxed mb-3">{step.description}</p>
                <span
                  className="inline-block text-xs font-medium rounded-full px-3 py-1"
                  style={{
                    color: 'var(--color-brand)',
                    backgroundColor: 'var(--color-brand-light)',
                  }}
                >
                  {step.detail}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA block */}
        <div
          className="mt-16 rounded-2xl p-8 text-center border"
          style={{
            backgroundColor: 'var(--color-brand-light)',
            borderColor: 'var(--color-border)',
          }}
        >
          <p className="text-[--color-text-primary] font-medium mb-1">Ready to go live?</p>
          <p className="text-[--color-text-muted] text-sm mb-6">
            It takes 2 minutes. No credit card required.
          </p>
          <a
            href="/signup"
            className="inline-flex items-center justify-center min-h-[48px] rounded-lg px-8 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: 'var(--color-accent)' }}
          >
            Build my website free →
          </a>
        </div>
      </div>
    </section>
  )
}
