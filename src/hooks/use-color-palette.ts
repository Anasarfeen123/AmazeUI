"use client"
import { useState, useEffect, useCallback } from "react"

export interface PaletteDefinition {
  accent: string
  darkAccent: string
  background?: string
  surface?: string
}

const COLOR_PALETTES: Record<string, PaletteDefinition> = {
  default: { accent: "#24508f", darkAccent: "#8fb4ea" },
  forest: { accent: "#1f7a4d", darkAccent: "#6fcf9b" },
  rust: { accent: "#b5470b", darkAccent: "#e9844e" },
  plum: { accent: "#8b3a8f", darkAccent: "#cf7fd3" },
  graphite: { accent: "#46524d", darkAccent: "#b9c2be" },
}

const LEGACY_PALETTE_IDS: Record<string, string> = {
  neonPink: "plum",
  rose: "rust",
  amber: "rust",
  ocean: "default",
  lavender: "plum",
  sunset: "rust",
}

export interface ColorPaletteOption {
  id: string
  label: string
  swatches: string[]
}

export const PALETTE_OPTIONS: ColorPaletteOption[] = [
  { id: "default", label: "Ink", swatches: ["#24508f", "#8fb4ea", "#f5f6f5"] },
  { id: "forest", label: "Forest", swatches: ["#1f7a4d", "#6fcf9b", "#f5f6f5"] },
  { id: "rust", label: "Rust", swatches: ["#b5470b", "#e9844e", "#f5f6f5"] },
  { id: "plum", label: "Plum", swatches: ["#8b3a8f", "#cf7fd3", "#f5f6f5"] },
  { id: "graphite", label: "Graphite", swatches: ["#46524d", "#b9c2be", "#f5f6f5"] },
]

function normalizePaletteId(id: string) {
  return LEGACY_PALETTE_IDS[id] ?? id
}

function getSettings() {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem("club_hub_settings")
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function saveSettings(updates: Record<string, unknown>) {
  if (typeof window === "undefined") return
  const current = getSettings() || {}
  const next = { ...current, ...updates }
  localStorage.setItem("club_hub_settings", JSON.stringify(next))
}

export function useColorPalette() {
  const [paletteId, setPaletteIdState] = useState<string>("default")

  useEffect(() => {
    const saved = getSettings()
    if (typeof saved?.colorPalette === "string") {
      setPaletteIdState(normalizePaletteId(saved.colorPalette))
    } else {
      const legacyAccent = localStorage.getItem("accent")
      if (legacyAccent && COLOR_PALETTES[normalizePaletteId(legacyAccent)]) {
        setPaletteIdState(normalizePaletteId(legacyAccent))
      }
    }
  }, [])

  const setPaletteId = useCallback((id: string) => {
    const normalizedId = normalizePaletteId(id)
    if (!COLOR_PALETTES[normalizedId]) {
      throw new RangeError(`Unknown color palette: ${id}`)
    }
    setPaletteIdState(normalizedId)
    saveSettings({ colorPalette: normalizedId })
    localStorage.setItem("accent", normalizedId)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    const selectedId = normalizePaletteId(paletteId)
    const palette = COLOR_PALETTES[selectedId]
    const paletteVariables = [
      "--palette-accent-light",
      "--palette-accent-dark",
      "--palette-accent-soft-light",
      "--palette-accent-soft-dark",
    ]

    if (!palette || selectedId === "default") {
      root.removeAttribute("data-color-palette")
      root.removeAttribute("data-accent")
      paletteVariables.forEach((name) => root.style.removeProperty(name))
      return
    }

    root.setAttribute("data-color-palette", selectedId)
    root.setAttribute("data-accent", selectedId)
    root.style.setProperty("--palette-accent-light", palette.accent)
    root.style.setProperty("--palette-accent-dark", palette.darkAccent)
    root.style.setProperty(
      "--palette-accent-soft-light",
      `color-mix(in oklab, ${palette.accent} 12%, white)`
    )
    root.style.setProperty(
      "--palette-accent-soft-dark",
      `color-mix(in oklab, ${palette.darkAccent} 12%, #0f1211)`
    )
  }, [paletteId])

  return { paletteId, setPaletteId, palettes: PALETTE_OPTIONS }
}
