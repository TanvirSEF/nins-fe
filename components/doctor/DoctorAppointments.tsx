"use client"

import * as React from "react"
import Link from "next/link"
import { format, isValid, parseISO } from "date-fns"
import { useDoctorDashboard } from "@/services/queries/useDoctorDashboardQuery"
import { useMyDoctorAppointments } from "@/services/queries/useAppointmentQuery"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"
import { AppointmentStatus, User } from "@/types"
import { DirectoryError } from "@/components/shared/DepartmentsDirectory"
import { CalendarDays, X } from "lucide-react"

const STATUS_TONE: Record<AppointmentStatus, string> = {
  [AppointmentStatus.PENDING]: "bg-warning/15 text-warning",
  [AppointmentStatus.CONFIRMED]: "bg-success/15 text-success",
  [AppointmentStatus.COMPLETED]: "bg-primary/10 text-primary",
  [AppointmentStatus.CANCELLED]: "bg-muted text-muted-foreground",
}

function patientName(patientId: string | User): string {
  return typeof patientId === "object" ? patientId.name : "Patient"
}

/**
 * A doctor's full appointment history (every date), complementing the
 * today-only `DoctorQueue`. An optional date filter scopes the list; each row
 * opens the consultation workspace.
 */
export function DoctorAppointments() {
  const { data: dash } = useDoctorDashboard()
  const doctorId = dash?.doctor.id
  const [date, setDate] = React.useState("")

  const { data, isLoading, isError, refetch } = useMyDoctorAppointments(
    doctorId,
    date || undefined,
  )

  const appointments = data?.appointments ?? []

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        All your appointments across every date. Filter to a specific day, or
        open a patient to record vitals and prescribe.
      </p>

      <div className="flex flex-wrap items-end gap-3">
        <div className="space-y-1.5">
          <label
            htmlFor="date-filter"
            className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground"
          >
            <CalendarDays className="size-3.5" />
            Filter by date
          </label>
          <Input
            id="date-filter"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-auto"
          />
        </div>
        {date && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setDate("")}
          >
            <X />
            Clear
          </Button>
        )}
        {data && (
          <span className="ml-auto text-sm text-muted-foreground">
            {appointments.length} appointment
            {appointments.length === 1 ? "" : "s"}
          </span>
        )}
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-full rounded-xl" />
          ))}
        </div>
      ) : isError ? (
        <DirectoryError onRetry={refetch} />
      ) : appointments.length > 0 ? (
        <div className="space-y-2">
          {appointments.map((appt) => {
            const apptDate = parseISO(String(appt.appointmentDate))
            return (
              <Card key={appt._id} className="py-0">
                <Link
                  href={`/dashboard/doctor/${appt._id}`}
                  className="block"
                >
                  <CardContent className="flex items-center justify-between gap-4 py-3 transition-colors hover:bg-primary/5">
                    <div className="flex items-center gap-3">
                      <span className="flex size-11 shrink-0 flex-col items-center justify-center rounded-lg bg-primary/10">
                        <span className="text-[9px] font-semibold tracking-wide text-muted-foreground uppercase">
                          Serial
                        </span>
                        <span className="font-heading text-lg font-extrabold leading-none text-primary">
                          {appt.serialNumber}
                        </span>
                      </span>
                      <div className="min-w-0 space-y-1">
                        <p className="font-heading text-sm font-bold text-foreground">
                          {patientName(appt.patientId)}
                        </p>
                        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <CalendarDays className="size-3" />
                          {isValid(apptDate)
                            ? format(apptDate, "d MMM yyyy")
                            : "—"}
                        </p>
                      </div>
                    </div>
                    <Badge className={STATUS_TONE[appt.status]}>
                      {appt.status}
                    </Badge>
                  </CardContent>
                </Link>
              </Card>
            )
          })}
        </div>
      ) : (
        <p className="rounded-xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
          {date
            ? "No appointments on the selected date."
            : "You have no appointments."}
        </p>
      )}
    </div>
  )
}
