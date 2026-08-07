"use client"

import * as React from "react"
import { PhoneCall, ShieldAlert, Clock, Activity, ArrowRight } from "lucide-react"

const fastSteps = [
  { letter: "F", title: "Face Drooping", desc: "Does one side of the face droop or is it numb? Ask the person to smile." },
  { letter: "A", title: "Arm Weakness", desc: "Is one arm weak or numb? Ask the person to raise both arms." },
  { letter: "S", title: "Speech Difficulty", desc: "Is speech slurred? Ask the person to repeat a simple sentence." },
  { letter: "T", title: "Time to Call NINS", desc: "If someone shows any of these symptoms, call NINS 24/7 Hotline immediately!" },
]

export function StrokeGuidanceBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-rose-950 via-slate-950 to-slate-900 py-16 text-white border-t border-rose-900/30">
      {/* Background Glows */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-rose-600/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          
          {/* Left Column: Urgency & Call Button */}
          <div className="space-y-6 lg:col-span-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-1.5 text-xs font-black text-rose-400 uppercase tracking-wide">
              <ShieldAlert className="h-4 w-4 animate-bounce text-rose-400" />
              24/7 Acute Stroke Emergency Protocol
            </div>

            <h2 className="font-heading text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Recognize Stroke Symptoms: Think <span className="text-rose-500 underline decoration-rose-500 decoration-wavy">F.A.S.T.</span>
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed">
              Every minute counts in acute stroke management. NINS 100-Bedded Stroke Unit provides round-the-clock IV thrombolysis and mechanical thrombectomy.
            </p>

            {/* Big Emergency Call Button */}
            <div className="pt-2">
              <a
                href="tel:+88029140752"
                className="group relative inline-flex items-center gap-4 rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 px-6 py-4 text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-rose-600/30"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-white backdrop-blur-md group-hover:animate-pulse">
                  <PhoneCall className="h-6 w-6" />
                </div>
                <div className="text-left">
                  <span className="block text-xs font-bold uppercase tracking-wider text-rose-200">
                    NINS Emergency Casualty Hotline (24/7)
                  </span>
                  <span className="font-mono text-xl font-black text-white">
                    +880 2-9140752
                  </span>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: F.A.S.T. Interactive Grid */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {fastSteps.map((step) => (
                <div
                  key={step.letter}
                  className="rounded-2xl border border-white/10 bg-slate-900/80 p-5 backdrop-blur-md space-y-2 transition-all duration-300 hover:border-rose-500/50 hover:bg-slate-900"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-600 font-mono text-lg font-black text-white shadow-md">
                      {step.letter}
                    </span>
                    <Activity className="h-4 w-4 text-rose-400" />
                  </div>
                  <h3 className="font-heading text-sm font-bold text-white pt-1">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
