import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/home/navbar"
import { Footer } from "@/components/home/footer"
import { ShieldAlert, ArrowLeft } from "lucide-react"

export const metadata = { title: "Emergency Services | NINS&H" }

export default function ServicesEmergencyPage() {
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
              <Link href="/">Home</Link><span>/</span><span>Services</span><span>/</span><span className="text-foreground font-bold">Emergency</span>
            </div>
            <Link href="/" className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-slate-50">
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
            </Link>
          </div>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#991b1b] via-[#dc2626] to-[#0f172a] p-8 lg:p-12 text-white shadow-2xl">
            <div className="relative z-10 space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-semibold text-rose-200">
                <ShieldAlert className="h-3.5 w-3.5" /> 24/7 Casualty Wing
              </div>
              <h1 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">Emergency Casualty Services</h1>
              <p className="text-sm text-slate-200">24/7 Hotline: +880 2-9140752. Instant stroke resuscitation, acute trauma triage &amp; ambulance admissions.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
