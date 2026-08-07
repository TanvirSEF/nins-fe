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
  UserCheck,
  DollarSign,
  Briefcase,
} from "lucide-react"

export const metadata = {
  title: "Assistant Director Profile | National Institute of Neurosciences & Hospital",
  description:
    "Official profile and hospital management details of Assistant Director at National Institute of Neurosciences & Hospital (NINS&H).",
}

export default function AssistantDirectorPage() {
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
              <span className="text-foreground font-bold">Assistant Director</span>
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
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#164e63] via-[#0e7490] to-[#0f172a] p-8 lg:p-12 text-white shadow-2xl">
            <div className="pointer-events-none absolute top-0 right-0 h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl" />
            
            <div className="relative z-10 space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-semibold text-cyan-200 backdrop-blur-md">
                <Building2 className="h-3.5 w-3.5" />
                Office of the Assistant Director • Management &amp; Finance
              </div>
              <h1 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                Assistant Director (Hospital Management)
              </h1>
              <p className="text-sm sm:text-base text-slate-200 font-medium leading-relaxed">
                Overseeing hospital logistics, financial accounts, budget allocation, and operational support at NINS&amp;H.
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
                    <UserCheck className="h-16 w-16 text-cyan-600 mx-auto opacity-80" />
                    <span className="block font-heading text-base font-bold text-foreground">Assistant Director Office</span>
                    <span className="text-xs text-muted-foreground">National Institute of Neurosciences &amp; Hospital</span>
                  </div>
                </div>

                <div className="text-center space-y-1">
                  <h3 className="font-heading text-base font-bold text-foreground">
                    Dr. Sirajul Islam
                  </h3>
                  <p className="text-xs font-semibold text-cyan-600">
                    Assistant Director (Hospital Management)
                  </p>
                  <p className="text-xs text-muted-foreground">
                    MBBS, BCS (Health), MHA
                  </p>
                </div>
              </div>

              {/* Contact Box */}
              <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xl space-y-4 dark:border-white/10 dark:bg-slate-900">
                <h4 className="font-heading text-xs font-bold text-foreground uppercase tracking-wider border-b border-slate-100 pb-3 dark:border-white/5">
                  Office Contact
                </h4>

                <div className="space-y-3 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-600 shrink-0">
                      <Phone className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold text-muted-foreground uppercase">Direct Phone</span>
                      <span className="font-bold text-foreground">+880-02-41024576</span>
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
                      <span className="font-semibold text-foreground">assistant.director@nins.gov.bd</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500 shrink-0">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold text-muted-foreground uppercase">Office Location</span>
                      <span className="font-medium text-foreground">3rd Floor, Administrative Wing, NINS</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Roles (8 Cols) */}
            <div className="lg:col-span-8 space-y-8">
              <div className="rounded-3xl border border-slate-200/80 bg-white p-6 lg:p-8 shadow-xl space-y-6 dark:border-white/10 dark:bg-slate-900">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4 dark:border-white/5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-600">
                    <Briefcase className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-foreground">
                      Management &amp; Logistics Overview
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Financial planning, linen supply, food catering &amp; ambulance operations
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 text-xs">
                  <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 space-y-2 dark:border-white/5 dark:bg-slate-950">
                    <div className="flex items-center gap-2 text-cyan-600 font-bold">
                      <DollarSign className="h-4 w-4" />
                      Budget &amp; Accounts Audit
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Managing annual revenue allocation, hospital user-fee collection, and government financial audits.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 space-y-2 dark:border-white/5 dark:bg-slate-950">
                    <div className="flex items-center gap-2 text-primary font-bold">
                      <CheckCircle2 className="h-4 w-4" />
                      Patient Diet &amp; Laundry Services
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Supervising therapeutic diet distribution for 500+ indoor patients and sterile laundry operations.
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
