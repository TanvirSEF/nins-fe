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
  CheckCircle2,
  ShieldCheck,
  UserCheck,
  Briefcase,
  FileText,
} from "lucide-react"

export const metadata = {
  title: "Deputy Director Profile | National Institute of Neurosciences & Hospital",
  description:
    "Official profile, responsibilities, and contact details of Deputy Director at National Institute of Neurosciences & Hospital (NINS&H).",
}

export default function DeputyDirectorPage() {
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
              <span className="text-foreground font-bold">Deputy Director</span>
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
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#1e293b] via-[#334155] to-[#0f172a] p-8 lg:p-12 text-white shadow-2xl">
            <div className="pointer-events-none absolute top-0 right-0 h-96 w-96 rounded-full bg-info/20 blur-3xl" />
            
            <div className="relative z-10 space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-semibold text-cyan-300 backdrop-blur-md">
                <Building2 className="h-3.5 w-3.5" />
                Office of the Deputy Director • Administration
              </div>
              <h1 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                Deputy Director (Administration)
              </h1>
              <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed">
                Supervising operational administration, staff discipline, hospital maintenance &amp; inter-departmental coordination at NINS&amp;H.
              </p>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid gap-10 lg:grid-cols-12 items-start">
            
            {/* Left Column: Officer Card & Contact (4 Cols) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xl dark:border-white/10 dark:bg-slate-900 space-y-4">
                <div className="relative mx-auto h-64 w-full overflow-hidden rounded-2xl border border-slate-300 bg-slate-100 dark:border-white/15 dark:bg-slate-950 flex items-center justify-center">
                  <div className="text-center p-6 space-y-2">
                    <UserCheck className="h-16 w-16 text-primary mx-auto opacity-80" />
                    <span className="block font-heading text-base font-bold text-foreground">Office of Deputy Director</span>
                    <span className="text-xs text-muted-foreground">National Institute of Neurosciences &amp; Hospital</span>
                  </div>
                </div>

                <div className="text-center space-y-1">
                  <h3 className="font-heading text-base font-bold text-foreground">
                    Dr. Md. Jahangir Alam
                  </h3>
                  <p className="text-xs font-semibold text-primary">
                    Deputy Director (Administration)
                  </p>
                  <p className="text-xs text-muted-foreground">
                    MBBS, MPH (Hospital Management)
                  </p>
                </div>
              </div>

              {/* Contact Box */}
              <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xl space-y-4 dark:border-white/10 dark:bg-slate-900">
                <h4 className="font-heading text-xs font-bold text-foreground uppercase tracking-wider border-b border-slate-100 pb-3 dark:border-white/5">
                  Office Contact &amp; PABX
                </h4>

                <div className="space-y-3 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-info/10 text-info shrink-0">
                      <Phone className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold text-muted-foreground uppercase">PABX Direct Line</span>
                      <span className="font-bold text-foreground">+880-02-41024575</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold text-muted-foreground uppercase">Office Hours</span>
                      <span className="font-semibold text-foreground">8:00 AM – 2:30 PM (Sat–Thu)</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 shrink-0">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold text-muted-foreground uppercase">Email</span>
                      <span className="font-semibold text-foreground">deputy.director@nins.gov.bd</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500 shrink-0">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold text-muted-foreground uppercase">Office Location</span>
                      <span className="font-medium text-foreground">3rd Floor, Administrative Block, NINS</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Roles & Key Functions (8 Cols) */}
            <div className="lg:col-span-8 space-y-8">
              <div className="rounded-3xl border border-slate-200/80 bg-white p-6 lg:p-8 shadow-xl space-y-6 dark:border-white/10 dark:bg-slate-900">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4 dark:border-white/5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Briefcase className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-foreground">
                      Administrative Responsibilities &amp; Supervision
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Key operational duties overseen by the Deputy Director
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 text-xs">
                  <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 space-y-2 dark:border-white/5 dark:bg-slate-950">
                    <div className="flex items-center gap-2 text-primary font-bold">
                      <CheckCircle2 className="h-4 w-4" />
                      Hospital Staff Discipline &amp; Rosters
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Managing administrative discipline, duty rosters, leave applications, and staff performance for non-medical and support personnel.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 space-y-2 dark:border-white/5 dark:bg-slate-950">
                    <div className="flex items-center gap-2 text-info font-bold">
                      <ShieldCheck className="h-4 w-4" />
                      Hospital Security &amp; Cleanliness
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Overseeing 24/7 hospital security protocols, outsourced sanitation teams, and hygiene maintenance across all 10 floors.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 space-y-2 dark:border-white/5 dark:bg-slate-950">
                    <div className="flex items-center gap-2 text-emerald-600 font-bold">
                      <FileText className="h-4 w-4" />
                      Procurement &amp; Store Requisitions
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Coordinating general hospital requisitions, office stationery, emergency equipment supplies, and store inventory.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 space-y-2 dark:border-white/5 dark:bg-slate-950">
                    <div className="flex items-center gap-2 text-amber-500 font-bold">
                      <Building2 className="h-4 w-4" />
                      Public Relations &amp; Citizen Charter
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Addressing patient public grievances, overseeing the Citizen Charter desk, and facilitating official government communications.
                    </p>
                  </div>
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
