"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, ArrowUpRight } from "lucide-react"
import { useLanguage } from "@/context/language-context"

interface EventItem {
  id: number
  tag: string
  tagBn: string
  title: string
  titleBn: string
  date: string
  time: string
  location: string
  image: string
}

const ninsEventsData: EventItem[] = [
  {
    id: 1,
    tag: "Academic Session",
    tagBn: "একাডেমিক সেশন",
    title: "International Academic Session on Advances in Comprehensive Stroke & Neuro-Vascular Care held at NINS",
    titleBn: "NINS-এ কমপ্রিহেনসিভ স্ট্রোক ও নিউরো-ভাস্কুলার চিকিৎসার অগ্রগতি শীর্ষক আন্তর্জাতিক একাডেমিক সেশন অনুষ্ঠিত",
    date: "11 November 2026",
    time: "08:00 AM",
    location: "Main Auditorium, NINS",
    image: "/images/Pre_Inaugural_Inspection_Discussion_Meeting_1.webp",
  },
  {
    id: 2,
    tag: "Collaboration Meeting",
    tagBn: "কল্যাবোরেশন মিটিং",
    title: "NINS-RCP International Neuro-Specialists Collaboration Meeting Held",
    titleBn: "NINS-RCP আন্তর্জাতিক নিউরো-বিশেষজ্ঞদের যৌথ সহযোগিতা সভা অনুষ্ঠিত",
    date: "10 November 2026",
    time: "01:00 PM",
    location: "Conference Room, NINS",
    image: "/images/Financial_Assistance_Distribution_Ceremony_for_Stroke_and_Paralysis_Patients.webp",
  },
  {
    id: 3,
    tag: "MOU Signing Ceremony",
    tagBn: "এমওইউ স্বাক্ষর অনুষ্ঠান",
    title: "A memorandum of understanding (MoU) signed between NINS and International Neuro Research Institute",
    titleBn: "NINS এবং আন্তর্জাতিক নিউরো রিসার্চ ইনস্টিটিউটের মধ্যে একটি দ্বিপাক্ষিক সমঝোতা স্মারক (MoU) স্বাক্ষরিত",
    date: "10 November 2026",
    time: "11:00 AM",
    location: "Directorate Office, NINS",
    image: "/images/PWD-Meeting.webp",
  },
  {
    id: 4,
    tag: "National Workshop",
    tagBn: "জাতীয় কর্মশালা",
    title: "National Hands-on Micro-Neurosurgery & Endoscopic Cranial Procedures Workshop 2026",
    titleBn: "জাতীয় হ্যান্ডস-অন মাইক্রো-নিউরোসার্জারি ও এন্ডোস্কোপিক ক্রেনিয়াল পদ্ধতি কর্মশালা ২০২৬",
    date: "05 November 2026",
    time: "09:30 AM",
    location: "OT Complex & Skill Lab, NINS",
    image: "/images/Transport_and_Bridge_Ministry_Visit.webp",
  },
]

export function EventsShowcase() {
  const { lang } = useLanguage()
  const isBn = lang === "bn"

  return (
    <section className="relative bg-slate-50/70 py-16 lg:py-24 dark:bg-slate-950/60 border-t border-slate-100 dark:border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Title Header */}
        <h2 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground text-center mb-8 sm:mb-12">
          {isBn ? "ইভেন্টসমূহ" : "Events"}
        </h2>

        {/* Outer Grey Container Box */}
        <div className="rounded-2xl border border-slate-200/80 bg-slate-100/70 p-5 sm:p-8 shadow-xs dark:border-white/10 dark:bg-slate-900/60">
          {/* Vertical Stack of White Event Cards */}
          <div className="flex flex-col gap-4 sm:gap-5">
            {ninsEventsData.map((event) => (
              <div
                key={event.id}
                className="group flex flex-col md:flex-row md:items-center justify-between gap-5 rounded-xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-2xs transition-all duration-200 hover:shadow-md hover:border-slate-300 dark:border-white/10 dark:bg-slate-900"
              >
                {/* Left Side: Thumbnail Image */}
                <div className="w-full md:w-56 h-40 md:h-32 shrink-0 rounded-lg overflow-hidden relative bg-slate-100 dark:bg-slate-800">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 224px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Middle Content: Tag, Title, Meta */}
                <div className="flex-1 min-w-0 space-y-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#009688] dark:text-teal-400 font-sans">
                    {isBn ? event.tagBn : event.tag}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 leading-snug group-hover:text-[#094856] dark:group-hover:text-teal-300 transition-colors font-bangla line-clamp-2">
                    {isBn ? event.titleBn : event.title}
                  </h3>

                  {/* Metadata Row: Date & Time */}
                  <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400 font-bangla pt-1">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-slate-400" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-slate-400" />
                      <span>{event.time}</span>
                    </div>
                  </div>
                </div>

                {/* Right Side: View Details Button */}
                <button
                  onClick={() => alert(`Viewing details for event: ${event.title}`)}
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-800 shadow-2xs transition-all hover:bg-slate-50 hover:border-slate-400 dark:bg-slate-800 dark:border-white/15 dark:text-slate-100 dark:hover:bg-slate-700 shrink-0 self-start md:self-center"
                >
                  {isBn ? "বিস্তারিত দেখুন" : "View Details"}
                  <ArrowUpRight className="h-3.5 w-3.5 text-slate-500" />
                </button>
              </div>
            ))}
          </div>

          {/* Bottom View All Events Button */}
          <div className="mt-6">
            <Link
              href="/notice"
              className="inline-flex items-center justify-center w-full rounded-lg border border-[#094856]/40 bg-white py-3 text-xs sm:text-sm font-bold text-[#094856] shadow-2xs transition-all hover:bg-[#094856] hover:text-white dark:bg-slate-900 dark:text-teal-300 dark:border-teal-700 dark:hover:bg-teal-700 dark:hover:text-white"
            >
              {isBn ? "সকল ইভেন্ট দেখুন" : "View All Events"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
