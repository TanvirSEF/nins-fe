"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/context/language-context"

interface NewsItem {
  id: number
  title: string
  titleBn: string
  category: string
  categoryBn: string
  date: string
  image: string
  href: string
}

const ninsNewsData: NewsItem[] = [
  {
    id: 1,
    title: "Major Academic & Clinical Achievements of NINS in Neurosciences & Stroke Management",
    titleBn: "নিউরোসাইন্স ও স্ট্রোক চিকিৎসায় এনআইএনএস-এর স্মরণীয় সাফল্য ও অর্জনকথা",
    category: "NEWS",
    categoryBn: "সংবাদ",
    date: "Feb 16, 2026",
    image: "/images/Pre_Inaugural_Inspection_Discussion_Meeting_12.webp",
    href: "/notice",
  },
  {
    id: 2,
    title: "Special Condolence & Tribute Meeting Organized by NINS Administration",
    titleBn: "এনআইএনএস প্রশাসনের উদ্যোগে বিশেষ শোক প্রকাশ ও স্মরণ সভা অনুষ্ঠিত",
    category: "NEWS",
    categoryBn: "সংবাদ",
    date: "Dec 30, 2025",
    image: "/images/Financial_Assistance_Distribution_Ceremony_for_Stroke_and_Paralysis_Patients.webp",
    href: "/notice",
  },
  {
    id: 3,
    title: "MoU Signed Between NINS and International Medical Research Center for Advanced Neurosurgery",
    titleBn: "উন্নত নিউরোসার্জারি গবেষণায় NINS এবং আন্তর্জাতিক রিসার্চ সেন্টারের দ্বিপাক্ষিক সমঝোতা স্মারক স্বাক্ষর",
    category: "NEWS",
    categoryBn: "সংবাদ",
    date: "Nov 06, 2025",
    image: "/images/PWD-Meeting.webp",
    href: "/notice",
  },
  {
    id: 4,
    title: "NINS Seminar Highlights Pioneering Advances in Acute Stroke Intervention & Rehabilitation",
    titleBn: "একিউট স্ট্রোক ইন্টারভেনশন ও নিউরো-রিহ্যাবিলিটেশনে এনআইএনএস-এর বৈপ্লবিক অগ্রগতি সম্পর্কিত সেমিনার",
    category: "NEWS",
    categoryBn: "সংবাদ",
    date: "Nov 01, 2025",
    image: "/images/Pre_Inaugural_Inspection_Discussion_Meeting_3.webp",
    href: "/notice",
  },
]

export function NewsShowcase() {
  const { lang } = useLanguage()
  const isBn = lang === "bn"

  return (
    <section className="relative bg-slate-50/70 py-16 lg:py-24 dark:bg-slate-950/60 border-t border-slate-100 dark:border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header Row: News Title + VIEW ALL Button */}
        <div className="flex items-center justify-between gap-4 mb-8 sm:mb-10">
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            {isBn ? "সংবাদ" : "News"}
          </h2>

          <Link
            href="/notice"
            className="inline-flex items-center gap-2 rounded-lg bg-[#094856] px-4.5 py-2.5 text-xs font-extrabold uppercase tracking-wider text-white shadow-xs transition-all hover:bg-[#073944] dark:bg-teal-700 dark:hover:bg-teal-600 shrink-0"
          >
            {isBn ? "সকল সংবাদ →" : "VIEW ALL →"}
          </Link>
        </div>

        {/* 4-Column Grid News Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {ninsNewsData.map((item) => (
            <div
              key={item.id}
              className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white shadow-xs overflow-hidden transition-all duration-200 hover:shadow-md hover:border-slate-300 dark:border-white/10 dark:bg-slate-900"
            >
              {/* Top Image Container */}
              <div>
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Floating Date Badge on Image Bottom Left */}
                  <div className="absolute bottom-3 left-3 bg-[#094856] text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-xs dark:bg-teal-800 font-sans">
                    {item.date}
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-4 space-y-1.5">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#009688] dark:text-teal-400 font-sans">
                    {isBn ? item.categoryBn : item.category}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug group-hover:text-[#094856] dark:group-hover:text-teal-300 transition-colors font-bangla line-clamp-2">
                    {isBn ? item.titleBn : item.title}
                  </h3>
                </div>
              </div>

              {/* Bottom Read More Action */}
              <div className="px-4 pb-4 pt-1">
                <Link
                  href={item.href}
                  className="text-xs font-bold text-[#094856] dark:text-teal-400 hover:underline inline-flex items-center gap-1 font-sans transition-colors"
                >
                  {isBn ? "আরও পড়ুন" : "Read More"}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
