"use client"
import { useEffect, useId } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "../../lib/utils"

export interface AppLibraryProps {
  open: boolean
  onClose: () => void
  title: string
  subtitle?: string
  showBack?: boolean
  onBack?: () => void
  searchQuery?: string
  onSearchChange?: (q: string) => void
  children?: React.ReactNode
  headerRight?: React.ReactNode
  className?: string
}

export function AppLibrary({
  open,
  onClose,
  title,
  subtitle,
  showBack,
  onBack,
  searchQuery,
  onSearchChange,
  children,
  headerRight,
  className,
}: AppLibraryProps) {
  const titleId = useId()

  // Escape closes the sheet, like every other overlay.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[55] bg-black/45 md:hidden"
            style={{ willChange: "opacity" }}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 250, mass: 0.8 }}
            className={cn(
              "fixed bottom-0 left-0 right-0 z-[60] flex max-h-[86vh] flex-col overflow-hidden bg-background md:hidden rounded-t-lg border-t border-line shadow-[0_-8px_24px_rgba(0,0,0,0.12)]",
              className
            )}
            style={{ willChange: "transform", paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
          >
            <div className="flex w-full shrink-0 justify-center pt-3 pb-1">
              <div className="h-1 w-9 rounded-full bg-line" />
            </div>

            <div className="shrink-0 px-5 pb-3 pt-4">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    {showBack && (
                      <button
                        type="button"
                        onClick={onBack}
                        className="-ml-1 flex items-center gap-1 min-h-11 rounded-sm px-1 text-[13px] font-medium text-accent hover:bg-surface-2"
                      >
                        <svg
                          className="h-4 w-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M19 12H5" />
                          <polyline points="12 19 5 12 12 5" />
                        </svg>
                        Back
                      </button>
                    )}
                    <h2 id={titleId} className="truncate text-xl font-semibold tracking-tight text-ink">
                      {title}
                    </h2>
                  </div>
                  {subtitle && <p className="mt-0.5 text-[13px] text-muted">{subtitle}</p>}
                </div>
                {headerRight}
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-sm text-ink-2 hover:bg-surface-2"
                >
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {onSearchChange && (
              <div className="shrink-0 px-5 pb-3">
                <div className="flex items-center gap-2 min-h-11 rounded-sm border border-line bg-surface px-3 focus-within:border-accent focus-within:ring-3 focus-within:ring-accent-soft">
                  <svg
                    className="h-4 w-4 shrink-0 text-muted"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery || ""}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="flex-1 bg-transparent text-[15px] text-ink outline-none placeholder:text-muted"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => onSearchChange("")}
                      className="text-[13px] text-muted hover:text-ink"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            )}

            <div className="min-h-0 flex-1 space-y-6 overflow-y-auto overscroll-contain px-5 pb-6 pt-2">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
