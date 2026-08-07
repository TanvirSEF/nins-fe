import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/home/navbar"
import { Footer } from "@/components/home/footer"
import {
  BedDouble,
  HeartPulse,
  Activity,
  ArrowLeft,
  CheckCircle2,
  Phone,
} from "lucide-react"

export const metadata = {
  title: "Department of Critical Care Medicine (ICU) | NINS&H",
  description:
    "30-Bed Neuro-ICU, 100-Bed Stroke Unit, High Dependency Unit (HDU) and mechanical ventilation at NINS.",
}

export default function CriticalCareDepartmentPage() {
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
              <span className="text-foreground font-bold">Critical Care Medicine</span>
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
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0f172a] via-[#134e4a] to-[#047857] p-8 lg:p-12 text-white shadow-2xl">
            <div className="pointer-events-none absolute top-0 right-0 h-96 w-96 rounded-full bg-teal-500/20 blur-3xl" />
            
            <div className="relative z-10 space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-semibold text-teal-300 backdrop-blur-md">
                <HeartPulse className="h-3.5 w-3.5" />
                Specialized Intensive Care Wing
              </div>
              <h1 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                Department of Critical Care Medicine (ICU)
              </h1>
              <p className="text-sm sm:text-base text-slate-200 font-medium leading-relaxed">
                Featuring Bangladesh&apos;s largest 30-Bed Neuro-ICU, 100-Bedded Stroke HDU, invasive intracranial pressure (ICP) monitoring, and advanced mechanical ventilation.
              </p>
            </div>
          </div>

          {/* Units Grid */}
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-lg dark:border-white/10 dark:bg-slate-900 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600">
                <BedDouble className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-base font-bold text-foreground">30-Bed Neuro-ICU</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Dedicated intensive care beds for post-operative brain tumor, aneurysm surgery, and severe head injury management.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-lg dark:border-white/10 dark:bg-slate-900 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Activity className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-base font-bold text-foreground">100-Bed Stroke Unit</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Comprehensive stroke rehabilitation &amp; acute monitoring ward with continuous cardiac and oxygen monitoring.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-lg dark:border-white/10 dark:bg-slate-900 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-base font-bold text-foreground">High Dependency Unit (HDU)</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Step-down critical care unit for stabilizing neurological patients prior to ward transfer.
              </p>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}
