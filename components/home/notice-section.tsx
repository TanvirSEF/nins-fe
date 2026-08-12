"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/context/language-context"

interface NoticeItem {
  id: number
  title: string
  category: string
  date: string // e.g. "12 AUG 2026"
  fileSize?: string
  isNew?: boolean
}

const noticesData: NoticeItem[] = [
  {
    id: 1,
    title: "Recruitment Circular (Memo No: BMU/2026/8338)",
    category: "Administration",
    date: "12 AUG 2026",
    fileSize: "1.2 MB",
    isNew: true,
  },
  {
    id: 2,
    title: "HEAT Project এর আওতায় PIN-12256 শীর্ষক উপ-প্রকল্পের পদসমূহের নিয়োগ বিজ্ঞপ্তি",
    category: "Administration",
    date: "09 AUG 2026",
    fileSize: "1.5 MB",
    isNew: true,
  },
  {
    id: 3,
    title: "e-Tender Notice (Memo: BMU-HEAT-13787-G-06)",
    category: "Tender",
    date: "09 AUG 2026",
    fileSize: "890 KB",
    isNew: true,
  },
  {
    id: 4,
    title: "e-Tender Notice (Memo: BMU/Hos/Admin/2026/9505)",
    category: "Tender",
    date: "08 AUG 2026",
    fileSize: "750 KB",
    isNew: true,
  },
  {
    id: 5,
    title: "e-Tender Notice (Memo: BMU/Hos/Admin/2026/9504)",
    category: "Tender",
    date: "08 AUG 2026",
    fileSize: "680 KB",
    isNew: true,
  },
  {
    id: 6,
    title: "Schedule of Oral, Practical Clinical & OSPE Examinations of Diploma Courses July-2026 (Revised on 04-08-2026)",
    category: "Academic",
    date: "04 AUG 2026",
    fileSize: "1.1 MB",
    isNew: false,
  },
  {
    id: 7,
    title: "স্পট কোটেশন বিজ্ঞপ্তি (স্মারক নং-বিএসএমএমইউ/রেডিও/২০২৬/১২২৬, তারিখ-৩০/০৭/২০২৬)",
    category: "Tender",
    date: "04 AUG 2026",
    fileSize: "540 KB",
    isNew: false,
  },
  {
    id: 8,
    title: "Schedule of Oral, Practical & Clinical Examinations of MD, MS, M.Phil (Non Residency) Courses July 2026 (BMU & Affiliated Institute).",
    category: "Academic",
    date: "03 AUG 2026",
    fileSize: "2.1 MB",
    isNew: false,
  },
  {
    id: 9,
    title: "২০২৫-২০২৬ ইং শিক্ষাবর্ষের বি এস সি ইন নার্সিং কোর্সের যোগ দান পত্র।",
    category: "Academic",
    date: "03 AUG 2026",
    fileSize: "420 KB",
    isNew: false,
  },
]

function parseNoticeDate(dateStr: string) {
  const parts = dateStr.replace(",", "").split(" ").filter(Boolean)
  if (parts.length >= 3) {
    if (/^\d+$/.test(parts[0])) {
      return { day: parts[0].padStart(2, "0"), monthYear: `${parts[1]} ${parts[2]}` }
    } else if (/^\d+$/.test(parts[1])) {
      return { day: parts[1].padStart(2, "0"), monthYear: `${parts[0]} ${parts[2]}` }
    }
  }
  return { day: "01", monthYear: dateStr }
}

export function NoticeSection() {
  const { dict } = useLanguage()
  const t = dict.notice

  const categories = [
    { key: "all", label: t.categories.all },
    { key: "Academic", label: t.categories.academic },
    { key: "Administration", label: t.categories.noc || "Administration" },
    { key: "Research", label: t.categories.general || "Research" },
  ]

  const [activeCategoryKey, setActiveCategoryKey] = React.useState("all")

  const filteredNotices = noticesData.filter((item) => {
    if (activeCategoryKey === "all") return true
    if (activeCategoryKey === "Administration") {
      return item.category === "Administration" || item.category === "NOC & Orders"
    }
    if (activeCategoryKey === "Research") {
      return item.category === "Research" || item.category === "General" || item.category === "Tender"
    }
    return item.category === activeCategoryKey
  })

  return (
    <section className="relative bg-slate-50/60 py-12 lg:py-16 dark:bg-slate-950/60 border-t border-slate-100 dark:border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Heading */}
        <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4 sm:mb-6">
          {t.heading || "Notice"}
        </h2>

        {/* Outer Card Wrapper */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-8 shadow-xs dark:border-white/10 dark:bg-slate-900">
          {/* Header Row: Filter Tabs + View All Button */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => {
                const isActive = activeCategoryKey === cat.key
                return (
                  <button
                    key={cat.key}
                    onClick={() => setActiveCategoryKey(cat.key)}
                    className={`rounded-lg px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? "bg-[#094856] text-white dark:bg-teal-700 shadow-xs"
                        : "bg-slate-100/90 text-slate-700 hover:bg-slate-200/80 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700/80"
                    }`}
                  >
                    {cat.label}
                  </button>
                )
              })}
            </div>

            {/* View All Notices Button */}
            <Link
              href="/notice"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#094856] px-4.5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-xs transition-all hover:bg-[#073944] dark:bg-teal-700 dark:hover:bg-teal-600 shrink-0"
            >
              {t.viewAll || "View All Notices"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* 3-Column Grid Notice Cards */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNotices.map((notice) => {
              const { day, monthYear } = parseNoticeDate(notice.date)
              return (
                <div
                  key={notice.id}
                  onClick={() => alert(`Opening/Downloading notice: ${notice.title}`)}
                  className="group relative flex items-start gap-3.5 rounded-xl border border-slate-100 bg-slate-50/70 p-3.5 transition-all duration-200 hover:border-slate-200 hover:bg-slate-100/90 hover:shadow-xs dark:border-white/5 dark:bg-slate-800/40 dark:hover:border-white/10 dark:hover:bg-slate-800/80 cursor-pointer"
                >
                  {/* Left Date Badge Box */}
                  <div className="flex h-[66px] w-[66px] sm:h-[70px] sm:w-[70px] shrink-0 flex-col items-center justify-center rounded-lg bg-[#094856] text-white p-1 text-center shadow-2xs dark:bg-teal-800">
                    <span className="text-xl sm:text-2xl font-bold leading-none tracking-tight">
                      {day}
                    </span>
                    <span className="mt-1 text-[9px] font-extrabold uppercase tracking-wider opacity-90 leading-tight">
                      {monthYear}
                    </span>
                  </div>

                  {/* Right Notice Title & NEW Badge */}
                  <div className="flex flex-1 flex-col justify-between min-w-0 py-0.5">
                    <h3 className="line-clamp-2 text-xs sm:text-[13px] font-semibold font-bangla leading-snug text-slate-800 group-hover:text-primary dark:text-slate-100 transition-colors">
                      {notice.title}
                    </h3>
                    {notice.isNew && (
                      <div className="mt-2 flex items-center gap-2">
                        <span className="inline-flex items-center rounded-md bg-[#094856] px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-widest text-white shadow-2xs dark:bg-teal-700">
                          NEW
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
