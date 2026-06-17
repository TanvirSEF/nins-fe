"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Activity, LogOut, LayoutDashboard, Menu, X } from "lucide-react";

export function Navbar() {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-slate-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all duration-200 group-hover:scale-105">
            <Activity className="h-5 w-5" />
          </div>
          <span className="font-heading text-lg font-bold tracking-tight text-foreground">
            NINS <span className="text-primary font-medium">Enterprise</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/departments" className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors">
            Departments
          </Link>
          <Link href="/doctors" className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors">
            Doctors
          </Link>
          <Link href="/beds" className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors">
            Beds Status
          </Link>
        </nav>

        {/* Auth CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {isLoading ? (
            <div className="h-8 w-24 animate-pulse rounded bg-slate-100 dark:bg-white/5" />
          ) : user ? (
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground max-w-[120px] truncate">
                {user.name}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push("/dashboard")}
                className="flex items-center gap-1.5 text-xs h-8 border-slate-200 hover:bg-slate-50 hover:text-foreground"
              >
                <LayoutDashboard className="h-3.5 w-3.5" />
                Workspace
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="flex items-center gap-1.5 text-xs text-destructive hover:bg-destructive/10 hover:text-destructive h-8"
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
                className="text-xs hover:bg-slate-50 text-foreground h-8"
              >
                Gateway Sign In
              </Button>
              <Button
                size="sm"
                onClick={() => router.push("/register")}
                className="text-xs bg-primary hover:bg-primary/95 text-primary-foreground font-semibold h-8"
              >
                Register File
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex md:hidden items-center justify-center p-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-100 bg-white px-6 py-4 space-y-4 dark:border-white/10 dark:bg-slate-950 animate-in fade-in slide-in-from-top-2 duration-150">
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

          <div className="pt-2 border-t border-slate-50 dark:border-white/5 flex flex-col gap-2">
            {isLoading ? (
              <div className="h-8 w-full animate-pulse rounded bg-slate-100 dark:bg-white/5" />
            ) : user ? (
              <>
                <div className="text-xs text-muted-foreground px-2 py-1">
                  Logged in as: <span className="font-semibold text-foreground">{user.name}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    router.push("/dashboard");
                  }}
                  className="w-full flex items-center justify-center gap-1.5 text-xs h-9 border-slate-200"
                >
                  <LayoutDashboard className="h-3.5 w-3.5" />
                  Workspace Dashboard
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="w-full flex items-center justify-center gap-1.5 text-xs h-9"
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
                    setMobileMenuOpen(false);
                    router.push("/login");
                  }}
                  className="w-full text-xs h-9 border-slate-200"
                >
                  Gateway Sign In
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    router.push("/register");
                  }}
                  className="w-full text-xs bg-primary hover:bg-primary/95 text-primary-foreground font-semibold h-9"
                >
                  Register File
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
