"use client"

import * as React from "react"
import { useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useDoctors } from "@/services/queries/useDoctorQuery"
import {
  useSchedules,
  useCreateSchedule,
  useUpdateSchedule,
  useDeleteSchedule,
} from "@/services/queries/useScheduleQuery"
import { ApiError } from "@/lib/api-client"
import type { DoctorProfile, Schedule, User } from "@/types"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ConfirmDialog } from "./ConfirmDialog"
import { toast } from "sonner"
import { CalendarDays, Loader2, Pencil, Plus, Trash2 } from "lucide-react"

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

function userNameOf(d: DoctorProfile): string {
  return typeof d.userId === "object" && d.userId !== null
    ? (d.userId as User).name
    : "Doctor"
}

function toasts(error: unknown, fallback: string) {
  const msgs = error instanceof ApiError ? error.messages : [fallback]
  msgs.forEach((m) => toast.error(m))
}

export function SchedulesManager() {
  const [doctorId, setDoctorId] = React.useState<string>("")
  const [formOpen, setFormOpen] = React.useState(false)
  const [editing, setEditing] = React.useState<Schedule | null>(null)
  const [deleting, setDeleting] = React.useState<Schedule | null>(null)

  const { data: docData, isLoading: docsLoading } = useDoctors({
    page: 1,
    limit: 100,
  })
  const doctors = docData?.data ?? []
  const schedules = useSchedules(doctorId || undefined)
  const del = useDeleteSchedule()

  const openCreate = () => {
    setEditing(null)
    setFormOpen(true)
  }
  const openEdit = (s: Schedule) => {
    setEditing(s)
    setFormOpen(true)
  }

  const confirmDelete = async () => {
    if (!deleting) return
    try {
      await del.mutateAsync(deleting._id)
      toast.success("Schedule deleted")
      setDeleting(null)
    } catch (error) {
      toasts(error, "Couldn't delete the schedule.")
    }
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Schedules belong to a doctor. Pick a consultant, then manage their
        weekly outpatient shifts.
      </p>

      {/* Doctor selector */}
      <div className="max-w-sm space-y-1.5">
        <Label className="text-sm font-medium">Consultant</Label>
        {docsLoading ? (
          <Skeleton className="h-10 w-full rounded-md" />
        ) : (
          <Select value={doctorId} onValueChange={setDoctorId}>
            <SelectTrigger className="w-full">
              <SelectValue
                placeholder={
                  doctors.length === 0
                    ? "No doctors available"
                    : "Select a consultant"
                }
              />
            </SelectTrigger>
            <SelectContent>
              {doctors.map((d) => (
                <SelectItem key={d._id} value={d._id}>
                  {userNameOf(d)} · {d.designation}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {!doctorId ? (
        <p className="rounded-xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
          Select a consultant to manage their schedules.
        </p>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-sm font-semibold text-foreground">
              Weekly shifts
            </h2>
            <Button onClick={openCreate} size="sm" className="gap-1.5">
              <Plus className="size-4" /> Add shift
            </Button>
          </div>

          <Card>
            <CardContent className="overflow-x-auto p-0">
              {schedules.isLoading ? (
                <div className="space-y-2 p-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-12 w-full rounded-lg" />
                  ))}
                </div>
              ) : schedules.isError ? (
                <p className="p-6 text-center text-sm text-muted-foreground">
                  Couldn&apos;t load schedules.
                </p>
              ) : schedules.data && schedules.data.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Day</TableHead>
                      <TableHead>Hours</TableHead>
                      <TableHead>Capacity</TableHead>
                      <TableHead className="w-24 text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {schedules.data.map((s) => (
                      <TableRow key={s._id}>
                        <TableCell className="font-medium">
                          {WEEKDAYS[s.dayOfWeek]}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {s.startTime}–{s.endTime}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {s.maxPatients}/day
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              onClick={() => openEdit(s)}
                              aria-label="Edit"
                            >
                              <Pencil className="size-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              className="text-destructive hover:bg-destructive/10"
                              onClick={() => setDeleting(s)}
                              aria-label="Delete"
                            >
                              <Trash2 className="size-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="py-16 text-center text-sm text-muted-foreground">
                  No shifts set for this consultant yet.
                </p>
              )}
            </CardContent>
          </Card>
        </>
      )}

      {doctorId && (
        <ScheduleFormDialog
          open={formOpen}
          doctorId={doctorId}
          schedule={editing}
          onOpenChange={setFormOpen}
        />
      )}

      <ConfirmDialog
        open={!!deleting}
        onOpenChange={(o) => !o && setDeleting(null)}
        title="Delete shift?"
        description="This removes the weekly shift. Future bookings for it are unaffected."
        confirmLabel="Delete"
        onConfirm={confirmDelete}
        loading={del.isPending}
      />
    </div>
  )
}

/* ─── Create / Edit form ──────────────────────────────────────────────── */

const schema = z
  .object({
    dayOfWeek: z.number().int().min(0).max(6),
    startTime: z.string().regex(/^\d{2}:\d{2}$/, "Use HH:mm"),
    endTime: z.string().regex(/^\d{2}:\d{2}$/, "Use HH:mm"),
    maxPatients: z.number().int().min(1).optional(),
  })
  .refine((d) => d.startTime < d.endTime, {
    message: "End time must be after start time",
    path: ["endTime"],
  })
type FormValues = z.infer<typeof schema>

function ScheduleFormDialog({
  open,
  doctorId,
  schedule,
  onOpenChange,
}: {
  open: boolean
  doctorId: string
  schedule: Schedule | null
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        {open && (
          <ScheduleForm
            key={schedule?._id ?? "new"}
            doctorId={doctorId}
            schedule={schedule}
            onDone={() => onOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

function ScheduleForm({
  doctorId,
  schedule,
  onDone,
}: {
  doctorId: string
  schedule: Schedule | null
  onDone: () => void
}) {
  const create = useCreateSchedule()
  const update = useUpdateSchedule()
  const isEdit = !!schedule

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      dayOfWeek: schedule?.dayOfWeek ?? 1,
      startTime: schedule?.startTime ?? "09:00",
      endTime: schedule?.endTime ?? "13:00",
      maxPatients: schedule?.maxPatients ?? 30,
    },
  })
  const dayOfWeek = useWatch({ control: form.control, name: "dayOfWeek" })

  const onSubmit = async (values: FormValues) => {
    try {
      if (isEdit && schedule) {
        await update.mutateAsync({
          id: schedule._id,
          body: {
            dayOfWeek: values.dayOfWeek,
            startTime: values.startTime,
            endTime: values.endTime,
            maxPatients: values.maxPatients,
          },
        })
        toast.success("Shift updated")
      } else {
        await create.mutateAsync({
          doctorId,
          dayOfWeek: values.dayOfWeek,
          startTime: values.startTime,
          endTime: values.endTime,
          maxPatients: values.maxPatients,
        })
        toast.success("Shift added")
      }
      onDone()
    } catch (error) {
      toasts(error, "Couldn't save the shift.")
    }
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <CalendarDays className="size-5 text-primary" />
          {isEdit ? "Edit shift" : "New shift"}
        </DialogTitle>
        <DialogDescription>
          {isEdit ? "Update this weekly shift." : "Add a weekly outpatient shift."}
        </DialogDescription>
      </DialogHeader>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 px-1"
        autoComplete="off"
      >
        <div className="space-y-1.5">
          <Label className="text-sm font-medium">Day of week *</Label>
          <Select
            value={String(dayOfWeek ?? "")}
            onValueChange={(v) => form.setValue("dayOfWeek", Number(v))}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {WEEKDAYS.map((label, idx) => (
                <SelectItem key={idx} value={String(idx)}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="text-sm font-medium">Start *</Label>
            <Input type="time" {...form.register("startTime")} />
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm font-medium">End *</Label>
            <Input type="time" {...form.register("endTime")} />
            {form.formState.errors.endTime && (
              <p className="text-xs font-medium text-destructive">
                {form.formState.errors.endTime.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-1.5">
          <Label className="text-sm font-medium">Max patients / day</Label>
          <Input
            type="number"
            min={1}
            {...form.register("maxPatients", {
              setValueAs: (v) =>
                v === "" || v == null ? undefined : Number(v),
            })}
          />
        </div>

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
            {isEdit ? "Save changes" : "Add shift"}
          </Button>
        </DialogFooter>
      </form>
    </>
  )
}
