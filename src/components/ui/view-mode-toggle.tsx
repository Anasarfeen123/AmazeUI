"use client"
import { cn } from "../../lib/utils"
import { Pressable, View } from "../../lib/primitives"

export interface ViewModeOption {
  key: string
  icon: React.ReactNode
  label?: string
}

export interface ViewModeToggleProps {
  options: ViewModeOption[]
  value: string
  onChange: (key: string) => void
  className?: string
}

export function ViewModeToggle({ options, value, onChange, className }: ViewModeToggleProps) {
  return (
    <View className={cn("flex flex-row bg-surface-2 p-1 rounded-lg w-max", className)}>
      {options.map((opt) => (
        <Pressable
          key={opt.key}
          onPress={() => onChange(opt.key)}
          className={cn(
            "p-1.5 rounded-md transition-colors",
            value === opt.key
              ? "bg-surface text-ink shadow-sm"
              : "text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          )}
        >
          {opt.icon}
        </Pressable>
      ))}
    </View>
  )
}
