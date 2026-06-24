import { DashboardShell } from "@/components/dashboard/DashboardShell"
import { PrescriptionsDirectory } from "@/components/patient/PrescriptionsDirectory"
import { Role } from "@/types"

export const metadata = {
  title: "Prescriptions | NINS",
}

export default function PrescriptionsPage() {
  return (
    <DashboardShell allowedRoles={[Role.PATIENT]} title="Prescriptions">
      <PrescriptionsDirectory />
    </DashboardShell>
  )
}
