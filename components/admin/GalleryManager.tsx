"use client"

import * as React from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { format, isValid, parseISO } from "date-fns"
import {
  useGallery,
  useUploadGalleryImage,
  useUpdateGalleryItem,
  useDeleteGalleryItem,
} from "@/services/queries/useGalleryQuery"
import { useAuth } from "@/hooks/useAuth"
import { ApiError } from "@/lib/api-client"
import { GalleryCategory, GalleryItem, Role } from "@/types"
import { Pagination } from "@/components/shared/Pagination"
import { DirectoryError } from "@/components/shared/DepartmentsDirectory"
import { RemoteImage } from "@/components/shared/RemoteImage"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ConfirmDialog } from "./ConfirmDialog"
import { toast } from "sonner"
import { ImageIcon, Loader2, Pencil, Plus, Trash2, Upload } from "lucide-react"

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

function toasts(error: unknown, fallback: string) {
  const msgs = error instanceof ApiError ? error.messages : [fallback]
  msgs.forEach((m) => toast.error(m))
}

export function GalleryManager() {
  const { user } = useAuth()
  const isSuperAdmin = user?.role === Role.SUPER_ADMIN

  const [page, setPage] = React.useState(1)
  const [category, setCategory] = React.useState<GalleryCategory | undefined>()
  const [uploadOpen, setUploadOpen] = React.useState(false)
  const [editing, setEditing] = React.useState<GalleryItem | null>(null)
  const [deleting, setDeleting] = React.useState<GalleryItem | null>(null)

  // Admin sees ALL items including inactive — but the public GET /gallery only
  // returns active. We reuse the same endpoint; inactivation just hides from
  // the public site.
  const { data, isLoading, isError, refetch } = useGallery({
    page,
    limit: LIMIT,
    category,
  })
  const del = useDeleteGalleryItem()

  const onCategoryChange = (v: string) => {
    setCategory(v === ALL ? undefined : (v as GalleryCategory))
    setPage(1)
  }

  const confirmDelete = async () => {
    if (!deleting) return
    try {
      await del.mutateAsync(deleting._id)
      toast.success("Image deleted")
      setDeleting(null)
    } catch (error) {
      toasts(error, "Couldn't delete the image.")
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          Upload and manage hospital gallery images. Public visitors see active
          images on the <span className="font-medium">/gallery</span> page.
        </p>
        <Button onClick={() => setUploadOpen(true)} className="gap-1.5">
          <Plus className="size-4" /> Upload image
        </Button>
      </div>

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
            <Card key={item._id} className="overflow-hidden">
              <div className="relative aspect-square bg-muted">
                <RemoteImage
                  src={item.imageUrl}
                  alt={item.title}
                  width={400}
                  height={400}
                  className="size-full object-cover"
                  fallback={<ImageIcon className="size-8 text-muted-foreground" />}
                />
                <Badge className="absolute top-2 left-2 bg-background/80 backdrop-blur">
                  {CATEGORY_LABEL[item.category]}
                </Badge>
                {!item.isActive && (
                  <Badge className="absolute top-2 right-2 bg-muted/90 text-muted-foreground backdrop-blur">
                    Hidden
                  </Badge>
                )}
              </div>
              <CardContent className="space-y-2 p-3">
                <p className="truncate font-heading text-sm font-semibold text-foreground">
                  {item.title}
                </p>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] text-muted-foreground">
                    {item.createdAt && isValid(parseISO(item.createdAt))
                      ? format(parseISO(item.createdAt), "d MMM yyyy")
                      : ""}
                  </span>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => setEditing(item)}
                      aria-label="Edit"
                    >
                      <Pencil className="size-4" />
                    </Button>
                    {isSuperAdmin && (
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="text-destructive hover:bg-destructive/10"
                        onClick={() => setDeleting(item)}
                        aria-label="Delete"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="rounded-xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
          No gallery images {category ? `in "${CATEGORY_LABEL[category]}"` : ""}{" "}
          yet. Click <strong>Upload image</strong> to add one.
        </p>
      )}

      {data && data.data.length > 0 && (
        <Pagination page={page} meta={data.meta} onPageChange={setPage} />
      )}

      <UploadDialog open={uploadOpen} onOpenChange={setUploadOpen} />

      <EditDialog
        item={editing}
        onOpenChange={(o) => !o && setEditing(null)}
      />

      <ConfirmDialog
        open={!!deleting}
        onOpenChange={(o) => !o && setDeleting(null)}
        title="Delete this image?"
        description={
          deleting
            ? `“${deleting.title}” will be removed from the gallery and from R2 storage. This can't be undone.`
            : ""
        }
        confirmLabel="Delete"
        onConfirm={confirmDelete}
        loading={del.isPending}
      />
    </div>
  )
}

/* ─── Upload form ────────────────────────────────────────────────────── */

const uploadSchema = z.object({
  title: z.string().trim().min(2, "Title is required"),
  description: z.string().optional(),
  category: z.nativeEnum(GalleryCategory),
})
type UploadValues = z.infer<typeof uploadSchema>

function UploadDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  // Mount the form fresh each open (gated by `open`) so the file picker and
  // form state reset automatically — no setState-in-effect needed.
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        {open && <UploadForm onDone={() => onOpenChange(false)} />}
      </DialogContent>
    </Dialog>
  )
}

