"use client"
import { View, Text } from "../../lib/primitives"
import * as React from "react"
import { type ViewProps } from "react-native"
import { cn } from "../../lib/utils"

const variantStyles = {
  default: "bg-surface-2 border-line text-ink",
  success: "bg-success-surface border-success/30 text-success-foreground",
  error: "bg-danger-surface border-danger/30 text-danger",
  warning: "bg-warning-surface border-warning/30 text-warning-foreground",
  info: "bg-info-surface border-info/30 text-info-foreground",
}

export interface AlertProps extends ViewProps {
  variant?: keyof typeof variantStyles
  icon?: React.ReactNode
  className?: string
  children?: React.ReactNode
}

const Alert = React.forwardRef<React.ElementRef<typeof View>, AlertProps>(
  ({ className, variant = "default", icon, children, ...props }, ref) => (
    <View
      ref={ref}
      {...({
        className: cn(
          "flex flex-row items-start gap-3 rounded-md border p-4",
          variantStyles[variant],
          className
        ),
      } as any)}
      {...props}
    >
      {icon && <View className="shrink-0 mt-0.5">{icon}</View>}
      <Text className="flex-1 text-sm font-medium">{children}</Text>
    </View>
  )
)
Alert.displayName = "Alert"

export { Alert }
