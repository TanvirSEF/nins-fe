import { DashboardShell } from "@/components/dashboard/DashboardShell"
import { PathologyDirectory } from "@/components/patient/PathologyDirectory"
import { Role } from "@/types"

export const metadata = {
  title: "Lab Reports | NINS",
}

export default function PatientPathologyPage() {
  return (
    <DashboardShell allowedRoles={[Role.PATIENT]} title="Lab Reports">
      <PathologyDirectory />
    </DashboardShell>
  )
}
