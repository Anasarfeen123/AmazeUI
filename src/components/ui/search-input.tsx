import * as React from "react"
import { cn } from "../../lib/utils"

export interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string
}

/**
 * Search field. The icon sits in its own 40 px column outside the text, so a
 * long query can never run under it; the clear button appears once there is text.
 */
export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, containerClassName, value, defaultValue, onChange, ...props }, ref) => {
    const innerRef = React.useRef<HTMLInputElement | null>(null)
    const [hasText, setHasText] = React.useState(Boolean(value ?? defaultValue))
    React.useEffect(() => {
      if (value !== undefined) setHasText(String(value).length > 0)
    }, [value])

    const setRefs = (el: HTMLInputElement | null) => {
      innerRef.current = el
      if (typeof ref === "function") ref(el)
      else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = el
    }

    const clear = () => {
      const el = innerRef.current
      if (!el) return
      // Go through the native setter so React's onChange fires for controlled inputs.
      const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set
      setter?.call(el, "")
      el.dispatchEvent(new Event("input", { bubbles: true }))
      el.focus()
    }

    return (
      <div
        className={cn(
          "flex min-h-11 w-full items-center rounded-sm border border-line bg-surface text-ink transition-colors duration-[120ms]",
          "focus-within:border-accent focus-within:ring-3 focus-within:ring-accent-soft",
          containerClassName
        )}
      >
        <svg
          aria-hidden="true"
          className="ml-3 h-[18px] w-[18px] shrink-0 text-muted"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM20 20l-3.5-3.5" />
        </svg>
        <input
          ref={setRefs}
          type="text"
          enterKeyHint="search"
          value={value}
          defaultValue={defaultValue}
          onChange={(e) => {
            setHasText(e.target.value.length > 0)
            onChange?.(e)
          }}
          className={cn(
            "min-w-0 flex-1 appearance-none bg-transparent px-2.5 py-2 text-[15px] text-ink outline-none placeholder:text-muted",
            "[&::-webkit-search-cancel-button]:hidden",
            className
          )}
          {...props}
        />
        {hasText && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={clear}
            className="mr-1 grid h-9 w-9 shrink-0 place-items-center rounded-sm text-muted hover:bg-surface-2 hover:text-ink"
          >
            <svg
              aria-hidden="true"
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        )}
      </div>
    )
  }
)
SearchInput.displayName = "SearchInput"
