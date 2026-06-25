"use client"

import * as React from "react"
import { format, isValid, parseISO } from "date-fns"
import { useMyReports } from "@/services/queries/usePathologyQuery"
import {
  DoctorProfile,
  PathologyReport,
  PathologyStatus,
  ResultFlag,
  TestCategory,
} from "@/types"
import { Pagination } from "@/components/shared/Pagination"
import { DirectoryError } from "@/components/shared/DepartmentsDirectory"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { FlaskConical } from "lucide-react"

const LIMIT = 10
const ALL = "all"

const STATUS_TONE: Record<PathologyStatus, string> = {
  [PathologyStatus.ORDERED]: "bg-warning/15 text-warning",
  [PathologyStatus.SAMPLE_COLLECTED]: "bg-primary/10 text-primary",
  [PathologyStatus.IN_PROGRESS]: "bg-warning/15 text-warning",
  [PathologyStatus.COMPLETED]: "bg-success/15 text-success",
  [PathologyStatus.CANCELLED]: "bg-muted text-muted-foreground",
}

const CATEGORY_LABEL: Record<TestCategory, string> = {
  [TestCategory.BLOOD]: "Blood",
  [TestCategory.IMAGING]: "Imaging",
  [TestCategory.URINE]: "Urine",
  [TestCategory.BIOPSY]: "Biopsy",
  [TestCategory.OTHER]: "Other",
}

const FLAG_TONE: Record<ResultFlag, string> = {
  [ResultFlag.NORMAL]: "bg-success/15 text-success",
  [ResultFlag.HIGH]: "bg-destructive/10 text-destructive",
  [ResultFlag.LOW]: "bg-destructive/10 text-destructive",
}

function designationOf(r: PathologyReport): string {
  return typeof r.doctorId === "object"
    ? (r.doctorId as DoctorProfile).designation
    : ""
}

export function PathologyDirectory() {
  const [page, setPage] = React.useState(1)
  const [status, setStatus] = React.useState<PathologyStatus | undefined>()
  const [category, setCategory] = React.useState<TestCategory | undefined>()

  const { data, isLoading, isError, refetch } = useMyReports({
    page,
    limit: LIMIT,
    status,
    testCategory: category,
  })

  const onStatusChange = (v: string) => {
    setStatus(v === ALL ? undefined : (v as PathologyStatus))
    setPage(1)
  }
  const onCategoryChange = (v: string) => {
    setCategory(v === ALL ? undefined : (v as TestCategory))
    setPage(1)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3">
        <Select value={status ?? ALL} onValueChange={onStatusChange}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All statuses</SelectItem>
            <SelectItem value={PathologyStatus.ORDERED}>Ordered</SelectItem>
            <SelectItem value={PathologyStatus.SAMPLE_COLLECTED}>
              Sample collected
            </SelectItem>
            <SelectItem value={PathologyStatus.IN_PROGRESS}>
              In progress
            </SelectItem>
            <SelectItem value={PathologyStatus.COMPLETED}>Completed</SelectItem>
            <SelectItem value={PathologyStatus.CANCELLED}>Cancelled</SelectItem>
          </SelectContent>
        </Select>

        <Select value={category ?? ALL} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All categories</SelectItem>
            <SelectItem value={TestCategory.BLOOD}>Blood</SelectItem>
            <SelectItem value={TestCategory.IMAGING}>Imaging</SelectItem>
            <SelectItem value={TestCategory.URINE}>Urine</SelectItem>
            <SelectItem value={TestCategory.BIOPSY}>Biopsy</SelectItem>
            <SelectItem value={TestCategory.OTHER}>Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-32 w-full rounded-2xl" />
          ))}
        </div>
      ) : isError ? (
        <DirectoryError onRetry={refetch} />
      ) : data && data.data.length > 0 ? (
        <>
          <div className="space-y-3">
            {data.data.map((r) => (
              <ReportCard key={r._id} report={r} />
            ))}
          </div>
          <Pagination page={page} meta={data.meta} onPageChange={setPage} />
        </>
      ) : (
        <p className="rounded-xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
          No lab reports {status ? `with status "${status}"` : ""} yet.
        </p>
      )}
    </div>
  )
}

function ReportCard({ report }: { report: PathologyReport }) {
  const ordered = report.orderedAt ? parseISO(report.orderedAt) : null
  const completed = report.completedAt ? parseISO(report.completedAt) : null
  const hasResult =
    report.status === PathologyStatus.COMPLETED &&
    (!!report.resultSummary || (report.resultValues?.length ?? 0) > 0)

  return (
    <Card>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <FlaskConical className="size-5" />
            </div>
            <div className="min-w-0">
              <p className="font-heading text-sm font-bold text-foreground">
                {report.testName}
              </p>
              <p className="text-xs text-muted-foreground">
                Ordered{" "}
                {ordered && isValid(ordered)
                  ? format(ordered, "d MMM yyyy")
                  : "—"}
                {designationOf(report) && ` · ${designationOf(report)}`}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">
              {CATEGORY_LABEL[report.testCategory]}
            </Badge>
            <Badge className={STATUS_TONE[report.status]}>
              {report.status}
            </Badge>
          </div>
        </div>

        {report.notes && (
          <p className="text-xs text-muted-foreground">
            <span className="font-medium">Notes:</span> {report.notes}
          </p>
        )}

        {hasResult && (
          <div className="space-y-2 rounded-xl border border-border bg-muted/30 p-3">
            {completed && isValid(completed) && (
              <p className="text-[11px] font-medium text-muted-foreground">
                Completed {format(completed, "d MMM yyyy")}
              </p>
            )}
            {report.resultSummary && (
              <p className="text-sm text-foreground">{report.resultSummary}</p>
            )}
            {report.resultValues && report.resultValues.length > 0 && (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Parameter</TableHead>
                      <TableHead>Result</TableHead>
                      <TableHead>Reference</TableHead>
                      <TableHead className="w-24">Flag</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {report.resultValues.map((v, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium">
                          {v.parameter}
                        </TableCell>
                        <TableCell>{v.value}</TableCell>
                        <TableCell className="text-muted-foreground">
                          {v.referenceRange || "—"}
                        </TableCell>
                        <TableCell>
                          {v.flag ? (
                            <Badge className={FLAG_TONE[v.flag]}>
                              {v.flag}
                            </Badge>
                          ) : (
                            "—"
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
