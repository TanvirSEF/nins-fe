"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { LogOut, LayoutDashboard, User, ChevronDown } from "lucide-react"

/**
 * Auth-aware island for the homepage Navbar.
 * Loaded via next/dynamic (ssr: false) so the static nav shell renders
 * immediately on the server without waiting for the auth check.
 */
export function NavbarAuth() {
  const { user, logout, isLoading } = useAuth()
  const router = useRouter()
  const [dropdownOpen, setDropdownOpen] = React.useState(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  if (isLoading) {
    return <div className="h-8 w-24 animate-pulse rounded bg-slate-100 dark:bg-white/5" />
  }

  if (user) {
    return (
      <div className="relative shrink-0" ref={dropdownRef}>
        <div className="flex items-center gap-2">
          {/* User Profile Pill */}
          <button
            onClick={() => setDropdownOpen((v) => !v)}
            className="flex items-center gap-2 rounded-full border border-slate-200/80 bg-slate-50/80 py-1 pl-1.5 pr-2.5 text-xs font-semibold text-foreground transition-colors hover:bg-slate-100 dark:border-white/10 dark:bg-slate-900 dark:hover:bg-slate-800"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
            <span className="max-w-[110px] truncate text-xs font-medium">
              {user.name}
            </span>
            <ChevronDown className={`h-3 w-3 text-muted-foreground transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {/* Quick Workspace Action Button */}
          <Button
            size="sm"
            onClick={() => router.push("/dashboard")}
            className="hidden h-8 items-center gap-1.5 rounded-lg bg-primary px-3 text-xs font-semibold text-primary-foreground shadow-xs hover:bg-primary/95 sm:flex"
          >
            <LayoutDashboard className="h-3.5 w-3.5" />
            Workspace
          </Button>
        </div>

        {/* Profile Dropdown Menu */}
        {dropdownOpen && (
          <div className="animate-in absolute right-0 top-full z-50 mt-2 min-w-[200px] rounded-xl border border-slate-200 bg-white p-2 shadow-xl dark:border-white/10 dark:bg-slate-900">
            <div className="border-b border-slate-100 px-3 py-2 dark:border-white/5">
              <p className="truncate text-xs font-bold text-foreground">{user.name}</p>

            </div>
            <div className="mt-1 space-y-1">
              <button
                onClick={() => {
                  setDropdownOpen(false)
                  router.push("/dashboard")
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <LayoutDashboard className="h-3.5 w-3.5 text-primary" />
                Go to Workspace
              </button>
              <button
                onClick={() => {
                  setDropdownOpen(false)
                  logout()
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-destructive transition-colors hover:bg-destructive/10"
              >
                <LogOut className="h-3.5 w-3.5" />
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2 shrink-0">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => router.push("/login")}
        className="h-8 text-xs text-foreground hover:bg-slate-100"
      >
        Sign In
      </Button>
      <Button
        size="sm"
        onClick={() => router.push("/register")}
        className="h-8 bg-primary text-xs font-semibold text-primary-foreground hover:bg-primary/95"
      >
        Register
      </Button>
    </div>
  )
}

/**
 * Mobile version of the auth island.
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
      <div className="space-y-2">
        <div className="flex items-center gap-2 px-2 py-1">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>
          <span className="truncate text-xs font-semibold text-foreground">{user.name}</span>
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
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          onClose()
          router.push("/login")
        }}
        className="h-9 border-slate-200 text-xs"
      >
        Sign In
      </Button>
      <Button
        size="sm"
        onClick={() => {
          onClose()
          router.push("/register")
        }}
        className="h-9 bg-primary text-xs font-semibold text-primary-foreground hover:bg-primary/95"
      >
        Register
      </Button>
    </div>
  )
}
