import * as React from "react"
import { cn } from "../../lib/utils"

export interface BreadcrumbItem {
  label: string
  href?: string
  active?: boolean
}

export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[]
}

const Breadcrumbs = React.forwardRef<HTMLElement, BreadcrumbsProps>(
  ({ items, className, ...props }, ref) => (
    <nav
      ref={ref}
      className={cn("mb-2 flex items-center gap-2 text-[13px] text-muted", className)}
      {...props}
    >
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          {item.href ? (
            <a
              href={item.href}
              className={cn(
                "transition-colors hover:text-ink",
                item.active && "font-medium text-ink"
              )}
            >
              {item.label}
            </a>
          ) : (
            <span className={item.active ? "font-medium text-ink" : ""}>{item.label}</span>
          )}
          {idx < items.length - 1 && (
            <span aria-hidden="true" className="text-line">
              /
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  )
)
Breadcrumbs.displayName = "Breadcrumbs"

export { Breadcrumbs }
