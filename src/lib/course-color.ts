/**
 * Courses are the colour system. Each course gets one of eight hues
 * (`--course-1` … `--course-8`) and keeps it on every screen: the dot in a
 * list row, the rail on a timetable block, the slot badge, the chart series.
 *
 * Assignment is by the course code, so the same course gets the same hue on
 * every device without anything being stored. Pass an explicit `index` when
 * the app lets students pick colours themselves.
 */

export const COURSE_HUE_COUNT = 8

export type CourseHue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

/** Stable 1–8 hue for a course code. Theory and lab parts of a course share a hue. */
export function courseHue(courseCode: string): CourseHue {
  // BCSE202L and BCSE202P are the same course: drop the trailing L/P/E/J component letter.
  const key = courseCode
    .trim()
    .toUpperCase()
    .replace(/[LPEJ]$/, "")
  // FNV-1a: tiny, fast and evenly spread for short codes.
  let h = 0x811c9dc5
  for (let i = 0; i < key.length; i++) {
    h ^= key.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  return ((Math.abs(h) % COURSE_HUE_COUNT) + 1) as CourseHue
}

/** CSS colour for a course: `var(--course-N)`. Works in inline styles and SVG. */
export function courseColor(courseCodeOrHue: string | number): string {
  const hue =
    typeof courseCodeOrHue === "number"
      ? ((((Math.trunc(courseCodeOrHue) - 1) % COURSE_HUE_COUNT) + COURSE_HUE_COUNT) %
          COURSE_HUE_COUNT) +
        1
      : courseHue(courseCodeOrHue)
  return `var(--course-${hue})`
}
