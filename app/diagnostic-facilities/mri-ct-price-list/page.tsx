import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/home/navbar"
import { Footer } from "@/components/home/footer"
import {
  DollarSign,
  ShieldCheck,
  ArrowLeft,
  Search,
  CheckCircle2,
  Binary,
} from "lucide-react"

export const metadata = {
  title: "MRI & CT Scan Price List (Govt Subsidized) | NINS&H",
  description:
    "Official government-approved subsidized price list for 3T MRI, Multi-Slice CT scans, and contrast imaging at National Institute of Neurosciences & Hospital.",
}

const priceList = [
  { test: "MRI of Brain (Plain)", govtRate: "৳ 3,000", privateRate: "৳ 8,000", time: "Same Day / Next Day" },
  { test: "MRI of Brain with Contrast", govtRate: "৳ 4,000", privateRate: "৳ 12,000", time: "Same Day / Next Day" },
  { test: "MRI of Cervical / Lumbar Spine", govtRate: "৳ 3,000", privateRate: "৳ 8,500", time: "Same Day" },
  { test: "MRI Angiography (MRA) Brain", govtRate: "৳ 4,000", privateRate: "৳ 11,000", time: "24 Hours" },
  { test: "CT Scan of Head / Brain (Plain)", govtRate: "৳ 2,000", privateRate: "৳ 5,000", time: "STAT Emergency / 1 Hour" },
  { test: "CT Scan of Brain with Contrast", govtRate: "৳ 3,000", privateRate: "৳ 7,500", time: "2 Hours" },
  { test: "CT Angiography (CTA) Cerebral", govtRate: "৳ 5,000", privateRate: "৳ 15,000", time: "24 Hours" },
  { test: "CT Scan of Spine (Single Region)", govtRate: "৳ 2,000", privateRate: "৳ 5,500", time: "Same Day" },
]

export default function MriCtPriceListPage() {
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
              <span>Diagnostic Facilities</span>
              <span>/</span>
              <span className="text-foreground font-bold">MRI &amp; CT Scan Price List</span>
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
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0f172a] via-[#1e3a5f] to-[#047857] p-8 lg:p-12 text-white shadow-2xl">
            <div className="pointer-events-none absolute top-0 right-0 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />
            
            <div className="relative z-10 space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-bold text-emerald-400 backdrop-blur-md">
                <ShieldCheck className="h-3.5 w-3.5" />
                Official Subsidized Government Rates
              </div>
              <h1 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                MRI &amp; CT Scan Official Price Chart
              </h1>
              <p className="text-sm sm:text-base text-slate-200 font-medium leading-relaxed">
                NINS provides high-resolution 3 Tesla MRI &amp; 128-slice CT scans at government-subsidized rates — up to 70% cheaper than private centers.
              </p>
            </div>
          </div>

          {/* Price Table Card */}
          <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xl dark:border-white/10 dark:bg-slate-900">
            <div className="bg-slate-900 p-5 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2 font-heading font-bold text-sm">
                <DollarSign className="h-4 w-4 text-emerald-400" />
                Government Subsidized Test Fee Table
              </div>
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-md border border-emerald-500/20">
                100% Free Care for Needy Patients (Social Welfare)
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200/80 bg-slate-50 text-slate-600 font-bold dark:border-white/10 dark:bg-slate-950 dark:text-slate-300">
                    <th className="p-4">Diagnostic Test Name</th>
                    <th className="p-4 w-44 text-right">NINS Govt Charge</th>
                    <th className="p-4 w-44 text-right">Private Rate</th>
                    <th className="p-4 w-48 text-center">Report Delivery Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                  {priceList.map((row) => (
                    <tr key={row.test} className="transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                      <td className="p-4 font-semibold text-foreground">
                        {row.test}
                      </td>
                      <td className="p-4 text-right font-extrabold font-mono text-sm text-emerald-600 dark:text-emerald-400">
                        {row.govtRate}
                      </td>
                      <td className="p-4 text-right font-mono text-xs text-slate-400 line-through">
                        {row.privateRate}
                      </td>
                      <td className="p-4 text-center">
                        <span className="inline-block rounded-md bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-700 dark:bg-white/10 dark:text-slate-300">
                          {row.time}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}
