"use client"

import * as React from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  useDepartments,
  useCreateDepartment,
  useUpdateDepartment,
  useDeleteDepartment,
  useUploadDepartmentImage,
} from "@/services/queries/useDepartmentQuery"
import { ApiError } from "@/lib/api-client"
import type { Department } from "@/types"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Pagination } from "@/components/shared/Pagination"
import { DirectoryError } from "@/components/shared/DepartmentsDirectory"
import { RemoteImage } from "@/components/shared/RemoteImage"
import { ConfirmDialog } from "./ConfirmDialog"
import { ImageUpload } from "./ImageUpload"
import { toast } from "sonner"
import {
  Building2,
  ImageIcon,
  Loader2,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react"

const LIMIT = 10

function toasts(error: unknown, fallback: string) {
  const msgs = error instanceof ApiError ? error.messages : [fallback]
  msgs.forEach((m) => toast.error(m))
}

export function DepartmentsManager() {
  const [page, setPage] = React.useState(1)
  const [formOpen, setFormOpen] = React.useState(false)
  const [editing, setEditing] = React.useState<Department | null>(null)
  const [deleting, setDeleting] = React.useState<Department | null>(null)
  const [imaging, setImaging] = React.useState<Department | null>(null)

  const { data, isLoading, isError, refetch } = useDepartments({ page, limit: LIMIT })
  const del = useDeleteDepartment()

  const openCreate = () => {
    setEditing(null)
    setFormOpen(true)
  }
  const openEdit = (d: Department) => {
    setEditing(d)
    setFormOpen(true)
  }

  const confirmDelete = async () => {
    if (!deleting) return
    try {
      await del.mutateAsync(deleting._id)
      toast.success("Department deleted")
      setDeleting(null)
    } catch (error) {
      toasts(error, "Couldn't delete the department.")
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          Manage hospital departments, their codes, units, and logos.
        </p>
        <Button onClick={openCreate} className="gap-1.5">
          <Plus className="size-4" /> Add department
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
                  <TableHead>Department</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="w-20">Units</TableHead>
                  <TableHead className="w-20">Image</TableHead>
                  <TableHead className="w-28 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.data.map((d) => (
                  <TableRow key={d._id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">
                          {d.name}
                        </span>
                        <Badge variant="secondary" className="font-mono text-[10px]">
                          {d.code}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs truncate text-muted-foreground">
                      {d.description || "—"}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {d.units?.length ?? 0}
                    </TableCell>
                    <TableCell>
                      <div className="flex size-9 items-center justify-center overflow-hidden rounded-md border border-border bg-muted">
                        <RemoteImage
                          src={d.image}
                          alt={d.name}
                          width={36}
                          height={36}
                          className="size-full object-cover"
                          fallback={
                            <ImageIcon className="size-4 text-muted-foreground" />
                          }
                        />
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => setImaging(d)}
                          aria-label="Manage image"
                        >
                          <ImageIcon className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => openEdit(d)}
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
              No departments yet. Click <strong>Add department</strong> to create one.
            </p>
          )}
        </CardContent>
      </Card>

      {data && data.data.length > 0 && (
        <Pagination page={page} meta={data.meta} onPageChange={setPage} />
      )}

      <DepartmentFormDialog
        open={formOpen}
        department={editing}
        onOpenChange={setFormOpen}
      />

      <ConfirmDialog
        open={!!deleting}
        onOpenChange={(o) => !o && setDeleting(null)}
        title="Delete department?"
        description={
          deleting
            ? `"${deleting.name}" will be permanently removed. Doctors and schedules linked to it are not deleted.`
            : ""
        }
        confirmLabel="Delete"
        onConfirm={confirmDelete}
        loading={del.isPending}
      />

      <ImageDialog
        department={imaging}
        onOpenChange={(o) => !o && setImaging(null)}
      />
    </div>
  )
}

/* Create / Edit form */

