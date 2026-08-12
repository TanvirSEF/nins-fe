"use client"

import * as React from "react"
import Image from "next/image"
import { Building2, Award, Stethoscope, ShieldCheck, UserCheck } from "lucide-react"
import { useLanguage } from "@/context/language-context"

export function AboutSection() {
  const { dict } = useLanguage()
  const t = dict.about

  return (
    <section className="relative overflow-hidden bg-white py-10 lg:py-16 dark:bg-slate-950 border-t border-slate-100 dark:border-white/5">
      {/* Background Subtle Accents */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-info/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary backdrop-blur-sm">
            <Building2 className="h-3.5 w-3.5" />
            {t.badge}
          </div>
          <span className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
            {t.welcomeTo}
          </span>
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {t.instituteName}
          </h2>
          <div className="mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-primary to-info" />
        </div>

        {/* Main Content Layout Grid */}
        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Detailed Narrative Text */}
          <div className="space-y-5 lg:col-span-8">
            <div className="space-y-2">
              <h3 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {t.subheading}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                {t.p1}
              </p>
            </div>

            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              {t.p2}
            </p>

            {/* Award Showcase Card */}
            <div className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 shadow-sm dark:border-white/10 dark:bg-slate-900/60">
              <div className="mb-2.5 flex items-center gap-2 text-amber-600 dark:text-amber-400">
                <Award className="h-5 w-5" />
                <h4 className="font-heading text-sm font-bold">
                  {t.awardTitle}
                </h4>
              </div>
              <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-black/5 dark:border-white/10">
                <Image
                  src="/images/dghs-awardex-2020.webp"
                  alt={t.awardTitle}
                  width={800}
                  height={500}
                  className="h-auto max-h-[320px] w-full object-contain mx-auto"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Compact Leadership Cards */}
          <div className="flex flex-col items-center sm:items-start lg:col-span-4 space-y-5">
            <div className="w-full flex items-center gap-2 border-b border-slate-100 pb-2.5 dark:border-white/10">
              <UserCheck className="h-5 w-5 text-primary" />
              <h3 className="font-heading text-lg font-bold text-foreground">
                {t.leadershipTitle}
              </h3>
            </div>

            <div className="flex flex-col items-center gap-5 w-full sm:flex-row lg:flex-col">
              {/* DIRECTOR CARD */}
              <div className="w-[220px] shrink-0 overflow-hidden rounded-xl border border-slate-300/80 bg-white shadow-md transition-all duration-300 hover:shadow-lg dark:border-white/15 dark:bg-slate-900">
                <div className="bg-[#2c474e] px-3 py-1.5 text-center">
                  <h4 className="font-heading text-xs font-bold uppercase tracking-widest text-white">
                    {t.directorTitle}
                  </h4>
                </div>
                <div className="p-3 text-center">
                  <div className="relative mx-auto h-44 w-36 overflow-hidden rounded-lg border border-slate-900/80 shadow-xs">
                    <Image
                      src="/images/Director-NINS.webp"
                      alt={t.directorName}
                      fill
                      sizes="144px"
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="mt-2.5 space-y-0.5">
                    <h5 className="font-heading text-xs font-bold leading-tight text-slate-800 dark:text-slate-100">
                      {t.directorName}
                    </h5>
                    <p className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                      {t.directorRole}
                    </p>
                  </div>
                </div>
              </div>

              {/* JOINT DIRECTOR CARD */}
              <div className="w-[220px] shrink-0 overflow-hidden rounded-xl border border-slate-300/80 bg-white shadow-md transition-all duration-300 hover:shadow-lg dark:border-white/15 dark:bg-slate-900">
                <div className="bg-[#2c474e] px-3 py-1.5 text-center">
                  <h4 className="font-heading text-xs font-bold uppercase tracking-widest text-white">
                    {t.jointDirectorTitle}
                  </h4>
                </div>
                <div className="p-3 text-center">
                  <div className="relative mx-auto h-44 w-36 overflow-hidden rounded-lg border border-slate-900/80 shadow-xs">
                    <Image
                      src="/images/Dr.Badrul_AlamJD.webp"
                      alt={t.jointDirectorName}
                      fill
                      sizes="144px"
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="mt-2.5 space-y-0.5">
                    <h5 className="font-heading text-xs font-bold leading-tight text-slate-800 dark:text-slate-100">
                      {t.jointDirectorName}
                    </h5>
                    <p className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                      {t.jointDirectorRole}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="mt-12 border-t border-slate-100 pt-10 dark:border-white/5">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-6">
            <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-4 text-center shadow-xs dark:border-white/5 dark:bg-slate-900/40">
              <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Building2 className="h-4 w-4" />
              </div>
              <p className="mt-2 font-heading text-2xl font-extrabold text-foreground sm:text-3xl">{t.stat1Value}</p>
              <p className="text-xs font-medium text-muted-foreground">{t.stat1Label}</p>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-4 text-center shadow-xs dark:border-white/5 dark:bg-slate-900/40">
              <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-info/10 text-info">
                <Stethoscope className="h-4 w-4" />
              </div>
              <p className="mt-2 font-heading text-2xl font-extrabold text-foreground sm:text-3xl">{t.stat2Value}</p>
              <p className="text-xs font-medium text-muted-foreground">{t.stat2Label}</p>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-4 text-center shadow-xs dark:border-white/5 dark:bg-slate-900/40">
              <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-success/10 text-success">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <p className="mt-2 font-heading text-2xl font-extrabold text-foreground sm:text-3xl">{t.stat3Value}</p>
              <p className="text-xs font-medium text-muted-foreground">{t.stat3Label}</p>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-4 text-center shadow-xs dark:border-white/5 dark:bg-slate-900/40">
              <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
                <Award className="h-4 w-4" />
              </div>
              <p className="mt-2 font-heading text-2xl font-extrabold text-foreground sm:text-3xl">{t.stat4Value}</p>
              <p className="text-xs font-medium text-muted-foreground">{t.stat4Label}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
