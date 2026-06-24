import { DashboardShell } from "@/components/dashboard/DashboardShell"
import { ReportsExport } from "@/components/admin/ReportsExport"
import { Role } from "@/types"

export const metadata = {
  title: "Reports | NINS",
}

export default function AdminReportsPage() {
  return (
    <DashboardShell
      allowedRoles={[Role.SUPER_ADMIN, Role.HOSPITAL_STAFF]}
      title="Reports"
    >
      <ReportsExport />
    </DashboardShell>
  )
}
