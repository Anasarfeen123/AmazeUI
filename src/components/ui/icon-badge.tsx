"use client"
import { View } from "../../lib/primitives"
import * as React from "react"
import { type ViewProps } from "react-native"
import { cn } from "../../lib/utils"

const colorMap = {
  // v2: the keys stay for compatibility; each maps to a token, not a stock hue.
  blue: "bg-accent-soft text-accent",
  emerald: "bg-ok-soft text-ok",
  purple: "bg-course-3/12 text-course-3",
  pink: "bg-course-7/12 text-course-7",
  amber: "bg-warn-soft text-warn",
  indigo: "bg-accent-soft text-accent",
  red: "bg-danger-soft text-danger",
  gray: "bg-surface-2 text-ink-2",
}

export interface IconBadgeProps extends ViewProps {
  color?: keyof typeof colorMap
  size?: "sm" | "md"
  className?: string
  children?: React.ReactNode
}

const IconBadge = React.forwardRef<React.ElementRef<typeof View>, IconBadgeProps>(
  ({ className, color = "blue", size = "md", children, ...props }, ref) => (
    <View
      ref={ref}
      {...({
        className: cn(
          "shrink-0 flex flex-row items-center justify-center",
          size === "sm" ? "w-8 h-8 rounded-full" : "w-10 h-10 rounded-sm",
          colorMap[color] || colorMap.blue,
          className
        ),
      } as any)}
      {...props}
    >
      {children}
    </View>
  )
)
IconBadge.displayName = "IconBadge"

export { IconBadge }
