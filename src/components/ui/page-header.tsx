"use client"
import * as React from "react"
import { cn } from "../../lib/utils"

export interface PageHeaderProps {
  icon?: React.ReactNode
  title: string
  meta?: React.ReactNode
  actions?: React.ReactNode
  className?: string
}

export function PageHeader({ icon, title, meta, actions, className }: PageHeaderProps) {
  return (
    <div
      className={cn(
        "border-x border-b border-line bg-surface px-4 py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 -mx-4 md:-mx-6 mb-6 relative z-10",
        className
      )}
    >
      <div className="flex flex-wrap items-center gap-2.5 z-10 min-w-0 w-full sm:w-auto">
        <h1 className="text-base sm:text-xl md:text-2xl font-semibold tracking-tight text-ink flex items-center gap-2.5 min-w-0">
          {icon}
          <span className="truncate">{title}</span>
        </h1>
        {meta}
      </div>
      {actions && (
        <div className="flex items-center gap-2.5 z-10 w-full sm:w-auto justify-end sm:justify-start">
          {actions}
        </div>
      )}
    </div>
  )
}
