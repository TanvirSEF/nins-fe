"use client"

import { useQuery } from "@tanstack/react-query"
import { MOCK_SEARCH_RESPONSE } from "@/lib/mock-data"
import { useAuth } from "@/hooks/useAuth"
import type { SearchParams, SearchResponse } from "@/types"

export function useGlobalSearch(params: SearchParams) {
  const { token } = useAuth()
  return useQuery<SearchResponse>({
    queryKey: ["search", params],
    queryFn: () => Promise.resolve(MOCK_SEARCH_RESPONSE),
    initialData: MOCK_SEARCH_RESPONSE,
    enabled: !!token && params.q.trim().length >= 2,
    staleTime: Infinity,
  })
}
