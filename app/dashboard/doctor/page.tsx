"use client"

import { DashboardShell } from "@/components/dashboard/DashboardShell"
import { RoleOverview } from "@/components/dashboard/RoleOverview"
import { Role } from "@/types"

export default function DoctorDashboardPage() {
  return (
    <DashboardShell allowedRoles={[Role.DOCTOR]} title="Clinical Workspace">
      <RoleOverview />
    </DashboardShell>
  )
}
