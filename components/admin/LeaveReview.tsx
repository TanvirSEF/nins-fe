"use client"

import * as React from "react"
import { format, isValid, parseISO } from "date-fns"
import { useAllLeaves, useReviewLeave } from "@/services/queries/useLeaveQuery"
import { ApiError } from "@/lib/api-client"
import {
  DoctorProfile,
  Leave,
  LeaveStatus,
  LeaveType,
  User,
} from "@/types"
import { Pagination } from "@/components/shared/Pagination"
import { DirectoryError } from "@/components/shared/DepartmentsDirectory"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ConfirmDialog } from "./ConfirmDialog"
import { toast } from "sonner"
import { Check, Loader2, X } from "lucide-react"

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

function toasts(error: unknown, fallback: string) {
  const msgs = error instanceof ApiError ? error.messages : [fallback]
  msgs.forEach((m) => toast.error(m))
}

function doctorName(l: Leave): string {
  return typeof l.doctorUserId === "object" && l.doctorUserId !== null
    ? (l.doctorUserId as User).name
    : "Doctor"
}
function designationOf(l: Leave): string {
  return typeof l.doctorId === "object" && l.doctorId !== null
    ? (l.doctorId as DoctorProfile).designation
    : ""
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

export function LeaveReview() {
  const [page, setPage] = React.useState(1)
  const [status, setStatus] = React.useState<LeaveStatus | undefined>()
  const [type, setType] = React.useState<LeaveType | undefined>()
  const [approving, setApproving] = React.useState<Leave | null>(null)
  const [rejecting, setRejecting] = React.useState<Leave | null>(null)
  const [rejectionReason, setRejectionReason] = React.useState("")

  const { data, isLoading, isError, refetch } = useAllLeaves({
    page,
    limit: LIMIT,
    status,
    type,
  })
  const reviewMut = useReviewLeave()

  const onStatusChange = (v: string) => {
    setStatus(v === ALL ? undefined : (v as LeaveStatus))
    setPage(1)
  }
  const onTypeChange = (v: string) => {
    setType(v === ALL ? undefined : (v as LeaveType))
    setPage(1)
  }

  const confirmApprove = async () => {
    if (!approving) return
    try {
      await reviewMut.mutateAsync({
        id: approving._id,
        body: { status: LeaveStatus.APPROVED },
      })
      toast.success("Leave approved")
      setApproving(null)
    } catch (error) {
      toasts(error, "Couldn't approve the leave request.")
    }
  }

  const openReject = (l: Leave) => {
    setRejecting(l)
    setRejectionReason("")
  }

  const confirmReject = async () => {
    if (!rejecting) return
    const reason = rejectionReason.trim()
    if (!reason) {
      toast.error("Please enter a rejection reason.")
      return
    }
    try {
      await reviewMut.mutateAsync({
        id: rejecting._id,
        body: { status: LeaveStatus.REJECTED, rejectionReason: reason },
      })
      toast.success("Leave rejected")
      setRejecting(null)
      setRejectionReason("")
    } catch (error) {
      toasts(error, "Couldn't reject the leave request.")
    }
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Review doctor leave requests. Approving auto-cancels any conflicting
        appointments and notifies affected patients.
      </p>

      <div className="flex flex-wrap gap-3">
        <Select value={status ?? ALL} onValueChange={onStatusChange}>
          <SelectTrigger className="w-full sm:w-48">
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

        <Select value={type ?? ALL} onValueChange={onTypeChange}>
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue placeholder="All types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All types</SelectItem>
            <SelectItem value={LeaveType.CASUAL}>Casual</SelectItem>
            <SelectItem value={LeaveType.SICK}>Sick</SelectItem>
            <SelectItem value={LeaveType.EMERGENCY}>Emergency</SelectItem>
            <SelectItem value={LeaveType.PLANNED}>Planned</SelectItem>
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
                  <TableHead>Doctor</TableHead>
                  <TableHead className="w-32">Type</TableHead>
                  <TableHead className="w-48">Dates</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead className="w-32">Status</TableHead>
                  <TableHead className="w-44 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.data.map((l) => {
                  const isPending = l.status === LeaveStatus.PENDING
                  return (
                    <TableRow key={l._id}>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium text-foreground">
                            {doctorName(l)}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {designationOf(l) || "Consultant"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {TYPE_LABEL[l.type]}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {dateRange(l.startDate, l.endDate)}
                      </TableCell>
                      <TableCell className="max-w-xs truncate text-muted-foreground">
                        {l.reason}
                      </TableCell>
                      <TableCell>
                        <Badge className={STATUS_TONE[l.status]}>
                          {l.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {isPending ? (
                          <div className="flex justify-end gap-1">
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-1.5"
                              onClick={() => setApproving(l)}
                              disabled={reviewMut.isPending}
                            >
                              <Check className="size-3.5" />
                              Approve
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="gap-1.5 text-destructive hover:bg-destructive/10 hover:text-destructive"
                              onClick={() => openReject(l)}
                              disabled={reviewMut.isPending}
                            >
                              <X className="size-3.5" />
                              Reject
                            </Button>
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground">
                            Reviewed
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          ) : (
            <p className="py-16 text-center text-sm text-muted-foreground">
              No leave requests {status ? `with status "${status}"` : ""}.
            </p>
          )}
        </CardContent>
      </Card>

      {data && data.data.length > 0 && (
        <Pagination page={page} meta={data.meta} onPageChange={setPage} />
      )}

      <ConfirmDialog
        open={!!approving}
        onOpenChange={(o) => !o && setApproving(null)}
        title="Approve this leave request?"
        description={
          approving
            ? `${doctorName(approving)} — ${dateRange(
                approving.startDate,
                approving.endDate,
              )}. Any confirmed/pending appointments in this range will be auto-cancelled and patients notified.`
            : ""
        }
        confirmLabel="Approve"
        destructive={false}
        onConfirm={confirmApprove}
        loading={reviewMut.isPending}
      />

      <Dialog
        open={!!rejecting}
        onOpenChange={(o) => !o && setRejecting(null)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Reject leave request?</DialogTitle>
            <DialogDescription>
              {rejecting
                ? `${doctorName(rejecting)} — ${dateRange(
                    rejecting.startDate,
                    rejecting.endDate,
                  )}. A reason is required.`
                : ""}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-1.5 px-1">
            <Label htmlFor="rejection-reason" className="text-sm font-medium">
              Rejection reason
            </Label>
            <Textarea
              id="rejection-reason"
              rows={3}
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="e.g. Insufficient staffing on these dates"
              autoFocus
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              variant="destructive"
              onClick={confirmReject}
              disabled={
                reviewMut.isPending || rejectionReason.trim().length === 0
              }
              className="gap-1.5"
            >
              {reviewMut.isPending && (
                <Loader2 className="size-4 animate-spin" />
              )}
              Reject request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
