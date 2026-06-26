"use client"

import * as React from "react"
import { useForm, useWatch, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  useDoctors,
  useCreateDoctor,
  useUpdateDoctor,
  useDeleteDoctor,
  useUploadDoctorPicture,
} from "@/services/queries/useDoctorQuery"
import { useDepartments } from "@/services/queries/useDepartmentQuery"
import { useCreateStaff, useDeleteStaff } from "@/services/queries/useStaffQuery"
import { ApiError } from "@/lib/api-client"
import type { Department, DoctorProfile, User } from "@/types"
import { Role } from "@/types"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
import { ChipInput } from "@/components/doctor/ChipInput"
import { Pagination } from "@/components/shared/Pagination"
import { DirectoryError } from "@/components/shared/DepartmentsDirectory"
import { RemoteImage } from "@/components/shared/RemoteImage"
import { ConfirmDialog } from "./ConfirmDialog"
import { ImageUpload } from "./ImageUpload"
import { toast } from "sonner"
import {
  ImageIcon,
  Loader2,
  Pencil,
  Plus,
  Stethoscope,
  Trash2,
  UserCircle,
} from "lucide-react"

const LIMIT = 10

function toasts(error: unknown, fallback: string) {
  const msgs = error instanceof ApiError ? error.messages : [fallback]
  msgs.forEach((m) => toast.error(m))
}

function deptIdOf(d: DoctorProfile): string {
  return typeof d.departmentId === "object" && d.departmentId !== null
    ? d.departmentId._id
    : d.departmentId
}
function deptNameOf(d: DoctorProfile): string {
  return typeof d.departmentId === "object" && d.departmentId !== null
    ? d.departmentId.name
    : ""
}
function userNameOf(d: DoctorProfile): string {
  return typeof d.userId === "object" && d.userId !== null
    ? (d.userId as User).name
    : "Doctor"
}

export function DoctorsManager() {
  const [page, setPage] = React.useState(1)
  const [onboardOpen, setOnboardOpen] = React.useState(false)
  const [editing, setEditing] = React.useState<DoctorProfile | null>(null)
  const [deleting, setDeleting] = React.useState<DoctorProfile | null>(null)
  const [picturing, setPicturing] = React.useState<DoctorProfile | null>(null)

  const { data, isLoading, isError, refetch } = useDoctors({ page, limit: LIMIT })
  const remove = useDeleteDoctor()
  const removeUser = useDeleteStaff()

  const confirmDelete = async () => {
    if (!deleting) return
    const userId =
      typeof deleting.userId === "object" && deleting.userId !== null
        ? deleting.userId._id
        : deleting.userId
    try {
      await remove.mutateAsync(deleting._id)
      // Best-effort: also remove the linked DOCTOR user to keep the staff list clean.
      try {
        await removeUser.mutateAsync(userId)
      } catch {
        /* profile removed; user cleanup is non-critical */
      }
      toast.success("Doctor removed")
      setDeleting(null)
    } catch (error) {
      toasts(error, "Couldn't remove the doctor.")
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          Onboard consultants, assign them to departments, and manage profiles.
        </p>
        <Button onClick={() => setOnboardOpen(true)} className="gap-1.5">
          <Plus className="size-4" /> Onboard doctor
        </Button>
      </div>

      <Card>
        <CardContent className="overflow-x-auto p-0">
          {isLoading ? (
            <div className="space-y-2 p-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full rounded-lg" />
              ))}
            </div>
          ) : isError ? (
            <div className="p-4">
              <DirectoryError onRetry={refetch} />
            </div>
          ) : data && data.data.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Designation</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>BMDC</TableHead>
                  <TableHead className="w-20">Photo</TableHead>
                  <TableHead className="w-28 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.data.map((d) => (
                  <TableRow key={d._id}>
                    <TableCell className="font-medium">
                      {userNameOf(d)}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {d.designation}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {deptNameOf(d) || "—"}
                    </TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {d.bmdcReg}
                    </TableCell>
                    <TableCell>
                      <div className="flex size-9 items-center justify-center overflow-hidden rounded-full border border-border bg-muted">
                        <RemoteImage
                          src={d.profilePicture}
                          alt={userNameOf(d)}
                          width={36}
                          height={36}
                          className="size-full object-cover"
                          fallback={
                            <UserCircle className="size-5 text-muted-foreground" />
                          }
                        />
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => setPicturing(d)}
                          aria-label="Manage photo"
                        >
                          <ImageIcon className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => setEditing(d)}
                          aria-label="Edit"
                        >
                          <Pencil className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="text-destructive hover:bg-destructive/10"
                          onClick={() => setDeleting(d)}
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
              No doctors yet. Click <strong>Onboard doctor</strong> to add one.
            </p>
          )}
        </CardContent>
      </Card>

      {data && data.data.length > 0 && (
        <Pagination page={page} meta={data.meta} onPageChange={setPage} />
      )}

      <OnboardDialog open={onboardOpen} onOpenChange={setOnboardOpen} />

      <EditDialog
        doctor={editing}
        onOpenChange={(o) => !o && setEditing(null)}
      />

      <PictureDialog
        doctor={picturing}
        onOpenChange={(o) => !o && setPicturing(null)}
      />

      <ConfirmDialog
        open={!!deleting}
        onOpenChange={(o) => !o && setDeleting(null)}
        title="Remove doctor?"
        description={
          deleting
            ? `${userNameOf(deleting)}'s profile and login account will be removed.`
            : ""
        }
        confirmLabel="Remove"
        onConfirm={confirmDelete}
        loading={remove.isPending}
      />
    </div>
  )
}

