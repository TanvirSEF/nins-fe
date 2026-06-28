"use client"

import * as React from "react"
import { RoleGate } from "@/components/shared/RoleGate"

/** Auth gate for every /dashboard/* route. Per-segment access is enforced in each page via <DashboardShell allowedRoles>; the role→home redirect lives in page.tsx (a layout can't render a route — redirecting from here 404'd /dashboard). */
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
