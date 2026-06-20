"use client"

import * as React from "react"
import Link from "next/link"
import { useDepartment } from "@/services/queries/useDepartmentQuery"
import { useDoctors } from "@/services/queries/useDoctorQuery"
import { DoctorCard } from "./DoctorCard"
import { RemoteImage } from "./RemoteImage"
import { Pagination } from "./Pagination"
import { DirectoryError } from "./DepartmentsDirectory"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Building2, ArrowLeft } from "lucide-react"

const LIMIT = 12

export function DepartmentDetail({ id }: { id: string }) {
  const dept = useDepartment(id)
  const [page, setPage] = React.useState(1)
  const doctors = useDoctors({ departmentId: id, page, limit: LIMIT })

  if (dept.isLoading) {
    return <Skeleton className="h-64 w-full rounded-2xl" />
  }
  if (dept.isError) {
    return <DirectoryError onRetry={dept.refetch} />
  }
  if (!dept.data) return null

  const d = dept.data

  return (
    <div className="space-y-10">
      <Link
        href="/departments"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" />
        All departments
      </Link>

      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white dark:border-white/10 dark:bg-slate-900/50">
        <div className="relative h-40 w-full bg-muted sm:h-56">
          <RemoteImage
            src={d.image}
            alt={d.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 60vw"
            priority
            fallback={
              <div className="absolute inset-0 flex items-center justify-center bg-primary/5">
                <Building2 className="h-12 w-12 text-primary" />
              </div>
            }
          />
        </div>
        <div className="space-y-3 p-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-primary/10 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-primary">
              {d.code}
            </span>
            <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {d.name}
            </h1>
          </div>
          {d.description && (
            <p className="text-sm leading-relaxed text-muted-foreground">
              {d.description}
            </p>
          )}
          {d.units && d.units.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {d.units.map((u) => (
                <Badge key={u.code} variant="secondary" className="text-[11px]">
                  {u.name}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="font-heading text-lg font-bold text-foreground">
          Doctors in this department
        </h2>
        {doctors.isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-32 w-full rounded-2xl" />
            ))}
          </div>
        ) : doctors.isError ? (
          <DirectoryError onRetry={doctors.refetch} />
        ) : doctors.data && doctors.data.data.length > 0 ? (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {doctors.data.data.map((doctor) => (
                <DoctorCard key={doctor._id} doctor={doctor} />
              ))}
            </div>
            <Pagination page={page} meta={doctors.data.meta} onPageChange={setPage} />
          </>
        ) : (
          <p className="rounded-xl border border-dashed border-border py-12 text-center text-sm text-muted-foreground">
            No doctors listed in this department yet.
          </p>
        )}
      </div>
    </div>
  )
}
