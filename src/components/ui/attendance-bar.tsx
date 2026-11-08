import * as React from "react"
import { cn } from "../../lib/utils"
import { courseColor } from "../../lib/course-color"
import { attendanceBudget, DEFAULT_ATTENDANCE_THRESHOLD } from "../../lib/attendance"

export interface AttendanceBarProps extends React.HTMLAttributes<HTMLDivElement> {
  attended: number
  held: number
  /** Minimum share of classes, 0–1. Defaults to VIT's 0.75. */
  threshold?: number
  /** Colours the fill in the course hue while above the line. Below the line it is always `danger`. */
  course?: string | number
  /** Show the percentage and the budget ("Can skip 6") above the bar. */
  showLabel?: boolean
  size?: "sm" | "md"
}

/**
 * Attendance as a bar with the threshold drawn on it, so distance from the line
 * reads at a glance. Below the threshold the fill switches to `danger`, and the
 * label says how many classes to attend.
 */
export function AttendanceBar({
  attended,
  held,
  threshold = DEFAULT_ATTENDANCE_THRESHOLD,
  course,
  showLabel = false,
  size = "md",
  className,
  ...props
}: AttendanceBarProps) {
  const budget = attendanceBudget(attended, held, threshold)
  const pct = budget.percent ?? 0
  const short = budget.status === "short"
  // Status wins over identity: below the line is danger, on the line (no skips
  // left) is warn, and only a safe course shows its own hue.
  const fill = short
    ? "var(--danger)"
    : budget.status === "edge"
      ? "var(--warn)"
      : course !== undefined
        ? courseColor(course)
        : "var(--ok)"
  const pctText = budget.percent === null ? "—" : `${pct.toFixed(1)}%`

  return (
    <div className={cn("w-full", className)} {...props}>
      {showLabel && (
        <div className="mb-1.5 flex items-baseline justify-between gap-3 text-sm">
          <span
            className={cn(
              "font-mono font-semibold tabular-nums",
              short ? "text-danger" : "text-ink"
            )}
          >
            {pctText}
          </span>
          <span
            className={cn(
              "text-[13px]",
              short ? "text-danger" : budget.status === "edge" ? "text-warn" : "text-muted"
            )}
          >
            {budget.label}
          </span>
        </div>
      )}
      <div
        role="meter"
        aria-label="Attendance"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pct * 10) / 10}
        aria-valuetext={`${pctText}, ${budget.label}`}
        className={cn("relative rounded-full bg-surface-2", size === "sm" ? "h-1.5" : "h-2")}
      >
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-[width] duration-200 motion-reduce:transition-none"
          style={{ width: `${Math.min(100, Math.max(0, pct))}%`, backgroundColor: fill }}
        />
        <div
          aria-hidden="true"
          className="absolute -inset-y-1 w-0.5 -translate-x-1/2 rounded-full bg-ink"
          style={{ left: `${threshold * 100}%` }}
        />
      </div>
    </div>
  )
}
