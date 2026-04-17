function Pulse({ className }: { className: string }) {
  return <div className={`animate-pulse rounded bg-[--color-surface-2] ${className}`} aria-hidden="true" />
}

export default function SiteEditLoading() {
  return (
    <div className="space-y-6" aria-label="Loading editor…" aria-busy="true">
      {/* Breadcrumb */}
      <div className="flex items-center gap-3">
        <Pulse className="h-5 w-20" />
        <Pulse className="h-5 w-4" />
        <Pulse className="h-5 w-40" />
        <Pulse className="ml-auto h-5 w-24" />
      </div>

      {/* Editor + sidebar layout */}
      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">

        {/* Accordion skeletons */}
        <div className="space-y-3" aria-hidden="true">
          <div className="flex items-center justify-between">
            <Pulse className="h-6 w-24" />
            <Pulse className="h-10 w-16 rounded-[--radius-md]" />
          </div>
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-[--radius-lg] border border-[--color-border] bg-[--color-surface]"
            >
              <div className="flex items-center justify-between px-5 py-4">
                <div className="flex items-center gap-3">
                  <Pulse className="h-4 w-4 rounded" />
                  <Pulse className="h-4 w-32" />
                </div>
                <Pulse className="h-4 w-4" />
              </div>
            </div>
          ))}
        </div>

        {/* Info panel skeleton */}
        <div className="hidden lg:block">
          <div className="rounded-[--radius-lg] border border-[--color-border] bg-[--color-surface] p-5 space-y-3">
            <Pulse className="h-4 w-20" />
            <div className="space-y-2">
              <div className="flex justify-between">
                <Pulse className="h-3 w-8" />
                <Pulse className="h-3 w-32 font-mono" />
              </div>
              <div className="flex justify-between">
                <Pulse className="h-3 w-10" />
                <Pulse className="h-3 w-16" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
