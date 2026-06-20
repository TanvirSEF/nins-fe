"use client"

import * as React from "react"
import { useDepartments } from "@/services/queries/useDepartmentQuery"
import { DepartmentCard } from "./DepartmentCard"
import { Pagination } from "./Pagination"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { AlertCircle, RefreshCw } from "lucide-react"

const LIMIT = 12

export function DepartmentsDirectory() {
  const [page, setPage] = React.useState(1)
  const { data, isLoading, isError, refetch } = useDepartments({
    page,
    limit: LIMIT,
  })

  return (
    <div className="space-y-8">
      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-56 w-full rounded-2xl" />
          ))}
        </div>
      ) : isError ? (
        <DirectoryError onRetry={refetch} />
      ) : data && data.data.length > 0 ? (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {data.data.map((department) => (
              <DepartmentCard key={department._id} department={department} />
            ))}
          </div>
          <Pagination page={page} meta={data.meta} onPageChange={setPage} />
        </>
      ) : (
        <p className="rounded-xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
          No departments found.
        </p>
      )}
    </div>
  )
}

/** Shared error state for directory listings. */
export function DirectoryError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-destructive/40 bg-destructive/5 p-12 text-center">
      <AlertCircle className="size-6 text-destructive" />
      <p className="text-sm text-muted-foreground">Couldn&apos;t load results.</p>
      <Button variant="outline" size="sm" onClick={onRetry} className="gap-1.5">
        <RefreshCw className="size-3.5" />
        Try again
      </Button>
    </div>
  )
}
