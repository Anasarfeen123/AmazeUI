import { cn } from "../../lib/utils"
import { View, Text } from "../../lib/primitives"

export interface InfoRowProps {
  icon: React.ReactNode
  children: React.ReactNode
  className?: string
  iconClassName?: string
}

export function InfoRow({ icon, children, className, iconClassName }: InfoRowProps) {
  return (
    <View className={cn("flex flex-row items-center gap-2", className)}>
      <View className={cn("text-muted shrink-0", iconClassName)}>{icon}</View>
      <Text className="text-sm text-ink-2">{children}</Text>
    </View>
  )
}
