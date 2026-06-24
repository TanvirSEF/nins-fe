"use client"

import * as React from "react"
import { useMyRecords } from "@/services/queries/useMedicalRecordQuery"
import { Pagination } from "@/components/shared/Pagination"
import { DirectoryError } from "@/components/shared/DepartmentsDirectory"
import type { Appointment, DoctorProfile, MedicalRecord, Vitals } from "@/types"
import { MedicalRecordStatus } from "@/types"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { format, parseISO } from "date-fns"
import { FileText, Stethoscope, CalendarDays } from "lucide-react"

const LIMIT = 10

function doctorOf(r: MedicalRecord): DoctorProfile | undefined {
  return typeof r.doctorId === "object" ? (r.doctorId as DoctorProfile) : undefined
}

function appointmentOf(r: MedicalRecord): Appointment | undefined {
  return typeof r.appointmentId === "object"
    ? (r.appointmentId as Appointment)
    : undefined
}

export function MedicalRecordsDirectory() {
  const [page, setPage] = React.useState(1)
  const [open, setOpen] = React.useState<MedicalRecord | null>(null)

  const { data, isLoading, isError, refetch } = useMyRecords({
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
            {data.data.map((r) => (
              <RecordCard key={r._id} record={r} onOpen={() => setOpen(r)} />
            ))}
          </div>
          <Pagination page={page} meta={data.meta} onPageChange={setPage} />
        </>
      ) : (
        <p className="rounded-xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
          No medical records yet. They appear after a consultation is completed.
        </p>
      )}

      <Dialog open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
          {open && <RecordDetail record={open} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}

function RecordCard({
  record,
  onOpen,
}: {
  record: MedicalRecord
  onOpen: () => void
}) {
  const doc = doctorOf(record)
  const appt = appointmentOf(record)
  return (
    <button type="button" onClick={onOpen} className="block w-full text-left">
      <Card className="transition-colors hover:border-primary/40 hover:bg-primary/5">
        <CardContent className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-heading text-sm font-bold text-foreground">
                {record.chiefComplaint}
              </span>
              <Badge
                className={
                  record.status === MedicalRecordStatus.ACTIVE
                    ? "bg-success/15 text-success"
                    : "bg-muted text-muted-foreground"
                }
              >
                {record.status}
              </Badge>
            </div>
            {record.diagnosis.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {record.diagnosis.slice(0, 3).map((d, i) => (
                  <span
                    key={i}
                    className="rounded-md bg-muted px-1.5 py-0.5 text-[11px] text-muted-foreground"
                  >
                    {d}
                  </span>
                ))}
                {record.diagnosis.length > 3 && (
                  <span className="text-[11px] text-muted-foreground">
                    +{record.diagnosis.length - 3} more
                  </span>
                )}
              </div>
            )}
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Stethoscope className="size-3.5" />
              {doc?.designation ?? "Consultant"}
              {doc?.specialties?.[0] ? ` · ${doc.specialties[0]}` : ""}
            </p>
          </div>
          {appt && (
            <p className="flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground sm:text-right">
              <CalendarDays className="size-3.5" />
              {format(parseISO(appt.appointmentDate), "dd MMM yyyy")}
            </p>
          )}
        </CardContent>
      </Card>
    </button>
  )
}

function RecordDetail({ record }: { record: MedicalRecord }) {
  const doc = doctorOf(record)
  const appt = appointmentOf(record)
  return (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <FileText className="size-5 text-primary" />
          Medical record
        </DialogTitle>
        <DialogDescription>
          {doc?.designation ?? "Consultator"}
          {appt
            ? ` · ${format(parseISO(appt.appointmentDate), "dd MMM yyyy")}`
            : ""}
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-5 px-1">
        <Section title="Chief complaint">
          <p className="text-sm text-foreground">{record.chiefComplaint}</p>
        </Section>

        {record.presentIllness && (
          <Section title="Present illness">
            <Prose text={record.presentIllness} />
          </Section>
        )}
        {record.pastHistory && (
          <Section title="Past history">
            <Prose text={record.pastHistory} />
          </Section>
        )}
        {record.examinationFindings && (
          <Section title="Examination findings">
            <Prose text={record.examinationFindings} />
          </Section>
        )}

        {record.vitals && <VitalsGrid vitals={record.vitals} />}

        {record.diagnosis.length > 0 && (
          <Section title="Diagnosis">
            <div className="flex flex-wrap gap-1.5">
              {record.diagnosis.map((d, i) => (
                <Badge key={i} variant="secondary">
                  {d}
                </Badge>
              ))}
            </div>
          </Section>
        )}

        {record.notes && (
          <Section title="Notes">
            <Prose text={record.notes} />
          </Section>
        )}

        {record.followUpDate && (
          <Section title="Follow-up">
            <p className="text-sm text-foreground">
              {format(parseISO(record.followUpDate), "EEEE, dd MMM yyyy")}
            </p>
          </Section>
        )}
      </div>
    </>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <h3 className="font-heading text-xs font-semibold tracking-wide text-muted-foreground uppercase">
        {title}
      </h3>
      {children}
    </div>
  )
}

function Prose({ text }: { text: string }) {
  return <p className="whitespace-pre-line text-sm text-foreground">{text}</p>
}

const VITAL_LABELS: { key: keyof Vitals; label: string; unit?: string }[] = [
  { key: "bloodPressure", label: "Blood pressure", unit: "mmHg" },
  { key: "pulse", label: "Pulse", unit: "bpm" },
  { key: "temperature", label: "Temperature", unit: "°F" },
  { key: "respiratoryRate", label: "Resp. rate", unit: "/min" },
  { key: "oxygenSaturation", label: "SpO₂", unit: "%" },
  { key: "weight", label: "Weight", unit: "kg" },
  { key: "height", label: "Height", unit: "cm" },
]

function VitalsGrid({ vitals }: { vitals: Vitals }) {
  const rows = VITAL_LABELS.filter((v) => vitals[v.key] !== undefined)
  if (rows.length === 0) return null
  return (
    <Section title="Vitals">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {rows.map((v) => (
          <div
            key={v.key}
            className="rounded-lg border border-border bg-muted/30 px-3 py-2"
          >
            <p className="text-[11px] text-muted-foreground">{v.label}</p>
            <p className="text-sm font-medium text-foreground">
              {String(vitals[v.key])}
              {v.unit && (
                <span className="ml-0.5 text-xs font-normal text-muted-foreground">
                  {v.unit}
                </span>
              )}
            </p>
          </div>
        ))}
      </div>
    </Section>
  )
}
