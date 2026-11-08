"use client"
import { View, Pressable } from "../../lib/primitives"
import * as React from "react"
import { createPortal } from "react-dom"
import { Modal, Platform, type ViewProps } from "react-native-web"
import { cn } from "../../lib/utils"
import { useAnchoredOverlay, type OverlayAlign } from "../../lib/use-anchored-overlay"

export interface PopoverProps {
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

interface PopoverContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  anchorRef: React.RefObject<HTMLElement | null>
}

const PopoverContext = React.createContext<PopoverContextValue | null>(null)

function Popover({ children, open: controlledOpen, onOpenChange }: PopoverProps) {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : internalOpen
  const anchorRef = React.useRef<HTMLElement | null>(null)
  const setOpen = React.useCallback(
    (val: boolean) => {
      if (!isControlled) setInternalOpen(val)
      onOpenChange?.(val)
    },
    [isControlled, onOpenChange]
  )
  return (
    <PopoverContext.Provider value={{ open, setOpen, anchorRef }}>
      <View ref={anchorRef} {...({ className: "relative inline-flex w-fit max-w-full" } as any)}>
        {children}
      </View>
    </PopoverContext.Provider>
  )
}

const PopoverTrigger = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentProps<typeof Pressable> & { asChild?: boolean }
>(({ onPress, children, asChild, ...props }, ref) => {
  const context = React.useContext(PopoverContext)
  const handler = (e: any) => {
    context?.setOpen(!context.open)
    onPress?.(e)
    ;(props as any).onClick?.(e)
  }
  const a11y = { "aria-haspopup": "dialog", "aria-expanded": !!context?.open }
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...(children.props as any),
      ...props,
      ...a11y,
      onPress: handler,
      onClick: undefined,
    })
  }
  return (
    <Pressable ref={ref} onPress={handler} {...a11y} {...props}>
      {children}
    </Pressable>
  )
})
PopoverTrigger.displayName = "PopoverTrigger"

const SURFACE =
  "w-72 max-w-[calc(100vw-1rem)] rounded-md border border-line bg-surface p-4 text-ink shadow-[0_8px_24px_rgba(0,0,0,0.14)] outline-none"

function WebPopoverContent({
  context,
  align,
  className,
  children,
  ...props
}: ViewProps & { context: PopoverContextValue; align: OverlayAlign; className?: string }) {
  const { overlayRef, style } = useAnchoredOverlay({
    open: context.open,
    onClose: () => context.setOpen(false),
    align,
    anchorRef: context.anchorRef,
  })
  return createPortal(
    <div
      ref={overlayRef}
      role="dialog"
      style={style}
      className={cn(SURFACE, "animate-in fade-in transition-none duration-150", className)}
      {...(props as any)}
    >
      {children}
    </div>,
    document.body
  )
}

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof View>,
  ViewProps & { className?: string; align?: OverlayAlign }
>(({ className, children, align = "center", ...props }, ref) => {
  const context = React.useContext(PopoverContext)
  if (!context?.open) return null

  // Web: anchored under the trigger, dismissed by an outside press or Escape.
  if (Platform.OS === "web" && typeof document !== "undefined") {
    return (
      <WebPopoverContent context={context} align={align} className={className} {...props}>
        {children}
      </WebPopoverContent>
    )
  }

  // Native: centred modal.
  return (
    <Modal
      visible={context.open}
      transparent={true}
      animationType="fade"
      onRequestClose={() => context.setOpen(false)}
    >
      <Pressable
        onPress={() => context.setOpen(false)}
        {...({ className: "flex-1 bg-transparent justify-center items-center" } as any)}
      >
        <Pressable onPress={(e) => e.stopPropagation()}>
          <View ref={ref} {...({ className: cn(SURFACE, className) } as any)} {...props}>
            {children}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  )
})
PopoverContent.displayName = "PopoverContent"

export { Popover, PopoverTrigger, PopoverContent }
