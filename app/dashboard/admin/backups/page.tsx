import dynamic from "next/dynamic"
import { DashboardShell } from "@/components/dashboard/DashboardShell"
import { Skeleton } from "@/components/ui/skeleton"
import { Role } from "@/types"

export const metadata = {
  title: "Backups | NINS",
}

// Code-split: BackupManager is SUPER_ADMIN only — definitely no need to eager-load.
const BackupManager = dynamic(
  () =>
    import("@/components/admin/BackupManager").then((m) => ({
      default: m.BackupManager,
    })),
  {
    loading: () => <PageSkeleton />,
  },
)

export default function BackupsPage() {
  return (
    <DashboardShell allowedRoles={[Role.SUPER_ADMIN]} title="Backups">
      <BackupManager />
    </DashboardShell>
  )
}

function PageSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-36" />
        <Skeleton className="h-9 w-32" />
      </div>
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full rounded-lg" />
        ))}
      </div>
    </div>
  )
}
