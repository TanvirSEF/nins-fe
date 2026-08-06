"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

/**
 * Auth-aware CTA buttons for the Hero section.
 * Loaded via next/dynamic (ssr: false) so the static hero text, background
 * gradients, and quick-action cards render immediately on the server without
 * waiting for the auth session check.
 */
export function HeroCta() {
  const { user } = useAuth()
  const router = useRouter()

  const handleActionClick = (path: string) => {
    if (!user) {
      router.push(`/login?redirect=${encodeURIComponent(path)}`)
    } else {
      router.push(path)
    }
  }

  return (
    <div className="flex flex-wrap gap-3 pt-2">
      <Button
        onClick={() => handleActionClick("/dashboard/patient/book")}
        className="flex h-11 items-center gap-2 rounded-xl bg-primary px-6 font-semibold text-primary-foreground transition-all duration-200 hover:bg-primary/95 active:scale-[0.98]"
      >
        Book Outpatient Serial
        <ChevronRight className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        onClick={() => router.push("/beds")}
        className="h-11 rounded-xl border-slate-200 bg-white px-6 font-semibold text-muted-foreground transition-all duration-200 hover:bg-slate-50 hover:text-foreground"
      >
        ICU/HDU Bed Board
      </Button>
    </div>
  )
}

/**
 * Auth-aware quick-action cards for the Hero right column.
 * These need the auth check to decide whether to redirect to login first.
 */
export function HeroQuickActions() {
  const { user } = useAuth()
  const router = useRouter()

  const handleActionClick = (path: string) => {
    if (!user) {
      router.push(`/login?redirect=${encodeURIComponent(path)}`)
    } else {
      router.push(path)
    }
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
      {/* Quick Action 1: Outpatient Booking */}
      <div
        onClick={() => handleActionClick("/dashboard/patient/book")}
        className="group cursor-pointer rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/10 hover:shadow-md dark:border-white/5 dark:bg-slate-900/50"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-105 group-hover:bg-primary group-hover:text-primary-foreground">
            {/* Calendar icon inlined to avoid import cost in this tiny island */}
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
          <div className="min-w-0">
            <h3 className="flex items-center gap-1 font-heading text-sm font-bold text-foreground transition-colors group-hover:text-primary">
              Outpatient Serials
            </h3>
            <p className="mt-0.5 max-w-50 truncate text-xs text-muted-foreground sm:max-w-none">
              Schedule checkups with specialists
            </p>
          </div>
        </div>
      </div>

      {/* Quick Action 2: Patient Portal */}
      <div
        onClick={() => handleActionClick("/dashboard/patient")}
        className="group cursor-pointer rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/10 hover:shadow-md dark:border-white/5 dark:bg-slate-900/50"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-success/10 text-success transition-all duration-300 group-hover:scale-105 group-hover:bg-success group-hover:text-success-foreground">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
          </div>
          <div className="min-w-0">
            <h3 className="flex items-center gap-1 font-heading text-sm font-bold text-foreground transition-colors group-hover:text-success">
              Patient Tickets &amp; Rx
            </h3>
            <p className="mt-0.5 truncate text-xs text-muted-foreground">
              Prescriptions and paid tickets
            </p>
          </div>
        </div>
      </div>

      {/* Quick Action 3: Doctor Console */}
      <div
        onClick={() => handleActionClick("/dashboard/doctor")}
        className="group cursor-pointer rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/10 hover:shadow-md dark:border-white/5 dark:bg-slate-900/50"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-info/10 text-info transition-all duration-300 group-hover:scale-105 group-hover:bg-info group-hover:text-info-foreground">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <rect x="10" y="2" width="4" height="4" rx="2" />
              <path d="M12 6v4m-2-2h4" />
            </svg>
          </div>
          <div className="min-w-0">
            <h3 className="flex items-center gap-1 font-heading text-sm font-bold text-foreground transition-colors group-hover:text-info">
              Clinician Console
            </h3>
            <p className="mt-0.5 truncate text-xs text-muted-foreground">
              Outpatient queue &amp; medical records
            </p>
          </div>
        </div>
      </div>

      {/* Quick Action 4: Bed Board */}
      <div
        onClick={() => router.push("/beds")}
        className="group cursor-pointer rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/10 hover:shadow-md dark:border-white/5 dark:bg-slate-900/50"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-warning/10 text-warning transition-all duration-300 group-hover:scale-105 group-hover:bg-warning group-hover:text-warning-foreground">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path d="M2 9V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v3" />
              <path d="M2 11v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H6v-2a2 2 0 0 0-4 0Z" />
            </svg>
          </div>
          <div className="min-w-0">
            <h3 className="flex items-center gap-1 font-heading text-sm font-bold text-foreground transition-colors group-hover:text-warning">
              ICU/HDU Availability
            </h3>
            <p className="mt-0.5 truncate text-xs text-muted-foreground">
              Real-time bed counts &amp; status
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
