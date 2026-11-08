"use client"
import { BackButton } from "./back-button"
import { View, Text } from "../../lib/primitives"

export interface SubpageLayoutProps {
  title: string
  subtitle?: string
  onBack: () => void
  action?: React.ReactNode
  children: React.ReactNode
  className?: string
}

export function SubpageLayout({
  title,
  subtitle,
  onBack,
  action,
  children,
  className,
}: SubpageLayoutProps) {
  return (
    <View className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Mobile header */}
      <View className="flex flex-row items-center justify-between w-full md:hidden mb-4 px-4">
        <View className="flex flex-row items-center gap-3 min-w-0">
          <BackButton onClick={onBack} />
          <View className="min-w-0">
            <Text className="text-xl font-semibold text-ink truncate tracking-tight">{title}</Text>
            {subtitle && <Text className="text-xs text-muted truncate">{subtitle}</Text>}
          </View>
        </View>
        {action && <View className="shrink-0 ml-2">{action}</View>}
      </View>

      {/* Desktop header */}
      <View className="hidden md:flex flex-row items-center justify-between mb-6">
        <View className="flex flex-row items-center gap-3">
          <BackButton onClick={onBack} />
          <View>
            <Text className="text-2xl md:text-3xl font-semibold text-ink leading-tight tracking-tight">
              {title}
            </Text>
            {subtitle && <Text className="text-sm text-muted mt-1">{subtitle}</Text>}
          </View>
        </View>
        {action && <View>{action}</View>}
      </View>

      <View className={className}>{children}</View>
    </View>
  )
}
