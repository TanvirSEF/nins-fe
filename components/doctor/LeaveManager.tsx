"use client"

import * as React from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { format, isValid, parseISO } from "date-fns"
import {
  useMyLeaves,
  useCreateLeave,
  useUpdateLeave,
  useCancelLeave,
} from "@/services/queries/useLeaveQuery"
import { ApiError } from "@/lib/api-client"
import { Leave, LeaveStatus, LeaveType } from "@/types"
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
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { CalendarDays, Loader2, Pencil, Plus, X } from "lucide-react"

const LIMIT = 10
const ALL = "all"

const STATUS_TONE: Record<LeaveStatus, string> = {
  [LeaveStatus.PENDING]: "bg-warning/15 text-warning",
  [LeaveStatus.APPROVED]: "bg-success/15 text-success",
  [LeaveStatus.REJECTED]: "bg-destructive/10 text-destructive",
  [LeaveStatus.CANCELLED]: "bg-muted text-muted-foreground",
}

const TYPE_LABEL: Record<LeaveType, string> = {
  [LeaveType.CASUAL]: "Casual",
  [LeaveType.SICK]: "Sick",
  [LeaveType.EMERGENCY]: "Emergency",
  [LeaveType.PLANNED]: "Planned",
}

const TYPE_OPTIONS = [
  LeaveType.CASUAL,
  LeaveType.SICK,
  LeaveType.EMERGENCY,
  LeaveType.PLANNED,
] as const

function toasts(error: unknown, fallback: string) {
  const msgs = error instanceof ApiError ? error.messages : [fallback]
  msgs.forEach((m) => toast.error(m))
}

function dateRange(start?: string, end?: string): string {
  if (!start || !end) return "—"
  const s = parseISO(start)
  const e = parseISO(end)
  if (!isValid(s) || !isValid(e)) return "—"
  return format(s, "d MMM yyyy") === format(e, "d MMM yyyy")
    ? format(s, "EEE, d MMM yyyy")
    : `${format(s, "d MMM yyyy")} – ${format(e, "d MMM yyyy")}`
}

