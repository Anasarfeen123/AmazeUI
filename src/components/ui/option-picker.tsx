"use client"
import { View, Text, Pressable } from "../../lib/primitives"
import * as React from "react"
import { createPortal } from "react-dom"
import { Modal } from "react-native-web"
import { cn } from "../../lib/utils"
import { useAnchoredOverlay } from "../../lib/use-anchored-overlay"

export interface OptionPickerOption {
  value: string
  label: string
}

export interface OptionPickerProps {
  value: string
  onChange: (value: string) => void
  options: OptionPickerOption[]
  placeholder?: string
  className?: string
  searchable?: boolean
  disabled?: boolean
}

function useIsMobile() {
  const [mobile, setMobile] = React.useState(false)
  React.useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])
  return mobile
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
      <path
        d="M21 21l-4.35-4.35"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M18 6L6 18M6 6l12 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const OptionPicker = React.forwardRef<React.ElementRef<typeof View>, OptionPickerProps>(
  (
    {
      className,
      value,
      onChange,
      options,
      placeholder = "Select...",
      searchable = true,
      disabled = false,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false)
    const [query, setQuery] = React.useState("")
    const isMobile = useIsMobile()
    const triggerRef = React.useRef<HTMLButtonElement>(null)

    const selected = options.find((o) => o.value === value)

    const filtered = query
      ? options.filter(
          (o) =>
            o.label.toLowerCase().includes(query.toLowerCase()) ||
            o.value.toLowerCase().includes(query.toLowerCase())
        )
      : options

    const { overlayRef, style: overlayStyle } = useAnchoredOverlay({
      open: open && !isMobile,
      onClose: () => setOpen(false),
      anchorRef: triggerRef as React.RefObject<HTMLElement | null>,
      matchWidth: true,
      minWidth: 240,
    })

    React.useEffect(() => {
      if (!open) setQuery("")
    }, [open])

    const handleSelect = (opt: OptionPickerOption) => {
      onChange(opt.value)
      setOpen(false)
    }

    const listContent = (
      <View className="flex flex-col h-full max-h-[85vh]">
        {searchable && (
          <View className="relative shrink-0 border-b border-border">
            <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              autoFocus
              className="w-full bg-transparent pl-10 pr-10 py-3.5 text-sm text-foreground outline-none placeholder:text-muted-foreground/40"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-foreground"
              >
                <XIcon className="w-4 h-4" />
              </button>
            )}
          </View>
        )}
        <View className="flex-1 overflow-y-auto py-1">
          {filtered.length === 0 ? (
            <View className="py-8 text-center">
              <Text className="text-sm text-muted-foreground/50">No options found</Text>
            </View>
          ) : (
            filtered.map((opt) => {
              const active = opt.value === value
              return (
                <Pressable
                  key={opt.value}
                  onPress={() => handleSelect(opt)}
                  className={cn(
                    "mx-1 flex min-h-11 flex-row items-center justify-start gap-3 rounded-sm px-3 py-2 text-left transition-colors duration-[120ms]",
                    active
                      ? "bg-accent-soft text-accent font-semibold"
                      : "text-foreground hover:bg-surface-2"
                  )}
                >
                  <Text className={cn("text-sm flex-1", active ? "font-semibold" : "font-medium")}>
                    {opt.label}
                  </Text>
                  {active && <View className="w-2 h-2 rounded-full bg-info shrink-0" />}
                </Pressable>
              )
            })
          )}
        </View>
      </View>
    )

    return (
      <View ref={ref} className={cn("relative", className)}>
        <Pressable
          ref={triggerRef as any}
          onPress={() => !disabled && setOpen((o) => !o)}
          aria-haspopup="listbox"
          aria-expanded={open}
          className={cn(
            "flex min-h-11 w-full flex-row items-center justify-between gap-2 rounded-sm border border-line bg-surface px-3 py-1 text-sm",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-surface-2",
            !selected && "text-muted-foreground/60"
          )}
        >
          <Text className="truncate text-sm">{selected ? selected.label : placeholder}</Text>
          <ChevronDownIcon
            className={`w-4 h-4 shrink-0 text-muted-foreground/60 transition-transform ${open ? "rotate-180" : ""}`}
          />
        </Pressable>

        {open &&
          !isMobile &&
          typeof document !== "undefined" &&
          createPortal(
            <>
              <View
                ref={overlayRef}
                role="listbox"
                {...({
                  className: cn(
                    "overflow-hidden rounded-md border border-line bg-surface text-ink shadow-[0_8px_24px_rgba(0,0,0,0.14)]",
                    "animate-in fade-in transition-none duration-150"
                  ),
                } as any)}
                style={overlayStyle as any}
              >
                <View className="max-h-[320px] flex flex-col">{listContent}</View>
              </View>
            </>,
            document.body
          )}

        {open && isMobile && (
          <Modal
            visible={open}
            transparent
            animationType="fade"
            onRequestClose={() => setOpen(false)}
          >
            <View className="flex-1 items-center justify-center bg-black/60 p-4">
              <View className="w-full max-w-md max-h-[85vh] overflow-hidden rounded-md border border-line bg-background shadow-xl">
                {listContent}
              </View>
            </View>
          </Modal>
        )}
      </View>
    )
  }
)
OptionPicker.displayName = "OptionPicker"

export { OptionPicker }
