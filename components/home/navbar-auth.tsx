"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { LogOut, LayoutDashboard } from "lucide-react"

/**
 * Auth-aware island for the homepage Navbar.
 * Loaded via next/dynamic (ssr: false) so the static nav shell renders
 * immediately on the server without waiting for the auth check.
 */
export function NavbarAuth() {
  const { user, logout, isLoading } = useAuth()
  const router = useRouter()

  if (isLoading) {
    return <div className="h-8 w-24 animate-pulse rounded bg-slate-100 dark:bg-white/5" />
  }

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <span className="max-w-30 truncate text-xs text-muted-foreground">
          {user.name}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push("/dashboard")}
          className="flex h-8 items-center gap-1.5 border-slate-200 text-xs hover:bg-slate-50 hover:text-foreground"
        >
          <LayoutDashboard className="h-3.5 w-3.5" />
          Workspace
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={logout}
          className="flex h-8 items-center gap-1.5 text-xs text-destructive hover:bg-destructive/10 hover:text-destructive"
        >
          <LogOut className="h-3.5 w-3.5" />
          Sign Out
        </Button>
      </div>
    )
  }

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => router.push("/login")}
        className="h-8 text-xs text-foreground hover:bg-slate-50"
      >
        Gateway Sign In
      </Button>
      <Button
        size="sm"
        onClick={() => router.push("/register")}
        className="h-8 bg-primary text-xs font-semibold text-primary-foreground hover:bg-primary/95"
      >
        Register File
      </Button>
    </>
  )
}

/**
 * Mobile version of the auth island (same logic, slightly different layout).
 */
export function NavbarAuthMobile({
  onClose,
}: {
  onClose: () => void
}) {
  const { user, logout, isLoading } = useAuth()
  const router = useRouter()

  if (isLoading) {
    return <div className="h-8 w-full animate-pulse rounded bg-slate-100 dark:bg-white/5" />
  }

  if (user) {
    return (
      <>
        <div className="px-2 py-1 text-xs text-muted-foreground">
          Logged in as:{" "}
          <span className="font-semibold text-foreground">{user.name}</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            onClose()
            router.push("/dashboard")
          }}
          className="flex h-9 w-full items-center justify-center gap-1.5 border-slate-200 text-xs"
        >
          <LayoutDashboard className="h-3.5 w-3.5" />
          Workspace Dashboard
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => {
            onClose()
            logout()
          }}
          className="flex h-9 w-full items-center justify-center gap-1.5 text-xs"
        >
          <LogOut className="h-3.5 w-3.5" />
          Sign Out
        </Button>
      </>
    )
  }

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          onClose()
          router.push("/login")
        }}
        className="h-9 w-full border-slate-200 text-xs"
      >
        Gateway Sign In
      </Button>
      <Button
        size="sm"
        onClick={() => {
          onClose()
          router.push("/register")
        }}
        className="h-9 w-full bg-primary text-xs font-semibold text-primary-foreground hover:bg-primary/95"
      >
        Register File
      </Button>
    </>
  )
}
