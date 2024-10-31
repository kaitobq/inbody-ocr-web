"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui"
import { ArrowUpDown } from "lucide-react"
import type React from "react"
import { useMemo, useState } from "react"

interface ColumnDefinition<T> {
  key: keyof T | string
  label: string
  sortable?: boolean
  className?: string
  headerClassName?: string
  render?: (item: T, index: number) => React.ReactNode
}

interface CustomTableProps<T> {
  columns: ColumnDefinition<T>[]
  data: T[]
  enableSorting?: boolean
  rowClassName?: (item: T) => string
  defaultSortColumn?: keyof T | string
  defaultSortDirection?: "asc" | "desc"
}

export const CustomTable = <T extends object>({
  columns,
  data,
  enableSorting = false,
  rowClassName,
  defaultSortColumn,
  defaultSortDirection = "asc",
}: CustomTableProps<T>) => {
  const [sortColumn, setSortColumn] = useState<keyof T | string | null>(
    defaultSortColumn || null,
  )
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">(
    defaultSortDirection,
  )

  const sortedData = useMemo(() => {
    if (!enableSorting || !sortColumn) return data
    return [...data].sort((a, b) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const aValue = (a as any)[sortColumn]
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const bValue = (b as any)[sortColumn]
      if (aValue === bValue) return 0
      if (aValue == null) return 1
      if (bValue == null) return -1
      return (aValue < bValue ? -1 : 1) * (sortDirection === "asc" ? 1 : -1)
    })
  }, [data, sortColumn, sortDirection, enableSorting])

  const handleSort = (columnKey: keyof T | string) => {
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(columnKey)
      setSortDirection("asc")
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead
              key={String(column.key)}
              className={`${column.headerClassName || ""} ${
                column.sortable ? "cursor-pointer" : ""
              }`}
              onClick={
                column.sortable ? () => handleSort(column.key) : undefined
              }
            >
              {column.label}
              {enableSorting &&
                column.sortable &&
                sortColumn === column.key && (
                  <ArrowUpDown className="ml-2 inline size-4" />
                )}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedData.map((item, index) => (
          <TableRow
            key={index}
            className={rowClassName ? rowClassName(item) : ""}
          >
            {columns.map((column) => (
              <TableCell key={String(column.key)} className={column.className}>
                {column.render
                  ? column.render(item, index)
                  : // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (item as any)[column.key]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
