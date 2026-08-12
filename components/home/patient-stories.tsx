"use client"

import * as React from "react"
import { Heart, Star, Quote, CheckCircle2 } from "lucide-react"
import { useLanguage } from "@/context/language-context"

const testimonials = [
  {
    id: 1,
    name: "Mohammad Rafiqul Islam",
    district: "Chittagong",
    condition: "Acute Ischemic Stroke Recovery",
    comment: "My father was admitted to NINS 100-Bedded Stroke Unit within 2 hours of his stroke onset. Thanks to the prompt IV thrombolytic therapy by the emergency team, he made a complete recovery without paralysis. Infinite gratitude to NINS!",
    rating: 5,
    tag: "Stroke Care",
  },
  {
    id: 2,
    name: "Nusrat Jahan Poly",
    district: "Gaibandha",
    condition: "Pediatric Hydrocephalus Surgery",
    comment: "My 3-year-old daughter underwent endoscopic third ventriculostomy (ETV) under the Pediatric Neurosurgery team. The doctors and nurses provided affectionate care at almost zero cost. NINS is truly a blessing for Bangladesh.",
    rating: 5,
    tag: "Pediatric Surgery",
  },
  {
    id: 3,
    name: "Abdur Rahim Kazi",
    district: "Bogura",
    condition: "Spine Micro-Discectomy",
    comment: "I was suffering from severe lumbar disc prolapse for 2 years. After successful minimally invasive spine surgery by the NINS neurosurgery department, I am walking pain-free again.",
    rating: 5,
    tag: "Spine Surgery",
  },
]

export function PatientStories() {
  const { dict } = useLanguage()
  const t = dict.patientStories

  return (
    <section className="relative overflow-hidden bg-slate-50/70 py-16 lg:py-24 dark:bg-slate-950/60 border-t border-slate-100 dark:border-white/5">
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/20 bg-rose-500/10 px-3.5 py-1 text-xs font-bold text-rose-600 dark:text-rose-400">
            <Heart className="h-3.5 w-3.5 fill-current" />
            {t.badge}
          </div>
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            {t.heading}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t.subtext}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl dark:border-white/10 dark:bg-slate-900"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2.5 py-0.5 text-[11px] font-bold text-primary">
                    <CheckCircle2 className="h-3 w-3" />
                    {item.tag}
                  </span>
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                </div>

                <Quote className="h-8 w-8 text-primary/20" />

                <p className="text-xs text-muted-foreground leading-relaxed italic">
                  &quot;{item.comment}&quot;
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/5 space-y-0.5">
                <h3 className="font-heading text-sm font-bold text-foreground">
                  {item.name}
                </h3>
                <p className="text-[11px] font-medium text-primary">
                  {item.condition} • <span className="text-muted-foreground">{item.district}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
