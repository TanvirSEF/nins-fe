"use client"

import { useQuery } from "@tanstack/react-query"
import { apiClient } from "@/lib/api-client"
import { qk } from "@/lib/query-keys"
import { useAuth } from "@/hooks/useAuth"
import type {
  AppointmentTrendDay,
  BedTypeStats,
  DashboardStats,
  OverviewStats,
} from "@/types"

const STALE = 60 * 1000 // backend caches dashboard:stats for 60s

/** Full admin dashboard payload (SUPER_ADMIN, HOSPITAL_STAFF). */
export function useDashboardStats() {
  const { token } = useAuth()
  return useQuery<DashboardStats>({
    queryKey: qk.dashboardStats,
    queryFn: () =>
      apiClient<DashboardStats>("/dashboard/stats", { method: "GET" }),
    enabled: !!token,
    staleTime: STALE,
  })
}

export function useDashboardOverview() {
  const { token } = useAuth()
  return useQuery<OverviewStats>({
    queryKey: ["dashboard", "overview"],
    queryFn: () =>
      apiClient<OverviewStats>("/dashboard/stats/overview", {
        method: "GET",
      }),
    enabled: !!token,
    staleTime: STALE,
  })
}

export function useAppointmentTrend() {
  const { token } = useAuth()
  return useQuery<AppointmentTrendDay[]>({
    queryKey: ["dashboard", "appointments-trend"],
    queryFn: () =>
      apiClient<AppointmentTrendDay[]>(
        "/dashboard/stats/appointments-trend",
        { method: "GET" },
      ),
    enabled: !!token,
    staleTime: STALE,
  })
}

export function useBedStatus() {
  const { token } = useAuth()
  return useQuery<{ icu: BedTypeStats; hdu: BedTypeStats }>({
    queryKey: ["dashboard", "bed-status"],
    queryFn: () =>
      apiClient<{ icu: BedTypeStats; hdu: BedTypeStats }>(
        "/dashboard/stats/bed-status",
        { method: "GET" },
      ),
    enabled: !!token,
    staleTime: STALE,
  })
}
