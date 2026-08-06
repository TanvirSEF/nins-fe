import dynamic from "next/dynamic"
import { DashboardShell } from "@/components/dashboard/DashboardShell"
import { Skeleton } from "@/components/ui/skeleton"
import { Role } from "@/types"

export const metadata = {
  title: "Staff Management | NINS",
}

// Code-split: StaffManager is ~15KB of JS.
const StaffManager = dynamic(
  () =>
    import("@/components/admin/StaffManager").then((m) => ({
      default: m.StaffManager,
    })),
  {
    ssr: false,
    loading: () => <PageSkeleton />,
  },
)

export default function StaffManagementPage() {
  return (
    <DashboardShell allowedRoles={[Role.SUPER_ADMIN]} title="Staff">
      <StaffManager />
    </DashboardShell>
  )
}

function PageSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-9 w-32" />
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
