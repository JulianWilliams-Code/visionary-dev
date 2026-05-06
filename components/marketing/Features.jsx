import { Zap, PenLine, Inbox, Smartphone, Globe, Shield } from 'lucide-react'

// Every feature listed here is actually built and shipped.
// No booking automation, no auto-replies — those aren't real yet.
const features = [
  {
    Icon:        Zap,
    title:       'Generated in minutes',
    description: 'No templates to customize, no design decisions to make. Answer 7 questions and your site is built automatically — layout, copy, and structure tailored to your business.',
  },
  {
    Icon:        PenLine,
    title:       'Copy written for you',
    description: 'We generate the headlines, about section, and service descriptions based on what you told us about your business. You get a real site, not a placeholder.',
  },
  {
    Icon:        Inbox,
    title:       'Leads captured to your dashboard',
    description: 'Every contact form submission is stored in your dashboard. You can see who reached out, when, and what they said — all in one place.',
  },
  {
    Icon:        Smartphone,
    title:       'Mobile-first by default',
    description: 'Most of your potential clients will find you on their phone. Every Visionary Dev site is built to look sharp on every screen, without you thinking about it.',
  },
  {
    Icon:        Globe,
    title:       'Custom domain on Pro',
    description: 'Start on your free subdomain (yourname.visionarydev.org). Upgrade to connect your own domain — we give you step-by-step DNS instructions and handle SSL.',
  },
  {
    Icon:        Shield,
    title:       'Hosting and uptime handled',
    description: "Speed, security, and uptime are our problem, not yours. Your site runs on enterprise infrastructure — you focus on clients, not servers.",
  },
]

export default function Features() {
  return (
    <section id="features" className="bg-[--color-surface-2] px-4 py-24">
      <div className="mx-auto max-w-5xl">

        <div className="mb-16 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[--color-brand]">
            Features
          </p>
          <h2
            className="font-bold text-[--color-text-primary]"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)' }}
          >
            Everything you need to get online and get clients.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-[--color-text-muted]">
            Built specifically for service businesses. Not a generic builder — a focused tool for your type of work.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map(({ Icon, title, description }) => (
            <div
              key={title}
              className="
                flex flex-col gap-3 rounded-[--radius-lg]
                border border-[--color-border] bg-[--color-surface] p-6
                transition-all duration-150 hover:shadow-md
              "
            >
              <div
                className="flex h-10 w-10 items-center justify-center rounded-lg"
                style={{ backgroundColor: 'var(--color-brand-light)' }}
                aria-hidden="true"
              >
                <Icon size={18} style={{ color: 'var(--color-brand)' }} />
              </div>
              <h3 className="text-sm font-semibold text-[--color-text-primary]">{title}</h3>
              <p className="text-sm leading-relaxed text-[--color-text-muted]">{description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
