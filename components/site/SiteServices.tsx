// Server Component.
import type { ServiceRow } from '@/lib/supabase/types'

interface Props {
  services: ServiceRow[]
}

export function SiteServices({ services }: Props) {
  if (services.length === 0) return null

  return (
    <section
      id="services"
      className="bg-[--color-surface-2] px-6 py-20"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-5xl">

        <h2
          id="services-heading"
          className="mb-10 text-center font-bold text-[--color-text-primary]"
          style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)' }}
        >
          How I can help you
        </h2>

        <ul
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          role="list"
        >
          {services.map((service, i) => (
            <li
              key={`${service.name}-${i}`}
              className="
                flex flex-col gap-3 rounded-[var(--radius,0.5rem)]
                border border-[--color-border] bg-[--color-surface] p-6
                shadow-sm transition-all duration-200
                hover:-translate-y-1 hover:shadow-md
              "
            >
              {/* Name */}
              <h3 className="text-base font-semibold text-[--color-text-primary]">
                {service.name}
              </h3>

              {/* Price pill */}
              {service.price ? (
                <span
                  className="self-start rounded-full px-2.5 py-0.5 text-xs font-semibold text-white"
                  style={{ backgroundColor: 'var(--brand, #2563eb)' }}
                >
                  {service.price}
                </span>
              ) : (
                <span className="self-start text-xs text-[--color-text-muted]">
                  Contact for pricing
                </span>
              )}

              {/* Description */}
              {service.description && (
                <p className="text-sm leading-relaxed text-[--color-text-secondary]">
                  {service.description}
                </p>
              )}
            </li>
          ))}
        </ul>

      </div>
    </section>
  )
}
