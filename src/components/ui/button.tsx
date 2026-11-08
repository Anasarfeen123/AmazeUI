"use client"
import { Text, Pressable } from "../../lib/primitives"
import * as React from "react"
import { type PressableProps } from "react-native"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"
import { Slot } from "../../lib/slot"

const buttonVariants = cva(
  "inline-flex min-h-11 min-w-11 flex-row items-center justify-center gap-2 rounded-sm text-sm font-medium transition-colors duration-[120ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        primary: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-danger text-background hover:bg-danger/90",
        danger: "bg-danger text-background hover:bg-danger/90",
        success: "bg-success text-background hover:bg-success/90",
        outline: "border border-solid border-line bg-surface text-ink hover:bg-surface-2",
        secondary: "bg-surface-2 text-ink hover:bg-surface-2/80",
        ghost: "text-ink hover:bg-surface-2",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "px-4 py-2",
        sm: "px-3 py-2",
        lg: "px-6 py-2.5 text-base",
        icon: "p-0",
        "icon-sm": "p-0",
        "icon-lg": "p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps extends PressableProps, VariantProps<typeof buttonVariants> {
  children: React.ReactNode
  className?: string
  textClassName?: string
  onClick?: (event: any) => void
  type?: "button" | "submit" | "reset"
  asChild?: boolean
  form?: string
}

const Button = React.forwardRef<React.ElementRef<typeof Pressable>, ButtonProps>(
  (
    { className, variant, size, children, textClassName, onClick, onPress, asChild, ...props },
    ref
  ) => {
    const classes = cn(buttonVariants({ variant, size }), className)

    if (asChild) {
      return (
        <Slot className={classes} onClick={onPress || onClick} {...props}>
          {children}
        </Slot>
      )
    }

    return (
      <Pressable
        onPress={onPress || onClick}
        ref={ref}
        {...({ className: classes } as any)}
        {...props}
      >
        {React.Children.map(children, (child) =>
          typeof child === "string" || typeof child === "number" ? (
            <Text {...({ className: cn("font-medium", textClassName) } as any)}>{child}</Text>
          ) : (
            child
          )
        )}
      </Pressable>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
