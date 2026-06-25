"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { Role } from "@/types"
import { Search } from "lucide-react"

const ALLOWED = [Role.SUPER_ADMIN, Role.HOSPITAL_STAFF, Role.DOCTOR]

/**
 * Global search entry in the dashboard header. Visible only to roles the
 * backend permits to search (DOCTOR/STAFF/ADMIN — never patient). Clicking or
 * pressing ⌘K / Ctrl+K opens the search page.
 */
export function HeaderSearch() {
  const { role } = useAuth()
  const router = useRouter()

  const open = React.useCallback(
    () => router.push("/dashboard/search"),
    [router],
  )

  // Global ⌘K / Ctrl+K shortcut.
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        open()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  if (!role || !ALLOWED.includes(role)) return null

  return (
    <button
      type="button"
      onClick={open}
      className="flex h-8 items-center gap-2 rounded-md border border-border bg-muted/40 px-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      aria-label="Search"
    >
      <Search className="size-4" />
      <span className="hidden sm:inline">Search…</span>
      <kbd className="ml-1 hidden rounded border border-border bg-background px-1.5 font-mono text-[10px] font-medium sm:inline">
        ⌘K
      </kbd>
    </button>
  )
}
