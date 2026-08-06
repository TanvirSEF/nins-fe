import dynamic from "next/dynamic"
import { DashboardShell } from "@/components/dashboard/DashboardShell"
import { Skeleton } from "@/components/ui/skeleton"
import { Role } from "@/types"

export const metadata = {
  title: "Doctors | NINS",
}

// Code-split: DoctorsManager is ~24KB of JS. Loaded only when this route is
// visited — not bundled into the shared dashboard chunk.
const DoctorsManager = dynamic(
  () =>
    import("@/components/admin/DoctorsManager").then((m) => ({
      default: m.DoctorsManager,
    })),
  {
    ssr: false,
    loading: () => <PageSkeleton />,
  },
)

export default function AdminDoctorsPage() {
  return (
    <DashboardShell
      allowedRoles={[Role.SUPER_ADMIN, Role.HOSPITAL_STAFF]}
      title="Doctors"
    >
      <DoctorsManager />
    </DashboardShell>
  )
}

function PageSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-48" />
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
