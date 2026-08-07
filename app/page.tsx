import Image from "next/image"
import { Navbar } from "@/components/home/navbar"
import { Hero } from "@/components/home/hero"
import { AboutSection } from "@/components/home/about-section"
import { NoticeSection } from "@/components/home/notice-section"
import { GallerySection } from "@/components/home/gallery-section"
import { VideoGallerySection } from "@/components/home/video-gallery-section"
import { ContactSection } from "@/components/home/contact-section"
import { Footer } from "@/components/home/footer"

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Top Header Banner */}
      <div className="w-full bg-white border-b print:hidden">
        <div className="mx-auto flex w-full max-w-7xl justify-center px-4 py-2">
          <Image
            src="/images/nins-header.webp"
            alt="NINS Header"
            width={1200}
            height={150}
            className="h-auto max-h-[120px] w-auto object-contain"
            priority
          />
        </div>
      </div>

      {/* Emergency & Notice Marquee Bar */}
      <div className="w-full overflow-hidden bg-destructive py-1.5 text-destructive-foreground print:hidden">
        <div className="flex animate-[marquee_30s_linear_infinite] whitespace-nowrap">
          <span className="mx-16 text-sm font-medium tracking-wide">
            Notice: Welcome to National Institute of Neurosciences &amp; Hospital (NINS). Emergency services are available 24/7. OPD registration is open from 8:00 AM to 2:00 PM.
          </span>
          <span className="mx-16 text-sm font-medium tracking-wide" aria-hidden="true">
            Notice: Welcome to National Institute of Neurosciences &amp; Hospital (NINS). Emergency services are available 24/7. OPD registration is open from 8:00 AM to 2:00 PM.
          </span>
        </div>
      </div>

      {/* Navbar with Dropdowns & Auth */}
      <Navbar />

      {/* Main Homepage Flow */}
      <main className="flex-1">
        {/* 1. Hero Section: 100% Full-Width Slider */}
        <Hero />

        {/* 2. About Section: History, Award, Leadership & Stats */}
        <AboutSection />

        {/* 3. Official Notice Board & Announcements */}
        <NoticeSection />

        {/* 4. Photo Gallery & Event Showcase */}
        <GallerySection />

        {/* 5. Video Gallery & Documentaries */}
        <VideoGallerySection />

        {/* 6. Location, Emergency & Contact Information */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
