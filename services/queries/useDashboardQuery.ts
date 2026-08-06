"use client"

import { useQuery } from "@tanstack/react-query"
import {
  MOCK_DASHBOARD_STATS,
  MOCK_OVERVIEW_STATS,
  MOCK_APPOINTMENT_TREND,
} from "@/lib/mock-data"
import type {
  AppointmentTrendDay,
  BedTypeStats,
  DashboardStats,
  OverviewStats,
} from "@/types"

export function useDashboardStats() {
  return useQuery<DashboardStats>({
    queryKey: ["dashboard", "stats"],
    queryFn: () => Promise.resolve(MOCK_DASHBOARD_STATS),
    initialData: MOCK_DASHBOARD_STATS,
    staleTime: Infinity,
  })
}

export function useDashboardOverview() {
  return useQuery<OverviewStats>({
    queryKey: ["dashboard", "overview"],
    queryFn: () => Promise.resolve(MOCK_OVERVIEW_STATS),
    initialData: MOCK_OVERVIEW_STATS,
    staleTime: Infinity,
  })
}

export function useAppointmentTrend() {
  return useQuery<AppointmentTrendDay[]>({
    queryKey: ["dashboard", "appointments-trend"],
    queryFn: () => Promise.resolve(MOCK_APPOINTMENT_TREND),
    initialData: MOCK_APPOINTMENT_TREND,
    staleTime: Infinity,
  })
}

export function useBedStatus() {
  return useQuery<{ icu: BedTypeStats; hdu: BedTypeStats }>({
    queryKey: ["dashboard", "bed-status"],
    queryFn: () => Promise.resolve(MOCK_DASHBOARD_STATS.bedStatus),
    initialData: MOCK_DASHBOARD_STATS.bedStatus,
    staleTime: Infinity,
  })
}
