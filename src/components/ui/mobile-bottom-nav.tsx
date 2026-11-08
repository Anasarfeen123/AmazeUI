"use client"
import { View, Text, Pressable } from "../../lib/primitives"
import { cn } from "../../lib/utils"

export interface MobileBottomNavItem {
  id: string
  icon: React.ReactNode
  label: string
  isActive?: boolean
  onClick: () => void
}

export interface MobileBottomNavProps {
  items: MobileBottomNavItem[]
  className?: string
  compact?: boolean
}

/**
 * Bottom tab bar: a full-width surface with a hairline on top, outline icons
 * at 22 px and short labels. The active tab is the accent colour and medium
 * weight; there is no pill or tinted background behind it.
 */
export function MobileBottomNav({ items, className, compact }: MobileBottomNavProps) {
  return (
    <View
      role="navigation"
      aria-label="Main"
      className={cn(
        "fixed inset-x-0 bottom-0 z-[50] flex flex-row items-stretch justify-around border-t border-line bg-surface px-1.5 pt-1.5 md:hidden",
        className
      )}
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 0.5rem)" } as any}
    >
      {items.map((item) => (
        <Pressable
          key={item.id}
          onPress={item.onClick}
          aria-current={item.isActive ? "page" : undefined}
          className={cn(
            "flex min-h-11 min-w-16 flex-1 flex-col items-center justify-center gap-1 rounded-sm px-2 py-1 text-[11px] transition-colors duration-[120ms]",
            "[&_svg]:h-[22px] [&_svg]:w-[22px] [&_svg]:stroke-[1.8]",
            item.isActive ? "font-semibold text-accent" : "font-normal text-muted hover:text-ink"
          )}
        >
          <View className="shrink-0 items-center">{item.icon}</View>
          {!compact && <Text>{item.label}</Text>}
        </Pressable>
      ))}
    </View>
  )
}
