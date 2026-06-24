"use client"

import * as React from "react"
import Link from "next/link"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  useAppointment,
  useUpdateAppointmentStatus,
} from "@/services/queries/useAppointmentQuery"
import {
  useMedicalRecordByAppointment,
  useCreateMedicalRecord,
} from "@/services/queries/useMedicalRecordQuery"
import {
  usePrescriptionByAppointment,
  useCreatePrescription,
} from "@/services/queries/usePrescriptionQuery"
import { ApiError } from "@/lib/api-client"
import type {
  CreateMedicalRecordInput,
  CreatePrescriptionInput,
  User,
  Vitals,
} from "@/types"
import { AppointmentStatus } from "@/types"
import { ChipInput } from "./ChipInput"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { toast } from "sonner"
import { format, parseISO } from "date-fns"
import {
  Loader2,
  Plus,
  Trash2,
  CheckCircle2,
  FileText,
  Pill,
  ArrowLeft,
  Stethoscope,
} from "lucide-react"

const STATUS_TONE: Record<AppointmentStatus, string> = {
  [AppointmentStatus.PENDING]: "bg-warning/15 text-warning",
  [AppointmentStatus.CONFIRMED]: "bg-success/15 text-success",
  [AppointmentStatus.COMPLETED]: "bg-primary/10 text-primary",
  [AppointmentStatus.CANCELLED]: "bg-destructive/10 text-destructive",
}

export function Consultation({ appointmentId }: { appointmentId: string }) {
  const appointment = useAppointment(appointmentId)
  const record = useMedicalRecordByAppointment(
    appointment.data?.status === AppointmentStatus.COMPLETED
      ? appointmentId
      : undefined,
  )
  const prescription = usePrescriptionByAppointment(
    record.data ? appointmentId : undefined,
  )
  const updateStatus = useUpdateAppointmentStatus()

  const appt = appointment.data

  if (appointment.isLoading) {
    return <Skeleton className="h-40 w-full rounded-xl" />
  }
  if (appointment.isError || !appt) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Appointment not found</AlertTitle>
        <AlertDescription>
          This appointment may have been removed.
        </AlertDescription>
      </Alert>
    )
  }

  const patient =
    typeof appt.patientId === "object" ? (appt.patientId as User) : undefined
  const isCompleted = appt.status === AppointmentStatus.COMPLETED
  const isCancelled = appt.status === AppointmentStatus.CANCELLED
  const hasRecord = !!record.data
  const hasPrescription = !!prescription.data

  const markComplete = async () => {
    try {
      await updateStatus.mutateAsync({
        id: appointmentId,
        status: AppointmentStatus.COMPLETED,
      })
      toast.success("Consultation marked complete")
    } catch (error) {
      toastMessages(error, "Couldn't update the appointment.")
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <Button asChild variant="ghost" size="sm" className="mb-3 gap-1.5">
          <Link href="/dashboard/doctor/queue">
            <ArrowLeft className="size-4" />
            Back to queue
          </Link>
        </Button>
        <ConsultationHeader patientName={patient?.name} appt={appt} />
      </div>

      {isCancelled && (
        <Alert variant="destructive">
          <AlertTitle>This appointment was cancelled</AlertTitle>
          <AlertDescription>
            Clinical records can&apos;t be created for cancelled appointments.
          </AlertDescription>
        </Alert>
      )}

      {!isCompleted && !isCancelled && (
        <Card>
          <CardContent className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <p className="font-heading text-sm font-bold text-foreground">
                Ready to see this patient?
              </p>
              <p className="text-sm text-muted-foreground">
                Mark the consultation complete to unlock the medical record and
                prescription.
              </p>
            </div>
            <Button
              onClick={markComplete}
              disabled={updateStatus.isPending}
              className="gap-1.5"
            >
              {updateStatus.isPending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <CheckCircle2 className="size-4" />
              )}
              Mark complete
            </Button>
          </CardContent>
        </Card>
      )}

      {isCompleted && record.isLoading && (
        <Skeleton className="h-64 w-full rounded-xl" />
      )}

      {isCompleted && !hasRecord && !record.isLoading && (
        <MedicalRecordForm appointmentId={appointmentId} />
      )}

      {isCompleted && hasRecord && prescription.isLoading && (
        <Skeleton className="h-40 w-full rounded-xl" />
      )}

      {isCompleted && hasRecord && !hasPrescription && !prescription.isLoading && (
        <PrescriptionForm medicalRecordId={record.data!._id} />
      )}

      {isCompleted && hasRecord && hasPrescription && (
        <DispenseSummary
          record={record.data!}
          prescription={prescription.data!}
        />
      )}
    </div>
  )
}

