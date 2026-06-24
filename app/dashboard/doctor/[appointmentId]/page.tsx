import { DashboardShell } from "@/components/dashboard/DashboardShell"
import { Consultation } from "@/components/doctor/Consultation"
import { Role } from "@/types"

export const metadata = {
  title: "Consultation | NINS",
}

export default async function ConsultationPage({
  params,
}: {
  params: Promise<{ appointmentId: string }>
}) {
  const { appointmentId } = await params
  return (
    <DashboardShell allowedRoles={[Role.DOCTOR]} title="Consultation">
      <Consultation appointmentId={appointmentId} />
    </DashboardShell>
  )
}
