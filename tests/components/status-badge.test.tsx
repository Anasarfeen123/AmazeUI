import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { StatusBadge } from "../../src/components/ui/status-badge"

describe("StatusBadge", () => {
  it("always carries words, never colour alone", () => {
    render(<StatusBadge status="critical" />)
    expect(screen.getByText("Critical")).toBeTruthy()
  })

  it("uses specific text when given, and keeps the old statuses working", () => {
    render(
      <>
        <StatusBadge status="critical">Below 75%</StatusBadge>
        <StatusBadge status="error" />
      </>
    )
    expect(screen.getByText("Below 75%")).toBeTruthy()
    expect(screen.getByText("Error")).toBeTruthy()
  })

  it("hides the decorative dot from assistive tech", () => {
    const { container } = render(<StatusBadge status="safe" />)
    expect(container.querySelector('[aria-hidden="true"]')).toBeTruthy()
  })
})
