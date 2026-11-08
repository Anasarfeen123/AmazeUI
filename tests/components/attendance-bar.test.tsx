import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { AttendanceBar } from "../../src/components/ui/attendance-bar"
import { CourseDot, SlotBadge } from "../../src/components/ui/course-mark"

describe("AttendanceBar", () => {
  it("exposes the value and the budget to assistive tech", () => {
    render(<AttendanceBar attended={26} held={35} showLabel />)
    const meter = screen.getByRole("meter", { name: "Attendance" })
    expect(meter).toHaveAttribute("aria-valuenow", "74.3")
    expect(meter).toHaveAttribute("aria-valuetext", "74.3%, Attend next 1")
    expect(screen.getByText("Attend next 1")).toHaveClass("text-danger")
  })

  it("uses the course hue above the line", () => {
    const { container } = render(<AttendanceBar attended={30} held={34} course={1} />)
    const fill = container.querySelector('[role="meter"] > div') as HTMLElement
    expect(fill.style.backgroundColor).toBe("var(--course-1)")
    expect(fill.style.width).toBe("88.23529411764706%")
  })

  it("draws the threshold line where it is", () => {
    const { container } = render(<AttendanceBar attended={8} held={10} threshold={0.8} />)
    const line = container.querySelector('[aria-hidden="true"]') as HTMLElement
    expect(line.style.left).toBe("80%")
  })
})

describe("course marks", () => {
  it("renders a slot badge in the course colour", () => {
    render(<SlotBadge course={3}>C1+TC1</SlotBadge>)
    expect(screen.getByText("C1+TC1").style.backgroundColor).toBe("var(--course-3)")
  })

  it("hides the dot from assistive tech", () => {
    const { container } = render(<CourseDot course="BCSE202L" />)
    expect(container.firstChild).toHaveAttribute("aria-hidden", "true")
  })
})
