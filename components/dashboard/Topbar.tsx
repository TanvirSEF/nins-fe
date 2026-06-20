"use client"

import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { LogOut, Menu } from "lucide-react"
import { Role } from "@/types"

const ROLE_LABEL: Record<Role, string> = {
  [Role.PATIENT]: "Patient",
  [Role.DOCTOR]: "Doctor",
  [Role.SUPER_ADMIN]: "Admin",
  [Role.HOSPITAL_STAFF]: "Staff",
}

function initials(name?: string): string {
  if (!name) return "U"
  const parts = name.trim().split(/\s+/)
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase() || "U"
}

interface TopbarProps {
  title: string
  onMenuClick?: () => void
}

export function Topbar({ title, onMenuClick }: TopbarProps) {
  const { user, role, logout } = useAuth()
  const router = useRouter()

  const handleSignOut = () => {
    logout()
    router.push("/login")
  }

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-md md:px-6">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={onMenuClick}
          aria-label="Open navigation"
        >
          <Menu />
        </Button>
        <h1 className="font-heading text-base font-bold tracking-tight text-foreground md:text-lg">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        {role && (
          <Badge variant="secondary" className="hidden sm:inline-flex">
            {ROLE_LABEL[role]}
          </Badge>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar size="sm">
                <AvatarFallback>{initials(user?.name)}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel className="flex flex-col gap-0.5">
              <span className="text-sm font-semibold text-foreground">
                {user?.name ?? "User"}
              </span>
              <span className="text-xs font-normal text-muted-foreground">
                {user?.email}
              </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onClick={handleSignOut}>
              <LogOut />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
