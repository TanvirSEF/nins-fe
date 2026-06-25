import { DashboardShell } from "@/components/dashboard/DashboardShell"
import { PathologyManagement } from "@/components/admin/PathologyManagement"
import { Role } from "@/types"

export const metadata = {
  title: "Pathology | NINS",
}

export default function PathologyManagementPage() {
  return (
    <DashboardShell
      allowedRoles={[Role.SUPER_ADMIN, Role.HOSPITAL_STAFF]}
      title="Pathology"
    >
      <PathologyManagement />
    </DashboardShell>
  )
}
