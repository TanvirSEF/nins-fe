import Image from "next/image"
import { Navbar } from "@/components/home/navbar"
import { Hero } from "@/components/home/hero"
import { AboutSection } from "@/components/home/about-section"
import { Footer } from "@/components/home/footer"

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
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
      <Navbar />
      <main className="flex-1">
        <Hero />
        <AboutSection />
      </main>
      <Footer />
    </div>
  )
}
