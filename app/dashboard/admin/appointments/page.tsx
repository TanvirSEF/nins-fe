import dynamic from "next/dynamic"
import { DashboardShell } from "@/components/dashboard/DashboardShell"
import { Skeleton } from "@/components/ui/skeleton"
import { Role } from "@/types"

export const metadata = {
  title: "Appointments | NINS",
}

// Code-split: AppointmentsManagement on-demand only.
const AppointmentsManagement = dynamic(
  () =>
    import("@/components/admin/AppointmentsManagement").then((m) => ({
      default: m.AppointmentsManagement,
    })),
  {
    ssr: false,
    loading: () => <PageSkeleton />,
  },
)

export default function AdminAppointmentsPage() {
  return (
    <DashboardShell
      allowedRoles={[Role.SUPER_ADMIN, Role.HOSPITAL_STAFF]}
      title="Appointments"
    >
      <AppointmentsManagement />
    </DashboardShell>
  )
}

function PageSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-44" />
        <Skeleton className="h-9 w-36" />
      </div>
      <Skeleton className="h-10 w-full" />
      <div className="space-y-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-14 w-full rounded-lg" />
        ))}
      </div>
    </div>
  )
}
