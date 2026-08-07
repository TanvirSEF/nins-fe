"use client"

import * as React from "react"
import Link from "next/link"
import { CalendarCheck, BedDouble, FileSpreadsheet, UserSearch, ArrowUpRight, Zap } from "lucide-react"

const patientActions = [
  {
    icon: CalendarCheck,
    title: "OPD Ticket Booking",
    subtitle: "Book outpatient serial online",
    description: "Skip physical queues. Reserve your morning OPD consultation slot for Neurology & Neurosurgery.",
    href: "/dashboard/patient/book",
    color: "from-blue-600 to-indigo-600",
    badge: "Fast Track",
  },
  {
    icon: BedDouble,
    title: "Live ICU & Bed Board",
    subtitle: "Check bed availability",
    description: "Real-time occupancy tracking for 100-Bed Stroke Unit, Neuro-ICU, HDU, and general wards.",
    href: "/beds",
    color: "from-teal-600 to-emerald-600",
    badge: "Real Time",
  },
  {
    icon: FileSpreadsheet,
    title: "Download Test Reports",
    subtitle: "MRI, CT & Lab Results",
    description: "Access high-resolution 3T MRI scans, CT reports, and biochemistry test results securely online.",
    href: "/dashboard/patient/records",
    color: "from-amber-600 to-orange-600",
    badge: "E-Health",
  },
  {
    icon: UserSearch,
    title: "Find Doctor & Roster",
    subtitle: "Consultant duty schedule",
    description: "Search 100+ specialist neurologists & neurosurgeons by room number and OPD visiting days.",
    href: "/doctors",
    color: "from-rose-600 to-pink-600",
    badge: "Directory",
  },
]

export function PatientServicesGrid() {
  return (
    <section className="relative overflow-hidden bg-white py-12 lg:py-16 dark:bg-slate-950 border-t border-slate-100 dark:border-white/5">
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mb-10 text-center space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1 text-xs font-semibold text-primary">
            <Zap className="h-3.5 w-3.5" />
            E-Health Patient Portal
          </div>
          <h2 className="font-heading text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            Quick Patient Action Services
          </h2>
          <p className="text-xs text-muted-foreground max-w-lg mx-auto">
            Access online OPD tickets, check real-time ICU bed availability, and download lab diagnostic reports.
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {patientActions.map((action) => {
            const Icon = action.icon
            return (
              <Link
                key={action.title}
                href={action.href}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50/60 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:bg-white hover:shadow-xl dark:border-white/10 dark:bg-slate-900"
              >
                {/* Top Row: Icon & Badge */}
                <div className="flex items-center justify-between">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${action.color} text-white shadow-md transition-transform duration-300 group-hover:scale-110`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="rounded-full bg-slate-200/80 px-3 py-1 text-[11px] font-bold text-slate-700 dark:bg-white/10 dark:text-slate-300">
                    {action.badge}
                  </span>
                </div>

                {/* Middle Info */}
                <div className="mt-5 space-y-1.5">
                  <h3 className="font-heading text-base font-bold text-foreground transition-colors group-hover:text-primary">
                    {action.title}
                  </h3>
                  <p className="text-xs font-semibold text-primary">
                    {action.subtitle}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed pt-1">
                    {action.description}
                  </p>
                </div>

                {/* Bottom Action Arrow */}
                <div className="mt-5 flex items-center gap-1 text-xs font-bold text-foreground transition-all group-hover:translate-x-1 group-hover:text-primary pt-3 border-t border-slate-200/60 dark:border-white/5">
                  <span>Access Service</span>
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
