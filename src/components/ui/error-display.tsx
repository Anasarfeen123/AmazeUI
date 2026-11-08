import { cn } from "../../lib/utils"
import { Pressable } from "../../lib/primitives"

function XCircleIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m15 9-6 6" />
      <path d="m9 9 6 6" />
    </svg>
  )
}

function AlertTriangleIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  )
}

export interface ErrorDisplayProps {
  message: string
  variant?: "error" | "warning"
  className?: string
  onRetry?: () => void
}

const iconMap = {
  error: XCircleIcon,
  warning: AlertTriangleIcon,
}

const styleMap = {
  error: "bg-danger-soft border border-danger/40 text-danger",
  warning: "bg-warn-soft border border-warn/40 text-warn",
}

export function ErrorDisplay({
  message,
  variant = "error",
  className,
  onRetry,
}: ErrorDisplayProps) {
  const Icon = iconMap[variant]
  return (
    <div
      className={cn(
        styleMap[variant],
        "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium mb-5",
        className
      )}
    >
      <Icon className="w-4 h-4 shrink-0" />
      <span className="flex-1">{message}</span>
      {onRetry && (
        <Pressable
          onPress={onRetry}
          className="ml-auto text-sm font-medium underline hover:no-underline"
        >
          Retry
        </Pressable>
      )}
    </div>
  )
}
