import { DashboardShell } from "@/components/dashboard/DashboardShell"
import { MedicalRecordsDirectory } from "@/components/patient/MedicalRecordsDirectory"
import { Role } from "@/types"

export const metadata = {
  title: "Medical Records | NINS",
}

export default function MedicalRecordsPage() {
  return (
    <DashboardShell allowedRoles={[Role.PATIENT]} title="Medical Records">
      <MedicalRecordsDirectory />
    </DashboardShell>
  )
}
