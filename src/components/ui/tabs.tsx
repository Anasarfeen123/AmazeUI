"use client"
import { View, Text, Pressable } from "../../lib/primitives"
import * as React from "react"
import { type ViewProps, type PressableProps } from "react-native"
import { cn } from "../../lib/utils"

const TabsContext = React.createContext<{
  value: string
  onValueChange: (value: string) => void
} | null>(null)

export interface TabsProps extends ViewProps {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  className?: string
}

function Tabs({
  value: controlledValue,
  defaultValue,
  onValueChange,
  className,
  children,
  ...props
}: TabsProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue || "")

  const value = controlledValue !== undefined ? controlledValue : uncontrolledValue
  const handleValueChange = React.useCallback(
    (newValue: string) => {
      setUncontrolledValue(newValue)
      onValueChange?.(newValue)
    },
    [onValueChange]
  )

  return (
    <TabsContext.Provider value={{ value, onValueChange: handleValueChange }}>
      <View {...({ className } as any)} {...props}>
        {children}
      </View>
    </TabsContext.Provider>
  )
}

function useTabsContext() {
  const context = React.useContext(TabsContext)
  if (!context) {
    throw new Error("Tabs compound components must be rendered within the Tabs component")
  }
  return context
}

const TabsList = React.forwardRef<
  React.ElementRef<typeof View>,
  ViewProps & { className?: string }
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    {...({
      className: cn(
        "flex-row items-center justify-center rounded-sm bg-surface-2 p-1 text-muted",
        className
      ),
    } as any)}
    {...props}
  />
))
TabsList.displayName = "TabsList"

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  PressableProps & { value: string; className?: string; textClassName?: string }
>(({ className, textClassName, value, children, ...props }, ref) => {
  const context = useTabsContext()
  const isSelected = context.value === value

  return (
    <Pressable
      ref={ref}
      onPress={() => context.onValueChange(value)}
      {...({
        className: cn(
          "flex min-h-11 flex-1 items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5",
          isSelected ? "bg-surface text-ink" : "bg-transparent",
          className
        ),
      } as any)}
      {...props}
    >
      {typeof children === "string" ? (
        <Text
          {...({
            className: cn(
              "text-sm font-medium transition-colors duration-[120ms]",
              isSelected ? "text-foreground" : "text-muted-foreground",
              textClassName
            ),
          } as any)}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  )
})
TabsTrigger.displayName = "TabsTrigger"

const TabsContent = React.forwardRef<
  React.ElementRef<typeof View>,
  ViewProps & { value: string; className?: string }
>(({ className, value, children, ...props }, ref) => {
  const context = useTabsContext()

  if (context.value !== value) {
    return null
  }

  return (
    <View
      ref={ref}
      {...({
        className: cn(
          "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          className
        ),
      } as any)}
      {...props}
    >
      {children}
    </View>
  )
})
TabsContent.displayName = "TabsContent"

export { Tabs, TabsList, TabsTrigger, TabsContent }
