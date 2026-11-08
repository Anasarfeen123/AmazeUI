"use client"
import { cn } from "../../lib/utils"
import { useSidebar } from "./sidebar"

export interface SidebarProfileProps {
  name?: string
  degree?: string
  avatarUrl?: string
  initials?: string
  onLogout?: () => void
  onProfileClick?: () => void
  className?: string
}

export function SidebarProfile({
  name,
  degree,
  avatarUrl,
  initials,
  onLogout,
  onProfileClick,
  className,
}: SidebarProfileProps) {
  const { isOpen } = useSidebar()

  if (!isOpen) {
    return (
      <button
        onClick={onProfileClick}
        className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors hover:ring-2 hover:ring-white/20"
        title="Account Settings"
      >
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt=""
            className="h-8 w-8 rounded-full border border-sidebar-border object-cover"
          />
        ) : (
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sidebar-accent text-[11px] font-bold text-sidebar-foreground">
            {initials || "ST"}
          </span>
        )}
      </button>
    )
  }

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt=""
          className="h-8 w-8 rounded-full border border-sidebar-border object-cover"
        />
      ) : (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sidebar-accent text-[11px] font-bold text-sidebar-foreground">
          {initials || "ST"}
        </div>
      )}
      <div className="min-w-0 flex-1">
        <span className="block truncate text-xs font-semibold text-sidebar-foreground">{name}</span>
        {degree && (
          <span className="block truncate text-[11px] text-sidebar-foreground/">{degree}</span>
        )}
      </div>
      <button
        onClick={onLogout}
        className="rounded-lg p-1.5 text-sidebar-foreground/ transition-colors hover:bg-sidebar-accent hover:text-danger focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
        title="Log out"
        aria-label="Log out"
      >
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
      </button>
    </div>
  )
}

export interface SidebarThemeControlProps {
  theme?: string
  onThemeChange?: (theme: string) => void
  className?: string
}

export function SidebarThemeControl({
  theme = "light",
  onThemeChange,
  className,
}: SidebarThemeControlProps) {
  const { isOpen } = useSidebar()

  if (!isOpen) {
    return (
      <button
        onClick={() => onThemeChange?.(theme === "dark" ? "light" : "dark")}
        className="flex h-8 w-8 items-center justify-center rounded-lg text-sidebar-foreground/ transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
        title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      >
        {theme === "dark" ? (
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        ) : (
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )}
      </button>
    )
  }

  return (
    <div
      className={cn(
        "flex items-center justify-between px-0.5 text-[11px] text-sidebar-foreground/",
        className
      )}
    >
      <span className="text-sidebar-foreground/ text-[11px] font-semibold">Theme</span>
      <div className="flex items-center gap-3">
        <button
          onClick={() => onThemeChange?.("light")}
          className={`flex items-center gap-1 transition-colors hover:text-sidebar-foreground ${theme === "light" ? "font-medium text-info" : ""}`}
        >
          <span
            className={`h-2 w-2 rounded-full border transition-colors ${theme === "light" ? "border-info bg-info" : "border-sidebar-border"}`}
          />
          <span>Light</span>
        </button>
        <button
          onClick={() => onThemeChange?.("dark")}
          className={`flex items-center gap-1 transition-colors hover:text-sidebar-foreground ${theme === "dark" ? "font-medium text-info" : ""}`}
        >
          <span
            className={`h-2 w-2 rounded-full border transition-colors ${theme === "dark" ? "border-info bg-info" : "border-sidebar-border"}`}
          />
          <span>Dark</span>
        </button>
      </div>
    </div>
  )
}

export interface SidebarExpandButtonProps {
  onClick?: () => void
  className?: string
}

export function SidebarExpandButton({ onClick, className }: SidebarExpandButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-lg text-sidebar-foreground/ transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
        className
      )}
      title="Expand sidebar"
      aria-label="Expand sidebar"
    >
      <svg
        className="h-4.5 w-4.5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </svg>
    </button>
  )
}
