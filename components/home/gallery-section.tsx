"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Image as ImageIcon, ArrowRight, X, ZoomIn } from "lucide-react"

const galleryCategories = ["All Photos", "Events & Ceremonies", "Official Visits", "Awareness & Seminars"]

const galleryImages = [
  {
    id: 1,
    src: "/images/Financial_Assistance_Distribution_Ceremony_for_Stroke_and_Paralysis_Patients.webp",
    title: "Financial Assistance Distribution Ceremony",
    category: "Events & Ceremonies",
    subtitle: "Support for Stroke & Paralysis Patients",
  },
  {
    id: 2,
    src: "/images/Shahid President Ziaur Rahman -Sports Tournament-2026.webp",
    title: "Annual Sports Tournament 2026",
    category: "Events & Ceremonies",
    subtitle: "NINS Cultural & Athletics Program",
  },
  {
    id: 3,
    src: "/images/Routine_Visit_of_Director.webp",
    title: "Routine Inspection Visit of Director",
    category: "Official Visits",
    subtitle: "Ensuring High Standards in Clinical Wards",
  },
  {
    id: 4,
    src: "/images/Transport_and_Bridge_Ministry_Visit.webp",
    title: "Ministry Delegation Visit to NINS",
    category: "Official Visits",
    subtitle: "High-Level Inspection of Facilities",
  },
  {
    id: 5,
    src: "/images/Pre_Inaugural_Inspection_Discussion_Meeting_1.webp",
    title: "Pre-Inaugural Discussion Meeting",
    category: "Official Visits",
    subtitle: "Strategic Healthcare Expansion Review",
  },
  {
    id: 6,
    src: "/images/dengu_Awarness.webp",
    title: "Dengue Awareness & Prevention Seminar",
    category: "Awareness & Seminars",
    subtitle: "Community Health & Public Safety Campaign",
  },
]

export function GallerySection() {
  const [activeCategory, setActiveCategory] = React.useState("All Photos")
  const [selectedImage, setSelectedImage] = React.useState<typeof galleryImages[0] | null>(null)

  const filteredGallery = galleryImages.filter(
    (item) => activeCategory === "All Photos" || item.category === activeCategory
  )

  return (
    <section className="relative overflow-hidden bg-white py-16 lg:py-24 dark:bg-slate-950 border-t border-slate-100 dark:border-white/5">
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-10 border-b border-slate-100 dark:border-white/10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1 text-xs font-semibold text-primary">
              <ImageIcon className="h-3.5 w-3.5" />
              Photo Showcase
            </div>
            <h2 className="font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              NINS Gallery &amp; Recent Activities
            </h2>
            <p className="text-sm text-muted-foreground max-w-xl">
              Glimpses of clinical operations, official delegation visits, medical seminars, and student achievements at NINS.
            </p>
          </div>

          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 shrink-0"
          >
            Explore Full Gallery
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Category Tabs */}
        <div className="mt-8 flex flex-wrap items-center gap-2">
          {galleryCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-slate-100 text-muted-foreground hover:bg-slate-200 hover:text-foreground dark:bg-slate-900 dark:hover:bg-slate-800"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Photo Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-slate-900"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-80 transition-opacity group-hover:opacity-90" />
                
                {/* Zoom Icon Badge */}
                <div className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-slate-950/60 text-white backdrop-blur-md opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <ZoomIn className="h-4 w-4" />
                </div>

                {/* Caption Overlay */}
                <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                  <span className="inline-block rounded-md bg-primary/80 px-2 py-0.5 text-[10px] font-semibold tracking-wide backdrop-blur-sm">
                    {item.category}
                  </span>
                  <h3 className="font-heading text-sm font-bold leading-snug line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-slate-300 line-clamp-1 font-medium">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-md animate-in fade-in duration-200">
            <div className="relative max-w-4xl w-full overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-slate-950/70 text-white backdrop-blur-md hover:bg-rose-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="relative h-[360px] sm:h-[480px] w-full">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="p-6 bg-slate-950 border-t border-white/10 text-white space-y-1">
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                  {selectedImage.category}
                </span>
                <h3 className="font-heading text-lg font-bold">
                  {selectedImage.title}
                </h3>
                <p className="text-xs text-slate-400">
                  {selectedImage.subtitle}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
