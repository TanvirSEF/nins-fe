"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { RoleGate } from "@/components/shared/RoleGate"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { Role } from "@/types"
import { Sidebar } from "./Sidebar"
import { Topbar } from "./Topbar"

interface DashboardShellProps {
  children: React.ReactNode
  /** Roles permitted to view this segment (PRD §10 role→route map). */
  allowedRoles: Role[]
  title: string
}

export function DashboardShell({
  children,
  allowedRoles,
  title,
}: DashboardShellProps) {
  const { role } = useAuth()
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  return (
    <RoleGate allowedRoles={allowedRoles}>
      <div className="min-h-screen bg-background">
        {/* Desktop rail */}
        <aside className="hidden w-64 shrink-0 md:block">
          <div className="fixed inset-y-0 left-0 w-64">
            {role && <Sidebar role={role} pathname={pathname} />}
          </div>
        </aside>

        {/* Mobile drawer */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetContent
            side="left"
            showCloseButton={false}
            className="w-72 p-0"
          >
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            {role && (
              <Sidebar
                role={role}
                pathname={pathname}
                onNavigate={() => setMobileOpen(false)}
              />
            )}
          </SheetContent>
        </Sheet>

        <div className="flex flex-col md:pl-64">
          <Topbar title={title} onMenuClick={() => setMobileOpen(true)} />
          <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </RoleGate>
  )
}
