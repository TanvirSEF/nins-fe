"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { MOCK_GALLERY, paginate, mockDelay } from "@/lib/mock-data"
import type {
  CreateGalleryInput,
  GalleryItem,
  GalleryParams,
  Paginated,
  UpdateGalleryInput,
} from "@/types"
import { toast } from "sonner"

export function useGallery(params: GalleryParams = {}) {
  let filtered = MOCK_GALLERY
  if (params.category) filtered = filtered.filter((g) => g.category === params.category)
  const data = paginate(filtered, params.page ?? 1, params.limit ?? 12)
  return useQuery<Paginated<GalleryItem>>({
    queryKey: ["gallery", params],
    queryFn: () => Promise.resolve(data),
    initialData: data,
    staleTime: Infinity,
  })
}

export function useGalleryItem(id: string | undefined) {
  const item = MOCK_GALLERY.find((g) => g._id === id) ?? MOCK_GALLERY[0]
  return useQuery<GalleryItem>({
    queryKey: ["gallery", "detail", id],
    queryFn: () => Promise.resolve(item),
    initialData: item,
    enabled: !!id,
    staleTime: Infinity,
  })
}

export function useUploadGalleryImage() {
  const qc = useQueryClient()
  return useMutation<GalleryItem, Error, { file: File } & CreateGalleryInput>({
    mutationFn: async () => {
      await mockDelay(900)
      return MOCK_GALLERY[0]
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["gallery"] })
      toast.success("Image uploaded (demo mode)")
    },
  })
}

export function useUpdateGalleryItem() {
  const qc = useQueryClient()
  return useMutation<GalleryItem, Error, { id: string; body: UpdateGalleryInput }>({
    mutationFn: async ({ id }) => {
      await mockDelay()
      return MOCK_GALLERY.find((g) => g._id === id) ?? MOCK_GALLERY[0]
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["gallery"] })
      toast.success("Gallery item updated (demo mode)")
    },
  })
}

export function useDeleteGalleryItem() {
  const qc = useQueryClient()
  return useMutation<GalleryItem, Error, string>({
    mutationFn: async (id) => {
      await mockDelay()
      return MOCK_GALLERY.find((g) => g._id === id) ?? MOCK_GALLERY[0]
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["gallery"] })
      toast.success("Gallery item deleted (demo mode)")
    },
  })
}
