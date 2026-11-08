"use client"
import { motion } from "framer-motion"

export interface SubTabStripTab {
  id: string
  label: string
}

export interface SubTabStripProps {
  tabs: SubTabStripTab[]
  activeTab: string
  onChange: (id: string) => void
}

export function SubTabStrip({ tabs, activeTab, onChange }: SubTabStripProps) {
  return (
    <div className="w-full overflow-x-auto mb-5" style={{ scrollbarWidth: "none" }}>
      <div className="flex min-w-max w-fit gap-1 rounded-sm border border-line bg-surface-2 p-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`relative min-h-11 rounded-sm px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-[120ms] ${
                isActive ? "text-accent" : "text-muted hover:bg-surface hover:text-ink"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="subtab-active-indicator"
                  className="absolute inset-0 rounded-sm border border-line bg-surface"
                  transition={{ duration: 0.12 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
