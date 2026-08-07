"use client"

import * as React from "react"
import Link from "next/link"
import { Bell, FileText, ArrowRight, Download, Calendar, Tag } from "lucide-react"

const noticeCategories = ["All Notices", "General", "NOC & Orders", "Academic", "Tender"]

const noticesData = [
  {
    id: 1,
    title: "NOC for Passport Application of Specialist Medical Officer",
    category: "NOC & Orders",
    date: "AUG 05, 2026",
    fileSize: "1.2 MB",
    isNew: true,
  },
  {
    id: 2,
    title: "Schedule of MD/MS Residency Phase-A & Phase-B Examination 2026",
    category: "Academic",
    date: "AUG 03, 2026",
    fileSize: "850 KB",
    isNew: true,
  },
  {
    id: 3,
    title: "Specialized OPD Registration Timings & Holiday Circular for Independence Month",
    category: "General",
    date: "JUL 28, 2026",
    fileSize: "620 KB",
    isNew: false,
  },
  {
    id: 4,
    title: "Invitation for Tender: Supply of High-Resolution Neuro-Imaging Reagents",
    category: "Tender",
    date: "JUL 22, 2026",
    fileSize: "2.4 MB",
    isNew: false,
  },
  {
    id: 5,
    title: "Office Order: Appointment & Rotation Duties for ICU/HDU Medical Officers",
    category: "NOC & Orders",
    date: "JUL 15, 2026",
    fileSize: "1.1 MB",
    isNew: false,
  },
]

export function NoticeSection() {
  const [activeCategory, setActiveCategory] = React.useState("All Notices")

  const filteredNotices = noticesData.filter(
    (item) => activeCategory === "All Notices" || item.category === activeCategory
  )

  return (
    <section className="relative overflow-hidden bg-slate-50/70 py-16 lg:py-24 dark:bg-slate-950/60 border-t border-slate-100 dark:border-white/5">
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-10 border-b border-slate-200/80 dark:border-white/10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1 text-xs font-semibold text-primary">
              <Bell className="h-3.5 w-3.5" />
              Official Bulletin
            </div>
            <h2 className="font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Notice Board &amp; Announcements
            </h2>
            <p className="text-sm text-muted-foreground max-w-xl">
              Stay updated with the latest official circulars, NOC approvals, tender notices, and academic announcements from NINS.
            </p>
          </div>

          <Link
            href="/notice"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground shadow-sm transition-all hover:bg-primary/95 shrink-0"
          >
            View All Notices
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Category Tabs */}
        <div className="mt-8 flex flex-wrap items-center gap-2">
          {noticeCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-white text-muted-foreground hover:bg-slate-100 hover:text-foreground dark:bg-slate-900 dark:hover:bg-slate-800"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Notice Items List */}
        <div className="mt-6 divide-y divide-slate-200/80 rounded-2xl border border-slate-200/80 bg-white shadow-sm dark:divide-white/10 dark:border-white/10 dark:bg-slate-900">
          {filteredNotices.map((notice) => (
            <div
              key={notice.id}
              className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 transition-all hover:bg-slate-50/80 dark:hover:bg-slate-800/40"
            >
              <div className="flex items-start gap-4 min-w-0">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-105">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="space-y-1.5 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700 dark:bg-white/10 dark:text-slate-300">
                      <Tag className="h-3 w-3 text-primary" />
                      {notice.category}
                    </span>
                    {notice.isNew && (
                      <span className="rounded bg-rose-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-rose-600 dark:text-rose-400">
                        NEW
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {notice.date}
                    </span>
                  </div>
                  <h3 className="font-heading text-sm font-bold text-foreground transition-colors group-hover:text-primary leading-snug">
                    {notice.title}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                <span className="text-[11px] font-medium text-muted-foreground hidden sm:inline">
                  PDF ({notice.fileSize})
                </span>
                <button
                  onClick={() => alert(`Downloading notice #${notice.id}...`)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200/80 bg-slate-50 px-3.5 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-primary hover:text-primary-foreground hover:border-primary dark:border-white/10 dark:bg-slate-800"
                >
                  <Download className="h-3.5 w-3.5" />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
