import * as React from "react"
import Image from "next/image"
import { Building2, Award, Stethoscope, GraduationCap, CheckCircle2, ShieldCheck, Microscope } from "lucide-react"

export function AboutSection() {
  return (
    <section className="relative overflow-hidden bg-white py-16 lg:py-24 dark:bg-slate-950 border-t border-slate-100 dark:border-white/5">
      {/* Background Subtle Accents */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-info/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary backdrop-blur-sm">
            <Building2 className="h-3.5 w-3.5" />
            Est. September 2012 • Sher-e-Bangla Nagar, Agargaon, Dhaka
          </div>
          <span className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Welcome to
          </span>
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            National Institute of Neurosciences &amp; Hospital
          </h2>
          <div className="mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-primary to-info" />
        </div>

        {/* Quick Stats Grid */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-6">
          <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-5 text-center shadow-xs dark:border-white/5 dark:bg-slate-900/40">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Building2 className="h-5 w-5" />
            </div>
            <p className="mt-3 font-heading text-2xl font-extrabold text-foreground sm:text-3xl">500+</p>
            <p className="text-xs font-medium text-muted-foreground">Bedded 10-Storied Hospital</p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-5 text-center shadow-xs dark:border-white/5 dark:bg-slate-900/40">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-info/10 text-info">
              <Stethoscope className="h-5 w-5" />
            </div>
            <p className="mt-3 font-heading text-2xl font-extrabold text-foreground sm:text-3xl">100 Bed</p>
            <p className="text-xs font-medium text-muted-foreground">Comprehensive Stroke Unit</p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-5 text-center shadow-xs dark:border-white/5 dark:bg-slate-900/40">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-success/10 text-success">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <p className="mt-3 font-heading text-2xl font-extrabold text-foreground sm:text-3xl">1000+</p>
            <p className="text-xs font-medium text-muted-foreground">Daily OPD Patients Served</p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-5 text-center shadow-xs dark:border-white/5 dark:bg-slate-900/40">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
              <Award className="h-5 w-5" />
            </div>
            <p className="mt-3 font-heading text-2xl font-extrabold text-foreground sm:text-3xl">Awarded</p>
            <p className="text-xs font-medium text-muted-foreground">Best Performance Award 2020</p>
          </div>
        </div>

        {/* Main Content Layout Grid */}
        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Image Card & Award Badge */}
          <div className="relative lg:col-span-5">
            <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 shadow-2xl dark:border-white/10">
              <Image
                src="/images/dghs-awardex-2020.webp"
                alt="Health Minister Best Performance Award 2020 - NINS"
                width={600}
                height={450}
                className="h-[380px] sm:h-[440px] w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

              {/* Award Banner Overlay */}
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md text-white">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-400 text-slate-950 font-bold">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-amber-300">
                      National Recognition
                    </h4>
                    <p className="text-xs font-medium text-white/90">
                      Best Performance Health Minister Award 2020
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Narrative Text */}
          <div className="space-y-6 lg:col-span-7">
            <div className="space-y-3">
              <h3 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Bangladesh’s Premier Tertiary Care Neuroscience Center
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                National Institute of Neurosciences &amp; Hospital started its journey from September, 2012. Officially inaugurated by the Government of the People&apos;s Republic of Bangladesh, it is situated in the health hub of Sher-e-Bangla Nagar, Agargaon, Dhaka. This is the only Govt. run tertiary care neuroscience center in Bangladesh.
              </p>
            </div>

            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              A 500-bedded 10-storied hospital comprising specialized departments including Neurology, Neurosurgery, Pediatric Neurology, Pediatric Neurosurgery, Neurophysiology, Neurointervention, Neurorehabilitation, Neuroradiology, Neuropathology, Transfusion Medicine, Critical Care Medicine &amp; a 100-bedded Stroke unit. Our Operation Theatres, Cath Lab, Laboratory Services, ICU &amp; HDU are equipped with state-of-the-art sophisticated technologies.
            </p>

            {/* Specialized Clinics Pills */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Specialized Outpatient Clinics
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  "Stroke Clinic",
                  "Headache Clinic",
                  "Epilepsy Clinic",
                  "Movement Disorder Clinic",
                  "Botox Clinic",
                  "24/7 Emergency Service",
                ].map((clinic) => (
                  <span
                    key={clinic}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-100/70 px-3 py-1 text-xs font-semibold text-foreground dark:border-white/10 dark:bg-slate-900 dark:text-slate-200"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                    {clinic}
                  </span>
                ))}
              </div>
            </div>

            {/* Academic & Research Highlights */}
            <div className="grid gap-4 sm:grid-cols-2 pt-3">
              <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-4 dark:border-white/5 dark:bg-slate-900/40">
                <div className="flex items-center gap-2 text-primary font-heading font-bold text-sm">
                  <GraduationCap className="h-4 w-4" />
                  Academic Excellence
                </div>
                <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                  Enriched with reputed faculties conducting residency training &amp; Post Graduate courses (MD/MS/FCPS) under BSMMU &amp; BCPS.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-4 dark:border-white/5 dark:bg-slate-900/40">
                <div className="flex items-center gap-2 text-info font-heading font-bold text-sm">
                  <Microscope className="h-4 w-4" />
                  Research &amp; Collaboration
                </div>
                <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                  Conducted National Epilepsy &amp; Stroke Survey. Active clinical trials on GBS in collaboration with ICDDRB and international bodies.
                </p>
              </div>
            </div>

            <p className="text-xs text-muted-foreground italic border-l-2 border-primary pl-3 pt-1">
              &quot;Patients receive specialized services almost free of cost or with minimal government charges. We believe our institute will be a centre of excellence in the near future.&quot;
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
