"use client"

import * as React from "react"
import { useDepartments } from "@/services/queries/useDepartmentQuery"
import { useDoctors } from "@/services/queries/useDoctorQuery"
import { DoctorCard } from "./DoctorCard"
import { Pagination } from "./Pagination"
import { DirectoryError } from "./DepartmentsDirectory"
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search } from "lucide-react"

const LIMIT = 12
const ALL = "all"

export function DoctorsDirectory() {
  const [page, setPage] = React.useState(1)
  const [departmentId, setDepartmentId] = React.useState<string>(ALL)
  const [specialtyInput, setSpecialtyInput] = React.useState("")
  const [specialty, setSpecialty] = React.useState("")

  // Department options for the filter dropdown.
  const depts = useDepartments({ page: 1, limit: 100 })

  // Debounce the specialty search (350ms) to avoid per-keystroke queries.
  React.useEffect(() => {
    const t = setTimeout(() => {
      setSpecialty(specialtyInput.trim())
      setPage(1)
    }, 350)
    return () => clearTimeout(t)
  }, [specialtyInput])

  const { data, isLoading, isError, refetch } = useDoctors({
    page,
    limit: LIMIT,
    departmentId: departmentId !== ALL ? departmentId : undefined,
    specialty: specialty || undefined,
  })

  return (
    <div className="space-y-6">
      {/* Filter bar */}
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-4 dark:border-white/10 dark:bg-slate-900/50 sm:flex-row sm:items-end">
        <div className="space-y-1.5 sm:w-64">
          <Label className="text-xs">Department</Label>
          <Select
            value={departmentId}
            onValueChange={(v) => {
              setDepartmentId(v)
              setPage(1)
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All departments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>All departments</SelectItem>
              {depts.data?.data.map((d) => (
                <SelectItem key={d._id} value={d._id}>
                  {d.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1 space-y-1.5">
          <Label className="text-xs">Specialty</Label>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={specialtyInput}
              onChange={(e) => setSpecialtyInput(e.target.value)}
              placeholder="e.g. Stroke, Neurology"
              className="pl-8"
            />
          </div>
        </div>
      </div>

      {/* Results */}
      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-32 w-full rounded-2xl" />
          ))}
        </div>
      ) : isError ? (
        <DirectoryError onRetry={refetch} />
      ) : data && data.data.length > 0 ? (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.data.map((doctor) => (
              <DoctorCard key={doctor._id} doctor={doctor} />
            ))}
          </div>
          <Pagination page={page} meta={data.meta} onPageChange={setPage} />
        </>
      ) : (
        <p className="rounded-xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
          No doctors match your filters.
        </p>
      )}
    </div>
  )
}
