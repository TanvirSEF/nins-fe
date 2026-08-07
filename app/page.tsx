import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/home/navbar"
import { Hero } from "@/components/home/hero"
import { AboutSection } from "@/components/home/about-section"
import { NoticeSection } from "@/components/home/notice-section"
import { PatientServicesGrid } from "@/components/home/patient-services-grid"
import { DepartmentsShowcase } from "@/components/home/departments-showcase"
import { FeaturedDoctors } from "@/components/home/featured-doctors"
import { TestTariffSection } from "@/components/home/test-tariff-section"
import { GallerySection } from "@/components/home/gallery-section"
import { VideoGallerySection } from "@/components/home/video-gallery-section"
import { ContactSection } from "@/components/home/contact-section"
import { Footer } from "@/components/home/footer"

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Top Header Banner Only */}
      <div className="w-full bg-white border-b print:hidden">
        <div className="mx-auto flex w-full max-w-7xl justify-center px-4 py-2">
          <Link href="/" className="inline-block transition-opacity hover:opacity-95">
            <Image
              src="/images/nins-header.webp"
              alt="National Institute of Neurosciences & Hospital"
              width={1200}
              height={150}
              className="h-auto max-h-[120px] w-auto object-contain"
              priority
            />
          </Link>
        </div>
      </div>

      {/* Emergency & Notice Marquee Bar */}
      <div className="w-full overflow-hidden bg-destructive py-1.5 text-destructive-foreground print:hidden">
        <div className="flex animate-[marquee_30s_linear_infinite] whitespace-nowrap">
          <span className="mx-16 text-sm font-medium tracking-wide">
            🚨 24/7 Emergency Hotline: +880 2-9140752 | Notice: Welcome to National Institute of Neurosciences &amp; Hospital (NINS). Emergency &amp; Stroke services 24/7. OPD Registration: 8:00 AM – 2:00 PM.
          </span>
          <span className="mx-16 text-sm font-medium tracking-wide" aria-hidden="true">
            🚨 24/7 Emergency Hotline: +880 2-9140752 | Notice: Welcome to National Institute of Neurosciences &amp; Hospital (NINS). Emergency &amp; Stroke services 24/7. OPD Registration: 8:00 AM – 2:00 PM.
          </span>
        </div>
      </div>

      {/* Navbar with Dropdowns & Auth */}
      <Navbar />

      {/* Main Master Homepage Flow */}
      <main className="flex-1 space-y-12 sm:space-y-16">
        {/* 1. Hero Section: 100% Full-Width Slider */}
        <Hero />

        {/* 2. About Section: History, Award, Leadership & Stats (Directly after Hero) */}
        <AboutSection />

        {/* 3. Official Notice Board & Announcements */}
        <NoticeSection />

        {/* 4. Quick Patient Action Portal Grid */}
        <PatientServicesGrid />

        {/* 5. Specialized Clinical Departments & Wings */}
        <DepartmentsShowcase />

        {/* 6. Prominent Specialist Doctors & Faculty */}
        <FeaturedDoctors />

        {/* 7. Diagnostic Test Tariff & Govt Subsidies */}
        <TestTariffSection />

        {/* 8. Photo Gallery & Event Showcase */}
        <GallerySection />

        {/* 9. Video Gallery & Documentaries */}
        <VideoGallerySection />

        {/* 10. Location, Emergency & Contact Information */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
