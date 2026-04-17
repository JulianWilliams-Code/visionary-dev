// Full-page skeleton matching the site layout: nav → hero → services → about → contact → footer

function Pulse({ className }: { className: string }) {
  return (
    <div
      className={`animate-pulse rounded bg-gray-200 ${className}`}
      aria-hidden="true"
    />
  )
}

export default function SiteLoading() {
  return (
    <div className="min-h-screen bg-white" aria-label="Loading site…" aria-busy="true">

      {/* Nav skeleton */}
      <div className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-gray-100 bg-white px-6">
        <Pulse className="h-5 w-36" />
        <Pulse className="h-9 w-28 rounded-lg" />
      </div>

      {/* Hero skeleton */}
      <section className="flex min-h-[85vh] items-center px-6 py-20">
        <div className="mx-auto w-full max-w-5xl">
          <div className="flex flex-col-reverse items-center gap-10 md:flex-row">
            <div className="flex flex-1 flex-col items-center gap-5 md:items-start">
              <Pulse className="h-4 w-24 rounded-full" />
              <Pulse className="h-12 w-4/5" />
              <Pulse className="h-12 w-3/5" />
              <Pulse className="mt-2 h-5 w-full max-w-md" />
              <Pulse className="h-5 w-2/3 max-w-sm" />
              <div className="mt-4 flex gap-3">
                <Pulse className="h-12 w-36 rounded-lg" />
                <Pulse className="h-12 w-36 rounded-lg" />
              </div>
            </div>
            <Pulse className="h-48 w-48 shrink-0 rounded-full md:h-56 md:w-56" />
          </div>
        </div>
      </section>

      {/* Services skeleton */}
      <section className="bg-gray-50 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <Pulse className="mx-auto mb-10 h-8 w-48" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-lg border border-gray-200 p-6">
                <Pulse className="mb-3 h-5 w-3/4" />
                <Pulse className="mb-2 h-4 w-full" />
                <Pulse className="h-4 w-5/6" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About skeleton */}
      <section className="px-6 py-20">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-12 md:flex-row">
          <Pulse className="h-48 w-48 shrink-0 rounded-full" />
          <div className="flex flex-1 flex-col gap-4">
            <Pulse className="h-7 w-48" />
            <Pulse className="h-4 w-full" />
            <Pulse className="h-4 w-full" />
            <Pulse className="h-4 w-4/5" />
          </div>
        </div>
      </section>

      {/* Contact skeleton */}
      <section className="bg-gray-50 px-6 py-20">
        <div className="mx-auto max-w-lg">
          <Pulse className="mx-auto mb-8 h-8 w-40" />
          <div className="flex flex-col gap-4">
            <Pulse className="h-12 w-full rounded-lg" />
            <Pulse className="h-12 w-full rounded-lg" />
            <Pulse className="h-28 w-full rounded-lg" />
            <Pulse className="h-12 w-full rounded-lg" />
          </div>
        </div>
      </section>

      {/* Footer skeleton */}
      <div className="border-t border-gray-100 px-6 py-10 text-center">
        <Pulse className="mx-auto h-4 w-56" />
      </div>

    </div>
  )
}
