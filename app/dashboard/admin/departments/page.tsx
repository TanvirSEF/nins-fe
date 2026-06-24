import { DashboardShell } from "@/components/dashboard/DashboardShell"
import { DepartmentsManager } from "@/components/admin/DepartmentsManager"
import { Role } from "@/types"

export const metadata = {
  title: "Departments | NINS",
}

export default function AdminDepartmentsPage() {
  return (
    <DashboardShell
      allowedRoles={[Role.SUPER_ADMIN, Role.HOSPITAL_STAFF]}
      title="Departments"
    >
      <DepartmentsManager />
    </DashboardShell>
  )
}
