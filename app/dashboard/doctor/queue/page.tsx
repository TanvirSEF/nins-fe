import { DashboardShell } from "@/components/dashboard/DashboardShell"
import { DoctorQueue } from "@/components/doctor/DoctorQueue"
import { Role } from "@/types"

export const metadata = {
  title: "Patient Queue | NINS",
}

export default function DoctorQueuePage() {
  return (
    <DashboardShell allowedRoles={[Role.DOCTOR]} title="Patient Queue">
      <DoctorQueue />
    </DashboardShell>
  )
}
