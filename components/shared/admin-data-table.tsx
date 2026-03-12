'use client'

import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Edit2, Trash2, Plus, RefreshCw } from "lucide-react"
import Link from 'next/link'
import { FadeIn, Magnetic } from '@/components/shared/animations'

interface Column<T> {
  header: string
  accessorKey: keyof T | string
  cell?: (item: T) => React.ReactNode
}

interface AdminDataTableProps<T> {
  title: string
  description: string
  columns: Column<T>[]
  data: T[]
  isLoading: boolean
  onDelete?: (id: string | number) => void
  onRefresh?: () => void
  createHref?: string
  createText?: string
  searchKey?: keyof T
  searchPlaceholder?: string
}

export function AdminDataTable<T extends { id: string | number }>({
  title,
  description,
  columns,
  data,
  isLoading,
  onDelete,
  onRefresh,
  createHref,
  createText = "Create New",
  searchKey,
  searchPlaceholder = "Search...",
}: AdminDataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredData = React.useMemo(() => {
    if (!searchKey || !searchQuery) return data
    return data.filter(item => {
      const value = item[searchKey]
      if (typeof value === 'string') {
        return value.toLowerCase().includes(searchQuery.toLowerCase())
      }
      return false
    })
  }, [data, searchKey, searchQuery])

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tighter mb-2">{title}</h1>
          <p className="text-muted font-medium">{description}</p>
        </div>
        <div className="flex gap-4">
          {onRefresh && (
            <Button variant="outline" size="icon" onClick={onRefresh} disabled={isLoading} className="h-14 w-14 rounded-2xl">
              <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          )}
          {createHref && (
            <Magnetic>
              <Link href={createHref}>
                <Button className="h-14 px-8 rounded-2xl font-bold uppercase tracking-widest text-[10px] gap-3">
                  <Plus className="w-4 h-4" />
                  {createText}
                </Button>
              </Link>
            </Magnetic>
          )}
        </div>
      </header>

      {/* Toolbar */}
      {searchKey && (
        <div className="flex flex-col md:row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted w-5 h-5" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full pl-12 pr-4 h-14 bg-white border-border rounded-2xl focus-visible:ring-black/5 text-base"
            />
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white border border-border rounded-[40px] overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-zinc-50 border-border hover:bg-zinc-50">
              {columns.map((col, i) => (
                <TableHead key={i} className="px-10 py-6 text-xs font-bold uppercase tracking-widest text-muted h-auto">
                  {col.header}
                </TableHead>
              ))}
              {(onDelete || createHref) && (
                <TableHead className="px-10 py-6 text-xs font-bold uppercase tracking-widest text-muted text-right h-auto">
                  Actions
                </TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length + 1} className="h-48 text-center">
                  <div className="flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length + 1} className="h-48 text-center text-muted font-medium">
                  No records found.
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((row, i) => (
                <FadeIn key={row.id} delay={i * 0.05}>
                  <TableRow className="border-zinc-100 hover:bg-zinc-50/50 transition-colors group">
                    {columns.map((col, j) => (
                      <TableCell key={j} className="px-10 py-6 font-medium text-base">
                        {col.cell ? col.cell(row) : (row[col.accessorKey as keyof T] as React.ReactNode)}
                      </TableCell>
                    ))}
                    {(onDelete || createHref) && (
                      <TableCell className="px-10 py-6">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          {createHref && (
                            <Link href={`${createHref}/${row.id}`}>
                              <Button variant="ghost" size="icon" className="hover:bg-white border-transparent hover:border-border">
                                <Edit2 className="w-4 h-4 text-zinc-600" />
                              </Button>
                            </Link>
                          )}
                          {onDelete && (
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => onDelete(row.id)}
                              className="hover:bg-red-50 border-transparent hover:border-red-100"
                            >
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                </FadeIn>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
