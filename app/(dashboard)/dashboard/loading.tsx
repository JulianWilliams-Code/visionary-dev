function Pulse({ className }: { className: string }) {
  return <div className={`animate-pulse rounded bg-[--color-surface-2] ${className}`} aria-hidden="true" />
}

export default function DashboardLoading() {
  return (
    <div className="space-y-8" aria-label="Loading…" aria-busy="true">
      {/* Header row */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <Pulse className="h-7 w-32" />
          <Pulse className="h-4 w-52" />
        </div>
        <Pulse className="h-11 w-28 rounded-[--radius-lg]" />
      </div>

      {/* Plan bar */}
      <div className="space-y-2">
        <Pulse className="h-3 w-24" />
        <Pulse className="h-1.5 w-full rounded-full" />
      </div>

      {/* Site cards grid */}
      <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3" aria-hidden="true">
        {Array.from({ length: 3 }).map((_, i) => (
          <li key={i} className="rounded-[--radius-xl] border border-[--color-border] bg-[--color-surface] p-5 space-y-4">
            {/* Browser chrome */}
            <div className="rounded-[--radius-md] border border-[--color-border] p-3 space-y-2">
              <div className="flex gap-1.5">
                <Pulse className="h-2.5 w-2.5 rounded-full" />
                <Pulse className="h-2.5 w-2.5 rounded-full" />
                <Pulse className="h-2.5 w-2.5 rounded-full" />
              </div>
              <Pulse className="h-5 w-full rounded-[--radius-sm]" />
              <Pulse className="h-2 w-3/4" />
              <Pulse className="h-2 w-1/2" />
            </div>
            <Pulse className="h-5 w-3/4" />
            <Pulse className="h-3 w-1/2" />
            <div className="flex gap-2">
              <Pulse className="h-10 flex-1 rounded-[--radius-md]" />
              <Pulse className="h-10 w-10 rounded-[--radius-md]" />
              <Pulse className="h-10 w-10 rounded-[--radius-md]" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
