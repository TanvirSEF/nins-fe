"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { ROLE_HOME } from "@/lib/role-routes"
import { Loader2 } from "lucide-react"

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