function UploadForm({ onDone }: { onDone: () => void }) {
  const upload = useUploadGalleryImage()
  const [file, setFile] = React.useState<File | null>(null)
  const [preview, setPreview] = React.useState<string | null>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (f) {
      setFile(f)
      setPreview(URL.createObjectURL(f))
    }
    e.target.value = ""
  }

  const form = useForm<UploadValues>({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      title: "",
      description: "",
      category: GalleryCategory.FACILITY,
    },
  })

  const onSubmit = async (values: UploadValues) => {
    if (!file) {
      toast.error("Please choose an image file.")
      return
    }
    try {
      await upload.mutateAsync({
        file,
        title: values.title,
        description: values.description?.trim() || undefined,
        category: values.category,
      })
      toast.success("Image uploaded")
      onDone()
    } catch (error) {
      toasts(error, "Couldn't upload the image.")
    }
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Upload gallery image</DialogTitle>
        <DialogDescription>
          JPEG, PNG, or WebP up to 5&nbsp;MB. Stored in R2.
        </DialogDescription>
      </DialogHeader>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 px-1"
        autoComplete="off"
      >
        {/* File picker */}
        <div className="space-y-1.5">
          <Label className="text-sm font-medium">
            Image<span className="ml-0.5 text-destructive">*</span>
          </Label>
          <div className="flex items-center gap-3">
            <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-muted">
              <RemoteImage
                src={preview ?? undefined}
                alt="Preview"
                width={80}
                height={80}
                className="size-full object-cover"
                fallback={
                  <ImageIcon className="size-6 text-muted-foreground" />
                }
              />
            </div>
            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={onPick}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="gap-1.5"
              onClick={() => inputRef.current?.click()}
            >
              <Upload className="size-4" />
              {file ? "Change" : "Choose file"}
            </Button>
            {file && (
              <span className="truncate text-xs text-muted-foreground">
                {file.name}
              </span>
            )}
          </div>
        </div>

        <Field
          label="Title"
          required
          error={form.formState.errors.title?.message}
        >
          <Input {...form.register("title")} placeholder="e.g. New MRI Suite" />
        </Field>

        <Field label="Description">
          <Textarea
            rows={2}
            {...form.register("description")}
            placeholder="Optional caption"
          />
        </Field>

        <Field label="Category">
          <Controller
            control={form.control}
            name="category"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORY_OPTIONS.map((c) => (
                    <SelectItem key={c} value={c}>
                      {CATEGORY_LABEL[c]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </Field>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onDone}
            disabled={upload.isPending}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={upload.isPending} className="gap-1.5">
            {upload.isPending && <Loader2 className="size-4 animate-spin" />}
            Upload
          </Button>
        </DialogFooter>
      </form>
    </>
  )
}

/* ─── Edit form ──────────────────────────────────────────────────────── */

const editSchema = z.object({
  title: z.string().trim().min(2, "Title is required"),
  description: z.string().optional(),
  category: z.nativeEnum(GalleryCategory),
  isActive: z.boolean(),
})
type EditValues = z.infer<typeof editSchema>

function EditDialog({
  item,
  onOpenChange,
}: {
  item: GalleryItem | null
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Dialog open={!!item} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        {item && (
          <EditForm key={item._id} item={item} onDone={() => onOpenChange(false)} />
        )}
      </DialogContent>
    </Dialog>
  )
}

function EditForm({
  item,
  onDone,
}: {
  item: GalleryItem
  onDone: () => void
}) {
  const update = useUpdateGalleryItem()

  const form = useForm<EditValues>({
    resolver: zodResolver(editSchema),
    defaultValues: {
      title: item.title,
      description: item.description ?? "",
      category: item.category,
      isActive: item.isActive,
    },
  })

  const onSubmit = async (values: EditValues) => {
    try {
      await update.mutateAsync({
        id: item._id,
        body: {
          title: values.title,
          description: values.description?.trim() || undefined,
          category: values.category,
          isActive: values.isActive,
        },
      })
      toast.success("Image updated")
      onDone()
    } catch (error) {
      toasts(error, "Couldn't update the image.")
    }
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Edit image</DialogTitle>
        <DialogDescription>
          Update metadata. The image itself can&apos;t be replaced here.
        </DialogDescription>
      </DialogHeader>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 px-1"
        autoComplete="off"
      >
        <Field
          label="Title"
          required
          error={form.formState.errors.title?.message}
        >
          <Input {...form.register("title")} />
        </Field>

        <Field label="Description">
          <Textarea rows={2} {...form.register("description")} />
        </Field>

        <Field label="Category">
          <Controller
            control={form.control}
            name="category"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORY_OPTIONS.map((c) => (
                    <SelectItem key={c} value={c}>
                      {CATEGORY_LABEL[c]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </Field>

        <div className="flex items-center justify-between rounded-lg border border-border p-3">
          <div>
            <Label className="text-sm font-medium">Visible publicly</Label>
            <p className="text-xs text-muted-foreground">
              Hidden images stay in storage but won&apos;t appear on /gallery.
            </p>
          </div>
          <Controller
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onDone}
            disabled={update.isPending}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={update.isPending} className="gap-1.5">
            {update.isPending && <Loader2 className="size-4 animate-spin" />}
            Save changes
          </Button>
        </DialogFooter>
      </form>
    </>
  )
}

/* ─── helpers ─────────────────────────────────────────────────────────── */

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string
  required?: boolean
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium">
        {label}
        {required && <span className="ml-0.5 text-destructive">*</span>}
      </Label>
      {children}
      {error && <p className="text-xs font-medium text-destructive">{error}</p>}
    </div>
  )
}
