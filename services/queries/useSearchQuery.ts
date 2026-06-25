"use client"

import { useQuery } from "@tanstack/react-query"
import { apiClient } from "@/lib/api-client"
import { qk } from "@/lib/query-keys"
import { useAuth } from "@/hooks/useAuth"
import type { SearchParams, SearchResponse } from "@/types"

/**
 * Global search across patients, doctors, and appointments (DOCTOR/STAFF/ADMIN;
 * NOT patient). Note the backend returns `{ results, meta }` — not the standard
 * `{ data, meta }` envelope — so this is typed as `SearchResponse`.
 */
export function useGlobalSearch(params: SearchParams) {
  const { token } = useAuth()
  return useQuery<SearchResponse>({
    queryKey: qk.search(params),
    queryFn: () =>
      apiClient<SearchResponse>("/search", {
        method: "GET",
        params: {
          q: params.q,
          type: params.type,
          page: params.page,
          limit: params.limit,
        },
      }),
    // Only fire when there's a real (≥2 char) query — backend rejects shorter.
    enabled: !!token && params.q.trim().length >= 2,
    staleTime: 30 * 1000,
  })
}
