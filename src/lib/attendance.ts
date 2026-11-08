/**
 * Attendance arithmetic shared by every AmazeCC surface.
 *
 * VIT requires 75% attendance per course. A bare percentage does not tell a
 * student what to do, so every attendance figure in the design system is shown
 * with its budget: how many classes can still be missed, or how many in a row
 * must be attended to get back over the line.
 */

export const DEFAULT_ATTENDANCE_THRESHOLD = 0.75

export type AttendanceStatus = "safe" | "edge" | "short"

export interface AttendanceBudget {
  /** Attended / held, 0–100. `null` when no classes have been held yet. */
  percent: number | null
  /** Classes that can be missed while staying at or above the threshold. */
  canSkip: number
  /** Consecutive classes that must be attended to reach the threshold. */
  mustAttend: number
  /** `short`: below the line. `edge`: on or above it with no skips left. `safe`: at least one skip left. */
  status: AttendanceStatus
  /** Plain-language instruction, e.g. "Can skip 6", "No skips left", "Attend next 1". */
  label: string
}

// Guards against float noise such as 0.75 * 4 = 2.9999999999999996.
const EPS = 1e-9

export function attendanceBudget(
  attended: number,
  held: number,
  threshold: number = DEFAULT_ATTENDANCE_THRESHOLD
): AttendanceBudget {
  if (!Number.isFinite(attended) || !Number.isFinite(held) || attended < 0 || held < 0) {
    throw new RangeError("attended and held must be non-negative numbers")
  }
  if (attended > held) {
    throw new RangeError("attended cannot exceed held")
  }
  if (!(threshold > 0 && threshold < 1)) {
    throw new RangeError("threshold must be between 0 and 1")
  }

  if (held === 0) {
    return { percent: null, canSkip: 0, mustAttend: 0, status: "edge", label: "No classes yet" }
  }

  const percent = (attended / held) * 100

  if (attended + EPS >= threshold * held) {
    // a / (held + y) >= t  =>  y <= a / t - held
    const canSkip = Math.max(0, Math.floor(attended / threshold - held + EPS))
    return {
      percent,
      canSkip,
      mustAttend: 0,
      status: canSkip > 0 ? "safe" : "edge",
      label: canSkip > 0 ? `Can skip ${canSkip}` : "No skips left",
    }
  }

  // (a + x) / (held + x) >= t  =>  x >= (t * held - a) / (1 - t)
  const mustAttend = Math.ceil((threshold * held - attended) / (1 - threshold) - EPS)
  return {
    percent,
    canSkip: 0,
    mustAttend,
    status: "short",
    label: `Attend next ${mustAttend}`,
  }
}

/** Percentage after attending (`delta > 0`) or missing (`delta < 0`) the next |delta| classes. */
export function attendanceAfter(attended: number, held: number, delta: number): number {
  const nextHeld = held + Math.abs(delta)
  const nextAttended = delta > 0 ? attended + delta : attended
  return nextHeld === 0 ? 0 : (nextAttended / nextHeld) * 100
}
