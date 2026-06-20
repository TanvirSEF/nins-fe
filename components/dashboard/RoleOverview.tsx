"use client"

import { useAuth } from "@/hooks/useAuth"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { NAV_BY_ROLE } from "./nav-config"
import { Role } from "@/types"

const ROLE_TITLE: Record<Role, string> = {
  [Role.PATIENT]: "Patient Portal",
  [Role.DOCTOR]: "Clinical Workspace",
  [Role.SUPER_ADMIN]: "Admin Console",
  [Role.HOSPITAL_STAFF]: "Staff Console",
}

const ROLE_SUBTITLE: Record<Role, string> = {
  [Role.PATIENT]:
    "Book appointments, view your tickets, and access medical records.",
  [Role.DOCTOR]:
    "Manage your patient queue, clinical records, and prescriptions.",
  [Role.SUPER_ADMIN]:
    "Oversee appointments, bed capacity, and revenue across the institute.",
  [Role.HOSPITAL_STAFF]:
    "Oversee appointments, bed capacity, and revenue across the institute.",
}

/**
 * Shared landing content for each role dashboard. The roadmap of "Modules"
 * cards is derived from the disabled entries in NAV_BY_ROLE, so there is a
 * single source of truth — enabling an item in nav-config both adds it to the
 * sidebar and drops the "Available soon" card here. No fabricated metrics
 * (PRD §11: no placeholder data).
 */
export function RoleOverview() {
  const { user, role } = useAuth()
  if (!role) return null

  const upcoming = NAV_BY_ROLE[role].filter((item) => !item.enabled)
  const firstName = user?.name?.split(/\s+/)[0] ?? "there"

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2.5">
          <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Welcome, {firstName}
          </h1>
          <Badge variant="secondary">{ROLE_TITLE[role]}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">{ROLE_SUBTITLE[role]}</p>
      </div>

      <section className="space-y-4">
        <h2 className="font-heading text-xs font-semibold tracking-wider text-muted-foreground uppercase">
          Modules
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {upcoming.map((item) => {
            const Icon = item.icon
            return (
              <Card key={item.href}>
                <CardHeader>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="pt-1.5">{item.label}</CardTitle>
                  {item.description && (
                    <CardDescription>{item.description}</CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <Badge variant="outline" className="text-muted-foreground">
                    Available soon
                  </Badge>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>
    </div>
  )
}
