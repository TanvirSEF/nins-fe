"use client"

import * as React from "react"
import { useDashboardStats } from "@/services/queries/useDashboardQuery"
import { useUpdateAppointmentStatus } from "@/services/queries/useAppointmentQuery"
import { ApiError } from "@/lib/api-client"
import { AppointmentStatus } from "@/types"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DirectoryError } from "@/components/shared/DepartmentsDirectory"
import { toast } from "sonner"
import { format, parseISO } from "date-fns"
import { Loader2 } from "lucide-react"

const STATUS_OPTIONS: AppointmentStatus[] = [
  AppointmentStatus.PENDING,
  AppointmentStatus.CONFIRMED,
  AppointmentStatus.COMPLETED,
  AppointmentStatus.CANCELLED,
]

export function AppointmentsManagement() {
  const { data, isLoading, isError, refetch } = useDashboardStats()
  const update = useUpdateAppointmentStatus()
  const [pendingId, setPendingId] = React.useState<string>()

  const onChange = async (id: string, status: AppointmentStatus) => {
    setPendingId(id)
    try {
      await update.mutateAsync({ id, status })
      toast.success(`Appointment marked ${status}`)
    } catch (error) {
      const msgs =
        error instanceof ApiError
          ? error.messages
          : ["Couldn't update the appointment."]
      msgs.forEach((m) => toast.error(m))
    } finally {
      setPendingId(undefined)
    }
  }

  const recent = data?.recentAppointments ?? []

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent appointments</CardTitle>
          <CardDescription>
            Shows the 10 most recent bookings. Change a status to confirm,
            complete, or cancel — the patient is notified automatically.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-64 w-full rounded-xl" />
          ) : isError ? (
            <DirectoryError onRetry={refetch} />
          ) : recent.length === 0 ? (
            <p className="py-10 text-center text-sm text-muted-foreground">
              No appointments yet.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Serial</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Consultant</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="w-44">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recent.map((a) => {
                    const busy = pendingId === a.id
                    return (
                      <TableRow key={a.id}>
                        <TableCell className="font-mono font-medium">
                          #{a.serialNumber}
                        </TableCell>
                        <TableCell className="font-medium">
                          {a.patientName}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {a.doctorName}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {format(parseISO(a.date), "dd MMM yyyy")}
                        </TableCell>
                        <TableCell>
                          <Select
                            value={a.status}
                            disabled={busy}
                            onValueChange={(v) =>
                              onChange(a.id, v as AppointmentStatus)
                            }
                          >
                            <SelectTrigger className="w-full">
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
                          {busy && (
                            <Loader2 className="mt-1 size-3 animate-spin text-muted-foreground" />
                          )}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
