import { cn } from "@/lib/utils"

export function Input({ label, error, id, name, className, ...props }) {
  // Use explicit id if provided, fall back to name so htmlFor always resolves
  const inputId = id ?? name

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-[--color-text-primary]"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        name={name}
        className={cn(
          "w-full rounded-lg border border-[--color-border] bg-[--color-surface]",
          "px-4 py-3 text-sm text-[--color-text-primary]",
          "placeholder:text-[--color-text-muted]",
          "transition-all duration-150",
          "focus:border-[--color-brand] focus:outline-none",
          "focus:ring-2 focus:ring-[--color-brand] focus:ring-offset-0",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500",
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  )
}
