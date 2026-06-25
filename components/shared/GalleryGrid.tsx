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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ImageIcon } from "lucide-react"

const LIMIT = 12
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

/** Public hospital gallery grid with category filter, lightbox, pagination. */
export function GalleryGrid() {
  const [page, setPage] = React.useState(1)
  const [category, setCategory] = React.useState<GalleryCategory | undefined>()
  const [active, setActive] = React.useState<GalleryItem | null>(null)

  const { data, isLoading, isError, refetch } = useGallery({
    page,
    limit: LIMIT,
    category,
  })

  const onCategoryChange = (v: string) => {
    setCategory(v === ALL ? undefined : (v as GalleryCategory))
    setPage(1)
  }

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
            <Skeleton key={i} className="aspect-square w-full rounded-xl" />
          ))}
        </div>
      ) : isError ? (
        <DirectoryError onRetry={refetch} />
      ) : data && data.data.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {data.data.map((item) => (
            <button
              key={item._id}
              type="button"
              onClick={() => setActive(item)}
              className="group overflow-hidden rounded-xl border border-border bg-card text-left transition-shadow hover:shadow-md"
            >
              <div className="relative aspect-square overflow-hidden bg-muted">
                <RemoteImage
                  src={item.imageUrl}
                  alt={item.title}
                  width={400}
                  height={400}
                  className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                  fallback={<ImageIcon className="size-8 text-muted-foreground" />}
                />
                <Badge className="absolute top-2 left-2 bg-background/80 backdrop-blur">
                  {CATEGORY_LABEL[item.category]}
                </Badge>
              </div>
              <div className="p-3">
                <p className="truncate font-heading text-sm font-semibold text-foreground">
                  {item.title}
                </p>
                {item.description && (
                  <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
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

      {data && data.data.length > 0 && (
        <Pagination page={page} meta={data.meta} onPageChange={setPage} />
      )}

      <Lightbox item={active} onClose={() => setActive(null)} />
    </div>
  )
}

function Lightbox({
  item,
  onClose,
}: {
  item: GalleryItem | null
  onClose: () => void
}) {
  return (
    <Dialog open={!!item} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden">
        {item && (
          <>
            <DialogTitle className="sr-only">{item.title}</DialogTitle>
            <div className="bg-muted">
              <RemoteImage
                src={item.imageUrl}
                alt={item.title}
                width={1024}
                height={768}
                className="max-h-[70vh] w-full object-contain"
                fallback={<ImageIcon className="size-10 text-muted-foreground" />}
              />
            </div>
            <div className="space-y-1 p-4">
              <div className="flex items-center gap-2">
                <h3 className="font-heading text-base font-semibold text-foreground">
                  {item.title}
                </h3>
                <Badge variant="secondary">{CATEGORY_LABEL[item.category]}</Badge>
              </div>
              {item.description && (
                <DialogDescription>{item.description}</DialogDescription>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
