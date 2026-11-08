"use client"
import { useState, useMemo, useRef, useEffect, useCallback } from "react"
import { cn } from "../../lib/utils"

export interface SettingsSection {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

export interface SettingsPanelProps {
  sections: SettingsSection[]
  searchPlaceholder?: string
  className?: string
  children?: React.ReactNode
  renderSection: (section: SettingsSection) => React.ReactNode
  sidebarLabel?: string
}

export function SettingsPanel({
  sections,
  searchPlaceholder = "Search Settings...",
  className,
  renderSection,
  sidebarLabel = "Settings",
}: SettingsPanelProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeSection, setActiveSection] = useState(sections[0]?.id || "")
  const [expandedSection, setExpandedSection] = useState("")

  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})

  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return sections
    const q = searchQuery.toLowerCase()
    return sections.filter((s) => {
      if (s.label.toLowerCase().includes(q)) return true
      if (s.id.toLowerCase().includes(q)) return true
      return false
    })
  }, [sections, searchQuery])

  const scrollToSection = useCallback((id: string) => {
    const el = sectionRefs.current[id]
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
      setActiveSection(id)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 120
      let current = sections[0]?.id || ""
      for (const sec of sections) {
        const el = sectionRefs.current[sec.id]
        if (el && el.offsetTop <= scrollPos) {
          current = sec.id
        }
      }
      setActiveSection(current)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [sections])

  return (
    <div className={cn("w-full h-full pb-16 px-4 md:px-8 max-w-7xl mx-auto", className)}>
      <div className="relative mt-5 max-w-md">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-full pl-9 pr-4 py-2 text-sm border border-line bg-surface rounded-xl text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-info transition-colors"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start relative mt-6">
        {filteredSections.length > 1 && (
          <aside className="sticky top-6 w-full md:w-56 shrink-0 hidden md:flex flex-col gap-0.5 border-r border-line-2 pr-4">
            <div className="text-xs font-medium text-muted px-2.5 mb-2">{sidebarLabel}</div>
            {filteredSections.map((sec) => {
              const Icon = sec.icon
              const isActive = activeSection === sec.id
              return (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  className={cn(
                    "flex items-center gap-3 w-full px-3 py-2 text-xs font-semibold rounded-lg text-left transition-colors",
                    isActive
                      ? "bg-info-surface text-info border border-info/30"
                      : "text-ink-2 hover:bg-surface-2 hover:text-ink border border-transparent"
                  )}
                >
                  <Icon className={cn("w-4 h-4", isActive ? "text-info" : "text-muted")} />
                  <span>{sec.label}</span>
                </button>
              )
            })}
          </aside>
        )}

        <div className="flex-1 w-full min-w-0 space-y-8">
          {filteredSections.map((sec) => {
            const isMobile = typeof window !== "undefined" && window.innerWidth < 768
            const Icon = sec.icon

            if (isMobile) {
              const isOpen = expandedSection === sec.id
              return (
                <div
                  key={sec.id}
                  ref={(el) => {
                    sectionRefs.current[sec.id] = el
                  }}
                  className="border border-line bg-surface rounded-md overflow-hidden shadow-xs"
                >
                  <button
                    onClick={() => setExpandedSection(isOpen ? "" : sec.id)}
                    className="w-full flex items-center justify-between p-4 font-bold text-ink hover:bg-surface-2 transition-colors text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4.5 h-4.5 text-info" />
                      <span className="text-sm font-semibold">{sec.label}</span>
                    </div>
                    <svg
                      className={cn(
                        "w-4 h-4 text-muted transition-transform duration-200",
                        isOpen ? "rotate-90 text-info" : ""
                      )}
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </button>
                  {isOpen && (
                    <div className="p-4 border-t border-line space-y-5 animate-fadeIn">
                      {renderSection(sec)}
                    </div>
                  )}
                </div>
              )
            }

            return (
              <section
                key={sec.id}
                id={`sec-${sec.id}`}
                ref={(el) => {
                  sectionRefs.current[sec.id] = el
                }}
                className="scroll-mt-6 space-y-5"
              >
                <div className="flex items-center gap-2 pb-1 border-b border-line">
                  <Icon className="w-5 h-5 text-muted" />
                  <h2 className="text-sm font-bold text-muted">{sec.label}</h2>
                </div>
                {renderSection(sec)}
              </section>
            )
          })}
        </div>
      </div>
    </div>
  )
}
