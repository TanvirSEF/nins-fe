"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "@/lib/api-client"
import type { CreateStaffInput, User } from "@/types"

/**
 * Staff/user mutations. Used by doctor onboarding (create a DOCTOR-role user
 * before the doctor profile) and by doctor delete (clean up the linked user).
 * `POST /staff` is SUPER_ADMIN only.
 */
export function useCreateStaff() {
  const qc = useQueryClient()
  return useMutation<User, Error, CreateStaffInput>({
    mutationFn: (payload) =>
      apiClient<User>("/staff", { method: "POST", json: payload }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["staff"] }),
  })
}

export function useDeleteStaff() {
  const qc = useQueryClient()
  return useMutation<User, Error, string>({
    mutationFn: (id) => apiClient<User>(`/staff/${id}`, { method: "DELETE" }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["staff"] }),
  })
}
