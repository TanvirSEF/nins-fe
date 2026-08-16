"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/home/navbar"
import { Footer } from "@/components/home/footer"
import {
  Building2,
  Calendar,
  ArrowLeft,
  Crown,
  History,
  LayoutGrid,
  Table as TableIcon,
  Sparkles,
  User,
} from "lucide-react"

const directorsList = [
  {
    slNo: 1,
    name: "Prof. Dr. Mohammad Nuruzzaman Khan",
    designation: "Director, NINS&H",
    duration: "17/05/2026 to Present",
    status: "Incumbent Director",
    statusColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30 dark:text-emerald-400",
    isCurrent: true,
    isFounding: false,
    image: "/images/Director-NINS.webp",
    profileUrl: "/administration/director",
  },
  {
    slNo: 2,
    name: "Prof. Dr. Kazi Gias Uddin Ahmed",
    designation: "Former Director, NINS&H",
    duration: "19/02/2025 to 16/05/2026",
    status: "Former Director",
    statusColor: "bg-slate-100 text-slate-700 border-slate-200 dark:bg-white/10 dark:text-slate-300",
    isCurrent: false,
    isFounding: false,
    image: "/images/Director-Dr.Kazi_Gias_uddin_Ahmed.webp",
    profileUrl: "#",
  },
  {
    slNo: 3,
    name: "Prof. Dr. Quazi Deen Mohammad",
    designation: "Founding Director of NINS&H",
    duration: "11/01/2012 to 18/02/2025",
    status: "Founding Director (13 Years)",
    statusColor: "bg-amber-500/10 text-amber-600 border-amber-500/30 dark:text-amber-400",
    isCurrent: false,
    isFounding: true,
    image: "/images/Dr.Quazi_Deen_Mohammad.webp",
    profileUrl: "#",
  },
  {
    slNo: 4,
    name: "To be appointed",
    designation: "Joint Director, NINS&H",
    duration: "Awaiting Appointment",
    status: "Upcoming Joint Director",
    statusColor: "bg-slate-100 text-slate-700 border-slate-200 dark:bg-white/10 dark:text-slate-300",
    isCurrent: false,
    isFounding: false,
    image: "",
    profileUrl: "/administration/joint-director",
  },
]

