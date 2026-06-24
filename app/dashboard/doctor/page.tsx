import { DashboardShell } from "@/components/dashboard/DashboardShell"
import { DoctorDashboard } from "@/components/doctor/DoctorDashboard"
import { Role } from "@/types"

export const metadata = {
  title: "Clinical Workspace | NINS",
}

export default function DoctorDashboardPage() {
  return (
    <DashboardShell allowedRoles={[Role.DOCTOR]} title="Clinical Workspace">
      <DoctorDashboard />
    </DashboardShell>
  )
}
