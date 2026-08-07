"use client"

import * as React from "react"
import { HelpCircle, ChevronDown } from "lucide-react"

const faqList = [
  {
    q: "How can I book an Outpatient (OPD) ticket online at NINS?",
    a: "You can book your OPD consultation serial online through our E-Health Patient Portal or by visiting the OPD Ticket Counter between 8:00 AM and 2:00 PM (Sat–Thu). OPD ticket fee is ৳10.",
  },
  {
    q: "What is the Emergency Hotline for 24/7 Stroke & Trauma Patients?",
    a: "For immediate emergency admission, call +880 2-9140752. NINS Emergency Casualty Ward and 100-Bed Stroke Unit operate 24 hours a day, 7 days a week.",
  },
  {
    q: "Are diagnostic tests like 3T MRI & CT Scans subsidized at NINS?",
    a: "Yes! All diagnostic tests at NINS are conducted at government-subsidized rates (up to 70% lower than private diagnostic centers). Financially insolvent patients receive 100% free care upon Social Welfare approval.",
  },
  {
    q: "What are the visiting hours for indoor wards and ICU?",
    a: "Indoor Ward Visiting Hours: 4:00 PM – 6:00 PM daily. Neuro-ICU Visiting Hours: 5:00 PM – 5:30 PM (Only 1 attendant per patient permitted with Visitor Pass).",
  },
]

export function FaqSection() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0)

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx)
  }

  return (
    <section className="relative overflow-hidden bg-white py-16 lg:py-24 dark:bg-slate-950 border-t border-slate-100 dark:border-white/5">
      <div className="relative z-10 mx-auto max-w-4xl px-6">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1 text-xs font-bold text-primary">
            <HelpCircle className="h-3.5 w-3.5" />
            Patient Help Center
          </div>
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Frequently Asked Questions (FAQ)
          </h2>
          <p className="text-sm text-muted-foreground">
            Clear information about OPD serials, emergency stroke admissions, MRI tests, and visiting rules.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqList.map((item, idx) => {
            const isOpen = openIndex === idx
            return (
              <div
                key={item.q}
                className="overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50/60 shadow-xs transition-all dark:border-white/10 dark:bg-slate-900"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="flex w-full items-center justify-between p-5 text-left font-heading text-sm font-bold text-foreground transition-colors hover:text-primary"
                >
                  <span className="pr-4">{item.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-primary shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-muted-foreground leading-relaxed border-t border-slate-200/60 dark:border-white/5 pt-3">
                    {item.a}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
