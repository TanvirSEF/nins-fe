"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { Role } from "@/types"
import { Loader2 } from "lucide-react"

/** Maps each role to its landing route (single source of truth). */
const ROLE_HOME: Record<Role, string> = {
  [Role.PATIENT]: "/dashboard/patient",
  [Role.DOCTOR]: "/dashboard/doctor",
  [Role.SUPER_ADMIN]: "/dashboard/admin",
  [Role.HOSPITAL_STAFF]: "/dashboard/admin",
}

/**
 * `/dashboard` is a pure redirector: once the session resolves, send the user
 * to their role's home. Renders a loader while resolving.
 */
export default function DashboardIndexPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  React.useEffect(() => {
    if (isLoading || !user) return
    router.replace(ROLE_HOME[user.role] ?? "/login")
  }, [isLoading, user, router])

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Loader2 className="h-6 w-6 animate-spin text-primary" />
    </div>
  )
}