/* ─── Department/unit selector (shared) ───────────────────────────────── */

function useDepartmentOptions() {
  return useDepartments({ page: 1, limit: 100 })
}

/** Renders a department Select; resolves units for the chosen department. */
function DepartmentUnitFields({
  value,
  onChange,
  departments,
  unitValue,
  onUnitChange,
}: {
  value: string
  onChange: (id: string) => void
  departments: Department[]
  unitValue?: string
  onUnitChange: (id: string | undefined) => void
}) {
  const selected = departments.find((d) => d._id === value)
  const units = selected?.units ?? []
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="space-y-1.5">
        <Label className="text-sm font-medium">Department *</Label>
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select department" />
          </SelectTrigger>
          <SelectContent>
            {departments.map((d) => (
              <SelectItem key={d._id} value={d._id}>
                {d.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {units.length > 0 && (
        <div className="space-y-1.5">
          <Label className="text-sm font-medium">Unit (optional)</Label>
          <Select
            value={unitValue ?? "__none__"}
            onValueChange={(v) => onUnitChange(v === "__none__" ? undefined : v)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="No specific unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__none__">No specific unit</SelectItem>
              {units.map((u) => (
                <SelectItem key={u._id ?? u.code} value={u._id ?? u.code}>
                  {u.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  )
}

/* ─── Onboard form (create DOCTOR user + profile, with cleanup) ────────── */

const onboardSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().email("Valid email required"),
  password: z.string().min(8, "Min 8 characters"),
  phone: z.string().optional(),
  bmdcReg: z.string().trim().min(1, "BMDC reg is required"),
  designation: z.string().trim().min(1, "Designation is required"),
  departmentId: z.string().min(1, "Select a department"),
  unitId: z.string().optional(),
  bio: z.string().optional(),
  availability: z.string().optional(),
})
type OnboardValues = z.infer<typeof onboardSchema>

function OnboardDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[88vh] overflow-y-auto sm:max-w-lg">
        {open && <OnboardForm key="new" onDone={() => onOpenChange(false)} />}
      </DialogContent>
    </Dialog>
  )
}

function OnboardForm({ onDone }: { onDone: () => void }) {
  const createStaff = useCreateStaff()
  const createDoctor = useCreateDoctor()
  const removeUser = useDeleteStaff() // for rollback on a failed onboarding
  const { data: deptData } = useDepartmentOptions()
  const departments = deptData?.data ?? []
  const [specialties, setSpecialties] = React.useState<string[]>([])
  const [qualifications, setQualifications] = React.useState<string[]>([])

  const form = useForm<OnboardValues>({
    resolver: zodResolver(onboardSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      bmdcReg: "",
      designation: "",
      departmentId: "",
      unitId: "",
      bio: "",
      availability: "",
    },
  })
  const unitId = useWatch({ control: form.control, name: "unitId" })

  const onSubmit = async (values: OnboardValues) => {
    const busy = createStaff.isPending || createDoctor.isPending
    if (busy) return
    let createdUserId: string | undefined
    try {
      // 1. Create the DOCTOR login account.
      const user = await createStaff.mutateAsync({
        email: values.email,
        password: values.password,
        name: values.name,
        role: Role.DOCTOR,
        phone: values.phone?.trim() || undefined,
      })
      createdUserId = user._id

      // 2. Create the doctor profile linked to that account.
      await createDoctor.mutateAsync({
        userId: user._id,
        bmdcReg: values.bmdcReg,
        designation: values.designation,
        departmentId: values.departmentId,
        unitId: values.unitId || undefined,
        specialties: specialties.length ? specialties : undefined,
        qualifications: qualifications.length ? qualifications : undefined,
        bio: values.bio?.trim() || undefined,
        availability: values.availability?.trim() || undefined,
      })

      toast.success("Doctor onboarded")
      onDone()
    } catch (error) {
      // Roll back the created login account so we don't leave an orphan DOCTOR user.
      if (createdUserId) {
        try {
          await removeUser.mutateAsync(createdUserId)
        } catch {
          /* swallow cleanup errors; surface the original failure */
        }
      }
      toasts(error, "Couldn't onboard the doctor.")
    }
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Stethoscope className="size-5 text-primary" /> Onboard doctor
        </DialogTitle>
        <DialogDescription>
          Creates a login account and a doctor profile in one step.
        </DialogDescription>
      </DialogHeader>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 px-1"
        autoComplete="off"
      >
        <SectionLabel>Login account</SectionLabel>
        <Field label="Full name" required error={form.formState.errors.name?.message}>
          <Input {...form.register("name")} placeholder="Dr. Rahim Uddin" />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Email" required error={form.formState.errors.email?.message}>
            <Input type="email" {...form.register("email")} placeholder="doctor@nins.gov.bd" />
          </Field>
          <Field label="Phone">
            <Input {...form.register("phone")} placeholder="+8801…" />
          </Field>
        </div>
        <Field label="Password" required error={form.formState.errors.password?.message}>
          <Input type="password" {...form.register("password")} placeholder="Min 8 characters" />
        </Field>

        <SectionLabel>Profile</SectionLabel>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="BMDC reg" required error={form.formState.errors.bmdcReg?.message}>
            <Input {...form.register("bmdcReg")} placeholder="A-12345" />
          </Field>
          <Field label="Designation" required error={form.formState.errors.designation?.message}>
            <Input {...form.register("designation")} placeholder="Consultant" />
          </Field>
        </div>

        <Controller
          control={form.control}
          name="departmentId"
          render={({ field }) => (
            <DepartmentUnitFields
              value={field.value}
              onChange={(id) => {
                field.onChange(id)
                form.setValue("unitId", "")
              }}
              departments={departments}
              unitValue={unitId}
              onUnitChange={(id) => form.setValue("unitId", id ?? "")}
            />
          )}
        />

        <ChipField label="Specialties">
          <ChipInput
            values={specialties}
            onChange={setSpecialties}
            placeholder="Add a specialty + Enter"
          />
        </ChipField>
        <ChipField label="Qualifications">
          <ChipInput
            values={qualifications}
            onChange={setQualifications}
            placeholder="e.g. MBBS, MS"
          />
        </ChipField>

        <Field label="Bio">
          <Textarea {...form.register("bio")} rows={2} placeholder="Optional" />
        </Field>
        <Field label="Availability">
          <Input {...form.register("availability")} placeholder="e.g. Sat–Thu, 9AM–5PM" />
        </Field>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onDone}
            disabled={createStaff.isPending || createDoctor.isPending}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={createStaff.isPending || createDoctor.isPending}
            className="gap-1.5"
          >
            {(createStaff.isPending || createDoctor.isPending) && (
              <Loader2 className="size-4 animate-spin" />
            )}
            Onboard doctor
          </Button>
        </DialogFooter>
      </form>
    </>
  )
}

/* ─── Edit form (profile fields only) ─────────────────────────────────── */

const editSchema = z.object({
  bmdcReg: z.string().trim().min(1, "BMDC reg is required"),
  designation: z.string().trim().min(1, "Designation is required"),
  departmentId: z.string().min(1, "Select a department"),
  unitId: z.string().optional(),
  bio: z.string().optional(),
  availability: z.string().optional(),
})
type EditValues = z.infer<typeof editSchema>

function EditDialog({
  doctor,
  onOpenChange,
}: {
  doctor: DoctorProfile | null
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Dialog open={!!doctor} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
        {doctor && (
          <EditForm
            key={doctor._id}
            doctor={doctor}
            onDone={() => onOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

function EditForm({
  doctor,
  onDone,
}: {
  doctor: DoctorProfile
  onDone: () => void
}) {
  const update = useUpdateDoctor()
  const { data: deptData } = useDepartmentOptions()
  const departments = deptData?.data ?? []
  const [specialties, setSpecialties] = React.useState<string[]>(
    doctor.specialties ?? [],
  )
  const [qualifications, setQualifications] = React.useState<string[]>(
    doctor.qualifications ?? [],
  )

  const form = useForm<EditValues>({
    resolver: zodResolver(editSchema),
    defaultValues: {
      bmdcReg: doctor.bmdcReg,
      designation: doctor.designation,
      departmentId: deptIdOf(doctor),
      unitId: doctor.unitId ?? "",
      bio: doctor.bio ?? "",
      availability: doctor.availability ?? "",
    },
  })
  const unitId = useWatch({ control: form.control, name: "unitId" })

  const onSubmit = async (values: EditValues) => {
    try {
      await update.mutateAsync({
        id: doctor._id,
        body: {
          bmdcReg: values.bmdcReg,
          designation: values.designation,
          departmentId: values.departmentId,
          unitId: values.unitId || undefined,
          specialties: specialties.length ? specialties : undefined,
          qualifications: qualifications.length ? qualifications : undefined,
          bio: values.bio?.trim() || undefined,
          availability: values.availability?.trim() || undefined,
        },
      })
      toast.success("Doctor updated")
      onDone()
    } catch (error) {
      toasts(error, "Couldn't update the doctor.")
    }
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Pencil className="size-5 text-primary" /> Edit {userNameOf(doctor)}
        </DialogTitle>
        <DialogDescription>Update the doctor profile.</DialogDescription>
      </DialogHeader>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 px-1"
        autoComplete="off"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="BMDC reg" required error={form.formState.errors.bmdcReg?.message}>
            <Input {...form.register("bmdcReg")} />
          </Field>
          <Field label="Designation" required error={form.formState.errors.designation?.message}>
            <Input {...form.register("designation")} />
          </Field>
        </div>

        <Controller
          control={form.control}
          name="departmentId"
          render={({ field }) => (
            <DepartmentUnitFields
              value={field.value}
              onChange={(id) => {
                field.onChange(id)
                form.setValue("unitId", "")
              }}
              departments={departments}
              unitValue={unitId}
              onUnitChange={(id) => form.setValue("unitId", id ?? "")}
            />
          )}
        />

        <ChipField label="Specialties">
          <ChipInput values={specialties} onChange={setSpecialties} />
        </ChipField>
        <ChipField label="Qualifications">
          <ChipInput values={qualifications} onChange={setQualifications} />
        </ChipField>
        <Field label="Bio">
          <Textarea {...form.register("bio")} rows={2} />
        </Field>
        <Field label="Availability">
          <Input {...form.register("availability")} />
        </Field>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onDone}
            disabled={update.isPending}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={update.isPending} className="gap-1.5">
            {update.isPending && <Loader2 className="size-4 animate-spin" />}
            Save changes
          </Button>
        </DialogFooter>
      </form>
    </>
  )
}

/* ─── Profile picture dialog ──────────────────────────────────────────── */

function PictureDialog({
  doctor,
  onOpenChange,
}: {
  doctor: DoctorProfile | null
  onOpenChange: (open: boolean) => void
}) {
  const upload = useUploadDoctorPicture()
  const onUpload = async (file: File) => {
    if (!doctor) return
    try {
      await upload.mutateAsync({ id: doctor._id, file })
      toast.success("Photo updated")
      onOpenChange(false)
    } catch (error) {
      toasts(error, "Couldn't upload the photo.")
    }
  }
  return (
    <Dialog open={!!doctor} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Profile photo</DialogTitle>
          <DialogDescription>
            {doctor ? userNameOf(doctor) : "Doctor"} — JPEG, PNG, or WebP up to
            5&nbsp;MB.
          </DialogDescription>
        </DialogHeader>
        <div className="px-1 py-2">
          <ImageUpload
            currentUrl={doctor?.profilePicture}
            onUpload={onUpload}
            loading={upload.isPending}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

/* ─── small shared bits ───────────────────────────────────────────────── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-heading text-xs font-semibold tracking-wider text-muted-foreground uppercase">
      {children}
    </h3>
  )
}

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

function ChipField({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium">{label}</Label>
      {children}
    </div>
  )
}
