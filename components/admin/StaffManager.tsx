"use client"

import * as React from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { format, isValid, parseISO } from "date-fns"
import {
  useStaff,
  useCreateStaff,
  useUpdateStaff,
  useDeleteStaff,
} from "@/services/queries/useStaffQuery"
import { useAuth } from "@/hooks/useAuth"
import { ApiError } from "@/lib/api-client"
import { Role, User } from "@/types"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Pagination } from "@/components/shared/Pagination"
import { DirectoryError } from "@/components/shared/DepartmentsDirectory"
import { ConfirmDialog } from "./ConfirmDialog"
import { toast } from "sonner"
import { Loader2, Pencil, Plus, ShieldCheck, Trash2, UserCog } from "lucide-react"

const LIMIT = 10

const ROLE_LABEL: Record<Role, string> = {
  [Role.SUPER_ADMIN]: "Super Admin",
  [Role.HOSPITAL_STAFF]: "Hospital Staff",
  [Role.DOCTOR]: "Doctor",
  [Role.PATIENT]: "Patient",
}

const ROLE_TONE: Record<Role, string> = {
  [Role.SUPER_ADMIN]: "bg-primary/10 text-primary",
  [Role.HOSPITAL_STAFF]: "bg-success/15 text-success",
  [Role.DOCTOR]: "bg-warning/15 text-warning",
  [Role.PATIENT]: "bg-muted text-muted-foreground",
}

const ROLE_OPTIONS = [
  Role.SUPER_ADMIN,
  Role.HOSPITAL_STAFF,
  Role.DOCTOR,
  Role.PATIENT,
] as const

function toasts(error: unknown, fallback: string) {
  const msgs = error instanceof ApiError ? error.messages : [fallback]
  msgs.forEach((m) => toast.error(m))
}

