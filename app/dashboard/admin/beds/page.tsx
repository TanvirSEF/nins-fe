import { DashboardShell } from "@/components/dashboard/DashboardShell"
import { LiveBedBoard } from "@/components/shared/LiveBedBoard"
import { Role } from "@/types"

export const metadata = {
  title: "Bed Management | NINS",
}

export default function AdminBedsPage() {
  return (
    <DashboardShell
      allowedRoles={[Role.SUPER_ADMIN, Role.HOSPITAL_STAFF]}
      title="Bed Management"
    >
      <LiveBedBoard />
    </DashboardShell>
  )
}
