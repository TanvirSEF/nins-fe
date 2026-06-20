"use client"

import * as React from "react"
import {
  useMyTickets,
  useCancelAppointment,
} from "@/services/queries/useAppointmentQuery"
import { downloadTicket } from "@/lib/ticket"
import { ApiError } from "@/lib/api-client"
import {
  Appointment,
  AppointmentStatus,
  DoctorProfile,
  Schedule,
} from "@/types"
import { Pagination } from "@/components/shared/Pagination"
import { DirectoryError } from "@/components/shared/DepartmentsDirectory"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { format, parseISO } from "date-fns"
import { Download, X, Loader2 } from "lucide-react"

const LIMIT = 10
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const ALL = "all"

function scheduleOf(a: Appointment): Schedule | undefined {
  return typeof a.scheduleId === "object" ? a.scheduleId : undefined
}

function designationOf(a: Appointment): string {
  return typeof a.doctorId === "object"
    ? (a.doctorId as DoctorProfile).designation
    : ""
}

const STATUS_TONE: Record<AppointmentStatus, string> = {
  [AppointmentStatus.CONFIRMED]: "bg-success/15 text-success",
  [AppointmentStatus.PENDING]: "bg-warning/15 text-warning",
  [AppointmentStatus.CANCELLED]: "bg-destructive/10 text-destructive",
  [AppointmentStatus.COMPLETED]: "bg-primary/10 text-primary",
}

export function TicketsDirectory() {
  const [page, setPage] = React.useState(1)
  const [status, setStatus] = React.useState<AppointmentStatus | undefined>()
  const [cancelling, setCancelling] = React.useState<Appointment | null>(null)
  const [downloadingId, setDownloadingId] = React.useState<string | null>(null)

  const { data, isLoading, isError, refetch } = useMyTickets({
    page,
    limit: LIMIT,
    status,
  })
  const cancelMut = useCancelAppointment()

  const onStatusChange = (v: string) => {
    setStatus(v === ALL ? undefined : (v as AppointmentStatus))
    setPage(1)
  }

  const handleDownload = async (id: string) => {
    setDownloadingId(id)
    try {
      await downloadTicket(id)
      toast.success("Ticket downloaded")
    } catch (error) {
      const messages =
        error instanceof ApiError
          ? error.messages
          : ["Couldn't download the ticket."]
      messages.forEach((m) => toast.error(m))
    } finally {
      setDownloadingId(null)
    }
  }

  const confirmCancel = async () => {
    if (!cancelling) return
    try {
      await cancelMut.mutateAsync(cancelling._id)
      toast.success("Appointment cancelled")
      setCancelling(null)
    } catch (error) {
      const messages =
        error instanceof ApiError ? error.messages : ["Couldn't cancel."]
      messages.forEach((m) => toast.error(m))
    }
  }

  return (
    <div className="space-y-6">
      <Select value={status ?? ALL} onValueChange={onStatusChange}>
        <SelectTrigger className="w-full sm:w-56">
          <SelectValue placeholder="All statuses" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL}>All statuses</SelectItem>
          <SelectItem value={AppointmentStatus.PENDING}>Pending</SelectItem>
          <SelectItem value={AppointmentStatus.CONFIRMED}>Confirmed</SelectItem>
          <SelectItem value={AppointmentStatus.COMPLETED}>Completed</SelectItem>
          <SelectItem value={AppointmentStatus.CANCELLED}>Cancelled</SelectItem>
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
            {data.data.map((a) => (
              <TicketCard
                key={a._id}
                appointment={a}
                onCancel={() => setCancelling(a)}
                onDownload={() => handleDownload(a._id)}
                downloading={downloadingId === a._id}
              />
            ))}
          </div>
          <Pagination page={page} meta={data.meta} onPageChange={setPage} />
        </>
      ) : (
        <p className="rounded-xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
          No appointments {status ? `with status "${status}"` : ""} yet.
        </p>
      )}

      <Dialog open={!!cancelling} onOpenChange={(o) => !o && setCancelling(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel this appointment?</DialogTitle>
            <DialogDescription>
              {cancelling
                ? `Serial #${cancelling.serialNumber} on ${format(parseISO(cancelling.appointmentDate), "EEE, dd MMM yyyy")}. This action can't be undone.`
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

function TicketCard({
  appointment,
  onCancel,
  onDownload,
  downloading,
}: {
  appointment: Appointment
  onCancel: () => void
  onDownload: () => void
  downloading: boolean
}) {
  const sched = scheduleOf(appointment)
  const cancellable =
    appointment.status === AppointmentStatus.PENDING ||
    appointment.status === AppointmentStatus.CONFIRMED

  return (
    <Card>
      <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex size-14 shrink-0 flex-col items-center justify-center rounded-xl bg-primary/10">
            <span className="text-[9px] font-semibold uppercase tracking-wide text-muted-foreground">
              Serial
            </span>
            <span className="font-heading text-xl font-extrabold leading-none text-primary">
              {appointment.serialNumber}
            </span>
          </div>
          <div className="min-w-0 space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-heading text-sm font-bold text-foreground">
                {format(parseISO(appointment.appointmentDate), "EEE, dd MMM yyyy")}
              </span>
              <Badge className={STATUS_TONE[appointment.status]}>
                {appointment.status}
              </Badge>
            </div>
            <p className="truncate text-xs text-muted-foreground">
              {designationOf(appointment) || "Consultant"}
              {sched &&
                ` · ${WEEKDAYS[sched.dayOfWeek]} ${sched.startTime}–${sched.endTime}`}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 gap-2">
          {appointment.status === AppointmentStatus.CONFIRMED && (
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5"
              onClick={onDownload}
              disabled={downloading}
            >
              {downloading ? (
                <Loader2 className="size-3.5 animate-spin" />
              ) : (
                <Download className="size-3.5" />
              )}
              Ticket
            </Button>
          )}
          {cancellable && (
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
      </CardContent>
    </Card>
  )
}
