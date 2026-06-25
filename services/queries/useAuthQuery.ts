"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { apiClient, ApiError } from "@/lib/api-client"
import { qk } from "@/lib/query-keys"
import { useAuth } from "@/hooks/useAuth"
import type { UpdateProfileInput, User } from "@/types"

/**
 * ─── CANONICAL QUERY-HOOK TEMPLATE (Phase 0) ───────────────────────────────────
 * Every resource hook under `services/queries/` mirrors this shape:
 *   1. `queryKey`  → a `qk.*` entry from `lib/query-keys.ts`.
 *   2. `queryFn`   → `apiClient<T>(...)`. Omit `token` — `apiClient` reads the
 *                    stored JWT automatically (pass `token: null` only for public
 *                    endpoints). The `{ success, data }` envelope is unwrapped
 *                    by `apiClient`, so type the inner payload, not the wrapper.
 *   3. `enabled`   → gate on presence of a token / required args so we never
 *                    fire an authenticated call while logged out.
 *   4. `staleTime` → 5 min (project convention, matches the QueryClient default).
 *
 * Paginated endpoints: the backend returns `{ success, data: { data: [], meta } }`.
 * `apiClient` returns the inner object, so type the hook as
 * `apiClient<Paginated<X>>` → resolves to `{ data: X[]; meta: PaginatedMeta }`.
 * ──────────────────────────────────────────────────────────────────────────────
 *
 * Phase 0 note: `AuthProvider` still owns session hydration imperatively on
 * mount. This hook is the verified template and an optional background-refetch
 * surface for feature pages; AuthProvider will migrate onto this query's cache
 * in a later phase.
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
