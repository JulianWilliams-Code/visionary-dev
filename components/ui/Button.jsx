import { cn } from "@/lib/utils"

// All variants use CSS custom properties so they respect globals.css tokens.
// primary is the only one that needs a runtime style injection for background
// since Tailwind can't statically generate arbitrary var() bg values.
const variants = {
  primary:   "text-white hover:opacity-90 transition-opacity",
  secondary: "bg-[--color-surface-2] text-[--color-text-primary] hover:bg-[--color-border]",
  outline:   "border border-[--color-border] bg-[--color-surface] text-[--color-text-secondary] hover:bg-[--color-surface-2]",
  ghost:     "text-[--color-text-secondary] hover:bg-[--color-surface-2]",
  danger:    "bg-red-600 text-white hover:bg-red-700",
}

const sizes = {
  sm: "px-3 py-1.5 text-sm min-h-[36px]",
  md: "px-4 py-2 text-sm min-h-[40px]",
  lg: "px-6 py-3 text-base min-h-[48px]",
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  disabled,
  loading,
  style,
  ...props
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition-colors duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-brand] focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      style={{
        ...(variant === 'primary' ? { backgroundColor: 'var(--color-brand)' } : {}),
        ...style,
      }}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {children}
    </button>
  )
}
