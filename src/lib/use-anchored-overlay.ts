"use client"
import * as React from "react"

export type OverlayAlign = "start" | "center" | "end"

export interface AnchoredOverlayOptions {
  open: boolean
  onClose: () => void
  align?: OverlayAlign
  /** Gap between the anchor and the overlay, in px. */
  offset?: number
  /** Make the overlay at least as wide as the anchor (select menus). */
  matchWidth?: boolean
  minWidth?: number
  /** Use an existing element as the anchor instead of attaching `anchorRef`. */
  anchorRef?: React.RefObject<HTMLElement | null>
}

export interface AnchoredOverlay {
  anchorRef: React.RefObject<HTMLElement | null>
  overlayRef: React.RefObject<HTMLDivElement | null>
  /** Fixed-position style for the overlay. `visibility: hidden` until measured, so it never flashes at 0,0. */
  style: React.CSSProperties
  /** True when the overlay opens upward because there was no room below. */
  above: boolean
}

const MARGIN = 8

/**
 * Positions a web overlay (menu, popover, select list) against its anchor.
 *
 * Measures before paint, so the overlay appears in place on the first frame;
 * flips above the anchor when there is no room below; keeps inside the
 * viewport; follows scroll and resize; and closes on an outside pointer press
 * or Escape.
 */
export function useAnchoredOverlay({
  open,
  onClose,
  align = "start",
  offset = 6,
  matchWidth = false,
  minWidth = 0,
  anchorRef: externalAnchorRef,
}: AnchoredOverlayOptions): AnchoredOverlay {
  const ownAnchorRef = React.useRef<HTMLElement | null>(null)
  const anchorRef = externalAnchorRef ?? ownAnchorRef
  const overlayRef = React.useRef<HTMLDivElement | null>(null)
  const [pos, setPos] = React.useState<{
    top: number
    left: number
    width?: number
    above: boolean
  } | null>(null)
  const onCloseRef = React.useRef(onClose)
  onCloseRef.current = onClose

  const measure = React.useCallback(() => {
    const anchor = anchorRef.current
    const overlay = overlayRef.current
    if (!anchor || !overlay || typeof window === "undefined") return
    const a = anchor.getBoundingClientRect()
    const vw = window.innerWidth
    const vh = window.innerHeight
    const width = matchWidth ? Math.max(a.width, minWidth) : undefined
    const w = width ?? overlay.offsetWidth
    const h = overlay.offsetHeight

    let left =
      align === "end" ? a.right - w : align === "center" ? a.left + (a.width - w) / 2 : a.left
    left = Math.min(Math.max(left, MARGIN), Math.max(MARGIN, vw - w - MARGIN))

    const below = a.bottom + offset
    const roomBelow = vh - below - MARGIN
    const above = roomBelow < h && a.top - offset - h > MARGIN
    const top = above ? a.top - offset - h : below

    setPos((prev) =>
      prev && prev.top === top && prev.left === left && prev.width === width && prev.above === above
        ? prev
        : { top, left, width, above }
    )
  }, [align, offset, matchWidth, minWidth])

  React.useLayoutEffect(() => {
    if (!open) {
      setPos(null)
      return
    }
    measure()
  }, [open, measure])

  React.useEffect(() => {
    if (!open) return
    const onScrollOrResize = () => measure()
    const onPointerDown = (e: PointerEvent) => {
      const t = e.target as Node
      if (anchorRef.current?.contains(t) || overlayRef.current?.contains(t)) return
      onCloseRef.current()
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCloseRef.current()
        const focusable = anchorRef.current?.querySelector<HTMLElement>("button,[tabindex]")
        ;(focusable ?? anchorRef.current)?.focus?.()
      }
    }
    window.addEventListener("scroll", onScrollOrResize, true)
    window.addEventListener("resize", onScrollOrResize)
    document.addEventListener("pointerdown", onPointerDown)
    document.addEventListener("keydown", onKey)
    return () => {
      window.removeEventListener("scroll", onScrollOrResize, true)
      window.removeEventListener("resize", onScrollOrResize)
      document.removeEventListener("pointerdown", onPointerDown)
      document.removeEventListener("keydown", onKey)
    }
  }, [open, measure])

  const style: React.CSSProperties = pos
    ? { position: "fixed", top: pos.top, left: pos.left, width: pos.width, zIndex: 60 }
    : { position: "fixed", top: 0, left: 0, visibility: "hidden", zIndex: 60 }

  return { anchorRef, overlayRef, style, above: pos?.above ?? false }
}
