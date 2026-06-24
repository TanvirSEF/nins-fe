"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "@/lib/api-client"
import { qk } from "@/lib/query-keys"
import type {
  CreateDepartmentInput,
  Department,
  Paginated,
  UpdateDepartmentInput,
} from "@/types"

export interface DepartmentParams {
  page?: number
  limit?: number
  [key: string]: unknown
}

/** Public department directory (paginated). */
export function useDepartments(params: DepartmentParams = {}) {
  return useQuery<Paginated<Department>>({
    queryKey: qk.departments(params),
    queryFn: () =>
      apiClient<Paginated<Department>>("/departments", {
        method: "GET",
        params: { page: params.page, limit: params.limit },
        token: null, // public
      }),
    staleTime: 5 * 60 * 1000,
  })
}

/** Public single department. */
export function useDepartment(id: string) {
  return useQuery<Department>({
    queryKey: ["departments", "detail", id],
    queryFn: () =>
      apiClient<Department>(`/departments/${id}`, {
        method: "GET",
        token: null, // public
      }),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  })
}

/** Create a department (SUPER_ADMIN). */
export function useCreateDepartment() {
  const qc = useQueryClient()
  return useMutation<Department, Error, CreateDepartmentInput>({
    mutationFn: (payload) =>
      apiClient<Department>("/departments", { method: "POST", json: payload }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["departments"] }),
  })
}

/** Update a department (SUPER_ADMIN). */
export function useUpdateDepartment() {
  const qc = useQueryClient()
  return useMutation<
    Department,
    Error,
    { id: string; body: UpdateDepartmentInput }
  >({
    mutationFn: ({ id, body }) =>
      apiClient<Department>(`/departments/${id}`, {
        method: "PATCH",
        json: body,
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["departments"] }),
  })
}

/** Delete a department (SUPER_ADMIN). */
export function useDeleteDepartment() {
  const qc = useQueryClient()
  return useMutation<Department, Error, string>({
    mutationFn: (id) =>
      apiClient<Department>(`/departments/${id}`, { method: "DELETE" }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["departments"] }),
  })
}

/** Upload a department image (SUPER_ADMIN). Multipart field `file`. */
export function useUploadDepartmentImage() {
  const qc = useQueryClient()
  return useMutation<Department, Error, { id: string; file: File }>({
    mutationFn: ({ id, file }) => {
      const form = new FormData()
      form.append("file", file)
      return apiClient<Department>(`/departments/${id}/image`, {
        method: "PATCH",
        form,
      })
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["departments"] }),
  })
}
