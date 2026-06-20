import { DashboardShell } from "@/components/dashboard/DashboardShell"
import { TicketsDirectory } from "@/components/patient/TicketsDirectory"
import { Role } from "@/types"

export const metadata = {
  title: "My Tickets | NINS",
}

export default function TicketsPage() {
  return (
    <DashboardShell allowedRoles={[Role.PATIENT]} title="My Tickets">
      <TicketsDirectory />
    </DashboardShell>
  )
}
