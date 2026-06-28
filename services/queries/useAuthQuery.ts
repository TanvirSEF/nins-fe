"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { apiClient, ApiError } from "@/lib/api-client"
import { qk } from "@/lib/query-keys"
import { useAuth } from "@/hooks/useAuth"
import type { UpdateProfileInput, User } from "@/types"

/**
 * Canonical query-hook shape used across services/queries/: queryKey from
 * lib/query-keys, queryFn via apiClient (JWT auto-attached, {success,data}
 * envelope unwrapped — pass `token: null` only for public endpoints), `enabled`
 * gated on token/args, staleTime 5 min. For paginated endpoints type the inner
 * object: apiClient<Paginated<X>> → { data: X[]; meta: PaginatedMeta }.
 */
export function useProfile() {
  const { token } = useAuth()

  return useQuery<User>({
    queryKey: qk.profile,
    queryFn: () => apiClient<User>("/auth/profile", { method: "GET" }),
    enabled: !!token,
    staleTime: 5 * 60 * 1000,
  })
}

/**
 * Update the signed-in user's own profile (PATCH /auth/profile). The caller is
 * responsible for syncing the live session via `useAuth().updateUser` — the
 * profile query cache is updated here for any `useProfile` consumer.
 */
export function useUpdateProfile() {
  const qc = useQueryClient()
  return useMutation<User, ApiError, UpdateProfileInput>({
    mutationFn: (payload) =>
      apiClient<User>("/auth/profile", { method: "PATCH", json: payload }),
    onSuccess: (data) => {
      qc.setQueryData(qk.profile, data)
    },
  })
}
