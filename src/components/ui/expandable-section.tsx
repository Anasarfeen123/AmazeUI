"use client"
import { useState } from "react"
import { cn } from "../../lib/utils"
import { Pressable, View, Text } from "../../lib/primitives"

export interface ExpandableSectionProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
  className?: string
  headerClassName?: string
  contentClassName?: string
  badge?: React.ReactNode
  icon?: React.ReactNode
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

function ChevronUpIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m18 15-6-6-6 6" />
    </svg>
  )
}

export function ExpandableSection({
  title,
  children,
  defaultOpen = false,
  className,
  headerClassName,
  contentClassName,
  badge,
  icon,
}: ExpandableSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <View className={cn("w-full", className)}>
      <Pressable
        onPress={() => setIsOpen(!isOpen)}
        className={cn(
          "flex flex-row items-center justify-between w-full p-4 text-left font-semibold text-ink hover:bg-surface-2 transition-colors",
          headerClassName
        )}
      >
        <View className="flex flex-row items-center gap-2">
          {icon}
          <Text>{title}</Text>
        </View>
        <View className="flex flex-row items-center gap-3">
          {badge}
          {isOpen ? (
            <ChevronUpIcon className="w-[18px] h-[18px] text-muted" />
          ) : (
            <ChevronDownIcon className="w-[18px] h-[18px] text-muted" />
          )}
        </View>
      </Pressable>
      <View
        className={cn(
          "transition-all duration-300 ease-in-out overflow-hidden",
          isOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <View className={cn("p-4 bg-gray-50/50 dark:bg-gray-900/20", contentClassName)}>
          {children}
        </View>
      </View>
    </View>
  )
}
