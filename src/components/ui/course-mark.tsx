import * as React from "react"
import { cn } from "../../lib/utils"
import { courseColor } from "../../lib/course-color"

export interface CourseDotProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Course code (e.g. "BCSE202L") or an explicit hue 1–8. */
  course: string | number
}

/** 8 px dot in the course's hue. Leads a list row in place of a tinted icon tile. */
export function CourseDot({ course, className, style, ...props }: CourseDotProps) {
  return (
    <span
      aria-hidden="true"
      className={cn("inline-block h-2 w-2 shrink-0 rounded-full", className)}
      style={{ backgroundColor: courseColor(course), ...style }}
      {...props}
    />
  )
}

export interface SlotBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Course code or hue 1–8; sets the badge colour. */
  course: string | number
  /** VIT slot, e.g. "A1+TA1" or "L31+L32". */
  children: React.ReactNode
}

/**
 * The slot code as a solid badge in the course hue. Text is `--background`,
 * which is light on the dark light-mode hues and dark on the light dark-mode
 * hues, so it keeps contrast in both themes.
 */
export function SlotBadge({ course, className, style, children, ...props }: SlotBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center whitespace-nowrap rounded-[5px] px-1.5 py-0.5 font-mono text-[11px] font-semibold leading-none text-background",
        className
      )}
      style={{ backgroundColor: courseColor(course), ...style }}
      {...props}
    >
      {children}
    </span>
  )
}
