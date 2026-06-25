"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { apiClient, ApiError } from "@/lib/api-client"
import { qk } from "@/lib/query-keys"
import type {
  CreateGalleryInput,
  GalleryItem,
  GalleryParams,
  Paginated,
  UpdateGalleryInput,
} from "@/types"

/**
 * Gallery data layer. Viewing is public (token: null); create/update need
 * STAFF/ADMIN, delete needs SUPER_ADMIN (enforced server-side). Image upload
 * is multipart — `file` plus the DTO text fields — matching the backend
 * `FileInterceptor('file')` + `@Body()` contract.
 */

/** Public, paginated gallery (GET /gallery). */
export function useGallery(params: GalleryParams = {}) {
  return useQuery<Paginated<GalleryItem>>({
    queryKey: qk.gallery(params),
    queryFn: () =>
      apiClient<Paginated<GalleryItem>>("/gallery", {
        method: "GET",
        params: { page: params.page, limit: params.limit, category: params.category },
        token: null, // public
      }),
    staleTime: 60 * 1000,
  })
}

/** Public single item (GET /gallery/:id). */
export function useGalleryItem(id: string | undefined) {
  return useQuery<GalleryItem>({
    queryKey: id ? qk.galleryItem(id) : ["gallery", "detail", "none"],
    queryFn: () =>
      apiClient<GalleryItem>(`/gallery/${id}`, { method: "GET", token: null }),
    enabled: !!id,
    staleTime: 60 * 1000,
  })
}

/** Upload a gallery image (STAFF/ADMIN). Multipart `file` + metadata. */
export function useUploadGalleryImage() {
  const qc = useQueryClient()
  return useMutation<
    GalleryItem,
    ApiError,
    { file: File } & CreateGalleryInput
  >({
    mutationFn: ({ file, title, description, category }) => {
      const form = new FormData()
      form.append("file", file)
      form.append("title", title)
      if (description) form.append("description", description)
      if (category) form.append("category", category)
      return apiClient<GalleryItem>("/gallery", { method: "POST", form })
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["gallery"] }),
  })
}

/** Update gallery metadata only (STAFF/ADMIN) — no image swap. */
export function useUpdateGalleryItem() {
  const qc = useQueryClient()
  return useMutation<
    GalleryItem,
    ApiError,
    { id: string; body: UpdateGalleryInput }
  >({
    mutationFn: ({ id, body }) =>
      apiClient<GalleryItem>(`/gallery/${id}`, { method: "PATCH", json: body }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["gallery"] }),
  })
}

/** Delete a gallery item + its R2 object (SUPER_ADMIN). */
export function useDeleteGalleryItem() {
  const qc = useQueryClient()
  return useMutation<GalleryItem, ApiError, string>({
    mutationFn: (id) =>
      apiClient<GalleryItem>(`/gallery/${id}`, { method: "DELETE" }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["gallery"] }),
  })
}
