import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/home/navbar"
import { Footer } from "@/components/home/footer"
import {
  ShieldAlert,
  PhoneCall,
  Clock,
  MapPin,
  ArrowLeft,
  Activity,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react"

export const metadata = {
  title: "Emergency Department | National Institute of Neurosciences & Hospital",
  description:
    "24/7 Acute Stroke Emergency, Casualty Ward, Trauma Resuscitation & Ambulance Admission at NINS&H.",
}

export default function EmergencyDepartmentPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50/50 dark:bg-slate-950">
      {/* Top Header Banner */}
      <div className="w-full bg-white border-b print:hidden">
        <div className="mx-auto flex w-full max-w-7xl justify-center px-4 py-2">
          <Link href="/" className="inline-block transition-opacity hover:opacity-95">
            <Image
              src="/images/nins-header.webp"
              alt="National Institute of Neurosciences & Hospital"
              width={1200}
              height={150}
              className="h-auto max-h-[110px] w-auto object-contain"
              priority
            />
          </Link>
        </div>
      </div>

      <Navbar />

      <main className="flex-1 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-6 space-y-10">
          
          {/* Breadcrumb */}
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-4 dark:border-white/10">
            <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span>/</span>
              <span>Departments</span>
              <span>/</span>
              <span className="text-foreground font-bold">Emergency</span>
            </div>

            <Link
              href="/departments"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-foreground shadow-2xs hover:bg-slate-50 dark:border-white/10 dark:bg-slate-900"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              All Departments
            </Link>
          </div>

          {/* Hero Banner Section */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-950 via-red-900 to-slate-950 p-8 lg:p-12 text-white shadow-2xl">
            <div className="pointer-events-none absolute top-0 right-0 h-96 w-96 rounded-full bg-rose-500/20 blur-3xl" />
            
            <div className="relative z-10 space-y-4 max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-3.5 py-1 text-xs font-black text-rose-300 uppercase tracking-wide">
                <ShieldAlert className="h-4 w-4 animate-bounce text-rose-400" />
                24 Hours / 7 Days Open Emergency Casualty
              </div>
              <h1 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                24/7 Neuro-Emergency &amp; Trauma Casualty
              </h1>
              <p className="text-sm sm:text-base text-slate-200 font-medium leading-relaxed">
                Dedicated rapid thrombolysis team, CT/MRI diagnostic triage, acute stroke management, and head injury resuscitation.
              </p>

              {/* Call Hotline CTA */}
              <div className="pt-2">
                <a
                  href="tel:+88029140752"
                  className="inline-flex items-center gap-3 rounded-2xl bg-white px-6 py-3.5 text-xs font-extrabold text-rose-600 shadow-xl transition-transform hover:scale-105"
                >
                  <PhoneCall className="h-5 w-5 text-rose-600 animate-pulse" />
                  <span>24/7 Hotline: +880 2-9140752</span>
                </a>
              </div>
            </div>
          </div>

          {/* Emergency Triage Features */}
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-lg dark:border-white/10 dark:bg-slate-900 space-y-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10 text-rose-600">
                <Activity className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-base font-bold text-foreground">Acute Stroke Triage</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Immediate IV tPA thrombolytic therapy for ischemic stroke patients arriving within golden hours (4.5 hours).
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-lg dark:border-white/10 dark:bg-slate-900 space-y-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-base font-bold text-foreground">Head &amp; Spine Trauma</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                24/7 trauma resuscitation room equipped for acute intracranial hemorrhage, cerebral edema &amp; spinal fractures.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-lg dark:border-white/10 dark:bg-slate-900 space-y-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
                <Clock className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-base font-bold text-foreground">24/7 CT &amp; MRI Scans</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Priority STAT emergency neuroimaging for immediate diagnosis of stroke type and cerebral trauma.
              </p>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}
