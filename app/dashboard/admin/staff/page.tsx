import { DashboardShell } from "@/components/dashboard/DashboardShell"
import { StaffManager } from "@/components/admin/StaffManager"
import { Role } from "@/types"

export const metadata = {
  title: "Staff Management | NINS",
}

export default function StaffManagementPage() {
  return (
    <DashboardShell allowedRoles={[Role.SUPER_ADMIN]} title="Staff">
      <StaffManager />
    </DashboardShell>
  )
}
