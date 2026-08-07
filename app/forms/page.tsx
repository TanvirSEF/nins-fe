import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/home/navbar"
import { Footer } from "@/components/home/footer"
import { Download, FileText, ArrowLeft } from "lucide-react"

export const metadata = { title: "Download Forms & Patient Documents | NINS&H" }

const formList = [
  { name: "OPD Patient Ticket Registration Form", size: "245 KB", type: "PDF" },
  { name: "Social Welfare Financial Assistance Application", size: "180 KB", type: "PDF" },
  { name: "MRI / CT Scan Diagnostic Requisition Form", size: "320 KB", type: "PDF" },
  { name: "Staff No Objection Certificate (NOC) Form", size: "150 KB", type: "PDF" },
  { name: "Postgraduate MD/MS Admission Application Form", size: "410 KB", type: "PDF" },
]

export default function DownloadFormsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50/50 dark:bg-slate-950">
      <div className="w-full bg-white border-b print:hidden">
        <div className="mx-auto flex w-full max-w-7xl justify-center px-4 py-2">
          <Link href="/"><Image src="/images/nins-header.webp" alt="NINS" width={1200} height={150} className="h-auto max-h-[110px] w-auto object-contain" priority /></Link>
        </div>
      </div>
      <Navbar />
      <main className="flex-1 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-6 space-y-10">
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-4 dark:border-white/10">
            <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
              <Link href="/">Home</Link><span>/</span><span className="text-foreground font-bold">Download Forms</span>
            </div>
            <Link href="/" className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-slate-50">
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
            </Link>
          </div>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f766e] p-8 lg:p-12 text-white shadow-2xl">
            <div className="relative z-10 space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-semibold text-teal-200">
                <Download className="h-3.5 w-3.5" /> Public Download Portal
              </div>
              <h1 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">Downloadable Forms &amp; Documents</h1>
              <p className="text-sm text-slate-200">Download official NINS OPD forms, social welfare aid applications, and staff NOC requisitions.</p>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200/80 bg-white shadow-xl dark:border-white/10 dark:bg-slate-900">
            <div className="divide-y divide-slate-100 dark:divide-white/5">
              {formList.map((f) => (
                <div key={f.name} className="flex items-center justify-between p-5 text-xs">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-primary shrink-0" />
                    <div>
                      <h4 className="font-heading font-bold text-foreground">{f.name}</h4>
                      <p className="text-muted-foreground text-[11px]">{f.type} • {f.size}</p>
                    </div>
                  </div>
                  <button className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-2 text-xs font-bold text-primary-foreground shadow-xs hover:bg-primary/90">
                    <Download className="h-3.5 w-3.5" /> Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
