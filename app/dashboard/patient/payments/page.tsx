import { DashboardShell } from "@/components/dashboard/DashboardShell"
import { PaymentsDirectory } from "@/components/patient/PaymentsDirectory"
import { Role } from "@/types"

export const metadata = {
  title: "Payments | NINS",
}

export default function PaymentsPage() {
  return (
    <DashboardShell allowedRoles={[Role.PATIENT]} title="Payments">
      <PaymentsDirectory />
    </DashboardShell>
  )
}
