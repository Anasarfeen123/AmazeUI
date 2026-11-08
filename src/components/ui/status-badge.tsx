import * as React from "react"
import { cn } from "../../lib/utils"

export interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: "pending" | "processing" | "success" | "error" | "warning" | "info"
}

const StatusBadge = React.forwardRef<HTMLSpanElement, StatusBadgeProps>(
  ({ status, className, ...props }, ref) => {
    const styles = {
      pending: "border-warn/20 bg-warn-soft text-warn",
      processing: "border-accent/20 bg-accent-soft text-accent",
      success: "border-ok/20 bg-ok-soft text-ok",
      error: "border-danger/20 bg-danger-soft text-danger",
      warning: "border-warn/20 bg-warn-soft text-warn",
      info: "border-line-2 bg-surface-2 text-muted",
    }

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
          styles[status],
          className
        )}
        {...props}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />
        {status}
      </span>
    )
  }
)
StatusBadge.displayName = "StatusBadge"

export { StatusBadge }
