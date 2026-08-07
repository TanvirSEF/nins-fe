import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/home/navbar"
import { Footer } from "@/components/home/footer"
import { GraduationCap, ArrowLeft, BookOpen, Award, CheckCircle2 } from "lucide-react"

export const metadata = {
  title: "Academic Courses & Postgraduate Residency | NINS&H",
  description:
    "BSMMU & BCPS affiliated MD (Neurology), MS (Neurosurgery), and Fellowship courses at National Institute of Neurosciences & Hospital.",
}

const courseList = [
  { degree: "MD (Neurology)", duration: "5 Years", seats: "15 Seats / Batch", institute: "Affiliated with BSMMU" },
  { degree: "MS (Neurosurgery)", duration: "5 Years", seats: "12 Seats / Batch", institute: "Affiliated with BSMMU" },
  { degree: "FCPS (Neurology)", duration: "5 Years", seats: "BCPS Accredited", institute: "BCPS Bangladesh" },
  { degree: "FCPS (Neurosurgery)", duration: "5 Years", seats: "BCPS Accredited", institute: "BCPS Bangladesh" },
]

export default function AcademicCoursesPage() {
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
              <span>Academic</span>
              <span>/</span>
              <span className="text-foreground font-bold">Academic Courses</span>
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
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#1e1b4b] via-[#312e81] to-[#0f172a] p-8 lg:p-12 text-white shadow-2xl">
            <div className="pointer-events-none absolute top-0 right-0 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />
            
            <div className="relative z-10 space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-semibold text-indigo-300 backdrop-blur-md">
                <GraduationCap className="h-3.5 w-3.5" />
                Postgraduate Medical Education
              </div>
              <h1 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                Academic Courses &amp; Residency Programs
              </h1>
              <p className="text-sm sm:text-base text-slate-200 font-medium leading-relaxed">
                NINS is Bangladesh&apos;s premier teaching hospital for MD (Neurology), MS (Neurosurgery), and post-doctoral neuro-vascular fellowships.
              </p>
            </div>
          </div>

          {/* Courses List Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {courseList.map((c) => (
              <div
                key={c.degree}
                className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-lg space-y-3 dark:border-white/10 dark:bg-slate-900"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600">
                  <Award className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-base font-bold text-foreground">{c.degree}</h3>
                <p className="text-xs font-semibold text-primary">{c.institute}</p>
                <div className="pt-2 text-xs text-muted-foreground space-y-1 border-t border-slate-100 dark:border-white/5">
                  <div>Duration: <strong>{c.duration}</strong></div>
                  <div>Seat Capacity: <strong>{c.seats}</strong></div>
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
