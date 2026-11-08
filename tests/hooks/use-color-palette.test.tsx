import { describe, expect, it } from "vitest"
import { renderHook, act } from "@testing-library/react"
import { useColorPalette, PALETTE_OPTIONS } from "../../src/hooks/use-color-palette"

describe("useColorPalette", () => {
  it("defaults to the default palette", () => {
    const { result } = renderHook(() => useColorPalette())
    expect(result.current.paletteId).toBe("default")
  })

  it("exposes all palette options", () => {
    const { result } = renderHook(() => useColorPalette())
    expect(result.current.palettes.map(({ label }) => label)).toEqual([
      "Ink",
      "Forest",
      "Rust",
      "Plum",
      "Graphite",
    ])
    expect(result.current.palettes).toHaveLength(PALETTE_OPTIONS.length)
  })

  it("persists a selected palette to localStorage and the document root", () => {
    const { result } = renderHook(() => useColorPalette())

    act(() => {
      result.current.setPaletteId("forest")
    })

    expect(result.current.paletteId).toBe("forest")
    const settings = JSON.parse(localStorage.getItem("club_hub_settings") ?? "{}")
    expect(settings).toMatchObject({ colorPalette: "forest" })
    expect(localStorage.getItem("accent")).toBe("forest")
    expect(document.documentElement.getAttribute("data-color-palette")).toBe("forest")
    expect(document.documentElement.style.getPropertyValue("--palette-accent-light")).toBe(
      "#1f7a4d"
    )
    expect(document.documentElement.style.getPropertyValue("--palette-accent-dark")).toBe("#6fcf9b")
  })

  it("restores a saved palette on mount", () => {
    localStorage.setItem("club_hub_settings", JSON.stringify({ colorPalette: "forest" }))

    const { result } = renderHook(() => useColorPalette())

    expect(result.current.paletteId).toBe("forest")
  })

  it("clears attributes when switching back to default", () => {
    localStorage.setItem("club_hub_settings", JSON.stringify({ colorPalette: "forest" }))
    const { result } = renderHook(() => useColorPalette())

    act(() => {
      result.current.setPaletteId("default")
    })

    expect(document.documentElement.hasAttribute("data-color-palette")).toBe(false)
    expect(document.documentElement.style.getPropertyValue("--palette-accent-light")).toBe("")
  })

  it("migrates a saved legacy palette to its matching design seed", () => {
    localStorage.setItem("club_hub_settings", JSON.stringify({ colorPalette: "ocean" }))

    const { result } = renderHook(() => useColorPalette())

    expect(result.current.paletteId).toBe("default")
  })
})
