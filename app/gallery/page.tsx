import { Navbar } from "@/components/home/navbar"
import { Footer } from "@/components/home/footer"
import { GalleryGrid } from "@/components/shared/GalleryGrid"

export const metadata = {
  title: "Gallery | NINS",
  description:
    "A look inside the National Institute of Neurosciences & Hospital — facilities, events, and outreach.",
}

export default function GalleryPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <section className="border-y border-slate-100 bg-white py-16 dark:border-white/10 lg:py-24">
          <div className="mx-auto max-w-7xl space-y-10 px-6">
            <div className="mx-auto mb-4 max-w-2xl space-y-3 text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                Inside NINS
              </span>
              <h1 className="font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Gallery
              </h1>
              <p className="text-sm text-muted-foreground">
                Facilities, milestones, and community outreach across the
                institute.
              </p>
            </div>
            <GalleryGrid />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
