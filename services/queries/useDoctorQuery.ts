"use client"

import { useQuery } from "@tanstack/react-query"
import { apiClient } from "@/lib/api-client"
import { qk } from "@/lib/query-keys"
import type { DoctorProfile, Paginated } from "@/types"

export interface DoctorParams {
  page?: number
  limit?: number
  /** Exact MongoId match. */
  departmentId?: string
  /** Exact match. */
  designation?: string
  /** Fuzzy / case-insensitive regex over `specialties`. */
  specialty?: string
  [key: string]: unknown
}

/** Public doctor directory (paginated + filterable). */
export function useDoctors(params: DoctorParams = {}) {
  return useQuery<Paginated<DoctorProfile>>({
    queryKey: qk.doctors(params),
    queryFn: () =>
      apiClient<Paginated<DoctorProfile>>("/doctors", {
        method: "GET",
        params: {
          page: params.page,
          limit: params.limit,
          departmentId: params.departmentId,
          designation: params.designation,
          specialty: params.specialty,
        },
        token: null, // public
      }),
    staleTime: 5 * 60 * 1000,
  })
}

/** Public single doctor (populated userId + departmentId). */
export function useDoctor(id: string) {
  return useQuery<DoctorProfile>({
    queryKey: qk.doctor(id),
    queryFn: () =>
      apiClient<DoctorProfile>(`/doctors/${id}`, {
        method: "GET",
        token: null, // public
      }),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  })
}
