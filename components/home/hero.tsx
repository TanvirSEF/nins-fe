import dynamic from "next/dynamic"
import { ShieldCheck } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

// Auth-dependent interactive parts loaded as client islands after hydration.
// The static hero text and layout render immediately on the server.
const HeroCta = dynamic(
  () => import("./hero-cta").then((m) => ({ default: m.HeroCta })),
  {
    ssr: false,
    loading: () => (
      <div className="flex flex-wrap gap-3 pt-2">
        <Skeleton className="h-11 w-52 rounded-xl" />
        <Skeleton className="h-11 w-40 rounded-xl" />
      </div>
    ),
  },
)

const HeroQuickActions = dynamic(
  () =>
    import("./hero-cta").then((m) => ({ default: m.HeroQuickActions })),
  {
    ssr: false,
    loading: () => (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-20 w-full rounded-2xl" />
        ))}
      </div>
    ),
  },
)

// Hero is now a Server Component — static content renders on the server,
// auth-dependent CTAs hydrate asynchronously without blocking first paint.
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-50/50 py-16 lg:py-24 dark:bg-slate-950/20">
      {/* Visual background gradient glows */}
      <div className="pointer-events-none absolute top-0 -right-24 h-150 w-150 rounded-full bg-[radial-gradient(circle,oklch(0.952_0.028_196/20%)_0%,transparent_70%)] dark:bg-[radial-gradient(circle,oklch(0.36_0.05_196/10%)_0%,transparent_70%)]" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-100 w-100 rounded-full bg-[radial-gradient(circle,oklch(0.968_0.007_247.9/10%)_0%,transparent_70%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Text Left Column — 100% static, no JS */}
          <div className="space-y-6 text-left lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
              <ShieldCheck className="h-3.5 w-3.5" />
              National Institute of Neurosciences &amp; Hospital
            </div>

            <h1 className="font-heading text-4xl leading-[1.1] font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Advancing{" "}
              <span className="bg-linear-to-r from-primary to-info bg-clip-text text-transparent">
                Neurological
              </span>{" "}
              Care &amp; Innovation
            </h1>

            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Access the NINS Enterprise Portal for automated outpatient
              appointment serials, real-time ICU/HDU status widgets, and secure
              electronic prescriptions.
            </p>

            {/* Auth-dependent CTA buttons */}
            <HeroCta />
          </div>

          {/* Right Column Quick Actions — auth-dependent */}
          <HeroQuickActions />
        </div>
      </div>
    </section>
  )
}
