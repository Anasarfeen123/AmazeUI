import { fireEvent, render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { afterEach, describe, expect, it } from "vitest"
import { ManualTestLab } from "../../manual-ui/manual-test-lab"

afterEach(() => {
  document.documentElement.classList.remove("dark")
})

describe("manual UI test lab", () => {
  it("renders component sections and the full manual checklist", () => {
    render(<ManualTestLab />)

    expect(screen.getByRole("heading", { name: /make every detail\s*feel right/i })).toBeVisible()
    expect(screen.getByRole("heading", { name: "Foundation" })).toBeVisible()
    expect(screen.getByRole("heading", { name: "Forms & choices" })).toBeVisible()
    expect(screen.getByRole("heading", { name: "Feedback & progress" })).toBeVisible()
    expect(screen.getByRole("heading", { name: "Manual QA checklist" })).toBeVisible()
    expect(screen.getByText("30 checks")).toBeVisible()
  })

  it("filters manual cases and records a pass", async () => {
    const user = userEvent.setup()
    render(<ManualTestLab />)

    await user.type(screen.getByPlaceholderText("Find a test…"), "Button keyboard focus")

    const card = screen.getAllByText("Button keyboard focus")[0]?.closest("article")
    expect(card).not.toBeNull()
    await user.click(within(card as HTMLElement).getByRole("button", { name: /pass/i }))

    expect(within(card as HTMLElement).getByText("pass")).toBeVisible()
    expect(JSON.parse(localStorage.getItem("amazeui-manual-test-results") ?? "{}")).toMatchObject({
      "button-keyboard": "pass",
    })
  })

  it("captures a reproduction note when a manual case is flagged", async () => {
    const user = userEvent.setup()
    render(<ManualTestLab />)

    await user.type(screen.getByPlaceholderText("Find a test…"), "Progress boundaries")

    const card = screen.getAllByText("Progress boundaries")[0]?.closest("article")
    expect(card).not.toBeNull()
    await user.click(within(card as HTMLElement).getByRole("button", { name: "Flag issue" }))
    await user.type(
      within(card as HTMLElement).getByPlaceholderText(
        "Describe the issue so it can be reproduced."
      ),
      "Progress did not clamp at 100."
    )

    expect(localStorage.getItem("amazeui-manual-test-results")).toContain('"progress":"fail"')
    expect(localStorage.getItem("amazeui-manual-note:progress")).toBe(
      "Progress did not clamp at 100."
    )
  })

  it("switches the preview theme and persists the setting", async () => {
    render(<ManualTestLab />)

    fireEvent.click(screen.getByRole("button", { name: "Switch to dark theme" }))

    expect(document.documentElement).toHaveClass("dark")
    expect(localStorage.getItem("amazeui-manual-theme")).toBe("dark")
  })

  it("restores manual results after the workbench remounts", () => {
    localStorage.setItem(
      "amazeui-manual-test-results",
      JSON.stringify({ "button-keyboard": "pass", progress: "not-a-result" })
    )

    render(<ManualTestLab />)

    const card = screen.getAllByText("Button keyboard focus")[0]?.closest("article")
    expect(card).not.toBeNull()
    expect(within(card as HTMLElement).getByRole("button", { name: /pass/i })).toHaveAttribute(
      "aria-pressed",
      "true"
    )
    expect(screen.getByText("1 passed")).toBeVisible()
  })
})
