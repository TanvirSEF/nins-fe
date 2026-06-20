import { DashboardShell } from "@/components/dashboard/DashboardShell"
import { BookingReturn } from "@/components/patient/BookingReturn"
import { Role } from "@/types"

export const metadata = {
  title: "Booking result | NINS",
}

type Result = "success" | "fail" | "cancel"

function parseResult(v: string | undefined): Result {
  return v === "fail" || v === "cancel" ? v : "success"
}

export default async function BookingReturnPage({
  searchParams,
}: {
  searchParams: Promise<{ result?: string; appointmentId?: string; tranId?: string }>
}) {
  const sp = await searchParams
  const result = parseResult(sp.result)
  const appointmentId = sp.appointmentId ?? ""

  return (
    <DashboardShell allowedRoles={[Role.PATIENT]} title="Booking result">
      <BookingReturn appointmentId={appointmentId} result={result} />
    </DashboardShell>
  )
}
