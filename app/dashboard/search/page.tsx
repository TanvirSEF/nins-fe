import { Suspense } from "react"
import { DashboardShell } from "@/components/dashboard/DashboardShell"
import { SearchDirectory } from "@/components/shared/SearchDirectory"
import { Skeleton } from "@/components/ui/skeleton"
import { Role } from "@/types"

export const metadata = {
  title: "Search | NINS",
}

function SearchFallback() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-11 w-full rounded-lg" />
      <Skeleton className="h-16 w-full rounded-xl" />
      <Skeleton className="h-16 w-full rounded-xl" />
    </div>
  )
}

export default function SearchPage() {
  return (
    <DashboardShell
      allowedRoles={[Role.SUPER_ADMIN, Role.HOSPITAL_STAFF, Role.DOCTOR]}
      title="Search"
    >
      <Suspense fallback={<SearchFallback />}>
        <SearchDirectory />
      </Suspense>
    </DashboardShell>
  )
}
