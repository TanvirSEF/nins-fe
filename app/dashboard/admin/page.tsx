"use client"

import { DashboardShell } from "@/components/dashboard/DashboardShell"
import { RoleOverview } from "@/components/dashboard/RoleOverview"
import { Role } from "@/types"

export default function AdminDashboardPage() {
  return (
    <DashboardShell
      allowedRoles={[Role.SUPER_ADMIN, Role.HOSPITAL_STAFF]}
      title="Admin Console"
    >
      <RoleOverview />
    </DashboardShell>
  )
}
