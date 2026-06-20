"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { Role } from "@/types"
import { Button } from "@/components/ui/button"
import { ShieldAlert, LogOut, ArrowLeft } from "lucide-react"

interface RoleGateProps {
  children: React.ReactNode
  allowedRoles?: Role[]
}

export function RoleGate({ children, allowedRoles }: RoleGateProps) {
  const { user, role, isLoading, logout } = useAuth()
  const router = useRouter()

  React.useEffect(() => {
    if (!isLoading && !user) {
      router.push(
        `/login?redirect=${encodeURIComponent(window.location.pathname)}`
      )
    }
  }, [isLoading, user, router])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-6">
        <div className="relative flex flex-col items-center gap-4">
          {/* Glowing teal background animation */}
          <div className="absolute h-16 w-16 animate-ping rounded-full bg-primary/20" />
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="animate-pulse font-heading text-sm font-medium text-muted-foreground">
            Verifying clinical authorization...
          </p>
        </div>
      </div>
    )
  }

  // Not logged in (redirection is being triggered by the useEffect)
  if (!user) {
    return null
  }

  // If role checking is needed
  if (allowedRoles && allowedRoles.length > 0) {
    const hasAccess = role && allowedRoles.includes(role)

    if (!hasAccess) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-background p-6">
          <div className="w-full max-w-md rounded-2xl border border-destructive/20 bg-card p-8 shadow-lg transition-all duration-300 hover:shadow-xl dark:border-destructive/10">
            <div className="flex flex-col items-center text-center">
              {/* Emergency indicator circle */}
              <div className="mb-6 flex h-16 w-16 animate-pulse items-center justify-center rounded-full bg-destructive/10 text-destructive">
                <ShieldAlert className="h-8 w-8" />
              </div>

              <h1 className="mb-2 font-heading text-2xl font-bold tracking-tight text-foreground">
                Access Restricted
              </h1>

              <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                Your role (
                <span className="rounded bg-muted px-2 py-0.5 font-mono text-xs font-semibold text-foreground">
                  {role}
                </span>
                ) is not authorized to access this section of the NINS
                Enterprise Portal.
              </p>

              <div className="flex w-full flex-col gap-3">
                <Button
                  variant="outline"
                  onClick={() => router.back()}
                  className="flex items-center justify-center gap-2 hover:bg-accent hover:text-accent-foreground"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Go Back
                </Button>

                <Button
                  variant="destructive"
                  onClick={() => {
                    logout()
                    router.push("/login")
                  }}
                  className="flex items-center justify-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out & Switch Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }

  return <>{children}</>
}
