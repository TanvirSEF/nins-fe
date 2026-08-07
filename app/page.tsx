import Image from "next/image"
import { Navbar } from "@/components/home/navbar"
import { Hero } from "@/components/home/hero"
import { Stats } from "@/components/home/stats"
import { Services } from "@/components/home/services"
import { Footer } from "@/components/home/footer"
import { LiveBedBoard } from "@/components/shared/LiveBedBoard"

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
        <Stats />
        <section className="border-y border-slate-100 bg-slate-50/30 py-16 dark:border-white/10 lg:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mx-auto mb-12 max-w-2xl space-y-3 text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                Live Bed Availability
              </span>
              <h2 className="font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Critical care, at a glance
              </h2>
              <p className="text-sm text-muted-foreground">
                Real-time ICU &amp; HDU occupancy — check capacity before you
                arrive.
              </p>
            </div>
            <LiveBedBoard compact />
          </div>
        </section>
        <Services />
      </main>
      <Footer />
    </div>
  )
}
