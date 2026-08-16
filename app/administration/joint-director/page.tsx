import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/home/navbar"
import { Footer } from "@/components/home/footer"
import {
  Building2,
  Award,
  GraduationCap,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Quote,
  ArrowLeft,
  BookOpen,
  UserCheck,
  User,
  Calendar,
  Briefcase,
} from "lucide-react"

export const metadata = {
  title: "Joint Director Profile | Prof. Dr. Md. Badrul Alam Mondal | NINS",
  description:
    "Official biography, career timeline, qualifications, and contact details of Prof. Dr. Md. Badrul Alam Mondal, Joint Director & Professor of Neurology at NINS.",
}

export default function JointDirectorPage() {
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
              <span className="text-foreground font-bold">Joint Director</span>
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
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#2c474e] to-[#0f172a] p-8 lg:p-12 text-white shadow-2xl">
            <div className="pointer-events-none absolute top-0 right-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
            
            <div className="relative z-10 space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-semibold text-emerald-300 backdrop-blur-md">
                <Building2 className="h-3.5 w-3.5" />
                Office of the Joint Director • NINS&amp;H
              </div>
              <h1 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                Office of the Joint Director
              </h1>
              <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed">
                National Institute of Neurosciences &amp; Hospital (NINS&amp;H) • Sher-E-Bangla Nagar, Agargaon, Dhaka
              </p>
            </div>
          </div>

          {/* Main Content Layout Grid */}
          <div className="grid gap-10 lg:grid-cols-12 items-start">
            
            {/* Left Column: Portrait & Contact Card (4 Cols) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Image Frame Card */}
              <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-4 shadow-xl dark:border-white/10 dark:bg-slate-900">
                <div className="relative mx-auto h-80 sm:h-96 w-full flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-100/80 text-slate-400 shadow-sm dark:border-white/15 dark:bg-slate-950">
                  <User className="h-20 w-20 stroke-[1.2] text-slate-400/70" />
                  <span className="mt-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Photo to be updated</span>
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent p-4 text-white text-center rounded-b-2xl">
                    <span className="rounded-md bg-[#2c474e] px-3 py-1 text-xs font-bold uppercase tracking-wider">
                      JOINT DIRECTOR
                    </span>
                  </div>
                </div>

                <div className="mt-4 text-center space-y-1">
                  <h3 className="font-heading text-base font-bold text-foreground">
                    To be appointed
                  </h3>
                  <p className="text-xs font-semibold text-primary">
                    Joint Director, NINS&amp;H
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
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 shrink-0">
                      <Phone className="h-4 w-4" />
                    </div>
                    <div className="space-y-0.5">
                      <span className="block text-[11px] font-bold text-muted-foreground uppercase">Direct Telephone</span>
                      <a href="tel:+880241024583" className="font-semibold text-foreground hover:text-primary transition-colors">
                        +880-2-41024583
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
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

              {/* Organizational Leadership Badges */}
              <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xl space-y-3 dark:border-white/10 dark:bg-slate-900">
                <h4 className="font-heading text-xs font-bold text-foreground uppercase tracking-wider">
                  Professional Leadership Roles
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2 rounded-xl bg-emerald-500/10 p-3 text-emerald-700 font-bold dark:text-emerald-300">
                    <UserCheck className="h-4 w-4 shrink-0" />
                    <span>President, Society of Neurologists of Bangladesh (SNB)</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl bg-slate-100 p-3 text-slate-700 font-semibold dark:bg-slate-950 dark:text-slate-300">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                    <span>Member, Society of Pain Medicine, Bangladesh</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl bg-slate-100 p-3 text-slate-700 font-semibold dark:bg-slate-950 dark:text-slate-300">
                    <CheckCircle2 className="h-4 w-4 text-info shrink-0" />
                    <span>Member, Association of Physicians of Bangladesh</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Qualifications, Biography & Career Timeline (8 Cols) */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Academic Degrees & Fellowships */}
              <div className="rounded-3xl border border-slate-200/80 bg-white p-6 lg:p-8 shadow-xl space-y-6 dark:border-white/10 dark:bg-slate-900">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4 dark:border-white/5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-foreground">
                      Academic Degrees &amp; Royal Fellowships
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Post-graduate neurological accreditations &amp; international college fellowships
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 space-y-2 dark:border-white/5 dark:bg-slate-950">
                    <div className="flex items-center gap-2 text-primary font-bold text-xs">
                      <CheckCircle2 className="h-4 w-4" />
                      Medical Qualifications
                    </div>
                    <ul className="space-y-1.5 text-xs text-foreground font-medium pl-6 list-disc">
                      <li>MBBS (Rangpur Medical College, 1982)</li>
                      <li>MD in Neurology (IPGMR / BSMMU, 1999)</li>
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 space-y-2 dark:border-white/5 dark:bg-slate-950">
                    <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs">
                      <Award className="h-4 w-4" />
                      Royal &amp; American Fellowships
                    </div>
                    <ul className="space-y-1.5 text-xs text-foreground font-medium pl-6 list-disc">
                      <li>FACP (USA) – Fellow of American College of Physicians</li>
                      <li>FRCP (Glasgow, UK) – Fellow of Royal College of Physicians</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Official Biography of Joint Director */}
              <div className="rounded-3xl border border-slate-200/80 bg-white p-6 lg:p-8 shadow-xl space-y-5 dark:border-white/10 dark:bg-slate-900">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4 dark:border-white/5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Quote className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-foreground">
                      Biography of Joint Director, NINS
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Prof. Dr. Md. Badrul Alam Mondal
                    </p>
                  </div>
                </div>

                <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                  <p>
                    Prof. Dr. Md. Badrul Alam Mondal was born on 30th June, 1957 in a Muslim family in Kachuahat village of Shaghata Upazila in the District of Gaibandha, Bangladesh. He graduated with his MBBS degree in 1982 from Rangpur Medical College, Bangladesh under the University of Rajshahi. In 1999, he obtained his post-graduation degree in MD (Neurology) from the Institute of Post Graduate Medicine &amp; Research (IPGMR), Dhaka, under the University of Dhaka.
                  </p>
                  <p>
                    He entered Government Service as an Assistant Surgeon at Rangpur Medical College Hospital on 31st October 1983. Later, he was promoted to Assistant Professor of Neuromedicine at Dhaka Medical College Hospital on 30th June 1999; Associate Professor on 24th September 2006, and Professor of Neurology on 30th May 2012 at NINS.
                  </p>
                  <p className="font-medium text-foreground bg-slate-50 p-4 rounded-2xl border-l-4 border-emerald-500 dark:bg-slate-950">
                    🏆 <strong>Project Director Role:</strong> On 12th January 2012, he was appointed as Project Director of NINS in an additional charge. As Project Director, he spearheaded the establishment of the National Institute of Neurosciences &amp; Hospital (NINS) in Bangladesh — building a tertiary neuroscience hospital that provides specialized care to neurological and neurosurgical patients while creating new avenues for manpower development.
                  </p>
                  <p>
                    He currently serves as Professor of Neurology &amp; Joint Director at NINS&amp;H. A Fellow of the American College of Physicians (FACP) and Royal College of Physicians (FRCP, Glasgow, UK), he serves as the President of the Society of Neurologists of Bangladesh (SNB) (previously Vice President from 2016 and Organizing Secretary from 2007–2016). He has authored 10 peer-reviewed scientific publications in reputed national and international journals.
                  </p>
                </div>
              </div>

              {/* Professional Career Milestone Timeline */}
              <div className="rounded-3xl border border-slate-200/80 bg-white p-6 lg:p-8 shadow-xl space-y-6 dark:border-white/10 dark:bg-slate-900">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4 dark:border-white/5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-info/10 text-info">
                    <Briefcase className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-foreground">
                      Career Milestone Timeline
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Key appointments &amp; administrative promotions
                    </p>
                  </div>
                </div>

                <div className="relative border-l-2 border-slate-200 ml-4 space-y-6 dark:border-white/10">
                  <div className="relative pl-6">
                    <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-emerald-500 border-4 border-white dark:border-slate-900" />
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Jan 12, 2012 – Present</span>
                    <h4 className="font-heading text-sm font-bold text-foreground">Project Director &amp; Joint Director, NINS</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Established NINS facility in Agargaon and leads neurology academic programs.
                    </p>
                  </div>

                  <div className="relative pl-6">
                    <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-primary border-4 border-white dark:border-slate-900" />
                    <span className="text-xs font-bold text-primary">May 30, 2012</span>
                    <h4 className="font-heading text-sm font-bold text-foreground">Professor of Neurology</h4>
                    <p className="text-xs text-muted-foreground">Promoted to Professor at NINS.</p>
                  </div>

                  <div className="relative pl-6">
                    <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-info border-4 border-white dark:border-slate-900" />
                    <span className="text-xs font-bold text-info">Sep 24, 2006</span>
                    <h4 className="font-heading text-sm font-bold text-foreground">Associate Professor of Neuromedicine</h4>
                    <p className="text-xs text-muted-foreground">Appointed Associate Professor.</p>
                  </div>

                  <div className="relative pl-6">
                    <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-amber-500 border-4 border-white dark:border-slate-900" />
                    <span className="text-xs font-bold text-amber-500">Jun 30, 1999</span>
                    <h4 className="font-heading text-sm font-bold text-foreground">Assistant Professor of Neuromedicine (DMCH)</h4>
                    <p className="text-xs text-muted-foreground">Dhaka Medical College Hospital.</p>
                  </div>

                  <div className="relative pl-6">
                    <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-slate-400 border-4 border-white dark:border-slate-900" />
                    <span className="text-xs font-bold text-slate-500">Oct 31, 1983</span>
                    <h4 className="font-heading text-sm font-bold text-foreground">Assistant Surgeon (Govt. Service Entry)</h4>
                    <p className="text-xs text-muted-foreground">Rangpur Medical College Hospital.</p>
                  </div>
                </div>
              </div>

              {/* Research & Publications Highlight */}
              <div className="rounded-3xl border border-slate-200/80 bg-white p-6 lg:p-8 shadow-xl space-y-3 dark:border-white/10 dark:bg-slate-900">
                <div className="flex items-center gap-2 text-primary font-heading font-bold text-sm">
                  <BookOpen className="h-4 w-4" />
                  Scientific Research &amp; Publications
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Prof. Dr. Md. Badrul Alam Mondal has authored over <strong>10 peer-reviewed scientific publications</strong> in national and international neurological journals, contributing significantly to epilepsy research and stroke care protocols in Bangladesh.
                </p>
              </div>

            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}
