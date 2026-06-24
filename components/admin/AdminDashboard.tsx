"use client"

import * as React from "react"
import Link from "next/link"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts"
import { useDashboardStats } from "@/services/queries/useDashboardQuery"
import { StatCard } from "@/components/shared/StatCard"
import type { ChartConfig } from "@/components/ui/chart"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { AppointmentStatus } from "@/types"
import { format, parseISO } from "date-fns"
import {
  CalendarCheck,
  CheckCircle2,
  Users,
  Stethoscope,
  ArrowRight,
} from "lucide-react"

const STATUS_TONE: Record<AppointmentStatus, string> = {
  [AppointmentStatus.PENDING]: "bg-warning/15 text-warning",
  [AppointmentStatus.CONFIRMED]: "bg-success/15 text-success",
  [AppointmentStatus.COMPLETED]: "bg-primary/10 text-primary",
  [AppointmentStatus.CANCELLED]: "bg-muted text-muted-foreground",
}

const trendConfig = {
  total: { label: "Total", color: "var(--chart-1)" },
  completed: { label: "Completed", color: "var(--chart-2)" },
} satisfies ChartConfig

const deptConfig = {
  count: { label: "Appointments", color: "var(--chart-1)" },
} satisfies ChartConfig

export function AdminDashboard() {
  const { data, isLoading, isError, refetch } = useDashboardStats()

  if (isLoading) return <AdminSkeleton />
  if (isError || !data) {
    return (
      <div className="rounded-xl border border-dashed border-destructive/40 bg-destructive/5 p-8 text-center">
        <p className="text-sm text-muted-foreground">
          Couldn&apos;t load dashboard statistics.
        </p>
        <Button variant="outline" size="sm" className="mt-3" onClick={() => refetch()}>
          Try again
        </Button>
      </div>
    )
  }

  const { overview, bedStatus, appointmentTrends, topDepartments, recentAppointments } =
    data

  return (
    <div className="space-y-6">
      {/* Overview stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={CalendarCheck}
          label="Today's appointments"
          value={overview.todayAppointments}
          hint={`${overview.todayCompleted} completed · ${overview.todayCancelled} cancelled`}
        />
        <StatCard
          icon={Users}
          label="Total patients"
          value={overview.totalPatients}
        />
        <StatCard
          icon={Stethoscope}
          label="Doctors"
          value={overview.totalDoctors}
          hint={`${overview.totalDepartments} departments`}
        />
        <StatCard
          icon={CheckCircle2}
          label="Total appointments"
          value={overview.totalAppointments}
          tone="success"
        />
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-sm">Appointments · last 7 days</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={trendConfig} className="h-[240px] w-full">
              <AreaChart data={appointmentTrends}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(d) => format(parseISO(d), "dd MMM")}
                />
                <YAxis width={28} tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  dataKey="total"
                  type="monotone"
                  stroke="var(--color-total)"
                  fill="var(--color-total)"
                  fillOpacity={0.15}
                  strokeWidth={2}
                />
                <Area
                  dataKey="completed"
                  type="monotone"
                  stroke="var(--color-completed)"
                  fill="var(--color-completed)"
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm">Top departments</CardTitle>
          </CardHeader>
          <CardContent>
            {topDepartments.length === 0 ? (
              <p className="py-12 text-center text-sm text-muted-foreground">
                No data yet.
              </p>
            ) : (
              <ChartContainer config={deptConfig} className="h-[240px] w-full">
                <BarChart data={topDepartments} layout="vertical">
                  <CartesianGrid horizontal={false} />
                  <XAxis type="number" hide />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={110}
                    tickLine={false}
                    axisLine={false}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar
                    dataKey="appointmentCount"
                    fill="var(--color-count)"
                    radius={4}
                  />
                </BarChart>
              </ChartContainer>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Bed status */}
      <div className="grid gap-4 sm:grid-cols-2">
        <BedStatusCard label="ICU" stats={bedStatus.icu} />
        <BedStatusCard label="HDU" stats={bedStatus.hdu} />
      </div>

      {/* Recent appointments */}
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="text-sm">Recent appointments</CardTitle>
          <Button asChild variant="ghost" size="sm" className="gap-1">
            <Link href="/dashboard/admin/appointments">
              Manage
              <ArrowRight className="size-3.5" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          {recentAppointments.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
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
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentAppointments.map((a) => (
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
                      <TableCell className="text-right">
                        <Badge className={STATUS_TONE[a.status]}>
                          {a.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function BedStatusCard({
  label,
  stats,
}: {
  label: string
  stats: { total: number; occupied: number; available: number }
}) {
  const pct = stats.total > 0 ? Math.round((stats.available / stats.total) * 100) : 0
  return (
    <Card>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-heading text-sm font-semibold">{label}</span>
          <Badge variant="secondary">{stats.available} vacant</Badge>
        </div>
        <div className="font-heading text-2xl font-bold text-foreground">
          {stats.available}
          <span className="text-base font-normal text-muted-foreground">
            {" "}
            / {stats.total}
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-success transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground">{stats.occupied} occupied</p>
      </CardContent>
    </Card>
  )
}

function AdminSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-24 w-full rounded-xl" />
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-5">
        <Skeleton className="h-72 rounded-xl lg:col-span-3" />
        <Skeleton className="h-72 rounded-xl lg:col-span-2" />
      </div>
    </div>
  )
}
