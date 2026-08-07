import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/home/navbar"
import { Footer } from "@/components/home/footer"
import {
  Brain,
  Calendar,
  Clock,
  MapPin,
  Phone,
  ArrowLeft,
  CheckCircle2,
  Stethoscope,
  Users,
  Award,
} from "lucide-react"

export const metadata = {
  title: "Department of Neurology | National Institute of Neurosciences & Hospital",
  description:
    "Comprehensive clinical neurology services, stroke management, epilepsy clinic, movement disorders, and OPD schedules at NINS&H.",
}

const neurologyUnits = [
  { name: "Stroke & Neuro-Vascular Unit", head: "Prof. Dr. Tanvir Ahmed", room: "Room 201", days: "Sat, Mon, Wed" },
  { name: "Epilepsy & EEG Clinic", head: "Dr. Fahmida Rouf", room: "Room 204", days: "Sun, Tue, Thu" },
  { name: "Movement Disorders & Parkinson's", head: "Prof. Dr. M. A. Hasan", room: "Room 205", days: "Sat, Tue" },
  { name: "Neuromuscular & EMG Clinic", head: "Dr. Sadeka Afrin", room: "Room 208", days: "Mon, Thu" },
]

export default function NeurologyDepartmentPage() {
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
              <span className="text-foreground font-bold">Neurology</span>
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
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#1e3a5f] via-[#2563eb] to-[#0f172a] p-8 lg:p-12 text-white shadow-2xl">
            <div className="pointer-events-none absolute top-0 right-0 h-96 w-96 rounded-full bg-primary/30 blur-3xl" />
            
            <div className="relative z-10 space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-semibold text-blue-200 backdrop-blur-md">
                <Brain className="h-3.5 w-3.5" />
                Premier Neurological Care Wing
              </div>
              <h1 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                Department of Neurology &amp; Allied Sciences
              </h1>
              <p className="text-sm sm:text-base text-slate-200 font-medium leading-relaxed">
                Nationwide tertiary referral center for acute stroke, epilepsy, neuromuscular disorders, Parkinson&apos;s disease, and neuro-immunology.
              </p>
            </div>
          </div>

          {/* Grid Layout */}
          <div className="grid gap-10 lg:grid-cols-12 items-start">
            
            {/* Main Content (8 Cols) */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Overview & Wings */}
              <div className="rounded-3xl border border-slate-200/80 bg-white p-6 lg:p-8 shadow-xl space-y-6 dark:border-white/10 dark:bg-slate-900">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4 dark:border-white/5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Stethoscope className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-foreground">
                      Specialized Clinical Units &amp; OPD Clinics
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Subspecialty OPD visiting rooms and faculty in-charge
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {neurologyUnits.map((unit) => (
                    <div
                      key={unit.name}
                      className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4 space-y-2 dark:border-white/10 dark:bg-slate-950"
                    >
                      <h4 className="font-heading text-sm font-bold text-foreground">
                        {unit.name}
                      </h4>
                      <p className="text-xs font-semibold text-primary">
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

            {/* Sidebar Info (4 Cols) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xl space-y-4 dark:border-white/10 dark:bg-slate-900">
                <h4 className="font-heading text-xs font-bold text-foreground uppercase tracking-wider border-b border-slate-100 pb-3 dark:border-white/5">
                  OPD &amp; Inpatient Information
                </h4>

                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">OPD Ticket Timing:</span>
                    <span className="font-bold text-foreground">8:00 AM – 2:00 PM</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">OPD Ticket Fee:</span>
                    <span className="font-bold text-emerald-600">৳ 10 (Govt Fee)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Neurology Wards:</span>
                    <span className="font-bold text-foreground">Floor 4 &amp; Floor 5</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/dashboard/patient/book"
                    className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground shadow-md hover:bg-primary/90"
                  >
                    Book OPD Serial Online
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
