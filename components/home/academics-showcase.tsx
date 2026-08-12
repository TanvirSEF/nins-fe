"use client"

import * as React from "react"
import Link from "next/link"
import {
  Brain,
  Scissors,
  Baby,
  Activity,
  Radio,
  HeartPulse,
  Zap,
  Microscope,
  LucideIcon,
} from "lucide-react"
import { useLanguage } from "@/context/language-context"

interface FacultyItem {
  id: string
  title: string
  titleBn: string
  departmentsCount: string
  departmentsCountBn: string
  icon: LucideIcon
  href: string
}

const ninsFacultiesData: FacultyItem[] = [
  {
    id: "neurology",
    title: "Faculty of Neurology & Clinical Neurosciences",
    titleBn: "ফ্যাকাল্টি অফ নিউরোলজি ও ক্লিনিক্যাল নিউরোসাইন্স",
    departmentsCount: "12 Departments & OPD Clinics",
    departmentsCountBn: "১২ টি বিভাগ ও বিশেষায়িত ক্লিনিক",
    icon: Brain,
    href: "/departments/neurology",
  },
  {
    id: "neurosurgery",
    title: "Faculty of Neurosurgery & Surgical Neurosciences",
    titleBn: "ফ্যাকাল্টি অফ নিউরোসার্জারি ও সার্জিক্যাল নিউরোসাইন্স",
    departmentsCount: "8 Surgical Wings & OT Complex",
    departmentsCountBn: "৮ টি সার্জিক্যাল উইং ও ওটি কমপ্লেক্স",
    icon: Scissors,
    href: "/departments/neurosurgery",
  },
  {
    id: "pediatric-neurology",
    title: "Faculty of Pediatric Neurology & Neurodevelopment",
    titleBn: "ফ্যাকাল্টি অফ পেডিয়াট্রিক নিউরোলজি ও শিশু বিকাশ",
    departmentsCount: "5 Pediatric Clinical Units",
    departmentsCountBn: "৫ টি শিশু নিউরো বিভাগ",
    icon: Baby,
    href: "/departments/neurology",
  },
  {
    id: "pediatric-neurosurgery",
    title: "Faculty of Pediatric Neurosurgery",
    titleBn: "ফ্যাকাল্টি অফ পেডিয়াট্রিক নিউরোসার্জারি",
    departmentsCount: "4 Pediatric Surgical Units",
    departmentsCountBn: "৪ টি চাইল্ড সার্জারি ইউনিট",
    icon: Activity,
    href: "/departments/neurosurgery",
  },
  {
    id: "neuroradiology",
    title: "Faculty of Neuroradiology & Interventional Radiology",
    titleBn: "ফ্যাকাল্টি অফ নিউরোরেডিওলজি ও ইন্টারভেনশনাল রেডিওলজি",
    departmentsCount: "3T MRI, CT & Cath Lab Suite",
    departmentsCountBn: "৩টি টেসলা এমআরআই, সিটি ও ক্যাথ ল্যাব",
    icon: Radio,
    href: "/departments/neuroradiology",
  },
  {
    id: "neuro-critical-care",
    title: "Faculty of Neuro-Anesthesia & Neuro-Critical Care",
    titleBn: "ফ্যাকাল্টি অফ নিউরো-অ্যানেস্থেসিয়া ও নিউরো-ক্রিটিক্যাল কেয়ার",
    departmentsCount: "100-Bed Stroke & 30-Bed Neuro-ICU",
    departmentsCountBn: "১০০-বেড স্ট্রোক ও ৩০-বেড নিউরো-আইসিইউ",
    icon: HeartPulse,
    href: "/departments/critical-care",
  },
  {
    id: "neurophysiology",
    title: "Faculty of Neurophysiology & Electro-Diagnostics",
    titleBn: "ফ্যাকাল্টি অফ নিউরোফিজিওলজি ও ডায়াগনস্টিকস",
    departmentsCount: "6 EEG, EMG & NCV Diagnostic Labs",
    departmentsCountBn: "৬ টি ইইজি, ইএমজি ও এনসিভি ল্যাব",
    icon: Zap,
    href: "/diagnostic-facilities/neurophysiology",
  },
  {
    id: "neuropathology",
    title: "Faculty of Neuropathology & Basic Neurosciences",
    titleBn: "ফ্যাকাল্টি অফ নিউরোপ্যাথোলজি ও বেসিক নিউরোসাইন্স",
    departmentsCount: "4 Histopathology & CSF Labs",
    departmentsCountBn: "৪ টি হিস্টোপ্যাথোলজি ও সিএসএফ ল্যাব",
    icon: Microscope,
    href: "/departments/laboratory-science",
  },
]

export function AcademicsShowcase() {
  const { lang } = useLanguage()
  const isBn = lang === "bn"

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#185868] via-[#144a58] to-[#103d49] py-16 sm:py-20 text-white">
      {/* Background Decorative Medical Hexagon Network SVG */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <svg className="h-full w-full" width="100%" height="100%" fill="none">
          <pattern
            id="hex-pattern"
            width="56"
            height="100"
            patternUnits="userSpaceOnUse"
            patternTransform="scale(1.5)"
          >
            <path
              d="M28 66L0 50L0 16L28 0L56 16L56 50L28 66Z"
              stroke="currentColor"
              strokeWidth="1"
            />
            <path
              d="M28 100L0 84L0 50L28 34L56 50L56 84L28 100Z"
              stroke="currentColor"
              strokeWidth="1"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#hex-pattern)" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header Title & Subtitle */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            {isBn ? "একাডেমিক্স ও অনুষদসমূহ" : "NINS Academic Faculties"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-100/90 leading-relaxed font-normal font-bangla">
            {isBn
              ? "ন্যাশনাল ইনস্টিটিউট অব নিউরোসাইন্সেস অ্যান্ড হাসপাতালে স্নাতকোত্তর উচ্চতর চিকিৎসা শিক্ষা, এমডি/এমএস রেসিডেন্সি প্রোগ্রাম এবং নিউরো-সাবস্পেশালিটি ফেলোশিপ।"
              : "Postgraduate medical education, MD/MS residency programs, and specialized sub-specialty neuro fellowships at National Institute of Neurosciences & Hospital."}
          </p>
        </div>

        {/* Thin Divider Line */}
        <div className="mx-auto my-8 sm:my-10 max-w-4xl border-t border-white/20" />

        {/* 4-Column Grid (8 NINS Faculty Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {ninsFacultiesData.map((faculty) => {
            const Icon = faculty.icon
            return (
              <Link
                key={faculty.id}
                href={faculty.href}
                className="group flex items-center gap-3.5 rounded-xl bg-white p-4 sm:p-4.5 shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-xl dark:bg-slate-900/90 dark:border dark:border-white/10"
              >
                {/* Icon Box */}
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-[#144a58] transition-colors group-hover:bg-[#144a58] group-hover:text-white dark:bg-teal-950/60 dark:text-teal-300 dark:group-hover:bg-teal-700">
                  <Icon className="h-5 w-5" />
                </div>

                {/* Text Content */}
                <div className="min-w-0 flex-1">
                  <h3 className="text-xs sm:text-[13px] font-bold leading-snug text-slate-900 group-hover:text-[#144a58] dark:text-slate-100 dark:group-hover:text-teal-300 transition-colors font-bangla line-clamp-2">
                    {isBn ? faculty.titleBn : faculty.title}
                  </h3>
                  <p className="mt-0.5 text-[11px] font-medium text-slate-500 dark:text-slate-400 font-bangla">
                    {isBn ? faculty.departmentsCountBn : faculty.departmentsCount}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
