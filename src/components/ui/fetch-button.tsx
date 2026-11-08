"use client"
import * as React from "react"
import { cn } from "../../lib/utils"

function SpinnerIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={cn("animate-spin", className)}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" strokeLinecap="round" />
    </svg>
  )
}

export interface FetchButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
  onClick?: () => void
  loading?: boolean
  variant?: "primary" | "success" | "danger" | "gradient" | "ghost"
  size?: "sm" | "md"
  icon?: React.ReactNode
}

export const FetchButton = React.forwardRef<HTMLButtonElement, FetchButtonProps>(
  (
    {
      children,
      onClick,
      loading = false,
      disabled = false,
      className,
      variant = "primary",
      size = "md",
      icon,
      type = "button",
      ...props
    },
    ref
  ) => {
    const sizeClasses = size === "sm" ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm"

    const variants = {
      primary: "border border-accent bg-accent text-background hover:bg-accent/90",
      success: "border border-transparent bg-ok-soft text-ok hover:bg-ok-soft/70",
      danger: "border border-transparent bg-danger-soft text-danger hover:bg-danger-soft/70",
      gradient:
        // v2: kept for compatibility; renders as primary.
        "border border-accent bg-accent text-background hover:bg-accent/90",
      ghost: "bg-transparent hover:bg-surface-2 text-ink-2 border border-transparent",
    }

    return (
      <button
        ref={ref}
        type={type}
        onClick={onClick}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center gap-2 rounded-lg font-medium transition-colors duration-300 cursor-pointer",
          sizeClasses,
          variants[variant],
          (disabled || loading) && "opacity-50 cursor-not-allowed",
          className
        )}
        {...props}
      >
        {loading ? (
          <SpinnerIcon className={size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4"} />
        ) : (
          icon || null
        )}
        {children}
      </button>
    )
  }
)
FetchButton.displayName = "FetchButton"
