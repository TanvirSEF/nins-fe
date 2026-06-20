"use client"

import { useQuery } from "@tanstack/react-query"
import { apiClient } from "@/lib/api-client"
import { qk } from "@/lib/query-keys"
import type { Schedule } from "@/types"

/** A doctor's outpatient schedules (public). `dayOfWeek` 0=Sun..6=Sat. */
export function useSchedules(doctorId: string | undefined) {
  return useQuery<Schedule[]>({
    queryKey: qk.schedules(doctorId ?? ""),
    queryFn: () =>
      apiClient<Schedule[]>(`/schedules/doctor/${doctorId}`, {
        method: "GET",
        token: null, // public
      }),
    enabled: !!doctorId,
    staleTime: 5 * 60 * 1000,
  })
}
