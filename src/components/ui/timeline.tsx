"use client"
import { View, Text } from "../../lib/primitives"
import * as React from "react"
import { type ViewProps, type TextProps } from "react-native"
import { cn } from "../../lib/utils"

const dotColors = {
  blue: "bg-accent border-accent-soft",
  emerald: "bg-ok border-ok-soft",
  purple: "bg-course-3 border-surface-2",
  amber: "bg-warn border-warn-soft",
  pink: "bg-course-7 border-surface-2",
  indigo: "bg-accent border-accent-soft",
  gray: "bg-muted border-surface-2",
}

export interface TimelineProps extends ViewProps {
  className?: string
  children?: React.ReactNode
}

const Timeline = React.forwardRef<React.ElementRef<typeof View>, TimelineProps>(
  ({ className, children, ...props }, ref) => (
    <View ref={ref} {...({ className: cn("relative flex flex-col", className) } as any)} {...props}>
      {children}
    </View>
  )
)
Timeline.displayName = "Timeline"

export interface TimelineItemProps extends ViewProps {
  className?: string
  dotColor?: keyof typeof dotColors
  children?: React.ReactNode
}

const TimelineItem = React.forwardRef<React.ElementRef<typeof View>, TimelineItemProps>(
  ({ className, dotColor = "blue", children, ...props }, ref) => (
    <View
      ref={ref}
      {...({
        className: cn(
          "relative flex flex-row gap-3.5 pb-5 last:pb-0 [&:last-child_.tl-rail]:hidden",
          className
        ),
      } as any)}
      {...props}
    >
      <View className="flex w-2.5 shrink-0 flex-col items-center pt-1">
        <View className={cn("h-2.5 w-2.5 shrink-0 rounded-full", dotColors[dotColor])} />
        <View className="tl-rail mt-1.5 -mb-4 w-px flex-1 bg-line" />
      </View>
      <View className="flex-1 min-w-0">{children}</View>
    </View>
  )
)
TimelineItem.displayName = "TimelineItem"

export interface TimelineCardProps extends ViewProps {
  className?: string
  children?: React.ReactNode
}

const TimelineCard = React.forwardRef<React.ElementRef<typeof View>, TimelineCardProps>(
  ({ className, children, ...props }, ref) => (
    <View
      ref={ref}
      {...({
        className: cn("min-w-0", className),
      } as any)}
      {...props}
    >
      {children}
    </View>
  )
)
TimelineCard.displayName = "TimelineCard"

export interface TimelineDateProps extends TextProps {
  className?: string
  children?: React.ReactNode
}

const TimelineDate = React.forwardRef<React.ElementRef<typeof Text>, TimelineDateProps>(
  ({ className, children, ...props }, ref) => (
    <Text
      ref={ref}
      {...({
        className: cn("mb-1 font-mono text-xs text-muted tabular-nums", className),
      } as any)}
      {...props}
    >
      {children}
    </Text>
  )
)
TimelineDate.displayName = "TimelineDate"

export interface TimelineTitleProps extends TextProps {
  className?: string
  children?: React.ReactNode
}

const TimelineTitle = React.forwardRef<React.ElementRef<typeof Text>, TimelineTitleProps>(
  ({ className, children, ...props }, ref) => (
    <Text
      ref={ref}
      {...({
        className: cn("text-[14.5px] font-semibold leading-snug text-ink", className),
      } as any)}
      {...props}
    >
      {children}
    </Text>
  )
)
TimelineTitle.displayName = "TimelineTitle"

export interface TimelineDescriptionProps extends TextProps {
  className?: string
  children?: React.ReactNode
}

const TimelineDescription = React.forwardRef<
  React.ElementRef<typeof Text>,
  TimelineDescriptionProps
>(({ className, children, ...props }, ref) => (
  <Text
    ref={ref}
    {...({
      className: cn("mt-1 whitespace-pre-wrap text-[13.5px] leading-normal text-ink-2", className),
    } as any)}
    {...props}
  >
    {children}
  </Text>
))
TimelineDescription.displayName = "TimelineDescription"

export interface TimelineActionsProps extends ViewProps {
  className?: string
  children?: React.ReactNode
}

const TimelineActions = React.forwardRef<React.ElementRef<typeof View>, TimelineActionsProps>(
  ({ className, children, ...props }, ref) => (
    <View
      ref={ref}
      {...({
        className: cn("mt-2 flex flex-row flex-wrap items-center gap-2", className),
      } as any)}
      {...props}
    >
      {children}
    </View>
  )
)
TimelineActions.displayName = "TimelineActions"

export {
  Timeline,
  TimelineItem,
  TimelineCard,
  TimelineDate,
  TimelineTitle,
  TimelineDescription,
  TimelineActions,
}
