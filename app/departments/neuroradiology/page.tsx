import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/home/navbar"
import { Footer } from "@/components/home/footer"
import {
  Binary,
  ArrowLeft,
  CheckCircle2,
  DollarSign,
} from "lucide-react"

export const metadata = {
  title: "Department of Neuroradiology & Imaging | NINS&H",
  description:
    "3 Tesla High-Resolution MRI, Multi-Slice CT Scan, Digital Angiography (DSA), and Ultrasound at NINS.",
}

export default function NeuroradiologyDepartmentPage() {
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
              <span className="text-foreground font-bold">Neuroradiology &amp; Imaging</span>
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
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#1e1b4b] via-[#312e81] to-[#0f172a] p-8 lg:p-12 text-white shadow-2xl">
            <div className="pointer-events-none absolute top-0 right-0 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />
            
            <div className="relative z-10 space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-semibold text-indigo-300 backdrop-blur-md">
                <Binary className="h-3.5 w-3.5" />
                Advanced Neuro-Diagnostic Center
              </div>
              <h1 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                Dept. of Neuroradiology &amp; Imaging
              </h1>
              <p className="text-sm sm:text-base text-slate-200 font-medium leading-relaxed">
                Housing state-of-the-art 3 Tesla MRI scanners, Multi-Slice Spiral CT, Cerebral DSA Angiography, and Digital X-Ray machines.
              </p>
            </div>
          </div>

          {/* Imaging Modalities */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-lg dark:border-white/10 dark:bg-slate-900 space-y-2">
              <span className="text-xs font-extrabold text-indigo-600 uppercase">3 Tesla MRI</span>
              <h3 className="font-heading text-base font-bold text-foreground">High-Res Brain &amp; Spine MRI</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Functional MRI, MR Angiography (MRA), MR Spectroscopy (MRS), and diffusion tensor imaging (DTI).
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-lg dark:border-white/10 dark:bg-slate-900 space-y-2">
              <span className="text-xs font-extrabold text-indigo-600 uppercase">Multi-Slice CT</span>
              <h3 className="font-heading text-base font-bold text-foreground">CT Angiography &amp; Brain Scans</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                128-slice rapid spiral CT scans for immediate acute stroke hemorrhage evaluation and spinal imaging.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-lg dark:border-white/10 dark:bg-slate-900 space-y-2">
              <span className="text-xs font-extrabold text-indigo-600 uppercase">Cath Lab</span>
              <h3 className="font-heading text-base font-bold text-foreground">Biplane DSA Angiography</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Diagnostic cerebral digital subtraction angiography (DSA) for vascular malformations &amp; aneurysms.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-lg dark:border-white/10 dark:bg-slate-900 space-y-2">
              <span className="text-xs font-extrabold text-indigo-600 uppercase">Ultrasound &amp; Doppler</span>
              <h3 className="font-heading text-base font-bold text-foreground">Transcranial Doppler (TCD)</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Carotid Doppler ultrasonography and non-invasive intracranial cerebral blood flow evaluation.
              </p>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}