function ConsultationHeader({
  patientName,
  appt,
}: {
  patientName?: string
  appt: NonNullable<ReturnType<typeof useAppointment>["data"]>
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground">
        {patientName ?? "Patient"}
      </h1>
      <Badge className={STATUS_TONE[appt.status]}>{appt.status}</Badge>
      <span className="text-sm text-muted-foreground">
        Serial #{appt.serialNumber} ·{" "}
        {format(parseISO(appt.appointmentDate), "EEE, dd MMM yyyy")}
      </span>
    </div>
  )
}

/* ─── Medical record form ──────────────────────────────────────────────── */

const medicalSchema = z.object({
  chiefComplaint: z.string().trim().min(1, "Chief complaint is required"),
  presentIllness: z.string().optional(),
  pastHistory: z.string().optional(),
  examinationFindings: z.string().optional(),
  notes: z.string().optional(),
  followUpDate: z.string().optional(),
  vitals: z
    .object({
      bloodPressure: z.string().optional(),
      pulse: z.string().optional(),
      temperature: z.string().optional(),
      respiratoryRate: z.string().optional(),
      oxygenSaturation: z.string().optional(),
      weight: z.string().optional(),
      height: z.string().optional(),
    })
    .optional(),
})
type MedicalRecordValues = z.infer<typeof medicalSchema>

const VITAL_FIELDS: { name: keyof NonNullable<MedicalRecordValues["vitals"]>; label: string; numeric?: boolean }[] = [
  { name: "bloodPressure", label: "Blood pressure (mmHg)" },
  { name: "pulse", label: "Pulse (bpm)", numeric: true },
  { name: "temperature", label: "Temperature (°F)", numeric: true },
  { name: "respiratoryRate", label: "Resp. rate (/min)", numeric: true },
  { name: "oxygenSaturation", label: "SpO₂ (%)", numeric: true },
  { name: "weight", label: "Weight (kg)", numeric: true },
  { name: "height", label: "Height (cm)", numeric: true },
]

