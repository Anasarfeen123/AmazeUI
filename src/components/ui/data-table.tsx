import { cn } from "../../lib/utils"

export interface DataTableColumn {
  key: string
  label: string
  render?: (value: any, row: any) => React.ReactNode
  className?: string
}

export interface DataTableProps {
  columns: DataTableColumn[]
  data: Record<string, any>[]
  caption?: string
  className?: string
  emptyMessage?: string
}

export function DataTable({
  columns,
  data,
  caption,
  className,
  emptyMessage = "No data available",
}: DataTableProps) {
  if (!data || data.length === 0) {
    return (
      <div className={cn("rounded-xl border border-line bg-surface", className)}>
        <div className="p-5">
          {caption && <h4 className="text-sm font-semibold text-muted mb-4">{caption}</h4>}
          <p className="text-sm text-muted text-center py-4">{emptyMessage}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("rounded-xl border border-line bg-surface", className)}>
      <div className="p-5">
        {caption && <h4 className="text-sm font-semibold text-muted mb-4">{caption}</h4>}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={cn(
                      "text-left py-2 px-2 text-xs font-semibold text-muted whitespace-nowrap",
                      col.className
                    )}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, ri) => (
                <tr
                  key={ri}
                  className="border-b border-line-2 last:border-0 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors"
                >
                  {columns.map((col) => (
                    <td key={col.key} className={cn("py-2.5 px-2 text-ink", col.className)}>
                      {col.render ? col.render(row[col.key], row) : (row[col.key] ?? "\u2014")}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
