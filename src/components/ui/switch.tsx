"use client"
import * as React from "react"
import {
  Platform,
  Switch as NativeSwitch,
  type SwitchProps as NativeSwitchProps,
} from "react-native-web"
import { cn } from "../../lib/utils"

export interface SwitchProps extends NativeSwitchProps {
  onCheckedChange?: (checked: boolean) => void
  checked?: boolean
  onChange?: (event: any) => void
  disabled?: boolean
  className?: string
  /** Accessible name when there is no visible <label>. */
  "aria-label"?: string
  id?: string
}

/**
 * Calm Notebook toggle: a 40 × 24 track with an 18 px knob. Off is a neutral
 * track with a muted knob; on is the accent with a light knob. Drawn on the web
 * as a real `button role="switch"`, so it works with keyboard and screen
 * readers and sits inside a 44 px hit area.
 */
const Switch = React.forwardRef<any, SwitchProps>(
  (
    {
      className,
      onCheckedChange,
      onChange,
      onValueChange,
      checked,
      value,
      disabled,
      id,
      "aria-label": ariaLabel,
      ...props
    },
    ref
  ) => {
    const isControlled = checked !== undefined || value !== undefined
    const [internal, setInternal] = React.useState(false)
    const on = isControlled ? !!(checked ?? value) : internal

    const emit = (next: boolean) => {
      if (!isControlled) setInternal(next)
      onValueChange?.(next)
      onCheckedChange?.(next)
      onChange?.(next)
    }

    if (Platform.OS !== "web") {
      return (
        <NativeSwitch value={on} onValueChange={emit} disabled={disabled} ref={ref} {...props} />
      )
    }

    return (
      <button
        ref={ref}
        id={id}
        type="button"
        role="switch"
        aria-checked={on}
        aria-label={ariaLabel}
        disabled={disabled}
        onClick={() => emit(!on)}
        className={cn(
          // 44 px hit area around a 40 × 24 track
          "group relative inline-flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "relative block h-6 w-10 rounded-full border transition-colors duration-[120ms]",
            "group-focus-visible:ring-2 group-focus-visible:ring-accent group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-background",
            on ? "border-accent bg-accent" : "border-line bg-surface-2"
          )}
        >
          <span
            className={cn(
              "absolute left-[2px] top-[2px] block h-[18px] w-[18px] rounded-full transition-transform duration-[120ms] motion-reduce:transition-none",
              on ? "translate-x-4 bg-background" : "translate-x-0 bg-muted"
            )}
          />
        </span>
      </button>
    )
  }
)
Switch.displayName = "Switch"

export { Switch }
