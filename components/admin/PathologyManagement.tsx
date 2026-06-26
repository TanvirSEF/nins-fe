"use client"

import * as React from "react"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { format, isValid, parseISO } from "date-fns"
import { useAllReports, useOrderTest, useAddResult, useDeleteReport } from "@/services/queries/usePathologyQuery"
import { useStaff } from "@/services/queries/useStaffQuery"
import { useAuth } from "@/hooks/useAuth"
import { ApiError } from "@/lib/api-client"
import {
  DoctorProfile,
  PathologyReport,
  PathologyStatus,
  ResultFlag,
  Role,
  TestCategory,
  User,
} from "@/types"
import { Pagination } from "@/components/shared/Pagination"
import { DirectoryError } from "@/components/shared/DepartmentsDirectory"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ConfirmDialog } from "./ConfirmDialog"
import { toast } from "sonner"
import {
  FlaskConical,
  Loader2,
  Plus,
  Trash2,
} from "lucide-react"

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

const CATEGORY_OPTIONS = [
  TestCategory.BLOOD,
  TestCategory.IMAGING,
  TestCategory.URINE,
  TestCategory.BIOPSY,
  TestCategory.OTHER,
] as const

const STATUS_OPTIONS = [
  PathologyStatus.ORDERED,
  PathologyStatus.SAMPLE_COLLECTED,
  PathologyStatus.IN_PROGRESS,
  PathologyStatus.COMPLETED,
  PathologyStatus.CANCELLED,
] as const

const NO_PATIENT = "__none__"

function toasts(error: unknown, fallback: string) {
  const msgs = error instanceof ApiError ? error.messages : [fallback]
  msgs.forEach((m) => toast.error(m))
}
function patientName(r: PathologyReport): string {
  return typeof r.patientId === "object" && r.patientId !== null
    ? (r.patientId as User).name
    : "Patient"
}
function designationOf(r: PathologyReport): string {
  return typeof r.doctorId === "object" && r.doctorId !== null
    ? (r.doctorId as DoctorProfile).designation
    : ""
}