const schema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  code: z.string().trim().min(1, "Code is required"),
  description: z.string().optional(),
  units: z
    .array(
      z.object({
        name: z.string().min(1, "Required"),
        code: z.string().min(1, "Required"),
      }),
    )
    .optional(),
})
type FormValues = z.infer<typeof schema>

function DepartmentFormDialog({
  open,
  department,
  onOpenChange,
}: {
  open: boolean
  department: Department | null
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
        {open && (
          <DepartmentForm
            key={department?._id ?? "new"}
            department={department}
            onDone={() => onOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

function DepartmentForm({
  department,
  onDone,
}: {
  department: Department | null
  onDone: () => void
}) {
  const create = useCreateDepartment()
  const update = useUpdateDepartment()
  const isEdit = !!department

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: department?.name ?? "",
      code: department?.code ?? "",
      description: department?.description ?? "",
      units: (department?.units ?? []).map((u) => ({
        name: u.name,
        code: u.code,
      })),
    },
  })
  const units = useFieldArray({ control: form.control, name: "units" })

  const onSubmit = async (values: FormValues) => {
    const payload = {
      name: values.name,
      code: values.code.toUpperCase(),
      description: values.description?.trim() || undefined,
      units:
        values.units && values.units.length > 0
          ? values.units.map((u) => ({ name: u.name, code: u.code }))
          : undefined,
    }
    try {
      if (isEdit && department) {
        await update.mutateAsync({ id: department._id, body: payload })
        toast.success("Department updated")
      } else {
        await create.mutateAsync(payload)
        toast.success("Department created")
      }
      onDone()
    } catch (error) {
      toasts(error, "Couldn't save the department.")
    }
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Building2 className="size-5 text-primary" />
          {isEdit ? "Edit department" : "New department"}
        </DialogTitle>
        <DialogDescription>
          {isEdit
            ? "Update department details."
            : "Create a new hospital department."}
        </DialogDescription>
      </DialogHeader>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 px-1"
        autoComplete="off"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Name" required error={form.formState.errors.name?.message}>
            <Input {...form.register("name")} placeholder="e.g. Neurology" />
          </Field>
          <Field label="Code" required error={form.formState.errors.code?.message}>
            <Input
              {...form.register("code")}
              placeholder="e.g. NEURO"
              className="font-mono uppercase"
            />
          </Field>
        </div>

        <Field label="Description">
          <Textarea
            {...form.register("description")}
            rows={2}
            placeholder="Optional"
          />
        </Field>

        {/* Units */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Units (optional)</Label>
          <div className="space-y-2">
            {units.fields.map((field, i) => (
              <div key={field.id} className="flex gap-2">
                <Input
                  placeholder="Unit name"
                  className="flex-1"
                  {...form.register(`units.${i}.name`)}
                />
                <Input
                  placeholder="Code"
                  className="w-28 font-mono uppercase"
                  {...form.register(`units.${i}.code`)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => units.remove(i)}
                  aria-label="Remove unit"
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
            onClick={() => units.append({ name: "", code: "" })}
          >
            <Plus className="size-4" /> Add unit
          </Button>
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
            {isEdit ? "Save changes" : "Create department"}
          </Button>
        </DialogFooter>
      </form>
    </>
  )
}

/* Image upload dialog */

function ImageDialog({
  department,
  onOpenChange,
}: {
  department: Department | null
  onOpenChange: (open: boolean) => void
}) {
  const upload = useUploadDepartmentImage()
  const onUpload = async (file: File) => {
    if (!department) return
    try {
      await upload.mutateAsync({ id: department._id, file })
      toast.success("Image updated")
      onOpenChange(false)
    } catch (error) {
      toasts(error, "Couldn't upload the image.")
    }
  }
  return (
    <Dialog open={!!department} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Department image</DialogTitle>
          <DialogDescription>
            {department?.name} — JPEG, PNG, or WebP up to 5&nbsp;MB.
          </DialogDescription>
        </DialogHeader>
        <div className="px-1 py-2">
          <ImageUpload
            currentUrl={department?.image}
            onUpload={onUpload}
            loading={upload.isPending}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

/* helpers */

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
