import { cn } from "../../lib/utils"

export interface BadgeProps {
  children: React.ReactNode
  className?: string
  variant?: "default" | "success" | "warning" | "danger" | "info" | "purple"
  size?: "sm" | "md"
}

const variants = {
  default: "bg-surface-2 text-ink",
  success: "bg-success-surface text-success-foreground",
  warning: "bg-warning-surface text-warning-foreground",
  danger: "bg-danger-surface text-danger-foreground",
  info: "bg-info-surface text-info-foreground",
  purple: "bg-course-3/12 text-course-3",
}

const sizes = {
  sm: "px-2 py-0.5 text-[11px]",
  md: "px-2.5 py-1 text-xs",
}

export function Badge({ children, className, variant = "default", size = "sm" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full font-medium",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  )
}
