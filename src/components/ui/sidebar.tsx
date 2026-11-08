"use client"
import * as React from "react"
import { cn } from "../../lib/utils"

const SidebarContext = React.createContext<{
  isOpen: boolean
  setIsOpen: (open: boolean) => void
} | null>(null)

export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
  side?: "left" | "right"
}

export const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ className, isOpen = true, onOpenChange, side = "left", children, ...props }, ref) => {
    const [internalOpen, setInternalOpen] = React.useState(isOpen)
    const isControlled = onOpenChange !== undefined
    const openState = isControlled ? isOpen : internalOpen

    const handleToggle = React.useCallback(
      (open: boolean) => {
        if (isControlled) {
          onOpenChange(open)
        } else {
          setInternalOpen(open)
        }
      },
      [isControlled, onOpenChange]
    )

    return (
      <SidebarContext.Provider value={{ isOpen: openState, setIsOpen: handleToggle }}>
        <aside
          ref={ref}
          data-state={openState ? "expanded" : "collapsed"}
          className={cn(
            "fixed top-0 z-50 hidden h-screen flex-col border-sidebar-border bg-sidebar text-sidebar-foreground transition-[width] duration-200 ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:transition-none md:flex",
            openState ? "overflow-hidden w-[280px]" : "overflow-visible w-[72px]",
            side === "left" ? "left-0 border-r" : "right-0 border-l",
            className
          )}
          {...props}
        >
          {children}
        </aside>
      </SidebarContext.Provider>
    )
  }
)
Sidebar.displayName = "Sidebar"

export const SidebarHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { isOpen } = useSidebar()
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col border-b border-sidebar-border shrink-0",
          isOpen ? "px-4 pb-4 pt-5" : "px-3.5 py-4",
          className
        )}
        {...props}
      />
    )
  }
)
SidebarHeader.displayName = "SidebarHeader"

export const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { isOpen } = useSidebar()
  return (
    <div
      ref={ref}
      style={{ overflowY: "auto", overflowX: "hidden" }}
      className={cn("min-h-0 flex-1", isOpen ? "px-3 py-4" : "px-2 py-4 items-center", className)}
      {...props}
    />
  )
})
SidebarContent.displayName = "SidebarContent"

export const SidebarGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("flex w-full flex-col gap-0.5", className)} {...props} />
  }
)
SidebarGroup.displayName = "SidebarGroup"

export const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { isOpen } = useSidebar()
  if (!isOpen) return null
  return (
    <div
      ref={ref}
      className={cn("mb-1 mt-5 px-2.5 text-[12px] font-medium text-muted first:mt-1", className)}
      {...props}
    />
  )
})
SidebarGroupLabel.displayName = "SidebarGroupLabel"

export interface SidebarItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode
  isActive?: boolean
  label?: React.ReactNode
  rightElement?: React.ReactNode
}

export const SidebarItem = React.forwardRef<HTMLButtonElement, SidebarItemProps>(
  ({ className, icon, isActive, label, rightElement, ...props }, ref) => {
    const { isOpen } = useSidebar()
    return (
      <button
        ref={ref}
        data-active={isActive}
        className={cn(
          "group relative flex w-full items-center rounded-sm transition-colors duration-[120ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent [&_svg]:h-[18px] [&_svg]:w-[18px] [&_svg]:stroke-[1.8]",
          isOpen
            ? "min-h-9 justify-start gap-2.5 px-2.5 py-1.5 text-[14px]"
            : "mt-1 h-11 w-11 justify-center",
          isActive
            ? "bg-accent-soft font-semibold text-accent"
            : "text-ink-2 hover:bg-surface-2 hover:text-ink",
          className
        )}
        {...props}
      >
        <div
          className={cn("shrink-0", isActive ? "text-accent" : "text-muted group-hover:text-ink")}
        >
          {icon}
        </div>
        {isOpen && label && (
          <span
            className={cn("flex-1 truncate text-left", isActive ? "font-semibold" : "font-normal")}
          >
            {label}
          </span>
        )}
        {isOpen && rightElement && <div className="shrink-0">{rightElement}</div>}
        {!isOpen && label && (
          <div className="absolute left-full z-50 ml-3 hidden whitespace-nowrap rounded-sm bg-ink px-2.5 py-1.5 text-xs font-medium text-background shadow-[0_8px_24px_rgba(0,0,0,0.14)] group-hover:block group-focus-visible:block">
            {label}
            <div className="absolute left-0 top-1/2 h-2 w-2 -translate-x-1 -translate-y-1/2 rotate-45 bg-ink"></div>
          </div>
        )}
      </button>
    )
  }
)
SidebarItem.displayName = "SidebarItem"

export const SidebarFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { isOpen } = useSidebar()
    return (
      <div
        ref={ref}
        className={cn(
          "shrink-0 border-t border-line",
          isOpen ? "p-4" : "p-3 flex justify-center",
          className
        )}
        {...props}
      />
    )
  }
)
SidebarFooter.displayName = "SidebarFooter"
