import { Navbar } from "@/components/home/navbar"
import { Footer } from "@/components/home/footer"
import { LiveBedBoard } from "@/components/shared/LiveBedBoard"

export const metadata = {
  title: "Live Bed Board | NINS",
  description:
    "Real-time ICU and HDU bed availability at the National Institute of Neurosciences & Hospital.",
}

export default function BedsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <section className="border-y border-slate-100 bg-white py-16 dark:border-white/10 lg:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mx-auto mb-12 max-w-2xl space-y-3 text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                Live Status
              </span>
              <h1 className="font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                ICU &amp; HDU Bed Board
              </h1>
              <p className="text-sm text-muted-foreground">
                Real-time critical-care bed availability across NINS wards.
                Updated continuously by hospital staff.
              </p>
            </div>
            <LiveBedBoard />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
