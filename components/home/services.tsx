"use client"

import * as React from "react"
import { Activity, HeartHandshake, Stethoscope, ScanLine } from "lucide-react"

export function Services() {
  const serviceItems = [
    {
      title: "Stroke & Neurovascular",
      description:
        "Thrombolytic therapy, stroke unit monitoring, and endovascular interventions for acute strokes.",
      icon: Activity,
    },
    {
      title: "Neuro-Intensive Care",
      description:
        "Advanced life support systems, intracranial pressure monitoring, and 24/7 dedicated critical care.",
      icon: HeartHandshake,
    },
    {
      title: "Specialist Outpatient",
      description:
        "Comprehensive outpatient consults with professors of neurology, neurosurgery, and pediatric neurology.",
      icon: Stethoscope,
    },
    {
      title: "Advanced Neuroimaging",
      description:
        "High-resolution 3T MRI, multi-slice CT scanners, EEG, EMG, and digital angiographies.",
      icon: ScanLine,
    },
  ]

  return (
    <section className="bg-slate-50/30 py-16 lg:py-24 dark:bg-slate-950/10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-16 max-w-2xl space-y-3 text-center">
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Specialized Clinical Divisions
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Delivering multidisciplinary clinical care across neurosurgery,
            neurology, and diagnostic neuroimaging.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {serviceItems.map((item, index) => {
            const Icon = item.icon
            return (
              <div
                key={index}
                className="group relative rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:translate-y-[-2px] hover:shadow-md dark:border-white/5 dark:bg-slate-900/50"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/5 text-primary transition-all duration-300 group-hover:scale-105 group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="mb-2 font-heading text-base font-bold text-foreground">
                  {item.title}
                </h3>

                <p className="text-xs leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
