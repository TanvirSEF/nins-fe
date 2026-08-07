"use client"

import * as React from "react"
import Link from "next/link"
import { Brain, Activity, Stethoscope, Baby, Microscope, ShieldAlert, ArrowRight } from "lucide-react"

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
    description: "Bangladesh’s largest dedicated stroke center providing intravenous thrombolysis and mechanical thrombectomy.",
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
  return (
    <section className="relative overflow-hidden bg-slate-50/70 py-16 lg:py-24 dark:bg-slate-950/60 border-t border-slate-100 dark:border-white/5">
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-10 border-b border-slate-200/80 dark:border-white/10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1 text-xs font-semibold text-primary">
              <Brain className="h-3.5 w-3.5" />
              Specialized Wings
            </div>
            <h2 className="font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Clinical Departments &amp; Units
            </h2>
            <p className="text-sm text-muted-foreground max-w-xl">
              Delivering multidisciplinary neuroscience care across neurology, neurosurgery, stroke management, and advanced neuro-imaging.
            </p>
          </div>

          <Link
            href="/departments"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground shadow-sm transition-all hover:bg-primary/95 shrink-0"
          >
            View All Departments
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Departments Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clinicalDepartments.map((dept) => {
            const Icon = dept.icon
            return (
              <div
                key={dept.title}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-slate-900"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="rounded-md bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-700 dark:bg-white/10 dark:text-slate-300">
                      {dept.tag}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="font-heading text-base font-bold text-foreground transition-colors group-hover:text-primary">
                      {dept.title}
                    </h3>
                    <p className="text-xs font-semibold text-primary">
                      {dept.doctorsCount}
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed pt-1">
                      {dept.description}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/5">
                  <Link
                    href={dept.href}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-foreground transition-colors group-hover:text-primary"
                  >
                    Explore Department
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
