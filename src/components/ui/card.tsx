"use client"
import * as React from "react"
import { cn } from "../../lib/utils"

export interface CardProps {
  children?: React.ReactNode
  className?: string
  onClick?: () => void
  hover?: boolean
  variant?: "default" | "glass" | "gradient" | "outline"
  gradient?: string
  title?: React.ReactNode
  subtitle?: React.ReactNode
  action?: React.ReactNode
}

export function Card({
  children,
  className,
  onClick,
  hover = false,
  variant = "default",
  gradient,
  title,
  subtitle,
  action,
}: CardProps) {
  const base = "rounded-md border transition-colors duration-[120ms]"

  const variants = {
    default: "border-line bg-surface text-ink",
    glass: "border-line bg-surface text-ink",
    gradient: gradient
      ? `border-accent/30 bg-accent-soft text-ink ${gradient}`
      : "border-accent/30 bg-accent-soft text-ink",
    outline: "border-line bg-transparent text-ink",
  }

  const hoverClasses = hover
    ? `${variant === "gradient" ? "hover:border-accent/50" : "hover:bg-surface-2"} cursor-pointer`
    : onClick
      ? "cursor-pointer"
      : ""

  const hasHeader = title !== undefined || subtitle !== undefined || action !== undefined

  return (
    <div
      onClick={onClick}
      className={cn(base, variants[variant], hoverClasses, onClick && "cursor-pointer", className)}
    >
      {hasHeader && (
        <CardHeader action={action}>
          {title && <CardTitle>{title}</CardTitle>}
          {subtitle && <CardDescription>{subtitle}</CardDescription>}
        </CardHeader>
      )}
      {children}
    </div>
  )
}

export function CardHeader({
  className,
  action,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { action?: React.ReactNode }) {
  if (action) {
    return (
      <div
        className={cn("flex items-start justify-between gap-4 px-4 py-3.5", className)}
        {...props}
      >
        <div className="flex min-w-0 flex-1 flex-col space-y-1.5">{children}</div>
        <div className="shrink-0">{action}</div>
      </div>
    )
  }
  return (
    <div className={cn("flex flex-col space-y-1.5 px-4 py-3.5", className)} {...props}>
      {children}
    </div>
  )
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("font-semibold text-lg leading-none tracking-tight text-ink", className)}
      {...props}
    />
  )
}

export function CardDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-muted", className)} {...props} />
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("px-4 pb-4", className)} {...props} />
}

export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center px-4 pb-4", className)} {...props} />
}