export function PathologyManagement() {
  const { user } = useAuth()
  const isSuperAdmin = user?.role === Role.SUPER_ADMIN

  const [page, setPage] = React.useState(1)
  const [status, setStatus] = React.useState<PathologyStatus | undefined>()
  const [category, setCategory] = React.useState<TestCategory | undefined>()
  const [ordering, setOrdering] = React.useState(false)
  const [resultFor, setResultFor] = React.useState<PathologyReport | null>(null)
  const [deleting, setDeleting] = React.useState<PathologyReport | null>(null)

  const { data, isLoading, isError, refetch } = useAllReports({
    page,
    limit: LIMIT,
    status,
    testCategory: category,
  })
  const del = useDeleteReport()

  const onStatusChange = (v: string) => {
    setStatus(v === ALL ? undefined : (v as PathologyStatus))
    setPage(1)
  }
  const onCategoryChange = (v: string) => {
    setCategory(v === ALL ? undefined : (v as TestCategory))
    setPage(1)
  }

  const confirmDelete = async () => {
    if (!deleting) return
    try {
      await del.mutateAsync(deleting._id)
      toast.success("Report deleted")
      setDeleting(null)
    } catch (error) {
      toasts(error, "Couldn't delete the report.")
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          Order pathology tests, record results, and track report status.
        </p>
        <Button onClick={() => setOrdering(true)} className="gap-1.5">
          <Plus className="size-4" /> Order test
        </Button>
      </div>

      <div className="flex flex-wrap gap-3">
        <Select value={status ?? ALL} onValueChange={onStatusChange}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All statuses</SelectItem>
            {STATUS_OPTIONS.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={category ?? ALL} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All categories</SelectItem>
            {CATEGORY_OPTIONS.map((c) => (
              <SelectItem key={c} value={c}>
                {CATEGORY_LABEL[c]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="overflow-x-auto p-0">
          {isLoading ? (
            <div className="space-y-2 p-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full rounded-lg" />
              ))}
            </div>
          ) : isError ? (
            <div className="p-4">
              <DirectoryError onRetry={refetch} />
            </div>
          ) : data && data.data.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Test</TableHead>
                  <TableHead className="w-32">Ordered</TableHead>
                  <TableHead className="w-36">Doctor</TableHead>
                  <TableHead className="w-32">Status</TableHead>
                  <TableHead className="w-40 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.data.map((r) => {
                  const ordered = r.orderedAt ? parseISO(r.orderedAt) : null
                  return (
                    <TableRow key={r._id}>
                      <TableCell className="font-medium">
                        {patientName(r)}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span>{r.testName}</span>
                          <Badge variant="secondary" className="mt-0.5 w-fit text-[10px]">
                            {CATEGORY_LABEL[r.testCategory]}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {ordered && isValid(ordered)
                          ? format(ordered, "d MMM yyyy")
                          : "—"}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {designationOf(r) || "—"}
                      </TableCell>
                      <TableCell>
                        <Badge className={STATUS_TONE[r.status]}>
                          {r.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setResultFor(r)}
                          >
                            {r.status === PathologyStatus.COMPLETED
                              ? "Edit result"
                              : "Add result"}
                          </Button>
                          {isSuperAdmin && (
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              className="text-destructive hover:bg-destructive/10"
                              onClick={() => setDeleting(r)}
                              aria-label="Delete report"
                            >
                              <Trash2 className="size-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          ) : (
            <p className="py-16 text-center text-sm text-muted-foreground">
              No pathology reports {status ? `with status "${status}"` : ""}.
            </p>
          )}
        </CardContent>
      </Card>

      {data && data.data.length > 0 && (
        <Pagination page={page} meta={data.meta} onPageChange={setPage} />
      )}

      <OrderTestDialog open={ordering} onOpenChange={setOrdering} />

      <AddResultDialog
        report={resultFor}
        onOpenChange={(o) => !o && setResultFor(null)}
      />

      <ConfirmDialog
        open={!!deleting}
        onOpenChange={(o) => !o && setDeleting(null)}
        title="Delete this report?"
        description={
          deleting
            ? `"${deleting.testName}" for ${patientName(deleting)} will be permanently removed.`
            : ""
        }
        confirmLabel="Delete"
        onConfirm={confirmDelete}
        loading={del.isPending}
      />
    </div>
  )
}

/* ─── Order test ─────────────────────────────────────────────────────── */

const orderSchema = z.object({
  patientId: z.string().min(1, "Select a patient"),
  testName: z.string().trim().min(2, "Test name is required"),
  testCategory: z.nativeEnum(TestCategory),
  notes: z.string().optional(),
})
type OrderValues = z.infer<typeof orderSchema>

function OrderTestDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  // Patient picker: list portal users, filter to PATIENT role.
  const { data: staff } = useStaff({ page: 1, limit: 100 })
  const patients = (staff?.data ?? []).filter((u) => u.role === Role.PATIENT)
  const order = useOrderTest()

  const form = useForm<OrderValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      patientId: "",
      testName: "",
      testCategory: TestCategory.BLOOD,
      notes: "",
    },
  })

  const onSubmit = async (values: OrderValues) => {
    try {
      await order.mutateAsync({
        patientId: values.patientId,
        testName: values.testName,
        testCategory: values.testCategory,
        notes: values.notes?.trim() || undefined,
      })
      toast.success("Test ordered")
      form.reset()
      onOpenChange(false)
    } catch (error) {
      toasts(error, "Couldn't order the test.")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FlaskConical className="size-5 text-primary" />
            Order pathology test
          </DialogTitle>
          <DialogDescription>
            Order a lab test for a patient. They will be notified automatically.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 px-1"
          autoComplete="off"
        >
          <Field
            label="Patient"
            required
            error={form.formState.errors.patientId?.message}
          >
            <Controller
              control={form.control}
              name="patientId"
              render={({ field }) => (
                <Select
                  value={field.value || NO_PATIENT}
                  onValueChange={(v) =>
                    field.onChange(v === NO_PATIENT ? "" : v)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a patient" />
                  </SelectTrigger>
                  <SelectContent>
                    {patients.length === 0 ? (
                      <SelectItem value={NO_PATIENT} disabled>
                        No patients found
                      </SelectItem>
                    ) : (
                      patients.map((p) => (
                        <SelectItem key={p._id} value={p._id}>
                          {p.name} — {p.email}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              )}
            />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Test name"
              required
              error={form.formState.errors.testName?.message}
            >
              <Input
                {...form.register("testName")}
                placeholder="e.g. Complete Blood Count"
              />
            </Field>
            <Field label="Category" required>
              <Controller
                control={form.control}
                name="testCategory"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORY_OPTIONS.map((c) => (
                        <SelectItem key={c} value={c}>
                          {CATEGORY_LABEL[c]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </Field>
          </div>

          <Field label="Clinical notes">
            <Textarea
              rows={2}
              {...form.register("notes")}
              placeholder="Optional — e.g. fasting required"
            />
          </Field>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={order.isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={order.isPending} className="gap-1.5">
              {order.isPending && (
                <Loader2 className="size-4 animate-spin" />
              )}
              Order test
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

/* ─── Add / edit result ──────────────────────────────────────────────── */

const resultSchema = z.object({
  resultSummary: z.string().optional(),
  status: z.nativeEnum(PathologyStatus),
  resultValues: z
    .array(
      z.object({
        parameter: z.string().min(1, "Required"),
        value: z.string().min(1, "Required"),
        referenceRange: z.string().optional(),
        flag: z.string().optional(),
      }),
    )
    .optional(),
})
type ResultValues = z.infer<typeof resultSchema>

function AddResultDialog({
  report,
  onOpenChange,
}: {
  report: PathologyReport | null
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Dialog open={!!report} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
        {report && (
          <AddResultForm
            key={report._id}
            report={report}
            onDone={() => onOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

function AddResultForm({
  report,
  onDone,
}: {
  report: PathologyReport
  onDone: () => void
}) {
  const addResult = useAddResult()

  const form = useForm<ResultValues>({
    resolver: zodResolver(resultSchema),
    defaultValues: {
      resultSummary: report.resultSummary ?? "",
      status: report.status ?? PathologyStatus.COMPLETED,
      resultValues:
        report.resultValues?.map((v) => ({
          parameter: v.parameter,
          value: v.value,
          referenceRange: v.referenceRange ?? "",
          flag: v.flag ?? "",
        })) ?? [],
    },
  })
  const values = useFieldArray({ control: form.control, name: "resultValues" })

  const onSubmit = async (data: ResultValues) => {
    try {
      await addResult.mutateAsync({
        id: report._id,
        body: {
          resultSummary: data.resultSummary?.trim() || undefined,
          status: data.status,
          resultValues:
            data.resultValues && data.resultValues.length > 0
              ? data.resultValues.map((v) => ({
                  parameter: v.parameter,
                  value: v.value,
                  referenceRange: v.referenceRange || undefined,
                  flag: (v.flag as ResultFlag) || undefined,
                }))
              : undefined,
        },
      })
      toast.success("Result saved")
      onDone()
    } catch (error) {
      toasts(error, "Couldn't save the result.")
    }
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Result — {report.testName}</DialogTitle>
        <DialogDescription>
          {patientName(report)} · record findings to complete this report.
        </DialogDescription>
      </DialogHeader>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 px-1"
        autoComplete="off"
      >
        <Field label="Summary">
          <Textarea
            rows={2}
            {...form.register("resultSummary")}
            placeholder="Overall findings, e.g. all values within normal range"
          />
        </Field>

        <Field label="Status">
          <Controller
            control={form.control}
            name="status"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="sm:w-56">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </Field>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Result values (optional)</Label>
          <div className="space-y-2">
            {values.fields.map((field, i) => (
              <div key={field.id} className="flex flex-wrap items-center gap-2">
                <Input
                  placeholder="Parameter"
                  className="min-w-32 flex-1"
                  {...form.register(`resultValues.${i}.parameter`)}
                />
                <Input
                  placeholder="Value"
                  className="w-24"
                  {...form.register(`resultValues.${i}.value`)}
                />
                <Input
                  placeholder="Reference"
                  className="w-32"
                  {...form.register(`resultValues.${i}.referenceRange`)}
                />
                <Controller
                  control={form.control}
                  name={`resultValues.${i}.flag`}
                  render={({ field }) => (
                    <Select
                      value={field.value || "none"}
                      onValueChange={(v) =>
                        field.onChange(v === "none" ? "" : v)
                      }
                    >
                      <SelectTrigger className="w-28">
                        <SelectValue placeholder="Flag" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">—</SelectItem>
                        <SelectItem value={ResultFlag.NORMAL}>Normal</SelectItem>
                        <SelectItem value={ResultFlag.HIGH}>High</SelectItem>
                        <SelectItem value={ResultFlag.LOW}>Low</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => values.remove(i)}
                  aria-label="Remove value"
                >
                  <Trash2 className="size-4 text-destructive" />
                </Button>
              </div>
            ))}
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={() =>
              values.append({
                parameter: "",
                value: "",
                referenceRange: "",
                flag: "",
              })
            }
          >
            <Plus className="size-4" /> Add value
          </Button>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onDone}
            disabled={addResult.isPending}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={addResult.isPending} className="gap-1.5">
            {addResult.isPending && (
              <Loader2 className="size-4 animate-spin" />
            )}
            Save result
          </Button>
        </DialogFooter>
      </form>
    </>
  )
}

/* ─── helpers ─────────────────────────────────────────────────────────── */

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string
  required?: boolean
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium">
        {label}
        {required && <span className="ml-0.5 text-destructive">*</span>}
      </Label>
      {children}
      {error && <p className="text-xs font-medium text-destructive">{error}</p>}
    </div>
  )
}
