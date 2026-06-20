"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { PaginatedMeta } from "@/types"

interface PaginationProps {
  page: number
  meta: PaginatedMeta | undefined
  onPageChange: (page: number) => void
}

export function Pagination({ page, meta, onPageChange }: PaginationProps) {
  if (!meta) return null
  const totalPages = meta.totalPages || 1

  return (
    <div className="flex items-center justify-center gap-4">
      <Button
        variant="outline"
        size="icon-sm"
        onClick={() => onPageChange(page - 1)}
        disabled={!meta.hasPrevPage}
        aria-label="Previous page"
      >
        <ChevronLeft />
      </Button>
      <span className="text-xs text-muted-foreground">
        Page {page} of {totalPages}
      </span>
      <Button
        variant="outline"
        size="icon-sm"
        onClick={() => onPageChange(page + 1)}
        disabled={!meta.hasNextPage}
        aria-label="Next page"
      >
        <ChevronRight />
      </Button>
    </div>
  )
}
