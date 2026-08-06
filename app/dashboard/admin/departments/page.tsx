import dynamic from "next/dynamic"
import { DashboardShell } from "@/components/dashboard/DashboardShell"
import { Skeleton } from "@/components/ui/skeleton"
import { Role } from "@/types"

export const metadata = {
  title: "Departments | NINS",
}

// Code-split: DepartmentsManager is ~14KB of JS.
const DepartmentsManager = dynamic(
  () =>
    import("@/components/admin/DepartmentsManager").then((m) => ({
      default: m.DepartmentsManager,
    })),
  {
    ssr: false,
    loading: () => <PageSkeleton />,
  },
)

export default function AdminDepartmentsPage() {
  return (
    <DashboardShell
      allowedRoles={[Role.SUPER_ADMIN, Role.HOSPITAL_STAFF]}
      title="Departments"
    >
      <DepartmentsManager />
    </DashboardShell>
  )
}

function PageSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-44" />
        <Skeleton className="h-9 w-40" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-32 w-full rounded-xl" />
        ))}
      </div>
    </div>
  )
}
