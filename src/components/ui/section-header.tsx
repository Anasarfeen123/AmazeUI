import { cn } from "../../lib/utils"
import { View, Text } from "../../lib/primitives"

export interface SectionHeaderProps {
  icon?: React.ReactNode
  title: string
  subtitle?: string
  action?: React.ReactNode
  className?: string
}

export function SectionHeader({ icon, title, subtitle, action, className }: SectionHeaderProps) {
  return (
    <View
      className={cn(
        "flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4",
        className
      )}
    >
      <View>
        <Text className="text-2xl font-bold text-ink flex flex-row items-center gap-2">
          {icon}
          {title}
        </Text>
        {subtitle && <Text className="text-muted text-sm mt-1">{subtitle}</Text>}
      </View>
      {action && <View>{action}</View>}
    </View>
  )
}