export default function ListOfDirectorsPage() {
  const [viewMode, setViewMode] = React.useState<"cards" | "table">("cards")

  return (
    <div className="flex min-h-screen flex-col bg-slate-50/50 dark:bg-slate-950">
      {/* Top Header Banner */}
      <div className="w-full bg-white border-b print:hidden">
        <div className="mx-auto flex w-full max-w-7xl justify-center px-4 py-2">
          <Link href="/" className="inline-block transition-opacity hover:opacity-95">
            <Image
              src="/images/nins-header.webp"
              alt="National Institute of Neurosciences & Hospital"
              width={1200}
              height={150}
              className="h-auto max-h-[110px] w-auto object-contain"
              priority
            />
          </Link>
        </div>
      </div>

      <Navbar />

      <main className="flex-1 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-6 space-y-10">
          
          {/* Breadcrumb & Top Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-4 dark:border-white/10">
            <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span>/</span>
              <span>Administration</span>
              <span>/</span>
              <span className="text-foreground font-bold">List of Directors</span>
            </div>

            <div className="flex items-center gap-3">
              {/* View Toggle */}
              <div className="flex items-center rounded-xl border border-slate-200 bg-white p-1 shadow-2xs dark:border-white/10 dark:bg-slate-900">
                <button
                  onClick={() => setViewMode("cards")}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                    viewMode === "cards"
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <LayoutGrid className="h-3.5 w-3.5" />
                  Timeline Grid
                </button>
                <button
                  onClick={() => setViewMode("table")}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                    viewMode === "table"
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <TableIcon className="h-3.5 w-3.5" />
                  Official Table
                </button>
              </div>

              <Link
                href="/"
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-foreground shadow-2xs hover:bg-slate-50 dark:border-white/10 dark:bg-slate-900"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to Home
              </Link>
            </div>
          </div>

          {/* Hero Banner Section */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#111827] via-[#1e293b] to-[#0f172a] p-8 lg:p-12 text-white shadow-2xl">
            <div className="pointer-events-none absolute top-0 right-0 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 left-0 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />
            
            <div className="relative z-10 space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-bold text-amber-400 backdrop-blur-md">
                <Crown className="h-3.5 w-3.5" />
                Roll of Honor • Executive Leadership
              </div>
              <h1 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                List of Directors &amp; Joint Directors
              </h1>
              <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed">
                Honoring the founding pioneers and executive directors who established and led the National Institute of Neurosciences &amp; Hospital (NINS&amp;H) from 2012 to the present.
              </p>
            </div>
          </div>

          {/* Render Layout Mode */}
          {viewMode === "cards" ? (
            /* Timeline Cards View */
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
              {directorsList.map((person) => (
                <div
                  key={person.name}
                  className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border bg-white p-6 shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl dark:bg-slate-900 ${
                    person.isCurrent
                      ? "border-emerald-500/50 dark:border-emerald-500/40 ring-1 ring-emerald-500/20"
                      : "border-slate-200/80 dark:border-white/10"
                  }`}
                >
                  {/* Top Header Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 font-mono text-xs font-bold text-slate-700 dark:bg-white/10 dark:text-slate-300">
                      0{person.slNo}
                    </span>
                    <span className={`rounded-md border px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide ${person.statusColor}`}>
                      {person.status}
                    </span>
                  </div>

                  {/* Photo Frame */}
                  <div className="mt-5 relative mx-auto h-56 w-44 overflow-hidden rounded-2xl border border-slate-300 bg-slate-100 shadow-md dark:border-white/15 dark:bg-slate-950 flex items-center justify-center">
                    {person.image ? (
                      <Image
                        src={person.image}
                        alt={person.name}
                        fill
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-slate-400">
                        <User className="h-16 w-16 stroke-[1.25] text-slate-400/60" />
                        <span className="mt-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">To be updated</span>
                      </div>
                    )}
                    {person.isFounding && (
                      <div className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-amber-500 text-slate-950 shadow-md" title="Founding Leader">
                        <Sparkles className="h-4 w-4 fill-current" />
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="mt-5 space-y-2 text-center flex-1 flex flex-col justify-between">
                    <div className="space-y-1">
                      <h3 className="font-heading text-base font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
                        {person.name}
                      </h3>
                      <p className="text-xs font-semibold text-primary">
                        {person.designation}
                      </p>
                    </div>

                    <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50 p-3 text-center space-y-1 dark:border-white/5 dark:bg-slate-950">
                      <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                        <span className="font-bold text-foreground">{person.duration}</span>
                      </div>
                    </div>

                    {person.profileUrl !== "#" && (
                      <div className="pt-3">
                        <Link
                          href={person.profileUrl}
                          className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                        >
                          View Detailed Profile &rarr;
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Modern Data Table View */
            <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xl dark:border-white/10 dark:bg-slate-900">
              <div className="bg-slate-900 p-5 text-white flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-2 font-heading font-bold text-sm">
                  <History className="h-4 w-4 text-amber-400" />
                  Official Registry of Executive Directors
                </div>
                <span className="text-xs font-semibold text-slate-300">
                  Total Records: {directorsList.length}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200/80 bg-slate-50 text-slate-600 font-bold dark:border-white/10 dark:bg-slate-950 dark:text-slate-300">
                      <th className="p-4 w-16 text-center">SI.No.</th>
                      <th className="p-4 w-28 text-center">Photo</th>
                      <th className="p-4">Name &amp; Official Designation</th>
                      <th className="p-4 w-56">Tenure Duration</th>
                      <th className="p-4 w-40 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                    {directorsList.map((item) => (
                      <tr key={item.slNo} className="transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                        <td className="p-4 text-center font-mono font-bold text-muted-foreground">
                          0{item.slNo}
                        </td>
                        <td className="p-4 text-center">
                          <div className="relative mx-auto h-16 w-14 overflow-hidden rounded-xl border border-slate-300 shadow-xs dark:border-white/20">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover object-top"
                            />
                          </div>
                        </td>
                        <td className="p-4 space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-heading text-sm font-bold text-foreground">
                              {item.name}
                            </h4>
                            <span className={`rounded-md border px-2 py-0.5 text-[10px] font-bold ${item.statusColor}`}>
                              {item.status}
                            </span>
                          </div>
                          <p className="text-xs font-semibold text-primary">
                            {item.designation}
                          </p>
                        </td>
                        <td className="p-4">
                          <div className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 font-mono text-xs font-bold text-foreground dark:border-white/10 dark:bg-slate-950">
                            <Calendar className="h-3.5 w-3.5 text-emerald-500" />
                            {item.duration}
                          </div>
                        </td>
                        <td className="p-4 text-center">
                          {item.profileUrl !== "#" ? (
                            <Link
                              href={item.profileUrl}
                              className="inline-flex items-center gap-1 rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary hover:bg-primary hover:text-white transition-colors"
                            >
                              View Profile
                            </Link>
                          ) : (
                            <span className="text-[11px] text-muted-foreground italic">
                              Registry Archive
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  )
}
