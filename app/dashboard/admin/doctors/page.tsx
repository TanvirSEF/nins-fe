import { DashboardShell } from "@/components/dashboard/DashboardShell"
import { DoctorsManager } from "@/components/admin/DoctorsManager"
import { Role } from "@/types"

export const metadata = {
  title: "Doctors | NINS",
}

export default function AdminDoctorsPage() {
  return (
    <DashboardShell
      allowedRoles={[Role.SUPER_ADMIN, Role.HOSPITAL_STAFF]}
      title="Doctors"
    >
      <DoctorsManager />
    </DashboardShell>
  )
}
