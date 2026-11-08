"use client"
import { useState, useEffect, useCallback, useRef, useMemo } from "react"
import { cn } from "../../lib/utils"

export interface CommandPaletteItem {
  id: string
  label: string
  description?: string
  icon?: React.ReactNode
  category?: string
  onSelect: () => void
  rightSlot?: React.ReactNode
  detail?: React.ReactNode
  subpage?: React.ReactNode
}

export interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
  commands: CommandPaletteItem[]
  onQueryChange?: (query: string) => void
  storageKeyPrefix?: string
}

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}
function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}
function CommandIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
    </svg>
  )
}
function ArrowLeftIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M19 12H5" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  )
}
function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}
function ClockIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}
function SlidersIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="4" y1="21" x2="4" y2="14" />
      <line x1="4" y1="10" x2="4" y2="3" />
      <line x1="12" y1="21" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12" y2="3" />
      <line x1="20" y1="21" x2="20" y2="16" />
      <line x1="20" y1="12" x2="20" y2="3" />
      <line x1="1" y1="14" x2="7" y2="14" />
      <line x1="9" y1="8" x2="15" y2="8" />
      <line x1="17" y1="16" x2="23" y2="16" />
    </svg>
  )
}
function CalculatorIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="16" height="20" x="4" y="2" rx="2" />
      <line x1="8" y1="6" x2="16" y2="6" />
      <line x1="8" y1="10" x2="8" y2="10.01" />
      <line x1="12" y1="10" x2="12" y2="10.01" />
      <line x1="16" y1="10" x2="16" y2="10.01" />
      <line x1="8" y1="14" x2="8" y2="14.01" />
      <line x1="12" y1="14" x2="12" y2="14.01" />
      <line x1="16" y1="14" x2="16" y2="14.01" />
      <line x1="8" y1="18" x2="8" y2="18.01" />
      <line x1="12" y1="18" x2="12" y2="18.01" />
    </svg>
  )
}
function HistoryIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M12 7v5l4 2" />
    </svg>
  )
}
function TrashIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  )
}
function HashIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="4" y1="9" x2="20" y2="9" />
      <line x1="4" y1="15" x2="20" y2="15" />
      <line x1="10" y1="3" x2="8" y2="21" />
      <line x1="16" y1="3" x2="14" y2="21" />
    </svg>
  )
}
function LightbulbIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </svg>
  )
}
function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 3v4" />
      <path d="M18 12h4" />
      <path d="M6 12H2" />
      <path d="M5.64 5.64 8.5 8.5" />
      <path d="M18.36 5.64 15.5 8.5" />
      <path d="M5.64 18.36 7.5 16.5" />
      <path d="M18.36 18.36 16.5 16.5" />
      <path d="M12 21v-4" />
      <path d="M8 12h8" />
    </svg>
  )
}

function fuzzyMatch(text: string, query: string): boolean {
  const lower = text.toLowerCase()
  const q = query.toLowerCase()
  let qi = 0
  for (let ti = 0; ti < lower.length && qi < q.length; ti++) {
    if (lower[ti] === q[qi]) qi++
  }
  return qi === q.length
}

function scoreCommand(cmd: CommandPaletteItem, query: string): number {
  const q = query.trim().toLowerCase()
  if (!q) return 1
  const label = cmd.label.toLowerCase()
  const description = (cmd.description || "").toLowerCase()
  const category = (cmd.category || "").toLowerCase()
  const haystack = `${label} ${description} ${category}`
  if (label === q) return 100
  if (label.startsWith(q)) return 90
  if (label.includes(q)) return 75
  if (description.includes(q)) return 55
  if (category.includes(q)) return 45
  if (fuzzyMatch(haystack, q)) return 25
  return 0
}

// One neutral dot per category; colour is reserved for courses and status.
const categoryDot: Record<string, string> = {
  Navigation: "bg-accent",
  Academics: "bg-course-1",
  Attendance: "bg-warn",
  Profile: "bg-ink-2",
  Hostel: "bg-course-2",
  "Day Scholar": "bg-course-8",
  Settings: "bg-muted",
  Tools: "bg-course-5",
  Events: "bg-course-3",
  "Exam Schedule": "bg-danger",
  "Academic Calendar": "bg-course-6",
}

