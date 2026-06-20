"use client"

import { DashboardShell } from "@/components/dashboard/DashboardShell"
import { RoleOverview } from "@/components/dashboard/RoleOverview"
import { Role } from "@/types"

export default function PatientDashboardPage() {
  return (
    <DashboardShell allowedRoles={[Role.PATIENT]} title="Patient Portal">
      <RoleOverview />
    </DashboardShell>
  )
}
