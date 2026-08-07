import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/home/navbar"
import { Footer } from "@/components/home/footer"
import {
  Scissors,
  Calendar,
  MapPin,
  ArrowLeft,
  CheckCircle2,
  Stethoscope,
} from "lucide-react"

export const metadata = {
  title: "Department of Neurosurgery | National Institute of Neurosciences & Hospital",
  description:
    "Advanced neurosurgical operations, brain tumor surgery, endoscopic spine surgery, pediatric neurosurgery, and vascular surgery at NINS&H.",
}

const neurosurgeryUnits = [
  { name: "Vascular Neurosurgery & Aneurysm Unit", head: "Prof. Dr. Mohammad Nuruzzaman Khan", room: "Room 301", days: "Sat, Tue" },
  { name: "Spine & Endoscopic Surgery Unit", head: "Dr. Sadekur Rahman", room: "Room 305", days: "Sun, Wed" },
  { name: "Pediatric Neurosurgery Unit", head: "Prof. Dr. Rashidul Haque", room: "Room 308", days: "Mon, Thu" },
  { name: "Neuro-Oncology & Skull Base Unit", head: "Prof. Dr. Md. Badrul Alam Mondal", room: "Room 310", days: "Sat, Wed" },
]

export default function NeurosurgeryDepartmentPage() {
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
              <span className="text-foreground font-bold">Neurosurgery</span>
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
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#047857] p-8 lg:p-12 text-white shadow-2xl">
            <div className="pointer-events-none absolute top-0 right-0 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />
            
            <div className="relative z-10 space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-semibold text-emerald-300 backdrop-blur-md">
                <Scissors className="h-3.5 w-3.5" />
                Advanced Surgical Center
              </div>
              <h1 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                Department of Neurosurgery
              </h1>
              <p className="text-sm sm:text-base text-slate-200 font-medium leading-relaxed">
                State-of-the-art neurosurgical operation theaters performing complex brain aneurysm clipping, spinal instrumentation &amp; endoscopic tumor resections.
              </p>
            </div>
          </div>

          {/* Units Grid */}
          <div className="grid gap-10 lg:grid-cols-12 items-start">
            <div className="lg:col-span-8 space-y-8">
              <div className="rounded-3xl border border-slate-200/80 bg-white p-6 lg:p-8 shadow-xl space-y-6 dark:border-white/10 dark:bg-slate-900">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4 dark:border-white/5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
                    <Stethoscope className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-foreground">
                      Neurosurgery Specialized Units &amp; OPD Roster
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Outpatient consultation rooms and operating unit heads
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {neurosurgeryUnits.map((unit) => (
                    <div
                      key={unit.name}
                      className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4 space-y-2 dark:border-white/10 dark:bg-slate-950"
                    >
                      <h4 className="font-heading text-sm font-bold text-foreground">
                        {unit.name}
                      </h4>
                      <p className="text-xs font-semibold text-emerald-600">
                        Unit Head: {unit.head}
                      </p>
                      <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-1 border-t border-slate-200/60 dark:border-white/5">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-info" /> {unit.room}
                        </span>
                        <span className="flex items-center gap-1 font-medium text-foreground">
                          <Calendar className="h-3 w-3 text-emerald-500" /> {unit.days}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xl space-y-4 dark:border-white/10 dark:bg-slate-900">
                <h4 className="font-heading text-xs font-bold text-foreground uppercase tracking-wider border-b border-slate-100 pb-3 dark:border-white/5">
                  Neurosurgical OT &amp; Wards
                </h4>

                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Operation Theatres:</span>
                    <span className="font-bold text-foreground">6 Modular OTs (6th Floor)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Neurosurgery Wards:</span>
                    <span className="font-bold text-foreground">Floor 6 &amp; Floor 7</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Neuro-ICU Beds:</span>
                    <span className="font-bold text-emerald-600">30 ICU Beds Dedicated</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/diagnostic-facilities/ot-charge"
                    className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white shadow-md hover:bg-slate-800 dark:bg-white dark:text-slate-950"
                  >
                    View OT &amp; Surgery Charges
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}
