import { DashboardShell } from "@/components/dashboard/DashboardShell"
import { AppointmentsManagement } from "@/components/admin/AppointmentsManagement"
import { Role } from "@/types"

export const metadata = {
  title: "Appointments | NINS",
}

export default function AdminAppointmentsPage() {
  return (
    <DashboardShell
      allowedRoles={[Role.SUPER_ADMIN, Role.HOSPITAL_STAFF]}
      title="Appointments"
    >
      <AppointmentsManagement />
    </DashboardShell>
  )
}
