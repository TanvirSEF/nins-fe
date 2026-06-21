"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { Activity, LogOut, LayoutDashboard, Menu, X } from "lucide-react"

export function Navbar() {
  const { user, logout, isLoading } = useAuth()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-slate-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all duration-200 group-hover:scale-105">
            <Activity className="h-5 w-5" />
          </div>
          <span className="font-heading text-lg font-bold tracking-tight text-foreground">
            NINS <span className="font-medium text-primary">Enterprise</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/departments"
            className="text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            Departments
          </Link>
          <Link
            href="/doctors"
            className="text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            Doctors
          </Link>
          <Link
            href="/beds"
            className="text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            Beds Status
          </Link>
        </nav>

        {/* Auth CTA Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          {isLoading ? (
            <div className="h-8 w-24 animate-pulse rounded bg-slate-100 dark:bg-white/5" />
          ) : user ? (
            <div className="flex items-center gap-3">
              <span className="max-w-30 truncate text-xs text-muted-foreground">
                {user.name}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push("/dashboard")}
                className="flex h-8 items-center gap-1.5 border-slate-200 text-xs hover:bg-slate-50 hover:text-foreground"
              >
                <LayoutDashboard className="h-3.5 w-3.5" />
                Workspace
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="flex h-8 items-center gap-1.5 text-xs text-destructive hover:bg-destructive/10 hover:text-destructive"
              >
                <LogOut className="h-3.5 w-3.5" />
                Sign Out
              </Button>
            </div>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/login")}
                className="h-8 text-xs text-foreground hover:bg-slate-50"
              >
                Gateway Sign In
              </Button>
              <Button
                size="sm"
                onClick={() => router.push("/register")}
                className="h-8 bg-primary text-xs font-semibold text-primary-foreground hover:bg-primary/95"
              >
                Register File
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex items-center justify-center p-2 text-muted-foreground transition-colors hover:text-foreground md:hidden"
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="animate-in space-y-4 border-b border-slate-100 bg-white px-6 py-4 duration-150 fade-in slide-in-from-top-2 md:hidden dark:border-white/10 dark:bg-slate-950">
          <nav className="flex flex-col gap-3">
            <Link
              href="/departments"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold text-muted-foreground hover:text-foreground"
            >
              Departments
            </Link>
            <Link
              href="/doctors"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold text-muted-foreground hover:text-foreground"
            >
              Doctors
            </Link>
            <Link
              href="/beds"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold text-muted-foreground hover:text-foreground"
            >
              Beds Status
            </Link>
          </nav>

          <div className="flex flex-col gap-2 border-t border-slate-50 pt-2 dark:border-white/5">
            {isLoading ? (
              <div className="h-8 w-full animate-pulse rounded bg-slate-100 dark:bg-white/5" />
            ) : user ? (
              <>
                <div className="px-2 py-1 text-xs text-muted-foreground">
                  Logged in as:{" "}
                  <span className="font-semibold text-foreground">
                    {user.name}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setMobileMenuOpen(false)
                    router.push("/dashboard")
                  }}
                  className="flex h-9 w-full items-center justify-center gap-1.5 border-slate-200 text-xs"
                >
                  <LayoutDashboard className="h-3.5 w-3.5" />
                  Workspace Dashboard
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    setMobileMenuOpen(false)
                    logout()
                  }}
                  className="flex h-9 w-full items-center justify-center gap-1.5 text-xs"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setMobileMenuOpen(false)
                    router.push("/login")
                  }}
                  className="h-9 w-full border-slate-200 text-xs"
                >
                  Gateway Sign In
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    setMobileMenuOpen(false)
                    router.push("/register")
                  }}
                  className="h-9 w-full bg-primary text-xs font-semibold text-primary-foreground hover:bg-primary/95"
                >
                  Register File
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
