"use client"

import * as React from "react"
import { HelpCircle, ChevronDown } from "lucide-react"
import { useLanguage } from "@/context/language-context"

export function FaqSection() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0)
  const { dict } = useLanguage()
  const t = dict.faq

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
            {t.badge}
          </div>
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            {t.heading}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t.subtext}
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {t.items.map((item, idx) => {
            const isOpen = openIndex === idx
            return (
              <div
                key={idx}
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
