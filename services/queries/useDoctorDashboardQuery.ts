"use client"

import { useQuery } from "@tanstack/react-query"
import { apiClient } from "@/lib/api-client"
import { qk } from "@/lib/query-keys"
import { useAuth } from "@/hooks/useAuth"
import type {
  DoctorDashboard,
  DoctorStatsResponse,
  TodayQueueItem,
} from "@/types"

const STALE = 30 * 1000

/** Full doctor dashboard payload (DOCTOR). */
export function useDoctorDashboard() {
  const { token } = useAuth()
  return useQuery<DoctorDashboard>({
    queryKey: qk.doctorDashboard,
    queryFn: () =>
      apiClient<DoctorDashboard>("/doctor-dashboard", { method: "GET" }),
    enabled: !!token,
    staleTime: STALE,
  })
}

/** Today's patient queue, ordered by serial number (DOCTOR). */
export function useTodayQueue() {
  const { token } = useAuth()
  return useQuery<TodayQueueItem[]>({
    queryKey: qk.doctorQueue,
    queryFn: () =>
      apiClient<TodayQueueItem[]>("/doctor-dashboard/today-queue", {
        method: "GET",
      }),
    enabled: !!token,
    staleTime: STALE,
  })
}

export function useDoctorStats() {
  const { token } = useAuth()
  return useQuery<DoctorStatsResponse>({
    queryKey: qk.doctorStats,
    queryFn: () =>
      apiClient<DoctorStatsResponse>("/doctor-dashboard/stats", {
        method: "GET",
      }),
    enabled: !!token,
    staleTime: STALE,
  })
}
