import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/home/navbar"
import { Hero } from "@/components/home/hero"
import { AboutSection } from "@/components/home/about-section"
import { NoticeSection } from "@/components/home/notice-section"
import { DepartmentsShowcase } from "@/components/home/departments-showcase"
import { FeaturedDoctors } from "@/components/home/featured-doctors"
import { StrokeGuidanceBanner } from "@/components/home/stroke-guidance-banner"
import { TestTariffSection } from "@/components/home/test-tariff-section"
import { PatientStories } from "@/components/home/patient-stories"
import { GallerySection } from "@/components/home/gallery-section"
import { VideoGallerySection } from "@/components/home/video-gallery-section"
import { FaqSection } from "@/components/home/faq-section"
import { ContactSection } from "@/components/home/contact-section"
import { Footer } from "@/components/home/footer"
import { MarqueeBar } from "@/components/home/marquee-bar"

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
      <MarqueeBar />

      {/* Navbar with Dropdowns & Auth */}
      <Navbar />

      {/* Main Master Homepage Flow (Removed compounding space-y margins for clean section rhythm) */}
      <main className="flex-1">
        {/* 1. Hero Section: 100% Full-Width Slider */}
        <Hero />

        {/* 2. About Section: History, Award, Leadership & Stats */}
        <AboutSection />

        {/* 3. Official Notice Board & Announcements */}
        <NoticeSection />

        {/* 4. Specialized Clinical Departments & Wings */}
        <DepartmentsShowcase />

        {/* 6. Prominent Specialist Doctors & Faculty */}
        <FeaturedDoctors />

        {/* 7. 24/7 F.A.S.T. Stroke Emergency & Hotline Banner */}
        <StrokeGuidanceBanner />

        {/* 8. Diagnostic Test Tariff & Govt Subsidies */}
        <TestTariffSection />

        {/* 9. Patient Recovery Stories & Testimonials */}
        <PatientStories />

        {/* 10. Photo Gallery & Event Showcase */}
        <GallerySection />

        {/* 11. Video Gallery & Documentaries */}
        <VideoGallerySection />

        {/* 12. Interactive Patient FAQ & Help Center */}
        <FaqSection />

        {/* 13. Location, Emergency & Contact Information */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
