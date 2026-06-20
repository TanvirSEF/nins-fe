"use client"

import * as React from "react"
import { RoleGate } from "@/components/shared/RoleGate"

/**
 * Auth gate for every /dashboard/* route. Role-specific access is enforced
 * inside each page via <DashboardShell allowedRoles>. The role→home redirect
 * lives in `page.tsx` (a layout can't render a route by itself, so redirecting
 * from here left /dashboard 404'ing).
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RoleGate>
      <div className="min-h-screen bg-background">{children}</div>
    </RoleGate>
  )
}
