import { DashboardShell } from "@/components/dashboard/DashboardShell"
import { GalleryManager } from "@/components/admin/GalleryManager"
import { Role } from "@/types"

export const metadata = {
  title: "Gallery | NINS",
}

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
