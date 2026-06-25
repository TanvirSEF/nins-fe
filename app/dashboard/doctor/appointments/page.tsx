import { DashboardShell } from "@/components/dashboard/DashboardShell"
import { DoctorAppointments } from "@/components/doctor/DoctorAppointments"
import { Role } from "@/types"

export const metadata = {
  title: "Appointments | NINS",
}

export default function DoctorAppointmentsPage() {
  return (
    <DashboardShell allowedRoles={[Role.DOCTOR]} title="Appointments">
      <DoctorAppointments />
    </DashboardShell>
  )
}
