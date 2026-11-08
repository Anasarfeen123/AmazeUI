import { cn } from "../../lib/utils"
import { View, Text } from "../../lib/primitives"

export interface ProgressBarProps {
  value: number
  max?: number
  className?: string
  barClassName?: string
  color?: "blue" | "emerald" | "amber" | "red"
  showLabel?: boolean
  size?: "sm" | "md"
}

const barColors = {
  blue: "bg-accent",
  emerald: "bg-ok",
  amber: "bg-warn",
  red: "bg-danger",
}

const sizes = {
  sm: "h-1.5",
  md: "h-2",
}

export function ProgressBar({
  value,
  max = 100,
  className,
  barClassName,
  color = "blue",
  showLabel = false,
  size = "md",
}: ProgressBarProps) {
  const pct = Math.min(Math.max((value / max) * 100, 0), 100)

  return (
    <View className={cn("w-full", className)}>
      <View
        className={cn(
          "w-full rounded-full overflow-hidden bg-gray-200 dark:bg-gray-800",
          sizes[size]
        )}
      >
        <View
          className={cn(
            "h-full rounded-full transition-colors duration-500 ease-out",
            barColors[color],
            barClassName
          )}
          style={{ width: `${pct}%` }}
        />
      </View>
      {showLabel && <Text className="text-xs text-muted mt-1">{Math.round(pct)}%</Text>}
    </View>
  )
}
