"use client"

import * as React from "react"
import { useDepartments } from "@/services/queries/useDepartmentQuery"
import { useDoctors } from "@/services/queries/useDoctorQuery"
import { useSchedules } from "@/services/queries/useScheduleQuery"
import {
  useDoctorAppointments,
  useBookWithPayment,
} from "@/services/queries/useAppointmentQuery"
import { doctorName, doctorDeptName } from "@/components/shared/DoctorCard"
import { ApiError } from "@/lib/api-client"
import type { Department, DoctorProfile } from "@/types"
import { Stepper } from "./Stepper"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { toast } from "sonner"
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock,
  AlertCircle,
  Loader2,
} from "lucide-react"
import { format } from "date-fns"

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const LIMIT = 100

function toYMD(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${y}-${m}-${day}`
}

function startOfToday(): Date {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return d
}

export function BookingWizard() {
  const [step, setStep] = React.useState(0)
  const [departmentId, setDepartmentId] = React.useState<string>()
  const [doctor, setDoctor] = React.useState<DoctorProfile>()
  const [date, setDate] = React.useState<Date>()

  return (
    <div className="space-y-6">
      <Stepper current={step} />

      {step === 0 && (
        <DepartmentStep
          selected={departmentId}
          onSelect={(id) => {
            setDepartmentId(id)
            setDoctor(undefined)
            setDate(undefined)
            setStep(1)
          }}
        />
      )}

      {step === 1 && departmentId && (
        <DoctorStep
          departmentId={departmentId}
          selected={doctor?._id}
          onSelect={(d) => {
            setDoctor(d)
            setDate(undefined)
            setStep(2)
          }}
          onBack={() => setStep(0)}
        />
      )}

      {step === 2 && doctor && (
        <DateSlotStep
          doctor={doctor}
          date={date}
          onSelect={setDate}
          onBack={() => setStep(1)}
          onNext={() => setStep(3)}
        />
      )}

      {step === 3 && doctor && date && (
        <CheckoutStep
          doctor={doctor}
          date={date}
          onBack={() => setStep(2)}
        />
      )}
    </div>
  )
}

/* Step 1: Department */

function DepartmentStep({
  selected,
  onSelect,
}: {
  selected?: string
  onSelect: (id: string) => void
}) {
  const { data, isLoading, isError, refetch } = useDepartments({
    page: 1,
    limit: LIMIT,
  })

  if (isLoading) {
    return <GridSkeleton count={6} />
  }
  if (isError) {
    return <RetryInline message="Couldn't load departments." onRetry={refetch} />
  }

  return (
    <div className="space-y-3">
      <StepHeading title="Choose a department" />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {data?.data.map((d: Department) => (
          <SelectCard
            key={d._id}
            active={selected === d._id}
            onClick={() => onSelect(d._id)}
            title={d.name}
            subtitle={d.description}
            badge={d.code}
          />
        ))}
      </div>
      {data && data.data.length === 0 && <Empty text="No departments available." />}
    </div>
  )
}

/* Step 2: Doctor */

function DoctorStep({
  departmentId,
  selected,
  onSelect,
  onBack,
}: {
  departmentId: string
  selected?: string
  onSelect: (d: DoctorProfile) => void
  onBack: () => void
}) {
  const { data, isLoading, isError, refetch } = useDoctors({
    page: 1,
    limit: LIMIT,
    departmentId,
  })

  return (
    <div className="space-y-3">
      <StepBar onBack={onBack} title="Choose a consultant" />
      {isLoading ? (
        <GridSkeleton count={4} />
      ) : isError ? (
        <RetryInline message="Couldn't load doctors." onRetry={refetch} />
      ) : data && data.data.length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {data.data.map((d: DoctorProfile) => (
            <SelectCard
              key={d._id}
              active={selected === d._id}
              onClick={() => onSelect(d)}
              title={doctorName(d)}
              subtitle={`${d.designation} · ${doctorDeptName(d)}`}
            />
          ))}
        </div>
      ) : (
        <Empty text="No consultants in this department yet." />
      )}
    </div>
  )
}

/* Step 3: Date + Slot */

function DateSlotStep({
  doctor,
  date,
  onSelect,
  onBack,
  onNext,
}: {
  doctor: DoctorProfile
  date?: Date
  onSelect: (d: Date) => void
  onBack: () => void
  onNext: () => void
}) {
  const schedules = useSchedules(doctor._id)
  const allowedDays = (schedules.data ?? []).map((s) => s.dayOfWeek)
  const dateYMD = date ? toYMD(date) : undefined
  const capacity = useDoctorAppointments(doctor._id, dateYMD)

  const matchingSchedule = date
    ? (schedules.data ?? []).find((s) => s.dayOfWeek === date.getDay())
    : undefined

  const isFull =
    !!matchingSchedule &&
    !!capacity.data &&
    capacity.data.totalBooked >= matchingSchedule.maxPatients

  if (schedules.isLoading) return <GridSkeleton count={1} />
  if (schedules.isError)
    return (
      <RetryInline
        message="Couldn't load this doctor's schedule."
        onRetry={schedules.refetch}
      />
    )

  return (
    <div className="space-y-4">
      <StepBar onBack={onBack} title="Pick a date" />

      {!schedules.data || schedules.data.length === 0 ? (
        <Empty text="This consultant has no active outpatient schedule." />
      ) : (
        <>
          <p className="text-sm text-muted-foreground">
            Available weekdays:{" "}
            <span className="font-medium text-foreground">
              {[...new Set(allowedDays)]
                .sort()
                .map((d) => WEEKDAYS[d])
                .join(", ")}
            </span>
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start gap-2 sm:w-64">
                  <CalendarDays className="size-4" />
                  {date ? format(date, "PPP") : "Select a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(d) => d && onSelect(d)}
                  disabled={(d) =>
                    !allowedDays.includes(d.getDay()) || d < startOfToday()
                  }
                />
              </PopoverContent>
            </Popover>

            {matchingSchedule && (
              <div className="flex-1 space-y-2 rounded-xl border border-slate-100 bg-white p-4 dark:border-white/10 dark:bg-slate-900/50">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="size-4 text-primary" />
                  <span className="font-medium">
                    {matchingSchedule.startTime}–{matchingSchedule.endTime}
                  </span>
                </div>
                {capacity.isLoading ? (
                  <Skeleton className="h-4 w-32" />
                ) : (
                  <p className="text-sm text-muted-foreground">
                    {capacity.data?.totalBooked ?? 0} /{" "}
                    {matchingSchedule.maxPatients} booked
                  </p>
                )}
              </div>
            )}
          </div>

          {isFull && (
            <Alert variant="destructive">
              <AlertCircle />
              <AlertTitle>Daily quota exhausted</AlertTitle>
              <AlertDescription>
                All booking slots for this consultant on this date are full.
                Please pick another date.
              </AlertDescription>
            </Alert>
          )}

          <div className="flex justify-end">
            <Button disabled={!date || !matchingSchedule || isFull} onClick={onNext}>
              Continue
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

/* Step 4: Checkout */

function CheckoutStep({
  doctor,
  date,
  onBack,
}: {
  doctor: DoctorProfile
  date: Date
  onBack: () => void
}) {
  const schedules = useSchedules(doctor._id)
  const book = useBookWithPayment()
  const scheduleId = (schedules.data ?? []).find(
    (s) => s.dayOfWeek === date.getDay(),
  )?._id

  const onSubmit = async () => {
    if (!scheduleId) return
    try {
      const res = await book.mutateAsync({
        doctorId: doctor._id,
        scheduleId,
        appointmentDate: toYMD(date),
      })
      sessionStorage.setItem("lastBookingAppointmentId", res.appointmentId)
      window.location.href = res.gatewayPageURL
    } catch (error) {
      const messages =
        error instanceof ApiError ? error.messages : ["Booking failed."]
      messages.forEach((m) => toast.error("Couldn't book", { description: m }))
    }
  }

  return (
    <div className="space-y-4">
      <StepBar onBack={onBack} title="Review & pay" />

      <div className="mx-auto max-w-md space-y-4 rounded-xl border border-slate-100 bg-white p-6 dark:border-white/10 dark:bg-slate-900/50">
        <Row
          label="Consultant"
          value={`${doctorName(doctor)} · ${doctor.designation}`}
        />
        <Row label="Department" value={doctorDeptName(doctor)} />
        <Row label="Date" value={format(date, "EEEE, PPP")} />
        <Row label="Payment" value="Registration fee via SSLCommerz" />
        <Button
          className="w-full"
          onClick={onSubmit}
          disabled={book.isPending || !scheduleId}
        >
          {book.isPending ? (
            <>
              <Loader2 className="size-4 animate-spin" /> Redirecting…
            </>
          ) : (
            "Pay & confirm booking"
          )}
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          You&apos;ll be redirected to SSLCommerz to complete payment.
        </p>
      </div>
    </div>
  )
}

/* small shared bits */

function StepHeading({ title }: { title: string }) {
  return <h2 className="font-heading text-lg font-bold text-foreground">{title}</h2>
}

function StepBar({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <div className="flex items-center gap-3">
      <Button variant="ghost" size="icon-sm" onClick={onBack} aria-label="Back">
        <ArrowLeft />
      </Button>
      <h2 className="font-heading text-lg font-bold text-foreground">{title}</h2>
    </div>
  )
}

function SelectCard({
  active,
  onClick,
  title,
  subtitle,
  badge,
}: {
  active: boolean
  onClick: () => void
  title: string
  subtitle?: string
  badge?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "flex flex-col gap-1 rounded-xl border p-4 text-left transition-all",
        active
          ? "border-primary bg-primary/5 ring-2 ring-primary/20"
          : "border-slate-100 bg-white hover:border-primary/40 hover:bg-primary/5 dark:border-white/10 dark:bg-slate-900/50",
      ].join(" ")}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="font-heading text-sm font-bold text-foreground">
          {title}
        </span>
        {badge && (
          <span className="rounded-md bg-primary/10 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-primary">
            {badge}
          </span>
        )}
      </div>
      {subtitle && (
        <span className="line-clamp-2 text-xs text-muted-foreground">
          {subtitle}
        </span>
      )}
    </button>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-2 last:border-0 last:pb-0 dark:border-white/10">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-right text-sm font-medium text-foreground">
        {value}
      </span>
    </div>
  )
}

function GridSkeleton({ count }: { count: number }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} className="h-20 w-full rounded-xl" />
      ))}
    </div>
  )
}

function RetryInline({
  message,
  onRetry,
}: {
  message: string
  onRetry: () => void
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-destructive/40 bg-destructive/5 p-8 text-center">
      <AlertCircle className="size-5 text-destructive" />
      <p className="text-sm text-muted-foreground">{message}</p>
      <Button variant="outline" size="sm" onClick={onRetry}>
        Try again
      </Button>
    </div>
  )
}

function Empty({ text }: { text: string }) {
  return (
    <p className="rounded-xl border border-dashed border-border py-12 text-center text-sm text-muted-foreground">
      {text}
    </p>
  )
}
