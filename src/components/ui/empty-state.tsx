"use client"
import * as React from "react"
import { cn } from "../../lib/utils"

export interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
  className?: string
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-16 text-center", className)}>
      {icon && <div className="mb-4 text-gray-300 dark:text-gray-700">{icon}</div>}
      <h3 className="text-lg font-semibold text-ink-2">{title}</h3>
      {description && <p className="mt-2 text-sm text-muted max-w-xs">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}
