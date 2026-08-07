"use client"

import * as React from "react"
import { useGallery } from "@/services/queries/useGalleryQuery"
import { GalleryCategory, GalleryItem } from "@/types"
import { Pagination } from "@/components/shared/Pagination"
import { DirectoryError } from "@/components/shared/DepartmentsDirectory"
import { RemoteImage } from "@/components/shared/RemoteImage"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ImageIcon, ZoomIn, ChevronLeft, ChevronRight, X } from "lucide-react"

const LIMIT = 16
const ALL = "all"

const CATEGORY_LABEL: Record<GalleryCategory, string> = {
  [GalleryCategory.FACILITY]: "Facility",
  [GalleryCategory.EVENT]: "Event",
  [GalleryCategory.ACHIEVEMENT]: "Achievement",
  [GalleryCategory.HEALTH_CAMP]: "Health Camp",
  [GalleryCategory.OTHER]: "Other",
}

const CATEGORY_OPTIONS = [
  GalleryCategory.FACILITY,
  GalleryCategory.EVENT,
  GalleryCategory.ACHIEVEMENT,
  GalleryCategory.HEALTH_CAMP,
  GalleryCategory.OTHER,
] as const

/** Public hospital gallery grid with category filter, fullscreen keyboard-navigable lightbox. */
export function GalleryGrid() {
  const [page, setPage] = React.useState(1)
  const [category, setCategory] = React.useState<GalleryCategory | undefined>()
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null)

  const { data, isLoading, isError, refetch } = useGallery({
    page,
    limit: LIMIT,
    category,
  })

  const items = data?.data ?? []

  const onCategoryChange = (v: string) => {
    setCategory(v === ALL ? undefined : (v as GalleryCategory))
    setPage(1)
    setSelectedIndex(null)
  }

  // Keyboard navigation for Lightbox
  React.useEffect(() => {
    if (selectedIndex === null) return

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") {
        e.preventDefault()
        setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : items.length - 1))
      } else if (e.key === "ArrowRight") {
        e.preventDefault()
        setSelectedIndex((prev) => (prev !== null && prev < items.length - 1 ? prev + 1 : 0))
      } else if (e.key === "Escape") {
        e.preventDefault()
        setSelectedIndex(null)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedIndex, items.length])

  return (
    <div className="space-y-8">
      <Select value={category ?? ALL} onValueChange={onCategoryChange}>
        <SelectTrigger className="w-full sm:w-56">
          <SelectValue placeholder="All categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL}>All categories</SelectItem>
          {CATEGORY_OPTIONS.map((c) => (
            <SelectItem key={c} value={c}>
              {CATEGORY_LABEL[c]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {isLoading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="aspect-4/3 w-full rounded-2xl" />
          ))}
        </div>
      ) : isError ? (
        <DirectoryError onRetry={refetch} />
      ) : items.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item, idx) => (
            <button
              key={item._id}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-card text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/10"
            >
              <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-950">
                <RemoteImage
                  src={item.imageUrl}
                  alt={item.title}
                  width={600}
                  height={450}
                  className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  fallback={<ImageIcon className="size-8 text-muted-foreground" />}
                />
                <Badge className="absolute top-2.5 left-2.5 bg-slate-950/80 text-white backdrop-blur-md border border-white/10">
                  {CATEGORY_LABEL[item.category]}
                </Badge>
                <div className="absolute top-2.5 right-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-slate-950/60 text-white backdrop-blur-md opacity-0 transition-opacity group-hover:opacity-100">
                  <ZoomIn className="h-4 w-4" />
                </div>
              </div>
              <div className="p-4 space-y-1">
                <p className="font-heading text-sm font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                  {item.title}
                </p>
                {item.description && (
                  <p className="line-clamp-2 text-xs text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>
      ) : (
        <p className="rounded-xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
          No gallery images {category ? `in "${CATEGORY_LABEL[category]}"` : ""} yet.
        </p>
      )}

      {data && items.length > 0 && (
        <Pagination page={page} meta={data.meta} onPageChange={setPage} />
      )}

      {/* Fullscreen Lightbox Modal with Keyboard Navigation */}
      {selectedIndex !== null && items[selectedIndex] && (
        <div className="fixed inset-0 z-50 flex flex-col bg-slate-950/98 p-4 text-white backdrop-blur-xl animate-in fade-in duration-200">
          {/* Top Bar: Counter & Close */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                NINS Photo Showcase
              </span>
              <span className="rounded-full bg-white/10 px-3 py-0.5 text-xs font-medium text-slate-300">
                {selectedIndex + 1} of {items.length}
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

          {/* Main Photo Area with Left/Right Navigation */}
          <div className="relative flex flex-1 items-center justify-center py-4 overflow-hidden">
            {/* Previous Button */}
            <button
              onClick={() =>
                setSelectedIndex(selectedIndex > 0 ? selectedIndex - 1 : items.length - 1)
              }
              className="absolute left-2 sm:left-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-slate-900/80 text-white backdrop-blur-md border border-white/20 shadow-xl transition-transform hover:scale-110 hover:bg-primary"
              title="Previous (Left Arrow)"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Main High-Res Image (Full View) */}
            <div className="relative h-full w-full max-w-7xl flex items-center justify-center">
              <RemoteImage
                src={items[selectedIndex].imageUrl}
                alt={items[selectedIndex].title}
                width={1920}
                height={1280}
                className="max-h-full max-w-full object-contain rounded-xl shadow-2xl transition-all duration-300"
                fallback={<ImageIcon className="size-16 text-muted-foreground" />}
              />
            </div>

            {/* Next Button */}
            <button
              onClick={() =>
                setSelectedIndex(selectedIndex < items.length - 1 ? selectedIndex + 1 : 0)
              }
              className="absolute right-2 sm:right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-slate-900/80 text-white backdrop-blur-md border border-white/20 shadow-xl transition-transform hover:scale-110 hover:bg-primary"
              title="Next (Right Arrow)"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Bottom Caption & Details Bar */}
          <div className="mx-auto max-w-4xl w-full rounded-2xl border border-white/10 bg-slate-900/90 p-4 backdrop-blur-md space-y-1">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-heading text-base sm:text-lg font-bold text-white">
                {items[selectedIndex].title}
              </h3>
              <Badge className="bg-primary text-primary-foreground">
                {CATEGORY_LABEL[items[selectedIndex].category]}
              </Badge>
            </div>
            {items[selectedIndex].description && (
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {items[selectedIndex].description}
              </p>
            )}
            <p className="text-[11px] text-slate-400 pt-1">
              Tip: Use Left/Right Arrow keys on your keyboard to navigate photos. Press Esc to exit.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
