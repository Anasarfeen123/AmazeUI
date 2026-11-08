"use client"
import { View, Text, Pressable } from "../../lib/primitives"
import * as React from "react"
import { cn } from "../../lib/utils"
import { PALETTE_OPTIONS, useColorPalette } from "../../hooks/use-color-palette"

export interface ColorPalettePickerProps {
  className?: string
}

const ColorPalettePicker = React.forwardRef<React.ElementRef<typeof View>, ColorPalettePickerProps>(
  ({ className }, ref) => {
    const { paletteId, setPaletteId } = useColorPalette()

    return (
      <View ref={ref} {...({ className: cn("flex flex-row flex-wrap gap-2", className) } as any)}>
        {PALETTE_OPTIONS.map((p) => {
          const active = paletteId === p.id
          return (
            <Pressable
              key={p.id}
              onPress={() => setPaletteId(p.id)}
              {...({
                className: cn(
                  "relative flex min-h-11 flex-col items-center gap-1.5 rounded-sm border p-2.5 transition-colors duration-[120ms]",
                  active ? "border-line bg-surface-2" : "border-transparent hover:bg-surface-2"
                ),
              } as any)}
            >
              <View className="flex flex-row gap-0.5">
                {p.swatches.map((swatch, i) => (
                  <View
                    key={i}
                    {...({
                      className: cn("h-5 w-5 rounded-full border border-line"),
                    } as any)}
                    style={{ backgroundColor: swatch }}
                  />
                ))}
              </View>
              <Text className="text-xs font-medium text-muted">{p.label}</Text>
              {active && (
                <View className="absolute -top-1 -right-1 w-4 h-4 bg-info rounded-full flex flex-row items-center justify-center shadow-sm">
                  <svg viewBox="0 0 16 16" fill="none" className="w-2.5 h-2.5 text-white">
                    <path
                      d="M3 8l3 3 7-7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </View>
              )}
            </Pressable>
          )
        })}
      </View>
    )
  }
)
ColorPalettePicker.displayName = "ColorPalettePicker"

export { ColorPalettePicker }
