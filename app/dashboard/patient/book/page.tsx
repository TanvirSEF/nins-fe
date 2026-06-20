import { DashboardShell } from "@/components/dashboard/DashboardShell"
import { BookingWizard } from "@/components/patient/BookingWizard"
import { Role } from "@/types"

export const metadata = {
  title: "Book Appointment | NINS",
}

export default function BookAppointmentPage() {
  return (
    <DashboardShell allowedRoles={[Role.PATIENT]} title="Book Appointment">
      <BookingWizard />
    </DashboardShell>
  )
}
