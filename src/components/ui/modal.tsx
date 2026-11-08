"use client"
import * as React from "react"
import { cn } from "../../lib/utils"

export interface ModalProps {
  isOpen?: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  maxWidth?: string
  className?: string
  showClose?: boolean
  noPadding?: boolean
}

export function Modal({
  isOpen = true,
  onClose,
  title,
  children,
  maxWidth = "max-w-md",
  className,
  showClose = true,
  noPadding = false,
}: ModalProps) {
  React.useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="fixed inset-0 bg-black/45 dark:bg-black/60" />
      <div
        className={cn(
          "relative w-full",
          maxWidth,
          "rounded-lg border border-line bg-surface text-ink shadow-[0_16px_48px_rgba(0,0,0,0.18)]",
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {showClose && (
          <button
            onClick={onClose}
            aria-label="Close"
            type="button"
            className="absolute right-2 top-2 z-10 grid h-11 w-11 place-items-center rounded-sm text-ink-2 transition-colors duration-[120ms] hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        )}
        {title && (
          <div className="px-6 pt-5 pb-2">
            <h2 className="text-lg font-semibold tracking-tight text-ink">{title}</h2>
          </div>
        )}
        <div className={cn(noPadding ? "" : "p-6", !title && !noPadding && "pt-6")}>{children}</div>
      </div>
    </div>
  )
}
