import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { NotificationBell } from "@/components/shared/NotificationBell"

/**
 * Sticky dashboard header: sidebar toggle + dynamic page title. Renders inside
 * SidebarInset; height tracks the `--header-height` CSS var set by DashboardShell.
 */
export function SiteHeader({ title }: { title: string }) {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="font-heading text-base font-semibold tracking-tight">
          {title}
        </h1>
        <div className="ml-auto">
          <NotificationBell />
        </div>
      </div>
    </header>
  )
}
