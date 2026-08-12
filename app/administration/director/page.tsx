import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/home/navbar"
import { Footer } from "@/components/home/footer"
import {
  Building2,
  Award,
  GraduationCap,
  Globe,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  Quote,
  ArrowLeft,
  ShieldCheck,
  Stethoscope,
} from "lucide-react"

export const metadata = {
  title: "Director Profile | Prof. Dr. Mohammad Nuruzzaman Khan | NINS",
  description:
    "Official profile, qualifications, fellowships, and contact details of Prof. Dr. Mohammad Nuruzzaman Khan, Director of National Institute of Neurosciences & Hospital.",
}

export default function DirectorPage() {
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
          
          {/* Breadcrumb & Top Bar */}
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-4 dark:border-white/10">
            <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span>/</span>
              <span>Administration</span>
              <span>/</span>
              <span className="text-foreground font-bold">Director</span>
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
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#1e3a5f] to-[#0f172a] p-8 lg:p-12 text-white shadow-2xl">
            <div className="pointer-events-none absolute top-0 right-0 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
            
            <div className="relative z-10 space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-semibold text-primary-foreground backdrop-blur-md">
                <Building2 className="h-3.5 w-3.5" />
                Office of the Director • NINS&amp;H
              </div>
              <h1 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                Prof. Dr. Mohammad Nuruzzaman Khan
              </h1>
              <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed">
                Professor cum Director, National Institute of Neurosciences &amp; Hospital (NINS&amp;H)
              </p>
            </div>
          </div>

          {/* Main Content Layout Grid */}
          <div className="grid gap-10 lg:grid-cols-12 items-start">
            
            {/* Left Column: Portrait & Contact Card (4 Cols) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Image Frame Card */}
              <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-4 shadow-xl dark:border-white/10 dark:bg-slate-900">
                <div className="relative mx-auto h-80 sm:h-96 w-full overflow-hidden rounded-2xl border border-slate-300 bg-slate-100 shadow-sm dark:border-white/15 dark:bg-slate-950">
                  <Image
                    src="/images/Director-NINS.webp"
                    alt="Prof. Dr. Mohammad Nuruzzaman Khan"
                    fill
                    className="object-cover object-top"
                    priority
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent p-4 text-white text-center">
                    <span className="rounded-md bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider">
                      DIRECTOR
                    </span>
                  </div>
                </div>

                <div className="mt-4 text-center space-y-1">
                  <h3 className="font-heading text-base font-bold text-foreground">
                    Prof. Dr. Mohammad Nuruzzaman Khan
                  </h3>
                  <p className="text-xs font-semibold text-primary">
                    Professor cum Director, NINS&amp;H
                  </p>
                </div>
              </div>

              {/* Official Contact Info Box */}
              <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xl space-y-4 dark:border-white/10 dark:bg-slate-900">
                <h4 className="font-heading text-sm font-bold text-foreground uppercase tracking-wider border-b border-slate-100 pb-3 dark:border-white/5">
                  Official Communication
                </h4>

                <div className="space-y-3.5 text-xs">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                      <Phone className="h-4 w-4" />
                    </div>
                    <div className="space-y-0.5">
                      <span className="block text-[11px] font-bold text-muted-foreground uppercase">Direct Phone</span>
                      <a href="tel:+880241024570" className="font-semibold text-foreground hover:text-primary transition-colors">
                        +880-2-41024570
                      </a>
                      <span className="block text-[10px] text-muted-foreground">(8:00 AM to 2:30 PM Local time)</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-info/10 text-info shrink-0">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div className="space-y-0.5">
                      <span className="block text-[11px] font-bold text-muted-foreground uppercase">PA to Director PABX</span>
                      <span className="font-semibold text-foreground">Extension: 305</span>
                      <span className="block text-[10px] text-rose-500 font-semibold">(Friday &amp; Holiday Off)</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-success/10 text-success shrink-0">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div className="space-y-0.5">
                      <span className="block text-[11px] font-bold text-muted-foreground uppercase">Official Email</span>
                      <a href="mailto:nins_hospital@yahoo.com" className="font-semibold text-foreground hover:text-primary transition-colors break-all">
                        nins_hospital@yahoo.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500 shrink-0">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div className="space-y-0.5">
                      <span className="block text-[11px] font-bold text-muted-foreground uppercase">Office Location</span>
                      <span className="font-medium text-foreground leading-relaxed">
                        National Institute of Neurosciences &amp; Hospital
                        <br />
                        Sher-E-Bangla Nagar, Agargaon, Dhaka-1207
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Qualifications, Fellowships & Director's Message (8 Cols) */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Academic Degrees & Qualifications */}
              <div className="rounded-3xl border border-slate-200/80 bg-white p-6 lg:p-8 shadow-xl space-y-6 dark:border-white/10 dark:bg-slate-900">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4 dark:border-white/5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-foreground">
                      Academic Qualifications &amp; Accreditations
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Medical degrees, specialist board certifications &amp; surgical fellowships
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 space-y-2 dark:border-white/5 dark:bg-slate-950">
                    <div className="flex items-center gap-2 text-primary font-bold text-xs">
                      <CheckCircle2 className="h-4 w-4" />
                      Core Medical &amp; Surgical Degrees
                    </div>
                    <ul className="space-y-1.5 text-xs text-foreground font-medium pl-6 list-disc">
                      <li>MBBS (Dhaka Medical College - DMC)</li>
                      <li>MS in Neurosurgery</li>
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 space-y-2 dark:border-white/5 dark:bg-slate-950">
                    <div className="flex items-center gap-2 text-info font-bold text-xs">
                      <Award className="h-4 w-4" />
                      International Board Fellowships
                    </div>
                    <ul className="space-y-1.5 text-xs text-foreground font-medium pl-6 list-disc">
                      <li>FACS (USA) – Fellow of the American College of Surgeons</li>
                      <li>FMAS (India) – Fellow in Minimal Access Surgery</li>
                    </ul>
                  </div>
                </div>

                {/* Subspecialty Fellowships */}
                <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5 space-y-3">
                  <div className="flex items-center gap-2 text-primary font-heading font-bold text-sm">
                    <Globe className="h-4 w-4" />
                    Specialized International Fellowships in Spine Surgery
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2 text-xs font-semibold text-foreground">
                    <div className="flex items-center gap-2 rounded-xl bg-white p-3 border border-slate-200/80 shadow-2xs dark:border-white/10 dark:bg-slate-900">
                      <Stethoscope className="h-4 w-4 text-primary shrink-0" />
                      <span>WHO Fellow in Spine Surgery (Singapore)</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-xl bg-white p-3 border border-slate-200/80 shadow-2xs dark:border-white/10 dark:bg-slate-900">
                      <Stethoscope className="h-4 w-4 text-info shrink-0" />
                      <span>Fellow in Endoscopic Spine Surgery (S. Korea &amp; India)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Director's Welcome Message */}
              <div className="rounded-3xl border border-slate-200/80 bg-white p-6 lg:p-8 shadow-xl space-y-5 dark:border-white/10 dark:bg-slate-900">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4 dark:border-white/5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
                    <Quote className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-foreground">
                      Director&apos;s Statement &amp; Institutional Vision
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      National Institute of Neurosciences &amp; Hospital (NINS&amp;H)
                    </p>
                  </div>
                </div>

                <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                  <p>
                    Welcome to the National Institute of Neurosciences &amp; Hospital (NINS&amp;H). Since starting our journey in September 2012 under the visionary inauguration of the Government of the People&apos;s Republic of Bangladesh, NINS has stood as the nation&apos;s single government-run tertiary care center dedicated exclusively to neurological sciences.
                  </p>
                  <p>
                    Our 1000-bedded 10-storied facility houses specialized departments across Neurology, Neurosurgery, Pediatric Neurology, Pediatric Neurosurgery, Neurointervention, Neurorehabilitation, Neuroradiology, Neuropathology, and a 100-bedded Comprehensive Stroke Unit. Equipped with state-of-the-art 3 Tesla MRI scanners, advanced cath labs, and modern neurosurgical operation theaters, our mission is to deliver world-class medical care accessible to every citizen.
                  </p>
                  <p className="font-medium text-foreground italic border-l-4 border-primary pl-4 py-1">
                    &quot;We are deeply committed to advancing clinical excellence, postgraduate medical residency training under BSMMU &amp; BCPS, and pioneering clinical research. Our goal is to firmly establish NINS as a globally recognized center of excellence in neuroscience.&quot;
                  </p>
                </div>
              </div>

              {/* Core Administrative Priorities */}
              <div className="rounded-3xl border border-slate-200/80 bg-white p-6 lg:p-8 shadow-xl space-y-4 dark:border-white/10 dark:bg-slate-900">
                <h3 className="font-heading text-base font-bold text-foreground flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  Core Administrative Focus Areas
                </h3>
                <div className="grid gap-3 sm:grid-cols-2 text-xs">
                  <div className="rounded-xl bg-slate-50 p-3.5 font-medium text-foreground border border-slate-100 dark:bg-slate-950 dark:border-white/5">
                    🏥 <strong>24/7 Acute Casualty &amp; Stroke Care:</strong> Rapid thrombolysis and endovascular interventions.
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3.5 font-medium text-foreground border border-slate-100 dark:bg-slate-950 dark:border-white/5">
                    🎓 <strong>Academic Excellence:</strong> MD/MS/FCPS Residency courses affiliated with BSMMU &amp; BCPS.
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3.5 font-medium text-foreground border border-slate-100 dark:bg-slate-950 dark:border-white/5">
                    🔬 <strong>National Stroke &amp; Epilepsy Research:</strong> Active clinical trials in collaboration with ICDDRB.
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3.5 font-medium text-foreground border border-slate-100 dark:bg-slate-950 dark:border-white/5">
                    💰 <strong>Subsidized Healthcare:</strong> Providing specialized services free of cost or at minimal govt charges.
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
