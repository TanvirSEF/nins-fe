"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Image as ImageIcon, ArrowRight, X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react"
import { useLanguage } from "@/context/language-context"

const galleryImages = [
  {
    id: 1,
    src: "/images/Financial_Assistance_Distribution_Ceremony_for_Stroke_and_Paralysis_Patients.webp",
    title: "Financial Assistance Distribution Ceremony",
    categoryKey: "events",
    categoryDefault: "Events & Ceremonies",
    subtitle: "Support for Stroke & Paralysis Patients at NINS Hospital",
  },
  {
    id: 2,
    src: "/images/Shahid President Ziaur Rahman -Sports Tournament-2026.webp",
    title: "Annual Sports Tournament 2026",
    categoryKey: "events",
    categoryDefault: "Events & Ceremonies",
    subtitle: "NINS Cultural & Athletics Program for Physicians & Staff",
  },
  {
    id: 3,
    src: "/images/Routine_Visit_of_Director.webp",
    title: "Routine Inspection Visit of Director",
    categoryKey: "visits",
    categoryDefault: "Official Visits",
    subtitle: "Ensuring High Standards in Clinical Wards & ICU Units",
  },
  {
    id: 4,
    src: "/images/Transport_and_Bridge_Ministry_Visit.webp",
    title: "Ministry Delegation Visit to NINS",
    categoryKey: "visits",
    categoryDefault: "Official Visits",
    subtitle: "High-Level Inspection of Facilities & Infrastructure",
  },
  {
    id: 5,
    src: "/images/Pre_Inaugural_Inspection_Discussion_Meeting_1.webp",
    title: "Pre-Inaugural Discussion Meeting",
    categoryKey: "visits",
    categoryDefault: "Official Visits",
    subtitle: "Strategic Healthcare Expansion & Clinical Review",
  },
  {
    id: 6,
    src: "/images/dengu_Awarness.webp",
    title: "Dengue Awareness & Prevention Seminar",
    categoryKey: "awareness",
    categoryDefault: "Awareness & Seminars",
    subtitle: "Community Health & Public Safety Campaign",
  },
]

export function GallerySection() {
  const { dict } = useLanguage()
  const t = dict.gallery

  const categories = [
    { key: "all", label: t.categories.all },
    { key: "events", label: t.categories.events },
    { key: "visits", label: t.categories.visits },
    { key: "awareness", label: t.categories.awareness },
  ]

  const [activeCategoryKey, setActiveCategoryKey] = React.useState("all")
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null)

  const filteredGallery = galleryImages.filter(
    (item) => activeCategoryKey === "all" || item.categoryKey === activeCategoryKey
  )

  // Keyboard navigation for Lightbox
  React.useEffect(() => {
    if (selectedIndex === null) return

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") {
        e.preventDefault()
        setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredGallery.length - 1))
      } else if (e.key === "ArrowRight") {
        e.preventDefault()
        setSelectedIndex((prev) => (prev !== null && prev < filteredGallery.length - 1 ? prev + 1 : 0))
      } else if (e.key === "Escape") {
        e.preventDefault()
        setSelectedIndex(null)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedIndex, filteredGallery.length])

  return (
    <section className="relative overflow-hidden bg-white py-16 lg:py-24 dark:bg-slate-950 border-t border-slate-100 dark:border-white/5">
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-10 border-b border-slate-100 dark:border-white/10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1 text-xs font-semibold text-primary">
              <ImageIcon className="h-3.5 w-3.5" />
              {t.badge}
            </div>
            <h2 className="font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              {t.heading}
            </h2>
            <p className="text-sm text-muted-foreground max-w-xl">
              {t.subtext}
            </p>
          </div>

          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 shrink-0"
          >
            {t.viewAll}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Category Tabs */}
        <div className="mt-8 flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => {
                setActiveCategoryKey(cat.key)
                setSelectedIndex(null)
              }}
              className={`rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
                activeCategoryKey === cat.key
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-slate-100 text-muted-foreground hover:bg-slate-200 hover:text-foreground dark:bg-slate-900 dark:hover:bg-slate-800"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Photo Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setSelectedIndex(idx)}
              className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-slate-900"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
                    {t.categories[item.categoryKey as keyof typeof t.categories] || item.categoryDefault}
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

        {/* Fullscreen Lightbox Modal */}
        {selectedIndex !== null && filteredGallery[selectedIndex] && (
          <div className="fixed inset-0 z-50 flex flex-col bg-slate-950/98 p-4 text-white backdrop-blur-xl animate-in fade-in duration-200">
            {/* Top Header Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                  {t.lightboxLabel}
                </span>
                <span className="rounded-full bg-white/10 px-3 py-0.5 text-xs font-medium text-slate-300">
                  {selectedIndex + 1} of {filteredGallery.length}
                </span>
              </div>
              <button
                onClick={() => setSelectedIndex(null)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-rose-600"
                title="Close (Esc)"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Photo Canvas & Navigation */}
            <div className="relative flex flex-1 items-center justify-center py-4 overflow-hidden">
              <button
                onClick={() =>
                  setSelectedIndex(selectedIndex > 0 ? selectedIndex - 1 : filteredGallery.length - 1)
                }
                className="absolute left-2 sm:left-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-slate-900/80 text-white backdrop-blur-md border border-white/20 shadow-xl transition-transform hover:scale-110 hover:bg-primary"
                title="Previous (Left Arrow)"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <div className="relative h-full w-full max-w-7xl flex items-center justify-center">
                <Image
                  src={filteredGallery[selectedIndex].src}
                  alt={filteredGallery[selectedIndex].title}
                  fill
                  sizes="100vw"
                  className="object-contain rounded-xl shadow-2xl transition-all duration-300"
                  priority
                />
              </div>

              <button
                onClick={() =>
                  setSelectedIndex(selectedIndex < filteredGallery.length - 1 ? selectedIndex + 1 : 0)
                }
                className="absolute right-2 sm:right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-slate-900/80 text-white backdrop-blur-md border border-white/20 shadow-xl transition-transform hover:scale-110 hover:bg-primary"
                title="Next (Right Arrow)"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            {/* Bottom Caption & Keyboard Instructions */}
            <div className="mx-auto max-w-4xl w-full rounded-2xl border border-white/10 bg-slate-900/90 p-4 backdrop-blur-md space-y-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-heading text-base sm:text-lg font-bold text-white">
                  {filteredGallery[selectedIndex].title}
                </h3>
                <span className="rounded-md bg-primary/80 px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">
                  {t.categories[filteredGallery[selectedIndex].categoryKey as keyof typeof t.categories] || filteredGallery[selectedIndex].categoryDefault}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300">
                {filteredGallery[selectedIndex].subtitle}
              </p>
              <p className="text-[11px] text-slate-400 pt-1">
                {t.keyboardTip}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
