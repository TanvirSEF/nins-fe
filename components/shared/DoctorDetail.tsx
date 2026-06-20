"use client"

import * as React from "react"
import Link from "next/link"
import { useDoctor } from "@/services/queries/useDoctorQuery"
import { doctorName, doctorDeptName } from "./DoctorCard"
import { DirectoryError } from "./DepartmentsDirectory"
import { RemoteImage } from "./RemoteImage"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  CalendarPlus,
  Stethoscope,
  Clock,
  Award,
  BadgeCheck,
} from "lucide-react"

function initials(name: string): string {
  const parts = name.trim().split(/\s+/)
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase() || "?"
}

function InfoRow({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-start gap-3 border-b border-slate-100 py-3 last:border-0 dark:border-white/10">
      <Icon className="mt-0.5 size-4 shrink-0 text-primary" />
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <div className="text-sm text-foreground">{children}</div>
      </div>
    </div>
  )
}

export function DoctorDetail({ id }: { id: string }) {
  const { data: doctor, isLoading, isError, refetch } = useDoctor(id)

  if (isLoading) {
    return <Skeleton className="h-72 w-full rounded-2xl" />
  }
  if (isError) {
    return <DirectoryError onRetry={refetch} />
  }
  if (!doctor) return null

  const name = doctorName(doctor)
  const deptName = doctorDeptName(doctor)

  return (
    <div className="space-y-8">
      <Link
        href="/doctors"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" />
        All doctors
      </Link>

      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white dark:border-white/10 dark:bg-slate-900/50">
        {/* Header */}
        <div className="flex flex-col items-center gap-4 bg-primary/5 p-6 text-center sm:flex-row sm:text-left">
          <div className="relative size-24 shrink-0 overflow-hidden rounded-full border-4 border-white bg-primary/10 shadow-sm dark:border-slate-900">
            <RemoteImage
              src={doctor.profilePicture}
              alt={name}
              fill
              className="object-cover"
              sizes="96px"
              priority
              fallback={
                <div className="absolute inset-0 flex items-center justify-center font-heading text-2xl font-bold text-primary">
                  {initials(name)}
                </div>
              }
            />
          </div>
          <div className="flex-1">
            <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {name}
            </h1>
            <p className="text-sm font-medium text-primary">{doctor.designation}</p>
            {deptName && (
              <p className="text-sm text-muted-foreground">{deptName}</p>
            )}
          </div>
          <Button disabled className="gap-1.5">
            <CalendarPlus className="size-4" />
            Book appointment
          </Button>
        </div>

        {/* Body */}
        <div className="grid gap-8 p-6 md:grid-cols-2">
          <div>
            <InfoRow icon={BadgeCheck} label="BMDC Reg.">
              {doctor.bmdcReg}
            </InfoRow>
            {doctor.availability && (
              <InfoRow icon={Clock} label="Availability">
                {doctor.availability}
              </InfoRow>
            )}
            {doctor.qualifications && doctor.qualifications.length > 0 && (
              <InfoRow icon={Award} label="Qualifications">
                {doctor.qualifications.join(", ")}
              </InfoRow>
            )}
          </div>

          <div className="space-y-4">
            {doctor.bio && (
              <div>
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  About
                </p>
                <p className="text-sm leading-relaxed text-foreground">
                  {doctor.bio}
                </p>
              </div>
            )}
            {doctor.specialties && doctor.specialties.length > 0 && (
              <div>
                <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  <Stethoscope className="size-3" />
                  Specialties
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {doctor.specialties.map((s) => (
                    <Badge key={s} variant="secondary">
                      {s}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground">
        Online booking opens in a future release.
      </p>
    </div>
  )
}
