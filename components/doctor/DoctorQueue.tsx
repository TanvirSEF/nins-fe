"use client"

import * as React from "react"
import Link from "next/link"
import { useTodayQueue } from "@/services/queries/useDoctorDashboardQuery"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"
import { AppointmentStatus } from "@/types"
import { DirectoryError } from "@/components/shared/DepartmentsDirectory"
import { Phone } from "lucide-react"

const QUEUE_TONE: Record<AppointmentStatus, string> = {
  [AppointmentStatus.PENDING]: "bg-warning/15 text-warning",
  [AppointmentStatus.CONFIRMED]: "bg-success/15 text-success",
  [AppointmentStatus.COMPLETED]: "bg-primary/10 text-primary",
  [AppointmentStatus.CANCELLED]: "bg-muted text-muted-foreground",
}

export function DoctorQueue() {
  const { data, isLoading, isError, refetch } = useTodayQueue()

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Today&apos;s appointments, ordered by serial number. Open a patient to
        record vitals, notes, and prescribe.
      </p>

      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-full rounded-xl" />
          ))}
        </div>
      ) : isError ? (
        <DirectoryError onRetry={refetch} />
      ) : data && data.length > 0 ? (
        <div className="space-y-2">
          {data.map((item) => (
            <Card key={item.appointmentId} className="py-0">
              <Link
                href={`/dashboard/doctor/${item.appointmentId}`}
                className="block"
              >
                <CardContent className="flex items-center justify-between gap-4 py-3 transition-colors hover:bg-primary/5">
                  <div className="flex items-center gap-3">
                    <span className="flex size-11 shrink-0 flex-col items-center justify-center rounded-lg bg-primary/10">
                      <span className="text-[9px] font-semibold uppercase tracking-wide text-muted-foreground">
                        Serial
                      </span>
                      <span className="font-heading text-lg font-extrabold leading-none text-primary">
                        {item.serialNumber}
                      </span>
                    </span>
                    <div className="min-w-0 space-y-1">
                      <p className="font-heading text-sm font-bold text-foreground">
                        {item.patientName}
                      </p>
                      {item.patientPhone && (
                        <p className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Phone className="size-3" />
                          {item.patientPhone}
                        </p>
                      )}
                    </div>
                  </div>
                  <Badge
                    className={
                      item.status === AppointmentStatus.COMPLETED
                        ? `${QUEUE_TONE[item.status]} line-through`
                        : QUEUE_TONE[item.status]
                    }
                  >
                    {item.status}
                  </Badge>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      ) : (
        <p className="rounded-xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
          No patients in today&apos;s queue. New bookings will appear here.
        </p>
      )}
    </div>
  )
}