export function StaffManager() {
  const { user: currentUser } = useAuth()
  const [page, setPage] = React.useState(1)
  const [formOpen, setFormOpen] = React.useState(false)
  const [editing, setEditing] = React.useState<User | null>(null)
  const [deleting, setDeleting] = React.useState<User | null>(null)

  const { data, isLoading, isError, refetch } = useStaff({ page, limit: LIMIT })
  const del = useDeleteStaff()

  const openCreate = () => {
    setEditing(null)
    setFormOpen(true)
  }
  const openEdit = (u: User) => {
    setEditing(u)
    setFormOpen(true)
  }

  const confirmDelete = async () => {
    if (!deleting) return
    try {
      await del.mutateAsync(deleting._id)
      toast.success("User deleted")
      setDeleting(null)
    } catch (error) {
      toasts(error, "Couldn't delete the user.")
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          Manage portal users — staff, doctors, and admins. Create accounts,
          assign roles, and revoke access.
        </p>
        <Button onClick={openCreate} className="gap-1.5">
          <Plus className="size-4" /> Add user
        </Button>
      </div>

      <Card>
        <CardContent className="overflow-x-auto p-0">
          {isLoading ? (
            <div className="space-y-2 p-4">
              {Array.from({ length: 5 }).map((_, i) => (
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
                  <TableHead>User</TableHead>
                  <TableHead className="w-36">Role</TableHead>
                  <TableHead className="w-40">Phone</TableHead>
                  <TableHead className="w-32">Joined</TableHead>
                  <TableHead className="w-28 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.data.map((u) => {
                  const isSelf = u._id === currentUser?._id
                  const joined = u.createdAt ? parseISO(u.createdAt) : null
                  return (
                    <TableRow key={u._id}>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="flex items-center gap-1.5 font-medium text-foreground">
                            {u.name}
                            {isSelf && (
                              <span className="text-[10px] font-semibold text-muted-foreground">
                                (you)
                              </span>
                            )}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {u.email}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={ROLE_TONE[u.role]}>
                          {ROLE_LABEL[u.role]}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {u.phone || "—"}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {joined && isValid(joined)
                          ? format(joined, "d MMM yyyy")
                          : "—"}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => openEdit(u)}
                            aria-label="Edit user"
                          >
                            <Pencil className="size-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            className="text-destructive hover:bg-destructive/10 disabled:opacity-40 disabled:hover:bg-transparent"
                            onClick={() => setDeleting(u)}
                            disabled={isSelf}
                            aria-label="Delete user"
                            title={
                              isSelf
                                ? "You can't delete your own account"
                                : "Delete user"
                            }
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          ) : (
            <p className="py-16 text-center text-sm text-muted-foreground">
              No users yet. Click <strong>Add user</strong> to create one.
            </p>
          )}
        </CardContent>
      </Card>

      {data && data.data.length > 0 && (
        <Pagination page={page} meta={data.meta} onPageChange={setPage} />
      )}

      <StaffFormDialog
        open={formOpen}
        user={editing}
        onOpenChange={setFormOpen}
      />

      <ConfirmDialog
        open={!!deleting}
        onOpenChange={(o) => !o && setDeleting(null)}
        title="Delete user?"
        description={
          deleting
            ? `"${deleting.name}" will permanently lose portal access. Linked doctor profiles and records are not deleted.`
            : ""
        }
        confirmLabel="Delete"
        onConfirm={confirmDelete}
        loading={del.isPending}
      />
    </div>
  )
}

/* Create / Edit form */

function buildSchema(isEdit: boolean) {
  return z.object({
    name: z.string().trim().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Enter a valid email"),
    role: z.nativeEnum(Role),
    phone: z
      .string()
      .optional()
      .refine((v) => !v || /^[+0-9]{11,15}$/.test(v), {
        message: "Enter a valid mobile number (e.g. 01712345678)",
      }),
    password: isEdit
      ? z
          .string()
          .optional()
          .refine((v) => !v || v.length >= 8, "Min 8 characters")
      : z.string().min(8, "Min 8 characters"),
  })
}

type FormValues = z.infer<ReturnType<typeof buildSchema>>

function StaffFormDialog({
  open,
  user,
  onOpenChange,
}: {
  open: boolean
  user: User | null
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
        {open && (
          <StaffForm
            key={user?._id ?? "new"}
            user={user}
            onDone={() => onOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

function StaffForm({ user, onDone }: { user: User | null; onDone: () => void }) {
  const { user: currentUser } = useAuth()
  const create = useCreateStaff()
  const update = useUpdateStaff()
  const isEdit = !!user
  // Editing yourself: lock the role selector so you can't lock yourself out.
  const isSelf = isEdit && user?._id === currentUser?._id

  const schema = React.useMemo(() => buildSchema(isEdit), [isEdit])

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
      role: user?.role ?? Role.PATIENT,
      phone: user?.phone ?? "",
      password: "",
    },
  })

  const onSubmit = async (values: FormValues) => {
    try {
      if (isEdit && user) {
        await update.mutateAsync({
          id: user._id,
          body: {
            name: values.name,
            email: values.email,
            role: values.role,
            phone: values.phone?.trim() || undefined,
            ...(values.password ? { password: values.password } : {}),
          },
        })
        toast.success("User updated")
      } else {
        // Create mode: schema guarantees a non-empty password (min 8).
        await create.mutateAsync({
          name: values.name,
          email: values.email,
          role: values.role,
          phone: values.phone?.trim() || undefined,
          password: values.password!,
        })
        toast.success("User created")
      }
      onDone()
    } catch (error) {
      toasts(error, "Couldn't save the user.")
    }
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <UserCog className="size-5 text-primary" />
          {isEdit ? "Edit user" : "New user"}
        </DialogTitle>
        <DialogDescription>
          {isEdit
            ? "Update account details. Leave the password blank to keep the current one."
            : "Create a new portal account and assign a role."}
        </DialogDescription>
      </DialogHeader>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 px-1"
        autoComplete="off"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Full name"
            required
            error={form.formState.errors.name?.message}
          >
            <Input {...form.register("name")} placeholder="e.g. Dr. Rahman" />
          </Field>
          <Field
            label="Email"
            required
            error={form.formState.errors.email?.message}
          >
            <Input
              type="email"
              {...form.register("email")}
              placeholder="user@nins.gov.bd"
            />
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Phone"
            error={form.formState.errors.phone?.message}
          >
            <Input {...form.register("phone")} placeholder="01712345678" />
          </Field>
          <Field
            label="Role"
            required
            error={form.formState.errors.role?.message}
          >
            <Controller
              control={form.control}
              name="role"
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={isSelf}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ROLE_OPTIONS.map((r) => (
                      <SelectItem key={r} value={r}>
                        {ROLE_LABEL[r]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {isSelf && (
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                <ShieldCheck className="size-3" />
                You can&apos;t change your own role.
              </p>
            )}
          </Field>
        </div>

        <Field
          label={isEdit ? "New password (optional)" : "Password"}
          required={!isEdit}
          error={form.formState.errors.password?.message}
        >
          <Input
            type="password"
            {...form.register("password")}
            placeholder={isEdit ? "Leave blank to keep current" : "Min 8 characters"}
          />
        </Field>

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
            {isEdit ? "Save changes" : "Create user"}
          </Button>
        </DialogFooter>
      </form>
    </>
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
