"use client"
import { View, Text, Pressable } from "../../lib/primitives"
import * as React from "react"
import { createPortal } from "react-dom"
import { Modal, Platform, type ViewProps, type TextProps } from "react-native-web"
import { cn } from "../../lib/utils"
import { useAnchoredOverlay, type OverlayAlign } from "../../lib/use-anchored-overlay"

export interface DropdownMenuProps {
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

interface DropdownContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  anchorRef: React.RefObject<HTMLElement | null>
}

const DropdownContext = React.createContext<DropdownContextValue | null>(null)

function DropdownMenu({ children, open: controlledOpen, onOpenChange }: DropdownMenuProps) {
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
    <DropdownContext.Provider value={{ open, setOpen, anchorRef }}>
      <View ref={anchorRef} {...({ className: "relative inline-flex w-fit max-w-full" } as any)}>
        {children}
      </View>
    </DropdownContext.Provider>
  )
}

const DropdownMenuTrigger = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentProps<typeof Pressable> & { asChild?: boolean }
>(({ onPress, children, asChild, ...props }, ref) => {
  const context = React.useContext(DropdownContext)
  const handler = (e: any) => {
    context?.setOpen(!context.open)
    onPress?.(e)
    ;(props as any).onClick?.(e)
  }
  const a11y = { "aria-haspopup": "menu", "aria-expanded": !!context?.open }
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
DropdownMenuTrigger.displayName = "DropdownMenuTrigger"

const MENU_SURFACE =
  "z-50 min-w-[12rem] max-w-[calc(100vw-1rem)] overflow-hidden rounded-md border border-line bg-surface p-1 text-ink shadow-[0_8px_24px_rgba(0,0,0,0.14)]"

function WebMenuContent({
  context,
  align,
  className,
  children,
  ...props
}: ViewProps & { context: DropdownContextValue; align: OverlayAlign; className?: string }) {
  const { overlayRef, style } = useAnchoredOverlay({
    open: context.open,
    onClose: () => context.setOpen(false),
    align,
    anchorRef: context.anchorRef,
  })
  return createPortal(
    <div
      ref={overlayRef}
      role="menu"
      style={style}
      className={cn(
        MENU_SURFACE,
        "flex flex-col animate-in fade-in transition-none duration-150",
        className
      )}
      {...(props as any)}
    >
      {children}
    </div>,
    document.body
  )
}

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof View>,
  ViewProps & { className?: string; align?: OverlayAlign; sideOffset?: number }
>(({ className, children, align = "start", sideOffset: _sideOffset, ...props }, ref) => {
  const context = React.useContext(DropdownContext)
  if (!context?.open) return null

  // Web: anchored under the trigger, dismissed by an outside press or Escape.
  if (Platform.OS === "web" && typeof document !== "undefined") {
    return (
      <WebMenuContent context={context} align={align} className={className} {...props}>
        {children}
      </WebMenuContent>
    )
  }

  // Native: bottom sheet style modal.
  return (
    <Modal
      visible={context.open}
      transparent={true}
      animationType="fade"
      onRequestClose={() => context.setOpen(false)}
    >
      <Pressable
        onPress={() => context.setOpen(false)}
        {...({ className: "flex-1 bg-black/30 justify-end items-center" } as any)}
      >
        <Pressable onPress={(e) => e.stopPropagation()}>
          <View ref={ref} {...({ className: cn(MENU_SURFACE, className) } as any)} {...props}>
            {children}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  )
})
DropdownMenuContent.displayName = "DropdownMenuContent"

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentProps<typeof Pressable> & { className?: string; textClassName?: string }
>(({ className, textClassName, onPress, children, ...props }, ref) => {
  const context = React.useContext(DropdownContext)
  return (
    <Pressable
      role="menuitem"
      ref={ref}
      onPress={(e) => {
        context?.setOpen(false)
        onPress?.(e)
        ;(props as any).onClick?.(e)
      }}
      {...({
        className: cn(
          "relative flex min-h-11 w-full flex-row items-center rounded-sm px-3 py-2 text-left text-sm outline-none transition-colors duration-[120ms] hover:bg-surface-2 focus-visible:bg-surface-2",
          className
        ),
      } as any)}
      {...props}
    >
      {typeof children === "string" ? (
        <Text {...({ className: cn("text-foreground", textClassName) } as any)}>{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  )
})
DropdownMenuItem.displayName = "DropdownMenuItem"

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof Text>,
  TextProps & { className?: string }
>(({ className, ...props }, ref) => (
  <Text
    ref={ref}
    {...({ className: cn("px-2 py-1.5 text-sm font-semibold text-foreground", className) } as any)}
    {...props}
  />
))
DropdownMenuLabel.displayName = "DropdownMenuLabel"

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof View>,
  ViewProps & { className?: string }
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    {...({ className: cn("-mx-1 my-1 h-px bg-line-2", className) } as any)}
    {...props}
  />
))
DropdownMenuSeparator.displayName = "DropdownMenuSeparator"

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
}
