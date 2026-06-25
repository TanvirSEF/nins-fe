"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "@/lib/api-client"
import type { CreateStaffInput, Paginated, UpdateStaffInput, User } from "@/types"

export interface StaffParams {
  page?: number
  limit?: number
  [key: string]: unknown
}

/** Paginated list of all users — the SUPER_ADMIN management view (GET /staff). */
export function useStaff(params: StaffParams = {}) {
  return useQuery<Paginated<User>>({
    queryKey: ["staff", params],
    queryFn: () =>
      apiClient<Paginated<User>>("/staff", {
        method: "GET",
        params: { page: params.page, limit: params.limit },
      }),
    staleTime: 30 * 1000,
  })
}

/** Create a user (SUPER_ADMIN only). */
export function useCreateStaff() {
  const qc = useQueryClient()
  return useMutation<User, Error, CreateStaffInput>({
    mutationFn: (payload) =>
      apiClient<User>("/staff", { method: "POST", json: payload }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["staff"] }),
  })
}

/** Update a user (SUPER_ADMIN only). */
export function useUpdateStaff() {
  const qc = useQueryClient()
  return useMutation<User, Error, { id: string; body: UpdateStaffInput }>({
    mutationFn: ({ id, body }) =>
      apiClient<User>(`/staff/${id}`, { method: "PATCH", json: body }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["staff"] }),
  })
}

/** Delete a user (SUPER_ADMIN only). */
export function useDeleteStaff() {
  const qc = useQueryClient()
  return useMutation<User, Error, string>({
    mutationFn: (id) => apiClient<User>(`/staff/${id}`, { method: "DELETE" }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["staff"] }),
  })
}
