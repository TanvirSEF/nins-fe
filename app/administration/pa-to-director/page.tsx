import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/home/navbar"
import { Footer } from "@/components/home/footer"
import {
  Building2,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowLeft,
  CalendarCheck,
  UserCheck,
  ShieldAlert,
} from "lucide-react"

export const metadata = {
  title: "PA to Director & Joint Director | National Institute of Neurosciences & Hospital",
  description:
    "Official appointments, interview protocol, and contact details for PA to Director & Joint Director at NINS.",
}

export default function PAToDirectorPage() {
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
              <span>Administration</span>
              <span>/</span>
              <span className="text-foreground font-bold">PA to Director &amp; Joint Director</span>
            </div>

            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-foreground shadow-2xs hover:bg-slate-50 dark:border-white/10 dark:bg-slate-900"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Home
            </Link>
          </div>

          {/* Hero Banner Section */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0f172a] via-[#1e3a5f] to-[#3b82f6] p-8 lg:p-12 text-white shadow-2xl">
            <div className="pointer-events-none absolute top-0 right-0 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
            
            <div className="relative z-10 space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-semibold text-blue-200 backdrop-blur-md">
                <Building2 className="h-3.5 w-3.5" />
                Directorate Secretariat Protocol
              </div>
              <h1 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                PA to Director &amp; Joint Director
              </h1>
              <p className="text-sm sm:text-base text-slate-200 font-medium leading-relaxed">
                Official appointment booking, visitor protocol, official correspondence, and executive meeting schedules at NINS&amp;H.
              </p>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid gap-8 md:grid-cols-2">
            
            {/* PA to Director Card */}
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xl space-y-5 dark:border-white/10 dark:bg-slate-900">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4 dark:border-white/5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <UserCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-heading text-base font-bold text-foreground">
                    PA to Director (NINS)
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Personal Assistant to Prof. Dr. Mohammad Nuruzzaman Khan
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 dark:bg-slate-950 dark:border-white/5">
                  <span className="font-bold text-foreground">Officer Name:</span>
                  <span className="font-semibold text-primary">Md. Mizanur Rahman</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 dark:bg-slate-950 dark:border-white/5">
                  <span className="font-bold text-foreground">PABX Extension:</span>
                  <span className="font-mono font-bold text-emerald-600">305</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 dark:bg-slate-950 dark:border-white/5">
                  <span className="font-bold text-foreground">Office Timing:</span>
                  <span>8:00 AM to 2:30 PM (Friday &amp; Holiday Off)</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="tel:+880241024570"
                  className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground shadow-md transition-all hover:bg-primary/90"
                >
                  <Phone className="h-4 w-4" />
                  Call Director Secretariat (PABX 305)
                </a>
              </div>
            </div>

            {/* PA to Joint Director Card */}
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xl space-y-5 dark:border-white/10 dark:bg-slate-900">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4 dark:border-white/5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
                  <UserCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-heading text-base font-bold text-foreground">
                    PA to Joint Director (NINS)
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Personal Assistant to Prof. Dr. Md. Badrul Alam Mondal
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 dark:bg-slate-950 dark:border-white/5">
                  <span className="font-bold text-foreground">Officer Name:</span>
                  <span className="font-semibold text-emerald-600">Kazi Nazrul Islam</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 dark:bg-slate-950 dark:border-white/5">
                  <span className="font-bold text-foreground">PABX Extension:</span>
                  <span className="font-mono font-bold text-emerald-600">306</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 dark:bg-slate-950 dark:border-white/5">
                  <span className="font-bold text-foreground">Office Timing:</span>
                  <span>8:00 AM to 2:30 PM (Friday &amp; Holiday Off)</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="tel:+880241024583"
                  className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-[#2c474e] px-4 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:bg-slate-800"
                >
                  <Phone className="h-4 w-4" />
                  Call Joint Director Secretariat (PABX 306)
                </a>
              </div>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}
