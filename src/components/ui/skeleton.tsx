"use client"
import { View } from "../../lib/primitives"
import * as React from "react"
import { type ViewProps } from "react-native"
import { cn } from "../../lib/utils"

export interface SkeletonProps extends ViewProps {
  className?: string
}

function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <View
      {...({
        className: cn(
          "animate-pulse rounded-sm bg-surface-2 motion-reduce:animate-none",
          className
        ),
      } as any)}
      {...props}
    />
  )
}

export { Skeleton }
