import { DashboardShell } from "@/components/dashboard/DashboardShell"
import { SchedulesManager } from "@/components/admin/SchedulesManager"
import { Role } from "@/types"

export const metadata = {
  title: "Schedules | NINS",
}

export default function AdminSchedulesPage() {
  return (
    <DashboardShell
      allowedRoles={[Role.SUPER_ADMIN, Role.HOSPITAL_STAFF]}
      title="Schedules"
    >
      <SchedulesManager />
    </DashboardShell>
  )
}
