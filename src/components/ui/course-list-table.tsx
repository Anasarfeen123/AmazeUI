import React from "react"
import { cn } from "../../lib/utils"

export interface CourseListItem {
  id: string
  code: string
  title: string
  slots: string[]
  faculty: string
  venue: string
  credits: string
  type: string
  color: string
  batch?: string
}

export interface CourseListTableProps {
  courses: CourseListItem[]
  renderTypeChips?: (type: string | string[], size?: "sm" | "md" | "default") => React.ReactNode
  getBatchBadgeClass?: (batch: string) => string
  title?: string
  className?: string
}

export function CourseListTable({
  courses,
  renderTypeChips,
  getBatchBadgeClass = () =>
    "bg-gray-100/50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700",
  title = "Course List",
  className,
}: CourseListTableProps) {
  if (!courses || courses.length === 0) return null

  return (
    <div
      className={cn("bg-surface border border-line rounded-xl shadow-sm flex flex-col", className)}
    >
      <div className="p-4 border-b border-line bg-surface-2/60 rounded-t-xl">
        <h3 className="font-bold text-ink">{title}</h3>
      </div>
      <div>
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead className="bg-surface-2 border-b border-line">
            <tr>
              <th className="py-3 px-4 text-xs font-medium text-muted">Course</th>
              <th className="py-3 px-2 text-xs font-medium text-muted">Type</th>
              <th className="py-3 px-2 text-xs font-medium text-muted">Faculty</th>
              <th className="py-3 px-2 text-xs font-medium text-muted">Slots</th>
              <th className="py-3 px-2 text-xs font-medium text-muted">Venue</th>
              <th className="py-3 px-2 text-xs font-medium text-muted">Credits</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line-2">
            {courses.map((c) => (
              <tr
                key={c.id}
                className="hover:bg-gray-100/10 dark:hover:bg-gray-900/10 transition-colors"
              >
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className={cn("w-3 h-3 rounded-full shrink-0", c.color)} />
                    <div>
                      <p className="text-ink font-semibold text-sm flex items-center gap-2 flex-wrap">
                        {c.code}
                        {c.batch &&
                          c.batch
                            .split(",")
                            .map((b) => b.trim())
                            .filter(Boolean)
                            .map((b) => (
                              <span
                                key={b}
                                className={cn(
                                  "text-xs font-bold px-2 py-0.5 rounded-md border",
                                  getBatchBadgeClass(b)
                                )}
                              >
                                {b}
                              </span>
                            ))}
                      </p>
                      <p className="text-muted text-xs max-w-xs">{c.title}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-2 text-sm text-gray-900/80 dark:text-gray-100/80">
                  {renderTypeChips ? renderTypeChips(c.type) : c.type}
                </td>
                <td className="py-3 px-2 text-sm text-gray-900/80 dark:text-gray-100/80">
                  {c.faculty}
                </td>
                <td className="py-3 px-2">
                  <div className="flex flex-wrap gap-1">
                    {c.slots.map((s) => (
                      <span
                        key={s}
                        className="bg-gray-100/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-[11px] px-1.5 py-0.5 rounded-md"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="py-3 px-2 text-sm text-gray-900/80 dark:text-gray-100/80 max-w-xs">
                  {c.venue}
                </td>
                <td className="py-3 px-2 text-sm text-gray-900/80 dark:text-gray-100/80">
                  {c.credits}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
