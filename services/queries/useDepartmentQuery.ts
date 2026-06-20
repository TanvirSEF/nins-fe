"use client"

import { useQuery } from "@tanstack/react-query"
import { apiClient } from "@/lib/api-client"
import { qk } from "@/lib/query-keys"
import type { Department, Paginated } from "@/types"

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
