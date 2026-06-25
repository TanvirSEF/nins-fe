import { DashboardShell } from "@/components/dashboard/DashboardShell"
import { LeaveManager } from "@/components/doctor/LeaveManager"
import { Role } from "@/types"

export const metadata = {
  title: "Leave | NINS",
}

export default function DoctorLeavePage() {
  return (
    <DashboardShell allowedRoles={[Role.DOCTOR]} title="Leave">
      <LeaveManager />
    </DashboardShell>
  )
}