export function LeaveManager() {
  const [page, setPage] = React.useState(1)
  const [status, setStatus] = React.useState<LeaveStatus | undefined>()
  const [formOpen, setFormOpen] = React.useState(false)
  const [editing, setEditing] = React.useState<Leave | null>(null)
  const [cancelling, setCancelling] = React.useState<Leave | null>(null)

  const { data, isLoading, isError, refetch } = useMyLeaves({
    page,
    limit: LIMIT,
    status,
  })
  const cancelMut = useCancelLeave()

  const onStatusChange = (v: string) => {
    setStatus(v === ALL ? undefined : (v as LeaveStatus))
    setPage(1)
  }

  const openCreate = () => {
    setEditing(null)
    setFormOpen(true)
  }
  const openEdit = (l: Leave) => {
    setEditing(l)
    setFormOpen(true)
  }

  const confirmCancel = async () => {
    if (!cancelling) return
    try {
      await cancelMut.mutateAsync(cancelling._id)
      toast.success("Leave request cancelled")
      setCancelling(null)
    } catch (error) {
      toasts(error, "Couldn't cancel the leave request.")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          Request time off and track approval. Approved leave blocks new
          bookings on those dates.
        </p>
        <Button onClick={openCreate} className="gap-1.5">
          <Plus className="size-4" /> Request leave
        </Button>
      </div>

      <Select value={status ?? ALL} onValueChange={onStatusChange}>
        <SelectTrigger className="w-full sm:w-56">
          <SelectValue placeholder="All statuses" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL}>All statuses</SelectItem>
          <SelectItem value={LeaveStatus.PENDING}>Pending</SelectItem>
          <SelectItem value={LeaveStatus.APPROVED}>Approved</SelectItem>
          <SelectItem value={LeaveStatus.REJECTED}>Rejected</SelectItem>
          <SelectItem value={LeaveStatus.CANCELLED}>Cancelled</SelectItem>
        </SelectContent>
      </Select>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-28 w-full rounded-2xl" />
          ))}
        </div>
      ) : isError ? (
        <DirectoryError onRetry={refetch} />
      ) : data && data.data.length > 0 ? (
        <>
          <div className="space-y-3">
            {data.data.map((l) => (
              <LeaveCard
                key={l._id}
                leave={l}
                onEdit={() => openEdit(l)}
                onCancel={() => setCancelling(l)}
              />
            ))}
          </div>
          <Pagination page={page} meta={data.meta} onPageChange={setPage} />
        </>
      ) : (
        <p className="rounded-xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
          No leave requests {status ? `with status "${status}"` : ""} yet.
        </p>
      )}

      <LeaveFormDialog
        open={formOpen}
        leave={editing}
        onOpenChange={setFormOpen}
      />

      <Dialog
        open={!!cancelling}
        onOpenChange={(o) => !o && setCancelling(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel this leave request?</DialogTitle>
            <DialogDescription>
              {cancelling
                ? `${TYPE_LABEL[cancelling.type]} leave on ${dateRange(
                    cancelling.startDate,
                    cancelling.endDate,
                  )}. This action can't be undone.`
                : ""}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Keep it</Button>
            </DialogClose>
            <Button
              variant="destructive"
              onClick={confirmCancel}
              disabled={cancelMut.isPending}
            >
              {cancelMut.isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Cancelling…
                </>
              ) : (
                "Yes, cancel"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function LeaveCard({
  leave,
  onEdit,
  onCancel,
}: {
  leave: Leave
  onEdit: () => void
  onCancel: () => void
}) {
  const canEdit = leave.status === LeaveStatus.PENDING
  const canCancel =
    leave.status === LeaveStatus.PENDING ||
    leave.status === LeaveStatus.APPROVED
  const reviewedAt = leave.reviewedAt ? parseISO(leave.reviewedAt) : null

  return (
    <Card>
      <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex size-14 shrink-0 flex-col items-center justify-center rounded-xl bg-primary/10 text-primary">
            <CalendarDays className="size-5" />
          </div>
          <div className="min-w-0 space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-heading text-sm font-bold text-foreground">
                {dateRange(leave.startDate, leave.endDate)}
              </span>
              <Badge variant="secondary">{TYPE_LABEL[leave.type]}</Badge>
              <Badge className={STATUS_TONE[leave.status]}>
                {leave.status}
              </Badge>
            </div>
            <p className="truncate text-xs text-muted-foreground">
              {leave.reason}
            </p>
            {leave.status === LeaveStatus.REJECTED &&
              leave.rejectionReason && (
                <p className="text-xs font-medium text-destructive">
                  Rejected: {leave.rejectionReason}
                </p>
              )}
            {reviewedAt && isValid(reviewedAt) && (
              <p className="text-[11px] text-muted-foreground">
                Reviewed {format(reviewedAt, "d MMM yyyy")}
              </p>
            )}
          </div>
        </div>

        {(canEdit || canCancel) && (
          <div className="flex shrink-0 gap-2">
            {canEdit && (
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5"
                onClick={onEdit}
              >
                <Pencil className="size-3.5" />
                Edit
              </Button>
            )}
            {canCancel && (
              <Button
                variant="ghost"
                size="sm"
                className="gap-1.5 text-destructive hover:bg-destructive/10 hover:text-destructive"
                onClick={onCancel}
              >
                <X className="size-3.5" />
                Cancel
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

/* Create / Edit form */

const schema = z
  .object({
    type: z.nativeEnum(LeaveType),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
    reason: z.string().trim().min(3, "Please enter a brief reason"),
  })
  .refine((d) => d.endDate >= d.startDate, {
    message: "End date can't be before the start date",
    path: ["endDate"],
  })
type FormValues = z.infer<typeof schema>

function LeaveFormDialog({
  open,
  leave,
  onOpenChange,
}: {
  open: boolean
  leave: Leave | null
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        {open && (
          <LeaveForm
            key={leave?._id ?? "new"}
            leave={leave}
            onDone={() => onOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

function LeaveForm({ leave, onDone }: { leave: Leave | null; onDone: () => void }) {
  const create = useCreateLeave()
  const update = useUpdateLeave()
  const isEdit = !!leave

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      type: leave?.type ?? LeaveType.CASUAL,
      startDate: leave?.startDate?.slice(0, 10) ?? "",
      endDate: leave?.endDate?.slice(0, 10) ?? "",
      reason: leave?.reason ?? "",
    },
  })

  const onSubmit = async (values: FormValues) => {
    try {
      if (isEdit && leave) {
        await update.mutateAsync({ id: leave._id, body: values })
        toast.success("Leave request updated")
      } else {
        await create.mutateAsync(values)
        toast.success("Leave request submitted")
      }
      onDone()
    } catch (error) {
      toasts(error, "Couldn't save the leave request.")
    }
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <CalendarDays className="size-5 text-primary" />
          {isEdit ? "Edit leave request" : "Request leave"}
        </DialogTitle>
        <DialogDescription>
          {isEdit
            ? "Update your pending request. Only pending requests can be edited."
            : "Submit a leave request for admin approval."}
        </DialogDescription>
      </DialogHeader>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 px-1"
        autoComplete="off"
      >
        <Field
          label="Leave type"
          required
          error={form.formState.errors.type?.message}
        >
          <Controller
            control={form.control}
            name="type"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TYPE_OPTIONS.map((t) => (
                    <SelectItem key={t} value={t}>
                      {TYPE_LABEL[t]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Start date"
            required
            error={form.formState.errors.startDate?.message}
          >
            <Input type="date" {...form.register("startDate")} />
          </Field>
          <Field
            label="End date"
            required
            error={form.formState.errors.endDate?.message}
          >
            <Input type="date" {...form.register("endDate")} />
          </Field>
        </div>

        <Field
          label="Reason"
          required
          error={form.formState.errors.reason?.message}
        >
          <Textarea
            rows={3}
            {...form.register("reason")}
            placeholder="Briefly describe the reason for your leave"
          />
        </Field>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onDone}
            disabled={create.isPending || update.isPending}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={create.isPending || update.isPending}
            className="gap-1.5"
          >
            {(create.isPending || update.isPending) && (
              <Loader2 className="size-4 animate-spin" />
            )}
            {isEdit ? "Save changes" : "Submit request"}
          </Button>
        </DialogFooter>
      </form>
    </>
  )
}

/* helpers */

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
