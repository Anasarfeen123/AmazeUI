"use client"
import { View, Text } from "../../lib/primitives"
import * as React from "react"
import { type ViewProps } from "react-native"
import { cn } from "../../lib/utils"

const Table = React.forwardRef<React.ElementRef<typeof View>, ViewProps & { className?: string }>(
  ({ className, ...props }, ref) => (
    <View
      {...({ className: "w-full overflow-x-auto rounded-md border border-line bg-surface" } as any)}
    >
      <View
        ref={ref}
        role="table"
        {...({ className: cn("w-full min-w-max text-sm", className) } as any)}
        {...props}
      />
    </View>
  )
)
Table.displayName = "Table"

const TableHeader = React.forwardRef<
  React.ElementRef<typeof View>,
  ViewProps & { className?: string }
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    {...({
      className: cn(
        "flex flex-col border-b border-line bg-surface-2 [&>*]:border-b-0 [&>*]:hover:bg-transparent",
        className
      ),
    } as any)}
    {...props}
  />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  React.ElementRef<typeof View>,
  ViewProps & { className?: string }
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    {...({ className: cn("flex flex-col [&>*:last-child]:border-b-0", className) } as any)}
    {...props}
  />
))
TableBody.displayName = "TableBody"

const TableRow = React.forwardRef<
  React.ElementRef<typeof View>,
  ViewProps & { className?: string }
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    role="row"
    {...({
      className: cn(
        "flex min-h-11 flex-row items-center border-b border-line-2 transition-colors duration-[120ms] hover:bg-surface-2",
        className
      ),
    } as any)}
    {...props}
  />
))
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<
  React.ElementRef<typeof View>,
  ViewProps & { className?: string }
>(({ className, children, ...props }, ref) => (
  <View
    ref={ref}
    {...({
      className: cn(
        "min-w-0 flex-1 basis-0 items-start justify-center px-4 py-2 text-left",
        className
      ),
    } as any)}
    {...props}
  >
    {typeof children === "string" ? (
      <Text {...({ className: "text-[12.5px] font-medium text-muted" } as any)}>{children}</Text>
    ) : (
      children
    )}
  </View>
))
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<
  React.ElementRef<typeof View>,
  ViewProps & { className?: string }
>(({ className, children, ...props }, ref) => (
  <View
    ref={ref}
    {...({
      className: cn("min-w-0 flex-1 basis-0 items-start justify-center px-4 py-2.5", className),
    } as any)}
    {...props}
  >
    {typeof children === "string" ? (
      <Text {...({ className: "truncate text-sm text-ink" } as any)}>{children}</Text>
    ) : (
      children
    )}
  </View>
))
TableCell.displayName = "TableCell"

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell }
