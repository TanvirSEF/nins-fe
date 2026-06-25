import { DashboardShell } from "@/components/dashboard/DashboardShell"
import { PaymentsOversight } from "@/components/admin/PaymentsOversight"
import { Role } from "@/types"

export const metadata = {
  title: "Payments | NINS",
}

export default function PaymentsOversightPage() {
  return (
    <DashboardShell
      allowedRoles={[Role.SUPER_ADMIN, Role.HOSPITAL_STAFF]}
      title="Payments"
    >
      <PaymentsOversight />
    </DashboardShell>
  )
}
