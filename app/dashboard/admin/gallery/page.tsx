import dynamic from "next/dynamic"
import { DashboardShell } from "@/components/dashboard/DashboardShell"
import { Skeleton } from "@/components/ui/skeleton"
import { Role } from "@/types"

export const metadata = {
  title: "Gallery | NINS",
}

// Code-split: GalleryManager is ~17KB of JS.
const GalleryManager = dynamic(
  () =>
    import("@/components/admin/GalleryManager").then((m) => ({
      default: m.GalleryManager,
    })),
  {
    ssr: false,
    loading: () => <PageSkeleton />,
  },
)

export default function GalleryManagementPage() {
  return (
    <DashboardShell
      allowedRoles={[Role.SUPER_ADMIN, Role.HOSPITAL_STAFF]}
      title="Gallery"
    >
      <GalleryManager />
    </DashboardShell>
  )
}

function PageSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-9 w-36" />
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="aspect-video w-full rounded-xl" />
        ))}
      </div>
    </div>
  )
}
