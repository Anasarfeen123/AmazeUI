"use client"
import { View } from "../../lib/primitives"
import * as React from "react"
import { type ViewProps } from "react-native"
import { cn } from "../../lib/utils"

export interface ProgressProps extends ViewProps {
  className?: string
  value?: number
}

const Progress = React.forwardRef<React.ElementRef<typeof View>, ProgressProps>(
  ({ className, value = 0, ...props }, ref) => {
    // Ensure value is between 0 and 100
    const boundedValue = Math.min(100, Math.max(0, value || 0))

    return (
      <View
        ref={ref}
        {...({
          className: cn(
            "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
            className
          ),
        } as any)}
        {...props}
      >
        <View
          {...({ className: "h-full bg-primary flex-1 transition-colors" } as any)}
          style={{ width: `${boundedValue}%` }}
        />
      </View>
    )
  }
)
Progress.displayName = "Progress"

export { Progress }