function MedicalRecordForm({ appointmentId }: { appointmentId: string }) {
  const create = useCreateMedicalRecord()
  const [diagnosis, setDiagnosis] = React.useState<string[]>([])
  const [diagnosisError, setDiagnosisError] = React.useState<string>()

  const form = useForm<MedicalRecordValues>({
    resolver: zodResolver(medicalSchema),
    defaultValues: { chiefComplaint: "", vitals: {} },
  })

  const onSubmit = async (values: MedicalRecordValues) => {
    if (diagnosis.length === 0) {
      setDiagnosisError("Add at least one diagnosis")
      return
    }
    setDiagnosisError(undefined)

    const payload: CreateMedicalRecordInput = {
      appointmentId,
      chiefComplaint: values.chiefComplaint,
      presentIllness: nz(values.presentIllness),
      pastHistory: nz(values.pastHistory),
      examinationFindings: nz(values.examinationFindings),
      vitals: cleanVitals(values.vitals),
      diagnosis,
      notes: nz(values.notes),
      followUpDate: nz(values.followUpDate),
    }

    try {
      await create.mutateAsync(payload)
      toast.success("Medical record saved")
    } catch (error) {
      toastMessages(error, "Couldn't save the record.")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="size-4 text-primary" /> Medical record
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
          autoComplete="off"
        >
          <Field label="Chief complaint" required error={form.formState.errors.chiefComplaint?.message}>
            <Textarea
              {...form.register("chiefComplaint")}
              placeholder="e.g. Severe headache for 3 days"
              rows={2}
            />
          </Field>

          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Present illness">
              <Textarea {...form.register("presentIllness")} rows={3} />
            </Field>
            <Field label="Past history">
              <Textarea {...form.register("pastHistory")} rows={3} />
            </Field>
          </div>

          <Field label="Examination findings">
            <Textarea {...form.register("examinationFindings")} rows={2} />
          </Field>

          <div>
            <Label className="mb-1.5 block text-sm font-medium">Vitals</Label>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {VITAL_FIELDS.map((v) => (
                <div key={v.name} className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">
                    {v.label}
                  </Label>
                  <Input
                    type={v.numeric ? "number" : "text"}
                    inputMode={v.numeric ? "numeric" : "text"}
                    {...form.register(`vitals.${v.name}`)}
                  />
                </div>
              ))}
            </div>
          </div>

          <Field label="Diagnosis" required error={diagnosisError}>
            <ChipInput
              values={diagnosis}
              onChange={setDiagnosis}
              placeholder="Type a diagnosis and press Enter"
            />
          </Field>

          <Field label="Notes">
            <Textarea {...form.register("notes")} rows={2} />
          </Field>

          <Field label="Follow-up date">
            <Input type="date" {...form.register("followUpDate")} />
          </Field>

          <Button type="submit" disabled={create.isPending} className="gap-1.5">
            {create.isPending && <Loader2 className="size-4 animate-spin" />}
            Save medical record
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

/* ─── Prescription form ────────────────────────────────────────────────── */

const prescriptionSchema = z.object({
  medicines: z.array(
    z.object({
      name: z.string(),
      dosage: z.string(),
      frequency: z.string(),
      duration: z.string(),
      instructions: z.string().optional(),
    }),
  ),
  tests: z
    .array(
      z.object({
        name: z.string(),
        instructions: z.string().optional(),
      }),
    )
    .optional(),
  notes: z.string().optional(),
  nextVisitDate: z.string().optional(),
})
type PrescriptionValues = z.infer<typeof prescriptionSchema>

function PrescriptionForm({ medicalRecordId }: { medicalRecordId: string }) {
  const create = useCreatePrescription()
  const [advice, setAdvice] = React.useState<string[]>([])

  const form = useForm<PrescriptionValues>({
    resolver: zodResolver(prescriptionSchema),
    defaultValues: {
      medicines: [
        { name: "", dosage: "", frequency: "", duration: "", instructions: "" },
      ],
      tests: [],
      notes: "",
      nextVisitDate: "",
    },
  })
  const meds = useFieldArray({ control: form.control, name: "medicines" })
  const tests = useFieldArray({ control: form.control, name: "tests" })

  const onSubmit = async (values: PrescriptionValues) => {
    const filledMeds = values.medicines
      .map((m) => ({
        name: m.name.trim(),
        dosage: m.dosage.trim(),
        frequency: m.frequency.trim(),
        duration: m.duration.trim(),
        instructions: nz(m.instructions),
      }))
      .filter((m) => m.name || m.dosage || m.frequency || m.duration)

    const incomplete = filledMeds.find(
      (m) => !m.name || !m.dosage || !m.frequency || !m.duration,
    )
    if (incomplete) {
      toast.error("Each medicine needs name, dosage, frequency, and duration")
      return
    }

    const filledTests = (values.tests ?? [])
      .map((t) => ({ name: t.name.trim(), instructions: nz(t.instructions) }))
      .filter((t) => t.name)

    if (filledMeds.length === 0 && filledTests.length === 0) {
      toast.error("Add at least one medicine or test before dispatching")
      return
    }

    const payload: CreatePrescriptionInput = {
      medicalRecordId,
      medicines: filledMeds,
      tests: filledTests.length ? filledTests : undefined,
      advice: advice.length ? advice : undefined,
      notes: nz(values.notes),
      nextVisitDate: nz(values.nextVisitDate),
    }

    try {
      await create.mutateAsync(payload)
      toast.success("Prescription signed & dispatched")
    } catch (error) {
      toastMessages(error, "Couldn't dispatch the prescription.")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Pill className="size-4 text-primary" /> Prescription
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5"
          autoComplete="off"
        >
          {/* Medicines */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Medicines</Label>
            <div className="space-y-3">
              {meds.fields.map((field, i) => (
                <div
                  key={field.id}
                  className="space-y-2 rounded-lg border border-border p-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-muted-foreground">
                      Medicine {i + 1}
                    </span>
                    {meds.fields.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => meds.remove(i)}
                        aria-label="Remove medicine"
                      >
                        <Trash2 className="size-4 text-destructive" />
                      </Button>
                    )}
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                    <Input placeholder="Name" {...form.register(`medicines.${i}.name`)} />
                    <Input placeholder="Dosage" {...form.register(`medicines.${i}.dosage`)} />
                    <Input placeholder="Frequency" {...form.register(`medicines.${i}.frequency`)} />
                    <Input placeholder="Duration" {...form.register(`medicines.${i}.duration`)} />
                  </div>
                  <Input
                    placeholder="Instructions (optional)"
                    {...form.register(`medicines.${i}.instructions`)}
                  />
                </div>
              ))}
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="gap-1.5"
              onClick={() =>
                meds.append({
                  name: "",
                  dosage: "",
                  frequency: "",
                  duration: "",
                  instructions: "",
                })
              }
            >
              <Plus className="size-4" /> Add medicine
            </Button>
          </div>

          {/* Tests */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Tests (optional)</Label>
            <div className="space-y-2">
              {tests.fields.map((field, i) => (
                <div key={field.id} className="flex gap-2">
                  <Input
                    placeholder="Test name"
                    {...form.register(`tests.${i}.name`)}
                  />
                  <Input
                    placeholder="Instructions (optional)"
                    className="flex-1"
                    {...form.register(`tests.${i}.instructions`)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => tests.remove(i)}
                    aria-label="Remove test"
                  >
                    <Trash2 className="size-4 text-destructive" />
                  </Button>
                </div>
              ))}
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="gap-1.5"
              onClick={() => tests.append({ name: "", instructions: "" })}
            >
              <Plus className="size-4" /> Add test
            </Button>
          </div>

          <Field label="Advice">
            <ChipInput
              values={advice}
              onChange={setAdvice}
              placeholder="e.g. Drink plenty of water"
            />
          </Field>

          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Notes">
              <Textarea {...form.register("notes")} rows={2} />
            </Field>
            <Field label="Next visit date">
              <Input type="date" {...form.register("nextVisitDate")} />
            </Field>
          </div>

          <Button type="submit" disabled={create.isPending} className="gap-1.5">
            {create.isPending && <Loader2 className="size-4 animate-spin" />}
            Sign &amp; dispatch
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

/* ─── Read-only dispense summary ───────────────────────────────────────── */

function DispenseSummary({
  record,
  prescription,
}: {
  record: NonNullable<ReturnType<typeof useMedicalRecordByAppointment>["data"]>
  prescription: NonNullable<ReturnType<typeof usePrescriptionByAppointment>["data"]>
}) {
  return (
    <div className="space-y-4">
      <Alert className="border-success/40 bg-success/5">
        <CheckCircle2 className="text-success" />
        <AlertTitle>Consultation complete</AlertTitle>
        <AlertDescription>
          Medical record and prescription have been recorded for this patient.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Stethoscope className="size-4 text-primary" /> Record summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p>
            <span className="text-muted-foreground">Chief complaint: </span>
            <span className="font-medium text-foreground">
              {record.chiefComplaint}
            </span>
          </p>
          {record.diagnosis.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-muted-foreground">Diagnosis:</span>
              {record.diagnosis.map((d, i) => (
                <Badge key={i} variant="secondary">
                  {d}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Pill className="size-4 text-primary" /> Dispensed medicines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-1.5 text-sm">
            {prescription.medicines.map((m, i) => (
              <li key={i} className="flex flex-wrap items-baseline gap-x-2">
                <span className="font-medium text-foreground">{m.name}</span>
                <span className="text-muted-foreground">
                  {m.dosage} · {m.frequency} · {m.duration}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

/* ─── helpers ──────────────────────────────────────────────────────────── */

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string
  required?: boolean
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium">
        {label}
        {required && <span className="ml-0.5 text-destructive">*</span>}
      </Label>
      {children}
      {error && <p className="text-xs font-medium text-destructive">{error}</p>}
    </div>
  )
}

function nz(s?: string): string | undefined {
  const v = s?.trim()
  return v ? v : undefined
}

function cleanVitals(v?: MedicalRecordValues["vitals"]): Vitals | undefined {
  if (!v) return undefined
  const num = (s?: string): number | undefined => {
    if (!s || !s.trim()) return undefined
    const n = Number(s)
    return Number.isFinite(n) ? n : undefined
  }
  const out: Vitals = {}
  if (v.bloodPressure?.trim()) out.bloodPressure = v.bloodPressure.trim()
  out.pulse = num(v.pulse)
  out.temperature = num(v.temperature)
  out.respiratoryRate = num(v.respiratoryRate)
  out.oxygenSaturation = num(v.oxygenSaturation)
  out.weight = num(v.weight)
  out.height = num(v.height)
  return Object.keys(out).length ? out : undefined
}

function toastMessages(error: unknown, fallback: string) {
  const msgs = error instanceof ApiError ? error.messages : [fallback]
  msgs.forEach((m) => toast.error(m))
}
