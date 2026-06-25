import { DashboardShell } from "@/components/dashboard/DashboardShell"
import { LeaveReview } from "@/components/admin/LeaveReview"
import { Role } from "@/types"

export const metadata = {
  title: "Leave Requests | NINS",
}

export default function LeaveReviewPage() {
  return (
    <DashboardShell
      allowedRoles={[Role.SUPER_ADMIN, Role.HOSPITAL_STAFF]}
      title="Leave Requests"
    >
      <LeaveReview />
    </DashboardShell>
  )
}
