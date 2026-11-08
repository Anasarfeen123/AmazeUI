"use client"
import { View, TextInput } from "../../lib/primitives"
import * as React from "react"
import { type TextInputProps } from "react-native"
import { cn } from "../../lib/utils"

export interface TextareaProps extends Omit<TextInputProps, "multiline"> {
  className?: string
  name?: string
  required?: boolean
}

const Textarea = React.forwardRef<React.ElementRef<typeof TextInput>, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <View className="relative w-full">
        <TextInput
          ref={ref}
          multiline
          placeholderTextColor="#636e69"
          {...({
            className: cn(
              "flex min-h-[80px] w-full rounded-sm border border-line bg-surface px-3 py-2 text-sm text-ink placeholder:text-muted focus-visible:outline-none focus-visible:border-accent focus-visible:ring-3 focus-visible:ring-accent-soft disabled:cursor-not-allowed disabled:opacity-50",
              className
            ),
          } as any)}
          {...props}
        />
      </View>
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