export function CommandPalette({
  isOpen,
  onClose,
  commands,
  onQueryChange,
  storageKeyPrefix = "",
}: CommandPaletteProps) {
  const [query, setQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [subpage, setSubpage] = useState<React.ReactNode | null>(null)
  const [activeCategory, setActiveCategory] = useState("All")
  const [recentCommandIds, setRecentCommandIds] = useState<string[]>([])
  const [selectionSource, setSelectionSource] = useState<"keyboard" | "pointer">("keyboard")
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const onQueryChangeRef = useRef(onQueryChange)
  onQueryChangeRef.current = onQueryChange

  const RECENT_KEY = `${storageKeyPrefix}recent_commands`
  const HISTORY_KEY = `${storageKeyPrefix}search_history`
  const MAX_RECENT = 6
  const MAX_HISTORY = 8

  const [searchHistory, setSearchHistory] = useState<string[]>([])

  const saveToHistory = useCallback(
    (q: string) => {
      if (!q.trim() || q.startsWith("=") || q.startsWith("@")) return
      setSearchHistory((prev) => {
        const next = [q.trim(), ...prev.filter((item) => item !== q.trim())].slice(0, MAX_HISTORY)
        try {
          localStorage.setItem(HISTORY_KEY, JSON.stringify(next))
        } catch {}
        return next
      })
    },
    [HISTORY_KEY]
  )

  const clearHistory = useCallback(() => {
    setSearchHistory([])
    try {
      localStorage.removeItem(HISTORY_KEY)
    } catch {}
  }, [HISTORY_KEY])

  const calculatorResult = useMemo(() => {
    if (!query.startsWith("=")) return null
    const expr = query.slice(1).trim()
    if (!expr) return null
    try {
      const sanitized = expr.replace(/[^0-9+\-*/.()%\s]/g, "")
      if (!sanitized) return null
      const result = Function(`"use strict"; return (${sanitized})`)()
      if (typeof result !== "number" || !isFinite(result)) return null
      return { expr, result }
    } catch {
      return null
    }
  }, [query])

  const smartTips = useMemo(() => {
    if (query) return []
    return [
      {
        id: "tip-calc",
        icon: <CalculatorIcon className="w-3.5 h-3.5" />,
        text: "Type = to calculate (e.g. =2+2*3)",
        category: "Quick Actions",
      },
      {
        id: "tip-today",
        icon: <HashIcon className="w-3.5 h-3.5" />,
        text: "Type @today for today's overview",
        category: "Quick Actions",
      },
    ]
  }, [query])

  const categories = useMemo(() => {
    const cmdCats = Array.from(new Set(commands.map((cmd) => cmd.category || "General")))
    return ["All", "Recent", ...cmdCats].filter((cat, i, all) => {
      if (cat === "Recent") return recentCommandIds.length > 0
      return all.indexOf(cat) === i
    })
  }, [commands, recentCommandIds.length])

  const recentCommands = useMemo(() => {
    const byId = new Map(commands.map((cmd) => [cmd.id, cmd]))
    return recentCommandIds
      .map((id) => byId.get(id))
      .filter((cmd): cmd is CommandPaletteItem => Boolean(cmd))
      .map((cmd) => ({
        ...cmd,
        id: `recent-${cmd.id}`,
        category: "Recent",
      }))
  }, [commands, recentCommandIds])

  const results = useMemo(() => {
    const q = query.trim()
    const base =
      !q && activeCategory === "All"
        ? [...recentCommands, ...commands.filter((cmd) => !recentCommandIds.includes(cmd.id))]
        : activeCategory === "Recent"
          ? recentCommands
          : commands
    const filtered =
      activeCategory === "All" || activeCategory === "Recent"
        ? base
        : base.filter((cmd) => (cmd.category || "General") === activeCategory)
    if (!q) return filtered
    return filtered
      .map((cmd) => ({ cmd, score: scoreCommand(cmd, q) }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score || a.cmd.label.localeCompare(b.cmd.label))
      .map((item) => item.cmd)
  }, [query, activeCategory, commands, recentCommands, recentCommandIds])

  const safeIndex = Math.min(selectedIndex, results.length - 1)
  const hasDetail = results[safeIndex]?.detail

  useEffect(() => {
    if (isOpen) {
      setQuery("")
      setSelectedIndex(0)
      setSubpage(null)
      setActiveCategory("All")
      setSelectionSource("keyboard")
      try {
        setRecentCommandIds(JSON.parse(localStorage.getItem(RECENT_KEY) || "[]"))
      } catch {
        setRecentCommandIds([])
      }
      try {
        setSearchHistory(JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]"))
      } catch {
        setSearchHistory([])
      }
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen, RECENT_KEY, HISTORY_KEY])

  useEffect(() => {
    if (!isOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [isOpen])

  useEffect(() => {
    setSelectedIndex(0)
    setSelectionSource("keyboard")
  }, [query, activeCategory, commands])
  useEffect(() => {
    onQueryChangeRef.current?.(query)
  }, [query])

  const goBack = useCallback(() => {
    setSubpage(null)
    setTimeout(() => inputRef.current?.focus(), 50)
  }, [])

  const rememberCommand = useCallback(
    (cmd: CommandPaletteItem) => {
      const id = cmd.id.startsWith("recent-") ? cmd.id.slice(7) : cmd.id
      setRecentCommandIds((prev) => {
        const next = [id, ...prev.filter((i) => i !== id)].slice(0, MAX_RECENT)
        try {
          localStorage.setItem(RECENT_KEY, JSON.stringify(next))
        } catch {}
        return next
      })
    },
    [RECENT_KEY]
  )

  const executeCommand = useCallback(
    (cmd: CommandPaletteItem) => {
      rememberCommand(cmd)
      saveToHistory(query)
      cmd.onSelect()
    },
    [rememberCommand, saveToHistory, query]
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (subpage) {
        if (e.key === "Escape") {
          e.preventDefault()
          goBack()
        }
        return
      }
      const len = results.length
      if (e.key === "ArrowDown") {
        e.preventDefault()
        if (!len) return
        setSelectionSource("keyboard")
        setSelectedIndex((p) => (p + 1) % len)
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        if (!len) return
        setSelectionSource("keyboard")
        setSelectedIndex((p) => (p - 1 + len) % len)
      } else if (e.key === "Enter" && results[safeIndex]) {
        e.preventDefault()
        const cmd = results[safeIndex]
        if (cmd.subpage) setSubpage(cmd.subpage)
        else {
          executeCommand(cmd)
          onClose()
        }
      } else if (e.key === "Escape") {
        onClose()
      }
    },
    [executeCommand, results, safeIndex, onClose, subpage, goBack]
  )

  useEffect(() => {
    if (selectionSource !== "keyboard" || safeIndex < 0) return
    const cmd = results[safeIndex]
    const el = cmd ? itemRefs.current[cmd.id] : null
    el?.scrollIntoView({ block: "nearest" })
  }, [safeIndex, results, selectionSource])

  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !subpage) onClose()
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        onClose()
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [isOpen, onClose, subpage])

  const handleItemClick = useCallback(
    (cmd: CommandPaletteItem) => {
      if (cmd.subpage) {
        rememberCommand(cmd)
        setSubpage(cmd.subpage)
      } else {
        executeCommand(cmd)
        onClose()
      }
    },
    [executeCommand, onClose, rememberCommand]
  )

  const grouped = useMemo(
    () =>
      results.reduce<Record<string, CommandPaletteItem[]>>((acc, cmd) => {
        const cat = cmd.category || "General"
        if (!acc[cat]) acc[cat] = []
        acc[cat].push(cmd)
        return acc
      }, {}),
    [results]
  )

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center p-0 md:items-start md:px-4 md:pt-[10vh]"
      onClick={subpage ? undefined : onClose}
    >
      <div className="fixed inset-0 bg-black/45 dark:bg-black/60" />
      <div
        className="relative flex h-[calc(100dvh-env(safe-area-inset-top,0px))] w-full overflow-hidden rounded-t-lg border border-line shadow-[0_16px_48px_rgba(0,0,0,0.18)] md:h-auto md:max-h-[78vh] md:max-w-3xl md:rounded-lg"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        <div className="relative flex min-h-0 w-full flex-col bg-background">
          {subpage ? (
            <div className="flex min-h-0 flex-1 flex-col">
              <div className="flex items-center gap-2 border-b border-gray-200/60 px-4 py-3 dark:border-gray-800/30">
                <button
                  onClick={goBack}
                  className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 dark:hover:bg-gray-900 dark:text-muted transition-colors"
                >
                  <ArrowLeftIcon className="w-4 h-4" />
                </button>
                <p className="text-sm font-semibold text-ink-2">
                  {results.find((c) => c.subpage === subpage)?.label || "Search"}
                </p>
                <div className="flex-1" />
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 dark:hover:bg-gray-900 dark:text-muted transition-colors"
                >
                  <XIcon className="w-4 h-4" />
                </button>
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">{subpage}</div>
            </div>
          ) : (
            <>
              <div className="shrink-0 border-b border-gray-200/60 px-4 py-4 dark:border-gray-800/30 md:px-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-sm bg-accent-soft p-1.5 text-accent">
                    <SearchIcon />
                  </div>
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search commands..."
                    className="min-w-0 flex-1 bg-transparent text-base text-gray-900 outline-none placeholder:text-muted dark:text-gray-100 dark:placeholder-gray-500"
                  />
                  {query && (
                    <button
                      onClick={() => setQuery("")}
                      className="rounded-lg p-1.5 text-muted transition-colors hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-900 dark:hover:text-gray-200"
                      aria-label="Clear search"
                    >
                      <XIcon className="h-4 w-4" />
                    </button>
                  )}
                  <kbd className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-muted bg-surface-2 rounded-lg border border-line">
                    <CommandIcon className="w-3 h-3" />K
                  </kbd>
                  <button
                    onClick={onClose}
                    className="rounded-lg p-1.5 text-muted transition-colors hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-900 dark:hover:text-gray-200"
                    aria-label="Close search"
                  >
                    <XIcon className="h-5 w-5" />
                  </button>
                </div>
                <div className="mt-3 flex gap-2 overflow-x-auto pb-0.5 [scrollbar-width:none]">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={cn(
                        "inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full border px-3 text-xs font-bold transition-colors",
                        activeCategory === category
                          ? "border-accent/40 bg-accent-soft text-accent"
                          : "border-gray-200 bg-white text-gray-500 hover:text-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-400 dark:hover:text-gray-200"
                      )}
                    >
                      {category === "Recent" ? (
                        <ClockIcon className="h-3.5 w-3.5" />
                      ) : category === "All" ? (
                        <SlidersIcon className="h-3.5 w-3.5" />
                      ) : null}
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div
                ref={listRef}
                className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-2 scroll-smooth md:max-h-[22rem]"
              >
                {calculatorResult && (
                  <div className="mx-1 mb-2 flex items-center gap-3 rounded-md border border-accent/40 bg-accent-soft px-4 py-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-line bg-surface">
                      <CalculatorIcon className="h-4 w-4 text-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-ink">
                        {calculatorResult.expr} <span className="text-accent">=</span>
                      </p>
                    </div>
                    <span className="shrink-0 text-lg font-semibold tabular-nums text-accent">
                      {calculatorResult.result}
                    </span>
                  </div>
                )}

                {results.length === 0 &&
                !query &&
                searchHistory.length === 0 &&
                smartTips.length > 0 ? (
                  <div className="space-y-1 px-3 py-4">
                    <div className="flex items-center gap-2 mb-3">
                      <LightbulbIcon className="w-3.5 h-3.5 text-warn" />
                      <p className="text-[11px] font-semibold text-muted">Pro Tips</p>
                      <div className="h-px flex-1 bg-line-2" />
                    </div>
                    {smartTips.map((tip) => (
                      <div
                        key={tip.id}
                        className="flex items-center gap-2.5 py-1.5 px-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors cursor-default"
                      >
                        <span className="text-muted">{tip.icon}</span>
                        <span className="text-[12px] font-medium text-muted">{tip.text}</span>
                      </div>
                    ))}
                  </div>
                ) : results.length === 0 ? (
                  <div className="flex flex-col items-center py-12 text-center">
                    <div className="p-3 rounded-md bg-surface-2 mb-3">
                      <SparklesIcon className="w-6 h-6 text-muted" />
                    </div>
                    <p className="text-sm font-medium text-muted">No results found</p>
                    <p className="text-xs text-muted mt-1">Try a different search term</p>
                  </div>
                ) : (
                  Object.entries(grouped).map(([category, items]) => (
                    <div key={category}>
                      {Object.keys(grouped).length > 1 && (
                        <div className="sticky top-0 z-10 flex items-center gap-2 bg-background px-3 pb-1.5 pt-3">
                          <div
                            className={`h-1.5 w-1.5 rounded-full ${categoryDot[category] || "bg-muted"}`}
                          />
                          <p className="text-[11px] font-semibold text-muted">{category}</p>
                          <div className="h-px flex-1 bg-line-2" />
                        </div>
                      )}
                      {items.map((cmd) => {
                        const globalIdx = results.indexOf(cmd)
                        return (
                          <button
                            key={cmd.id}
                            ref={(node) => {
                              itemRefs.current[cmd.id] = node
                            }}
                            onClick={() => handleItemClick(cmd)}
                            onPointerEnter={(event) => {
                              if (event.pointerType === "touch") return
                              setSelectionSource("pointer")
                              setSelectedIndex(globalIdx)
                            }}
                            className={cn(
                              "flex w-full touch-manipulation items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors duration-150 md:py-2.5",
                              globalIdx === safeIndex
                                ? "bg-accent-soft text-ink ring-1 ring-accent/40"
                                : "text-gray-700 hover:bg-gray-50/80 dark:text-gray-300 dark:hover:bg-gray-800/40"
                            )}
                          >
                            {cmd.icon && (
                              <span
                                className={cn(
                                  "shrink-0 w-8 h-8 flex items-center justify-center rounded-xl text-sm transition-colors",
                                  globalIdx === safeIndex
                                    ? "bg-surface ring-1 ring-line"
                                    : "bg-gray-100/80 dark:bg-gray-900/60 text-muted"
                                )}
                              >
                                {cmd.icon}
                              </span>
                            )}
                            <div className="flex-1 min-w-0">
                              <p
                                className={cn(
                                  "text-sm font-semibold truncate leading-tight",
                                  globalIdx === safeIndex ? "text-ink" : "text-ink"
                                )}
                              >
                                {cmd.label}
                              </p>
                              {cmd.description && !cmd.rightSlot && (
                                <p className="text-[11px] text-muted truncate mt-0.5">
                                  {cmd.description}
                                </p>
                              )}
                            </div>
                            {cmd.rightSlot ? (
                              <div className="shrink-0">{cmd.rightSlot}</div>
                            ) : cmd.description ? (
                              <p className="hidden md:block text-[11px] text-muted truncate max-w-[180px] mr-1">
                                {cmd.description}
                              </p>
                            ) : null}
                            <ArrowRightIcon
                              className={cn(
                                "w-4 h-4 shrink-0 transition-[color,transform] duration-[120ms]",
                                globalIdx === safeIndex
                                  ? "text-accent translate-x-0.5"
                                  : "text-gray-300 dark:text-gray-600"
                              )}
                            />
                          </button>
                        )
                      })}
                    </div>
                  ))
                )}

                {!query && searchHistory.length > 0 && (
                  <div className="mt-2 border-t border-line-2/30 pt-2 px-1">
                    <div className="flex items-center gap-2 mb-1.5 px-2">
                      <HistoryIcon className="w-3 h-3 text-muted" />
                      <p className="text-[11px] font-semibold text-muted flex-1">Recent Searches</p>
                      <button
                        onClick={clearHistory}
                        className="flex items-center gap-1 text-[11px] font-semibold text-muted hover:text-danger dark:text-gray-500 transition-colors"
                      >
                        <TrashIcon className="w-3 h-3" /> Clear
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {searchHistory.map((term) => (
                        <button
                          key={term}
                          onClick={() => setQuery(term)}
                          className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white px-2.5 py-1 text-[11px] font-medium text-gray-500 transition-colors hover:border-gray-300 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-400 dark:hover:border-gray-700 dark:hover:text-gray-200"
                        >
                          <ClockIcon className="w-3 h-3" />
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {hasDetail && (
                <div className="relative hidden max-h-52 shrink-0 overflow-y-auto border-t border-gray-200/60 bg-gray-50/50 p-3 md:block dark:border-gray-800/30 dark:bg-gray-950/30">
                  <div className="absolute inset-x-0 -top-px h-px bg-line" />
                  {results[safeIndex].detail}
                </div>
              )}

              <div className="hidden shrink-0 items-center justify-between border-t border-gray-200/60 px-5 py-2.5 text-[11px] text-muted md:flex dark:border-gray-800/30 dark:text-gray-500">
                <span className="flex items-center gap-1">
                  <ArrowRightIcon className="w-3 h-3" />{" "}
                  <kbd className="px-1.5 py-0.5 rounded bg-surface-2 font-semibold">Enter</kbd>{" "}
                  select
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-surface-2 font-semibold">
                    \u2191\u2193
                  </kbd>{" "}
                  navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-surface-2 font-semibold">Esc</kbd> close
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
