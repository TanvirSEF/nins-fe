"use client"

import Link from "next/link"
import { Activity } from "lucide-react"
import { cn } from "@/lib/utils"
import { NAV_BY_ROLE, type NavItem } from "./nav-config"
import { Role } from "@/types"

interface SidebarProps {
  role: Role
  pathname: string
  onNavigate?: () => void
}

export function Sidebar({ role, pathname, onNavigate }: SidebarProps) {
  const items = NAV_BY_ROLE[role] ?? []

  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      {/* Brand lockup — mirrors the public navbar */}
      <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-primary/15 text-sidebar-primary">
          <Activity className="h-5 w-5" />
        </div>
        <span className="font-heading text-base font-bold tracking-tight">
          NINS{" "}
          <span className="font-medium text-sidebar-primary">Enterprise</span>
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto p-3">
        <p className="px-2 pt-1 pb-2 text-[10px] font-semibold tracking-wider text-sidebar-foreground/50 uppercase">
          Workspace
        </p>
        <div className="space-y-1">
          {items.map((item) => (
            <NavItemRow
              key={item.href}
              item={item}
              pathname={pathname}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t border-sidebar-border px-5 py-4">
        <p className="text-[10px] leading-relaxed text-sidebar-foreground/50">
          National Institute of Neurosciences &amp; Hospital
        </p>
      </div>
    </div>
  )
}

function NavItemRow({
  item,
  pathname,
  onNavigate,
}: {
  item: NavItem
  pathname: string
  onNavigate?: () => void
}) {
  const Icon = item.icon
  const isActive = item.enabled && pathname === item.href

  // Disabled items are inert (never a Link) so unbuilt routes can't 404.
  if (!item.enabled) {
    return (
      <div className="flex cursor-not-allowed items-center justify-between rounded-lg px-2.5 py-2 text-sm text-sidebar-foreground/40">
        <span className="flex items-center gap-2.5">
          <Icon className="h-4 w-4" />
          {item.label}
        </span>
        <span className="rounded-full bg-sidebar-foreground/10 px-1.5 py-0.5 text-[9px] font-semibold tracking-wide text-sidebar-foreground/50 uppercase">
          Soon
        </span>
      </div>
    )
  }

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors",
        isActive
          ? "bg-sidebar-accent text-sidebar-accent-foreground"
          : "text-sidebar-foreground/80 hover:bg-sidebar-foreground/10 hover:text-sidebar-foreground"
      )}
    >
      <Icon className="h-4 w-4" />
      {item.label}
    </Link>
  )
}
