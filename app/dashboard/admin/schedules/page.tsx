import dynamic from "next/dynamic"
import { DashboardShell } from "@/components/dashboard/DashboardShell"
import { Skeleton } from "@/components/ui/skeleton"
import { Role } from "@/types"

export const metadata = {
  title: "Schedules | NINS",
}

// Code-split: SchedulesManager is ~12KB of JS.
const SchedulesManager = dynamic(
  () =>
    import("@/components/admin/SchedulesManager").then((m) => ({
      default: m.SchedulesManager,
    })),
  {
    ssr: false,
    loading: () => <PageSkeleton />,
  },
)

export default function AdminSchedulesPage() {
  return (
    <DashboardShell
      allowedRoles={[Role.SUPER_ADMIN, Role.HOSPITAL_STAFF]}
      title="Schedules"
    >
      <SchedulesManager />
    </DashboardShell>
  )
}

function PageSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-9 w-36" />
      </div>
      <div className="space-y-2">
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full rounded-lg" />
        ))}
      </div>
    </div>
  )
}
