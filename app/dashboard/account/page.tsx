"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useAuth } from "@/hooks/useAuth"
import { useUpdateProfile } from "@/services/queries"
import { ApiError } from "@/lib/api-client"
import { DashboardShell } from "@/components/dashboard/DashboardShell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { toast } from "sonner"
import { Loader2, Save } from "lucide-react"
import { Role } from "@/types"

const accountSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || /^[+0-9]{11,15}$/.test(val), {
      message: "Please enter a valid mobile number (e.g. 01712345678).",
    }),
})

type AccountFormValues = z.infer<typeof accountSchema>

const ROLE_LABELS: Record<Role, string> = {
  [Role.SUPER_ADMIN]: "Super Admin",
  [Role.HOSPITAL_STAFF]: "Hospital Staff",
  [Role.DOCTOR]: "Doctor",
  [Role.PATIENT]: "Patient",
}

export default function AccountPage() {
  const { user, updateUser } = useAuth()
  const updateProfile = useUpdateProfile()

  const {
    register: registerField,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<AccountFormValues>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: user?.name ?? "",
      phone: user?.phone ?? "",
    },
  })

  // Re-hydrate defaults if the session user arrives after first paint.
  React.useEffect(() => {
    if (user) {
      reset({ name: user.name, phone: user.phone ?? "" })
    }
  }, [user, reset])

  if (!user) return null

  const onSubmit = async (values: AccountFormValues) => {
    try {
      const updated = await updateProfile.mutateAsync(values)
      // Sync the live session so the sidebar/header name updates instantly.
      updateUser(updated)
      reset({ name: updated.name, phone: updated.phone ?? "" })
      toast.success("Profile updated successfully.")
    } catch (error) {
      const messages =
        error instanceof ApiError ? error.messages : ["Could not update profile."]
      toast.error(messages.join("; "))
    }
  }

  return (
    <DashboardShell
      allowedRoles={[
        Role.SUPER_ADMIN,
        Role.HOSPITAL_STAFF,
        Role.DOCTOR,
        Role.PATIENT,
      ]}
      title="Account"
    >
      <div className="mx-auto w-full max-w-2xl space-y-6">
        <div className="space-y-1">
          <h1 className="font-heading text-2xl font-semibold tracking-tight">
            Account settings
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage your display name and contact number.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-base">
              Account details
            </CardTitle>
            <CardDescription>
              These fields are managed by your administrator.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Email
              </p>
              <p className="break-all text-sm font-medium">{user.email}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Role
              </p>
              <Badge variant="secondary">{ROLE_LABELS[user.role]}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-base">
              Profile information
            </CardTitle>
            <CardDescription>
              Update how your name and phone appear across the portal.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full name</Label>
                <Input
                  id="name"
                  {...registerField("name")}
                  placeholder="e.g. Dr. Rahman"
                />
                {errors.name && (
                  <p className="text-sm text-destructive">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone number</Label>
                <Input
                  id="phone"
                  {...registerField("phone")}
                  placeholder="e.g. 01712345678"
                />
                {errors.phone && (
                  <p className="text-sm text-destructive">
                    {errors.phone.message}
                  </p>
                )}
              </div>
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={!isDirty || updateProfile.isPending}
                >
                  {updateProfile.isPending ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <Save />
                  )}
                  Save changes
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}
