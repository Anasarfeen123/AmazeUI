"use client"
import { useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "../../lib/utils"

export interface SyncNotificationProps {
  message: string
  progress: number
  active: boolean
  onDismiss: () => void
}

function CheckCircleIcon({ className }: { className?: string }) {
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
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )
}

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

function RefreshIcon({ className }: { className?: string }) {
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
      <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
      <path d="M16 16h5v5" />
    </svg>
  )
}

function LoaderIcon({ className }: { className?: string }) {
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

function XIcon({ className }: { className?: string }) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}

function ChevronDownIcon({ className }: { className?: string }) {
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
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

function cleanStep(line: string) {
  return line
    .replace(/^✅\s*/, "")
    .replace(/^❌\s*/, "")
    .replace(/\.\.\.$/, "")
    .trim()
}

export function SyncNotification({
  message,
  progress = 0,
  active,
  onDismiss,
}: SyncNotificationProps) {
  const [showDetails, setShowDetails] = useState(false)
  const isComplete = !active && progress >= 100
  const isError = message.trim().startsWith("\u274C")

  const steps = useMemo(() => {
    return message
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => ({
        raw: line,
        label: cleanStep(line),
        completed: line.startsWith("\u2705"),
        failed: line.startsWith("\u274C"),
      }))
  }, [message])

  const activeStep =
    [...steps].reverse().find((step) => !step.completed && !step.failed) || steps[steps.length - 1]
  const completedSteps = steps.filter((step) => step.completed)
  const visibleSteps = showDetails
    ? steps
    : [...completedSteps.slice(-2), ...(activeStep && !activeStep.completed ? [activeStep] : [])]

  useEffect(() => {
    if (!isComplete) return
    const timer = window.setTimeout(onDismiss, 4000)
    return () => window.clearTimeout(timer)
  }, [isComplete, onDismiss])

  return (
    <AnimatePresence>
      {(active || isComplete || isError) && (
        <motion.div
          initial={{ opacity: 0, y: -12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.98 }}
          transition={{ duration: 0.18 }}
          className="fixed right-4 top-4 z-[100] w-[calc(100vw-2rem)] max-w-[360px] rounded-md border border-line bg-surface p-4 text-ink shadow-[0_8px_24px_rgba(0,0,0,0.14)]"
        >
          <div className="flex items-start gap-3">
            <div
              className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                isError
                  ? "bg-danger-soft text-danger"
                  : isComplete
                    ? "bg-ok-soft text-ok"
                    : "bg-accent-soft text-accent"
              }`}
            >
              {isError ? (
                <XCircleIcon className="h-4 w-4" />
              ) : isComplete ? (
                <CheckCircleIcon className="h-4 w-4" />
              ) : (
                <RefreshIcon className="h-4 w-4" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-ink">
                    {isError
                      ? "Sync failed"
                      : isComplete
                        ? "Sync completed successfully."
                        : "Syncing with VTOP..."}
                  </p>
                  {!isComplete && !isError && activeStep && (
                    <p className="mt-0.5 truncate text-xs font-medium text-muted">
                      {activeStep.label}
                    </p>
                  )}
                </div>
                <button
                  onClick={onDismiss}
                  className="rounded-xl p-1 text-muted transition-colors duration-150 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                  aria-label="Dismiss sync notification"
                >
                  <XIcon className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-surface-2">
                <motion.div
                  className={`h-full ${isError ? "bg-danger" : isComplete ? "bg-ok" : "bg-accent"}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.max(0, Math.min(100, progress || 0))}%` }}
                  transition={{ duration: 0.2 }}
                />
              </div>

              <div className="mt-3 space-y-1.5">
                {visibleSteps.map((step, idx) => (
                  <div
                    key={`${step.raw}-${idx}`}
                    className="flex items-center gap-2 text-xs font-medium text-gray-600 dark:text-gray-300"
                  >
                    {step.failed ? (
                      <XCircleIcon className="h-3.5 w-3.5 shrink-0 text-danger" />
                    ) : step.completed || isComplete ? (
                      <CheckCircleIcon className="h-3.5 w-3.5 shrink-0 text-ok" />
                    ) : (
                      <LoaderIcon className="h-3.5 w-3.5 shrink-0 text-accent" />
                    )}
                    <span className="truncate">{step.label}</span>
                  </div>
                ))}
              </div>

              {steps.length > 3 && (
                <button
                  onClick={() => setShowDetails((value) => !value)}
                  className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-accent transition-colors duration-150 hover:text-accent"
                >
                  {showDetails ? "Hide Details" : "Show Details"}
                  <ChevronDownIcon
                    className={`h-3.5 w-3.5 transition-transform duration-150 ${showDetails ? "rotate-180" : ""}`}
                  />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
