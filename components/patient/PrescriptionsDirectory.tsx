"use client"

import * as React from "react"
import { useMyPrescriptions } from "@/services/queries/usePrescriptionQuery"
import { Pagination } from "@/components/shared/Pagination"
import { DirectoryError } from "@/components/shared/DepartmentsDirectory"
import type {
  Appointment,
  DoctorProfile,
  MedicalRecord,
  Prescription,
} from "@/types"
import { Card, CardContent } from "@/components/ui/card"
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { format, parseISO } from "date-fns"
import {
  Pill,
  Stethoscope,
  CalendarDays,
  CalendarClock,
} from "lucide-react"

const LIMIT = 10

function doctorOf(p: Prescription): DoctorProfile | undefined {
  return typeof p.doctorId === "object" && p.doctorId !== null
    ? (p.doctorId as DoctorProfile)
    : undefined
}

function appointmentOf(p: Prescription): Appointment | undefined {
  return typeof p.appointmentId === "object" && p.appointmentId !== null
    ? (p.appointmentId as Appointment)
    : undefined
}

function recordOf(p: Prescription): MedicalRecord | undefined {
  return typeof p.medicalRecordId === "object" && p.medicalRecordId !== null
    ? (p.medicalRecordId as MedicalRecord)
    : undefined
}

export function PrescriptionsDirectory() {
  const [page, setPage] = React.useState(1)
  const [open, setOpen] = React.useState<Prescription | null>(null)

  const { data, isLoading, isError, refetch } = useMyPrescriptions({
    page,
    limit: LIMIT,
  })

  return (
    <div className="space-y-6">
      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-2xl" />
          ))}
        </div>
      ) : isError ? (
        <DirectoryError onRetry={refetch} />
      ) : data && data.data.length > 0 ? (
        <>
          <div className="space-y-3">
            {data.data.map((p) => (
              <PrescriptionCard key={p._id} rx={p} onOpen={() => setOpen(p)} />
            ))}
          </div>
          <Pagination page={page} meta={data.meta} onPageChange={setPage} />
        </>
      ) : (
        <p className="rounded-xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
          No prescriptions yet. They appear here once a doctor prescribes after
          your consultation.
        </p>
      )}

      <Dialog open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
          {open && <PrescriptionDetail rx={open} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}

function PrescriptionCard({
  rx,
  onOpen,
}: {
  rx: Prescription
  onOpen: () => void
}) {
  const doc = doctorOf(rx)
  const appt = appointmentOf(rx)
  return (
    <button type="button" onClick={onOpen} className="block w-full text-left">
      <Card className="transition-colors hover:border-primary/40 hover:bg-primary/5">
        <CardContent className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1.5 font-heading text-sm font-bold text-foreground">
                <Pill className="size-4 text-primary" />
                {rx.medicines.length}{" "}
                {rx.medicines.length === 1 ? "medicine" : "medicines"}
              </span>
              {rx.tests && rx.tests.length > 0 && (
                <Badge variant="secondary">{rx.tests.length} tests</Badge>
              )}
            </div>
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Stethoscope className="size-3.5" />
              {doc?.designation ?? "Consultant"}
              {doc?.specialties?.[0] ? ` · ${doc.specialties[0]}` : ""}
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-1 text-xs text-muted-foreground sm:text-right">
            {appt && (
              <p className="flex items-center gap-1.5 sm:justify-end">
                <CalendarDays className="size-3.5" />
                {format(parseISO(appt.appointmentDate), "dd MMM yyyy")}
              </p>
            )}
            {rx.nextVisitDate && (
              <p className="flex items-center gap-1.5 text-primary sm:justify-end">
                <CalendarClock className="size-3.5" />
                Next: {format(parseISO(rx.nextVisitDate), "dd MMM yyyy")}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </button>
  )
}

function PrescriptionDetail({ rx }: { rx: Prescription }) {
  const doc = doctorOf(rx)
  const appt = appointmentOf(rx)
  const record = recordOf(rx)
  return (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Pill className="size-5 text-primary" />
          Prescription
        </DialogTitle>
        <DialogDescription>
          {doc?.designation ?? "Consultant"}
          {appt
            ? ` · ${format(parseISO(appt.appointmentDate), "dd MMM yyyy")}`
            : ""}
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-5 px-1">
        {record && (
          <div className="rounded-lg border border-border bg-muted/30 px-3 py-2">
            <p className="text-[11px] text-muted-foreground">For complaint</p>
            <p className="text-sm font-medium text-foreground">
              {record.chiefComplaint}
            </p>
          </div>
        )}

        <div className="space-y-2">
          <h3 className="font-heading text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            Medicines
          </h3>
          <div className="overflow-hidden rounded-lg border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Medicine</TableHead>
                  <TableHead>Dosage</TableHead>
                  <TableHead>Frequency</TableHead>
                  <TableHead>Duration</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rx.medicines.map((m, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium text-foreground">
                      {m.name}
                    </TableCell>
                    <TableCell>{m.dosage}</TableCell>
                    <TableCell>{m.frequency}</TableCell>
                    <TableCell>{m.duration}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {rx.medicines.some((m) => m.instructions) && (
            <ul className="space-y-1 px-1">
              {rx.medicines
                .filter((m) => m.instructions)
                .map((m, i) => (
                  <li key={i} className="text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">
                      {m.name}:
                    </span>{" "}
                    {m.instructions}
                  </li>
                ))}
            </ul>
          )}
        </div>

        {rx.tests && rx.tests.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-heading text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              Tests
            </h3>
            <ul className="space-y-1">
              {rx.tests.map((t, i) => (
                <li key={i} className="text-sm text-foreground">
                  {t.name}
                  {t.instructions && (
                    <span className="text-muted-foreground">
                      {" "}
                      — {t.instructions}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {rx.advice.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-heading text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              Advice
            </h3>
            <ul className="list-inside list-disc space-y-1">
              {rx.advice.map((a, i) => (
                <li key={i} className="text-sm text-foreground">
                  {a}
                </li>
              ))}
            </ul>
          </div>
        )}

        {rx.notes && (
          <div className="space-y-1.5">
            <h3 className="font-heading text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              Notes
            </h3>
            <p className="whitespace-pre-line text-sm text-foreground">
              {rx.notes}
            </p>
          </div>
        )}

        {rx.nextVisitDate && (
          <div className="rounded-lg border border-primary/30 bg-primary/5 px-3 py-2">
            <p className="flex items-center gap-1.5 text-sm font-medium text-primary">
              <CalendarClock className="size-4" />
              Next visit: {format(parseISO(rx.nextVisitDate), "EEEE, dd MMM yyyy")}
            </p>
          </div>
        )}
      </div>
    </>
  )
}
