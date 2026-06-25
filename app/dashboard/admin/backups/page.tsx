import { DashboardShell } from "@/components/dashboard/DashboardShell"
import { BackupManager } from "@/components/admin/BackupManager"
import { Role } from "@/types"

export const metadata = {
  title: "Backups | NINS",
}

export default function BackupsPage() {
  return (
    <DashboardShell allowedRoles={[Role.SUPER_ADMIN]} title="Backups">
      <BackupManager />
    </DashboardShell>
  )
}
