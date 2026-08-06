import dynamic from "next/dynamic"
import { DashboardShell } from "@/components/dashboard/DashboardShell"
import { Skeleton } from "@/components/ui/skeleton"
import { Role } from "@/types"

export const metadata = {
  title: "Payments | NINS",
}

// Code-split: PaymentsOversight is ~15KB of JS.
const PaymentsOversight = dynamic(
  () =>
    import("@/components/admin/PaymentsOversight").then((m) => ({
      default: m.PaymentsOversight,
    })),
  {
    ssr: false,
    loading: () => <PageSkeleton />,
  },
)

export default function PaymentsOversightPage() {
  return (
    <DashboardShell
      allowedRoles={[Role.SUPER_ADMIN, Role.HOSPITAL_STAFF]}
      title="Payments"
    >
      <PaymentsOversight />
    </DashboardShell>
  )
}

function PageSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-36" />
        <Skeleton className="h-9 w-40" />
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-xl" />
        ))}
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
