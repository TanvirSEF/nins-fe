"use client"

import * as React from "react"
import Link from "next/link"
import { useDoctorDashboard } from "@/services/queries/useDoctorDashboardQuery"
import { StatCard } from "@/components/shared/StatCard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AppointmentStatus } from "@/types"
import { format, parseISO } from "date-fns"
import {
  Users,
  CheckCircle2,
  CalendarDays,
  Activity,
  ArrowRight,
  FileText,
  Pill,
} from "lucide-react"

const QUEUE_TONE: Record<AppointmentStatus, string> = {
  [AppointmentStatus.PENDING]: "bg-warning/15 text-warning",
  [AppointmentStatus.CONFIRMED]: "bg-success/15 text-success",
  [AppointmentStatus.COMPLETED]: "bg-primary/10 text-primary",
  [AppointmentStatus.CANCELLED]: "bg-muted text-muted-foreground",
}

export function DoctorDashboard() {
  const { data, isLoading, isError, refetch } = useDoctorDashboard()

  if (isLoading) return <DashboardSkeleton />
  if (isError || !data) {
    return (
      <div className="rounded-xl border border-dashed border-destructive/40 bg-destructive/5 p-8 text-center">
        <p className="text-sm text-muted-foreground">
          Couldn&apos;t load your dashboard.
        </p>
        <Button variant="outline" size="sm" className="mt-3" onClick={() => refetch()}>
          Try again
        </Button>
      </div>
    )
  }

  const { doctor, stats, todayQueue, recentRecords, recentPrescriptions } = data

  return (
    <div className="space-y-8">
      {/* Doctor header */}
      <div className="flex items-center gap-4">
        <Avatar className="size-14">
          {doctor.profilePicture ? (
            <AvatarImage src={doctor.profilePicture} alt={doctor.designation} />
          ) : null}
          <AvatarFallback className="bg-primary/10 text-primary">
            {(doctor.departmentName ?? "DR").slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground">
            {doctor.designation}
          </h1>
          <p className="text-sm text-muted-foreground">
            {doctor.departmentName ?? "Clinical Workspace"}
          </p>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={Users}
          label="Today's patients"
          value={stats.totalToday}
          hint={`${stats.pendingToday} pending`}
        />
        <StatCard
          icon={CheckCircle2}
          label="Completed today"
          value={stats.completedToday}
          tone="success"
        />
        <StatCard
          icon={CalendarDays}
          label="Upcoming this week"
          value={stats.upcomingThisWeek}
        />
        <StatCard
          icon={Activity}
          label="Total patients seen"
          value={stats.totalPatientsSeen}
          tone="default"
        />
      </div>

      {/* Today's queue preview */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-base font-bold text-foreground">
            Today&apos;s queue
          </h2>
          <Button asChild variant="outline" size="sm" className="gap-1.5">
            <Link href="/dashboard/doctor/queue">
              View full queue
              <ArrowRight className="size-3.5" />
            </Link>
          </Button>
        </div>
        {todayQueue.length === 0 ? (
          <p className="rounded-xl border border-dashed border-border py-10 text-center text-sm text-muted-foreground">
            No patients in today&apos;s queue.
          </p>
        ) : (
          <div className="space-y-2">
            {todayQueue.slice(0, 5).map((item) => (
              <Link
                key={item.appointmentId}
                href={`/dashboard/doctor/${item.appointmentId}`}
                className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3 transition-colors hover:border-primary/40 hover:bg-primary/5"
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 font-heading text-sm font-bold text-primary">
                    {item.serialNumber}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {item.patientName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Serial #{item.serialNumber}
                    </p>
                  </div>
                </div>
                <Badge className={QUEUE_TONE[item.status]}>
                  {item.status}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Recent activity */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <FileText className="size-4 text-primary" /> Recent records
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentRecords.length === 0 ? (
              <p className="text-sm text-muted-foreground">No records yet.</p>
            ) : (
              recentRecords.map((r) => (
                <div key={r._id} className="space-y-1 border-b border-border pb-2 last:border-0 last:pb-0">
                  <p className="text-sm font-medium text-foreground">
                    {r.patientId.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{r.chiefComplaint}</p>
                  <p className="text-[11px] text-muted-foreground">
                    {format(parseISO(r.createdAt), "dd MMM yyyy")}
                  </p>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Pill className="size-4 text-primary" /> Recent prescriptions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentPrescriptions.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No prescriptions yet.
              </p>
            ) : (
              recentPrescriptions.map((p) => (
                <div key={p._id} className="space-y-1 border-b border-border pb-2 last:border-0 last:pb-0">
                  <p className="text-sm font-medium text-foreground">
                    {p.patientId.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {p.medicines.length}{" "}
                    {p.medicines.length === 1 ? "medicine" : "medicines"}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {format(parseISO(p.createdAt), "dd MMM yyyy")}
                  </p>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Skeleton className="size-14 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-28" />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-24 w-full rounded-xl" />
        ))}
      </div>
      <Skeleton className="h-64 w-full rounded-xl" />
    </div>
  )
}
