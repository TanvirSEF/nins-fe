"use client"

import * as React from "react"
import Link from "next/link"
import { DollarSign, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react"
import { useLanguage } from "@/context/language-context"

const testTariffList = [
  { test: "Brain MRI (3 Tesla High-Resolution)", govtFee: "৳ 3,000 – ৳ 4,000", marketRate: "৳ 8,000 – ৳ 12,000" },
  { test: "Multi-Slice CT Scan (Head / Spine)", govtFee: "৳ 2,000 – ৳ 3,000", marketRate: "৳ 5,000 – ৳ 8,000" },
  { test: "Digital EEG (Electroencephalogram)", govtFee: "৳ 600 – ৳ 1,000", marketRate: "৳ 2,500 – ৳ 4,000" },
  { test: "EMG & Nerve Conduction Study (NCS)", govtFee: "৳ 1,000 – ৳ 1,500", marketRate: "৳ 3,500 – ৳ 6,000" },
  { test: "Cerebral DSA Angiography", govtFee: "৳ 4,000 – ৳ 6,000", marketRate: "৳ 15,000 – ৳ 25,000" },
  { test: "Carotid & Transcranial Doppler (TCD)", govtFee: "৳ 800 – ৳ 1,200", marketRate: "৳ 3,000 – ৳ 5,000" },
]

export function TestTariffSection() {
  const { dict } = useLanguage()
  const t = dict.tariff

  return (
    <section className="relative overflow-hidden bg-slate-900 py-16 lg:py-24 text-white border-t border-white/10">
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-info/15 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          {/* Left Column */}
          <div className="space-y-6 lg:col-span-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-bold text-emerald-400">
              <ShieldCheck className="h-4 w-4" />
              {t.badge}
            </div>

            <h2 className="font-heading text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              {t.heading}
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed">
              {t.subtext}
            </p>

            <div className="space-y-3 pt-2">
              {t.bullets.map((item: string) => (
                <div key={item} className="flex items-start gap-2.5 text-xs text-slate-200">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link
                href="/diagnostic-facilities/mri-ct-price-list"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-xs font-bold text-primary-foreground shadow-lg transition-all hover:bg-primary/95"
              >
                {t.viewPriceList}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Tariff Table */}
          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950/80 shadow-2xl backdrop-blur-md">
              <div className="bg-slate-800/80 px-6 py-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2 text-white font-heading font-bold text-sm">
                  <DollarSign className="h-4 w-4 text-emerald-400" />
                  {t.tableTitle}
                </div>
                <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md">
                  {t.govtSubsidized}
                </span>
              </div>

              <div className="divide-y divide-white/10">
                {testTariffList.map((row) => (
                  <div key={row.test} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-2 text-xs transition-colors hover:bg-white/5">
                    <span className="font-semibold text-white sm:w-1/2">
                      {row.test}
                    </span>
                    <div className="flex items-center justify-between sm:justify-end gap-6 sm:w-1/2">
                      <div className="text-right">
                        <span className="block text-[10px] text-slate-400 uppercase">{t.govtCharge}</span>
                        <span className="font-extrabold text-emerald-400 text-sm">{row.govtFee}</span>
                      </div>
                      <div className="text-right hidden xs:block">
                        <span className="block text-[10px] text-slate-500 uppercase line-through">{t.privateRate}</span>
                        <span className="text-[11px] text-slate-400 line-through">{row.marketRate}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
