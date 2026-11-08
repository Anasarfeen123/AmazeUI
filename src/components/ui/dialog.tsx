"use client"
import { View, Text, Pressable } from "../../lib/primitives"
import * as React from "react"
import { Modal, type ModalProps, type ViewProps, type TextProps } from "react-native-web"
import { cn } from "../../lib/utils"

export interface DialogProps extends ModalProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
}

const DialogContext = React.createContext<{
  open: boolean
  onOpenChange: (open: boolean) => void
} | null>(null)

function useDialog() {
  const context = React.useContext(DialogContext)
  if (!context) throw new Error("Dialog components must be used within a Dialog")
  return context
}

function Dialog({ open = false, onOpenChange, children }: DialogProps) {
  const [isOpen, setIsOpen] = React.useState(open)
  const isControlled = onOpenChange !== undefined

  const currentOpen = isControlled ? open : isOpen
  const setCurrentOpen = React.useCallback(
    (val: boolean) => {
      if (!isControlled) setIsOpen(val)
      onOpenChange?.(val)
    },
    [isControlled, onOpenChange]
  )

  return (
    <DialogContext.Provider value={{ open: currentOpen, onOpenChange: setCurrentOpen }}>
      {children}
    </DialogContext.Provider>
  )
}

const DialogTrigger = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentProps<typeof Pressable>
>(({ onPress, children, ...props }, ref) => {
  const { onOpenChange } = useDialog()
  return (
    <Pressable
      ref={ref}
      onPress={(e) => {
        onOpenChange(true)
        onPress?.(e)
        ;(props as any).onClick?.(e)
      }}
      {...props}
    >
      {children}
    </Pressable>
  )
})
DialogTrigger.displayName = "DialogTrigger"

const DialogContent = React.forwardRef<
  React.ElementRef<typeof View>,
  ViewProps & { className?: string }
>(({ className, children, ...props }, ref) => {
  const { open, onOpenChange } = useDialog()

  return (
    <Modal
      visible={open}
      transparent={true}
      animationType="fade"
      onRequestClose={() => onOpenChange(false)}
    >
      <View
        {...({
          className: "flex-1 items-center justify-center bg-black/45 p-4 dark:bg-black/60",
        } as any)}
      >
        <View
          ref={ref}
          {...({
            className: cn(
              "w-full max-w-lg rounded-lg border border-line bg-surface p-6 text-ink shadow-[0_16px_48px_rgba(0,0,0,0.18)]",
              className
            ),
          } as any)}
          {...props}
        >
          {children}
        </View>
      </View>
    </Modal>
  )
})
DialogContent.displayName = "DialogContent"

const DialogHeader = ({ className, ...props }: ViewProps & { className?: string }) => (
  <View
    {...({ className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className) } as any)}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({ className, ...props }: ViewProps & { className?: string }) => (
  <View
    {...({
      className: cn("flex flex-row flex-wrap items-center justify-end space-x-2 mt-4", className),
    } as any)}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof Text>,
  TextProps & { className?: string }
>(({ className, ...props }, ref) => (
  <Text
    ref={ref}
    {...({
      className: cn("text-lg font-semibold leading-none tracking-tight text-foreground", className),
    } as any)}
    {...props}
  />
))
DialogTitle.displayName = "DialogTitle"

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof Text>,
  TextProps & { className?: string }
>(({ className, ...props }, ref) => (
  <Text
    ref={ref}
    {...({ className: cn("text-sm text-muted-foreground", className) } as any)}
    {...props}
  />
))
DialogDescription.displayName = "DialogDescription"

const DialogClose = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentProps<typeof Pressable>
>(({ onPress, children, ...props }, ref) => {
  const { onOpenChange } = useDialog()
  return (
    <Pressable
      ref={ref}
      onPress={(e) => {
        onOpenChange(false)
        onPress?.(e)
        ;(props as any).onClick?.(e)
      }}
      {...props}
    >
      {children}
    </Pressable>
  )
})
DialogClose.displayName = "DialogClose"

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
}
