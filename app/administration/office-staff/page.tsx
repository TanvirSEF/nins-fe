import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/home/navbar"
import { Footer } from "@/components/home/footer"
import {
  Building2,
  Phone,
  ArrowLeft,
  Users,
  Search,
  CheckCircle2,
} from "lucide-react"

export const metadata = {
  title: "Office Staff Directory | National Institute of Neurosciences & Hospital",
  description:
    "Section-wise office staff directory, accounts officers, storekeepers, and administrative assistants at NINS.",
}

const staffSections = [
  {
    section: "Director & Joint Director Secretariat",
    members: [
      { name: "Md. Mizanur Rahman", role: "PA to Director", ext: "305" },
      { name: "Kazi Nazrul Islam", role: "PA to Joint Director", ext: "306" },
      { name: "Md. Al-Amin", role: "Stenographer", ext: "307" },
    ],
  },
  {
    section: "Accounts & Finance Section",
    members: [
      { name: "Md. Kamal Hossain", role: "Senior Accounts Officer", ext: "215" },
      { name: "Abul Kalam Azad", role: "Cashier", ext: "216" },
      { name: "Sharmin Sultana", role: "Account Assistant", ext: "217" },
    ],
  },
  {
    section: "Store & Procurement Section",
    members: [
      { name: "Md. Shahinur Islam", role: "Store Officer (General)", ext: "110" },
      { name: "Engr. Rafiqul Islam", role: "Store Officer (Medical Equipment)", ext: "111" },
      { name: "Tariqul Hasan", role: "Assistant Storekeeper", ext: "112" },
    ],
  },
  {
    section: "Establishment & Record Room",
    members: [
      { name: "Md. Jahangir Hossain", role: "Head Clerk", ext: "220" },
      { name: "Nasreen Akter", role: "Record Keeper", ext: "221" },
      { name: "Md. Moniruzzaman", role: "Dispatch Officer", ext: "222" },
    ],
  },
]

export default function OfficeStaffPage() {
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
              <span className="text-foreground font-bold">Office Staff</span>
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
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#334155] p-8 lg:p-12 text-white shadow-2xl">
            <div className="pointer-events-none absolute top-0 right-0 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
            
            <div className="relative z-10 space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-semibold text-slate-200 backdrop-blur-md">
                <Users className="h-3.5 w-3.5" />
                Administrative Staff Directory • NINS&amp;H
              </div>
              <h1 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                Office Staff &amp; Administrative Personnel
              </h1>
              <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed">
                Section-wise directory of administrative assistants, accounts officers, storekeepers, and secretariat staff.
              </p>
            </div>
          </div>

          {/* Directory Sections */}
          <div className="space-y-8">
            {staffSections.map((sec) => (
              <div
                key={sec.section}
                className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xl dark:border-white/10 dark:bg-slate-900"
              >
                <div className="bg-slate-900 px-6 py-4 text-white border-b border-slate-800 flex items-center justify-between">
                  <h3 className="font-heading text-base font-bold flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-primary" />
                    {sec.section}
                  </h3>
                  <span className="text-xs font-semibold text-slate-400">
                    {sec.members.length} Members
                  </span>
                </div>

                <div className="divide-y divide-slate-100 dark:divide-white/5">
                  {sec.members.map((m) => (
                    <div
                      key={m.name}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-5 gap-3 transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-800/40 text-xs"
                    >
                      <div className="space-y-0.5">
                        <h4 className="font-heading text-sm font-bold text-foreground">
                          {m.name}
                        </h4>
                        <p className="text-xs font-semibold text-primary">
                          {m.role}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 text-muted-foreground font-medium">
                        <Phone className="h-3.5 w-3.5 text-emerald-500" />
                        <span>PABX Ext: <strong>{m.ext}</strong></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}
