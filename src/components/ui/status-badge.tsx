import * as React from "react"
import { cn } from "../../lib/utils"

/**
 * One status vocabulary for the whole system.
 *
 * - `safe` / `success`  healthy, nothing to do (green)
 * - `warning` / `pending`  approaching a limit (amber)
 * - `critical` / `error`  past a limit, act now (red)
 * - `neutral` / `info`  no relevant data, or plain information (grey)
 * - `processing`  work in progress (accent)
 *
 * Colour is never the only signal: the badge always carries its words, so it
 * reads the same to screen readers and in greyscale. Pass `children` to say
 * something specific ("Below 75%"); otherwise a plain default label is used.
 */
export type StatusTone =
  | "safe"
  | "success"
  | "warning"
  | "pending"
  | "critical"
  | "error"
  | "neutral"
  | "info"
  | "processing"

export interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: StatusTone
  /** Hide the leading dot (for very tight rows). */
  dot?: boolean
  size?: "sm" | "md"
}

const STYLES: Record<StatusTone, string> = {
  safe: "bg-ok-soft text-ok",
  success: "bg-ok-soft text-ok",
  warning: "bg-warn-soft text-warn",
  pending: "bg-warn-soft text-warn",
  critical: "bg-danger-soft text-danger",
  error: "bg-danger-soft text-danger",
  neutral: "bg-surface-2 text-muted",
  info: "bg-surface-2 text-muted",
  processing: "bg-accent-soft text-accent",
}

const LABELS: Record<StatusTone, string> = {
  safe: "Safe",
  success: "Done",
  warning: "Warning",
  pending: "Pending",
  critical: "Critical",
  error: "Error",
  neutral: "No data",
  info: "Info",
  processing: "In progress",
}

const StatusBadge = React.forwardRef<HTMLSpanElement, StatusBadgeProps>(
  ({ status, dot = true, size = "md", className, children, ...props }, ref) => (
    <span
      ref={ref}
      data-status={status}
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full font-medium",
        size === "sm" ? "px-2 py-px text-[11.5px]" : "px-2.5 py-0.5 text-[12px]",
        STYLES[status],
        className
      )}
      {...props}
    >
      {dot && <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />}
      {children ?? LABELS[status]}
    </span>
  )
)
StatusBadge.displayName = "StatusBadge"

export { StatusBadge }
