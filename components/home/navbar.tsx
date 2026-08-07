"use client"

// The outer Navbar shell needs "use client" only for the mobile menu toggle
// (useState). The heavy auth logic lives in navbar-auth.tsx which is loaded
// dynamically — the server shell renders links immediately without waiting for
// the auth network round-trip.

import * as React from "react"
import Link from "next/link"
import dynamic from "next/dynamic"
import { Menu, X } from "lucide-react"

// Auth island — loaded after hydration so static links paint on the server.
// The loading skeleton matches the button dimensions to prevent layout shift.
const NavbarAuth = dynamic(
  () => import("./navbar-auth").then((m) => ({ default: m.NavbarAuth })),
  {
    ssr: false,
    loading: () => (
      <div className="h-8 w-24 animate-pulse rounded bg-slate-100 dark:bg-white/5" />
    ),
  },
)

const NavbarAuthMobile = dynamic(
  () =>
    import("./navbar-auth").then((m) => ({ default: m.NavbarAuthMobile })),
  { ssr: false },
)

const navItems = [
  { label: "Administration", href: "/administration" },
  { label: "Departments", href: "/departments" },
  { label: "Academic", href: "/academic" },
  { label: "Services", href: "/services" },
  { label: "Diagnostic Facilities", href: "/diagnostic-facilities" },
  { label: "Publications", href: "/publications" },
  { label: "NOC", href: "/noc" },
  { label: "IRB", href: "/irb" },
  { label: "Notice", href: "/notice" },
  { label: "Gallery", href: "/gallery" },
  { label: "Forms", href: "/forms" },
]

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-slate-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Desktop Navigation — static, no JS needed */}
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Auth CTA — dynamic client island */}
        <div className="hidden items-center gap-3 md:flex">
          <NavbarAuth />
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
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold text-muted-foreground hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-2 border-t border-slate-50 pt-2 dark:border-white/5">
            <NavbarAuthMobile onClose={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}
    </header>
  )
}
