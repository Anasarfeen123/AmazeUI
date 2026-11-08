import { describe, expect, it } from "vitest"
import { attendanceAfter, attendanceBudget } from "../../src/lib/attendance"
import { courseColor, courseHue } from "../../src/lib/course-color"

describe("attendanceBudget", () => {
  it.each([
    // attended, held, canSkip, mustAttend, status, label
    [30, 34, 6, 0, "safe", "Can skip 6"],
    [28, 31, 6, 0, "safe", "Can skip 6"],
    [12, 14, 2, 0, "safe", "Can skip 2"],
    [19, 25, 0, 0, "edge", "No skips left"],
    [3, 4, 0, 0, "edge", "No skips left"],
    [26, 35, 0, 1, "short", "Attend next 1"],
    [10, 20, 0, 20, "short", "Attend next 20"],
  ])("%i of %i", (a, h, skip, attend, status, label) => {
    const b = attendanceBudget(a, h)
    expect(b.canSkip).toBe(skip)
    expect(b.mustAttend).toBe(attend)
    expect(b.status).toBe(status)
    expect(b.label).toBe(label)
  })

  it("lands exactly on the line after the advised classes", () => {
    const { mustAttend } = attendanceBudget(26, 35)
    expect(attendanceAfter(26, 35, mustAttend)).toBeGreaterThanOrEqual(75)
    expect(attendanceAfter(26, 35, mustAttend - 1)).toBeLessThan(75)
  })

  it("stays at or above the line after using every skip", () => {
    const { canSkip } = attendanceBudget(30, 34)
    expect(attendanceAfter(30, 34, -canSkip)).toBeGreaterThanOrEqual(75)
    expect(attendanceAfter(30, 34, -(canSkip + 1))).toBeLessThan(75)
  })

  it("handles a course with no classes yet", () => {
    expect(attendanceBudget(0, 0)).toMatchObject({ percent: null, label: "No classes yet" })
  })

  it("rejects impossible input", () => {
    expect(() => attendanceBudget(5, 4)).toThrow(RangeError)
    expect(() => attendanceBudget(-1, 4)).toThrow(RangeError)
    expect(() => attendanceBudget(1, 4, 1)).toThrow(RangeError)
  })
})

describe("courseHue / courseColor", () => {
  it("is stable and in range", () => {
    const h = courseHue("BCSE202L")
    expect(h).toBeGreaterThanOrEqual(1)
    expect(h).toBeLessThanOrEqual(8)
    expect(courseHue("BCSE202L")).toBe(h)
  })

  it("gives theory and lab parts of a course the same hue", () => {
    expect(courseHue("BCSE202P")).toBe(courseHue("BCSE202L"))
    expect(courseHue(" bcse202l ")).toBe(courseHue("BCSE202L"))
  })

  it("wraps explicit hue numbers into 1–8", () => {
    expect(courseColor(1)).toBe("var(--course-1)")
    expect(courseColor(9)).toBe("var(--course-1)")
    expect(courseColor(0)).toBe("var(--course-8)")
  })
})
