"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Activity } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { NavUser } from "@/components/nav-user"
import { getNavForRole, type NavItem } from "@/components/dashboard/nav-config"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

/**
 * Role-aware sidebar (shadcn primitive). Nav items come from
 * `components/dashboard/nav-config.ts` — one source of truth shared with the
 * role overview. Disabled items are inert so unbuilt routes can never 404.
 */
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { role } = useAuth()
  const pathname = usePathname()
  const items = role ? getNavForRole(role) : []

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Activity className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-heading font-semibold">
                    NINS
                  </span>
                  <span className="truncate text-xs text-sidebar-foreground/60">
                    Enterprise
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="flex flex-col gap-1">
            <SidebarMenu className="gap-2">
              {items.map((item) => (
                <NavSidebarRow
                  key={item.href}
                  item={item}
                  pathname={pathname}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}

function NavSidebarRow({
  item,
  pathname,
}: {
  item: NavItem
  pathname: string
}) {
  const Icon = item.icon

  // Disabled → inert button (never a Link) so unbuilt routes can't 404.
  if (!item.enabled) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton
          disabled
          className="text-sidebar-foreground/40 hover:bg-transparent hover:text-sidebar-foreground/40"
        >
          <Icon />
          <span>{item.label}</span>
          <span className="ml-auto text-[10px] font-medium uppercase tracking-wide text-sidebar-foreground/40">
            Soon
          </span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    )
  }

  const isActive = pathname === item.href
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive}>
        <Link href={item.href} aria-current={isActive ? "page" : undefined}>
          <Icon />
          <span>{item.label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}
