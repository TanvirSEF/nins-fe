"use client"

import * as React from "react"
import Link from "next/link"
import { Brain, Activity, Stethoscope, Baby, Microscope, ShieldAlert, ArrowRight } from "lucide-react"
import { useLanguage } from "@/context/language-context"

const clinicalDepartments = [
  {
    icon: Brain,
    title: "Department of Neurology",
    doctorsCount: "35+ Specialists",
    description: "Specialized care for epilepsy, movement disorders, Parkinson's disease, neuromuscular ailments, and headache clinics.",
    href: "/departments/neurology",
    tag: "Non-Surgical Care",
  },
  {
    icon: Activity,
    title: "Department of Neurosurgery",
    doctorsCount: "40+ Neurosurgeons",
    description: "Micro-neurosurgery for brain tumors, spinal trauma, vascular malformations, and endoscopic cranial procedures.",
    href: "/departments/neurosurgery",
    tag: "Micro-Surgical OT",
  },
  {
    icon: ShieldAlert,
    title: "100-Bedded Stroke Unit",
    doctorsCount: "24/7 Rapid Response",
    description: "Bangladesh's largest dedicated stroke center providing intravenous thrombolysis and mechanical thrombectomy.",
    href: "/services/emergency",
    tag: "Acute Stroke Care",
  },
  {
    icon: Baby,
    title: "Pediatric Neurology & Neurosurgery",
    doctorsCount: "15+ Pediatric Specialists",
    description: "Dedicated pediatric neuro-care for congenital anomalies, hydrocephalus, childhood epilepsy, and neurodevelopmental disorders.",
    href: "/departments/neurology",
    tag: "Child Neuro Care",
  },
  {
    icon: Microscope,
    title: "Neuro-Intervention & Neuroradiology",
    doctorsCount: "3T MRI & Digital Angio",
    description: "Endovascular aneurysm coiling, intra-arterial thrombolysis, cerebral DSA angiography, and advanced 3T MRI scanning.",
    href: "/diagnostic-facilities/neuroradiology",
    tag: "Advanced Imaging",
  },
  {
    icon: Stethoscope,
    title: "Critical Care Medicine (ICU & HDU)",
    doctorsCount: "Multi-parameter Support",
    description: "Round-the-clock intensive care with invasive ICP monitoring, mechanical ventilation, and continuous EEG.",
    href: "/services/icu",
    tag: "Life Support ICU",
  },
]

export function DepartmentsShowcase() {
  const { dict } = useLanguage()
  const t = dict.departments

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#185868] via-[#144a58] to-[#103d49] py-16 sm:py-20 text-white">
      {/* Background Decorative Medical Hexagon Network SVG */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <svg className="h-full w-full" width="100%" height="100%" fill="none">
          <pattern
            id="dept-hex-pattern"
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
          <rect width="100%" height="100%" fill="url(#dept-hex-pattern)" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header Title & Subtitle */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            {t.heading || "Clinical Departments & Units"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-100/90 leading-relaxed font-normal font-bangla">
            {t.subtext || "Delivering multidisciplinary neuroscience care across neurology, neurosurgery, stroke management, and advanced neuro-imaging."}
          </p>
        </div>

        {/* Thin Divider Line */}
        <div className="mx-auto my-8 sm:my-10 max-w-4xl border-t border-white/20" />

        {/* 3-Column Grid Departments */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {clinicalDepartments.map((dept) => {
            const Icon = dept.icon
            return (
              <div
                key={dept.title}
                className="group relative flex flex-col justify-between rounded-xl bg-white p-6 shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-xl dark:bg-slate-900/90 dark:border dark:border-white/10"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-teal-50 text-[#144a58] transition-colors duration-200 group-hover:bg-[#144a58] group-hover:text-white dark:bg-teal-950/60 dark:text-teal-300 dark:group-hover:bg-teal-700">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-md bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300 font-bangla">
                      {dept.tag}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="font-heading text-base font-bold text-slate-900 transition-colors group-hover:text-[#144a58] dark:text-slate-100 dark:group-hover:text-teal-300 font-bangla">
                      {dept.title}
                    </h3>
                    <p className="text-xs font-semibold text-[#144a58] dark:text-teal-400 font-bangla">
                      {dept.doctorsCount}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pt-1 font-bangla">
                      {dept.description}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/5">
                  <Link
                    href={dept.href}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 transition-colors group-hover:text-[#144a58] dark:text-slate-100 dark:group-hover:text-teal-300 font-bangla"
                  >
                    {t.explore || "Explore Department"}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        {/* View All Departments Button */}
        <div className="mt-10 text-center">
          <Link
            href="/departments"
            className="inline-flex items-center gap-2 rounded-lg bg-white/10 border border-white/20 px-6 py-2.5 text-xs sm:text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white hover:text-[#144a58] shrink-0"
          >
            {t.viewAll || "View All Departments"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
