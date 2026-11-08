import { describe, expect, it } from "vitest"
import { fireEvent, render, screen } from "@testing-library/react"
import * as React from "react"
import { Button } from "../../src/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../src/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "../../src/components/ui/popover"
import { Switch } from "../../src/components/ui/switch"
import { SearchInput } from "../../src/components/ui/search-input"

function Menu() {
  const [picked, setPicked] = React.useState("Choose action")
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{picked}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onPress={() => setPicked("Export timetable")}>
          Export timetable
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

describe("DropdownMenu (web)", () => {
  it("opens once per click, selects, and closes", () => {
    render(<Menu />)
    const trigger = screen.getByRole("button", { name: "Choose action" })
    fireEvent.click(trigger)
    expect(screen.getByRole("menu")).toBeInTheDocument()
    expect(trigger).toHaveAttribute("aria-expanded", "true")
    fireEvent.click(screen.getByRole("menuitem", { name: "Export timetable" }))
    expect(screen.queryByRole("menu")).not.toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Export timetable" })).toBeInTheDocument()
  })

  it("closes on Escape and on an outside press", () => {
    render(<Menu />)
    fireEvent.click(screen.getByRole("button", { name: "Choose action" }))
    fireEvent.keyDown(document, { key: "Escape" })
    expect(screen.queryByRole("menu")).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole("button", { name: "Choose action" }))
    fireEvent.pointerDown(document.body)
    expect(screen.queryByRole("menu")).not.toBeInTheDocument()
  })

  it("renders the menu as a fixed overlay, not a full-screen modal", () => {
    render(<Menu />)
    fireEvent.click(screen.getByRole("button", { name: "Choose action" }))
    expect(screen.getByRole("menu").style.position).toBe("fixed")
  })
})

describe("Popover (web)", () => {
  it("stays open while interacting inside and closes outside", () => {
    render(
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Show sync details</Button>
        </PopoverTrigger>
        <PopoverContent>
          <button type="button">Inside</button>
        </PopoverContent>
      </Popover>
    )
    fireEvent.click(screen.getByRole("button", { name: "Show sync details" }))
    fireEvent.pointerDown(screen.getByRole("button", { name: "Inside" }))
    expect(screen.getByRole("dialog")).toBeInTheDocument()
    fireEvent.pointerDown(document.body)
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
  })
})

describe("Button", () => {
  it("lays out label and icon in a row with a visible outline border", () => {
    render(<Button variant="outline">Go</Button>)
    const cls = screen.getByRole("button", { name: "Go" }).className
    expect(cls).toContain("flex-row")
    expect(cls).toContain("border")
    expect(cls).not.toContain("border-none")
    expect(cls).not.toMatch(/\bborder-0\b/)
  })
})

describe("Switch (web)", () => {
  it("is a real switch that toggles and reports state", () => {
    function Harness() {
      const [on, setOn] = React.useState(false)
      return <Switch aria-label="Push notifications" checked={on} onCheckedChange={setOn} />
    }
    render(<Harness />)
    const sw = screen.getByRole("switch", { name: "Push notifications" })
    expect(sw).toHaveAttribute("aria-checked", "false")
    fireEvent.click(sw)
    expect(sw).toHaveAttribute("aria-checked", "true")
  })
})

describe("SearchInput", () => {
  it("keeps the icon outside the text box and offers a clear button", () => {
    function Harness() {
      const [q, setQ] = React.useState("physics")
      return (
        <SearchInput aria-label="Search courses" value={q} onChange={(e) => setQ(e.target.value)} />
      )
    }
    render(<Harness />)
    const input = screen.getByRole("textbox", { name: "Search courses" })
    expect(input.parentElement?.querySelector("svg")?.nextElementSibling).toBe(input)
    fireEvent.click(screen.getByRole("button", { name: "Clear search" }))
    expect(input).toHaveValue("")
  })
})
