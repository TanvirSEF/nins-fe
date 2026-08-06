"use client"

import { useQuery } from "@tanstack/react-query"
import { MOCK_DOCTOR_DASHBOARD } from "@/lib/mock-data"
import type { DoctorDashboard, DoctorStatsResponse, TodayQueueItem } from "@/types"

export function useDoctorDashboard() {
  return useQuery<DoctorDashboard>({
    queryKey: ["doctor-dashboard"],
    queryFn: () => Promise.resolve(MOCK_DOCTOR_DASHBOARD),
    initialData: MOCK_DOCTOR_DASHBOARD,
    staleTime: Infinity,
  })
}

export function useTodayQueue() {
  return useQuery<TodayQueueItem[]>({
    queryKey: ["doctor-dashboard", "today-queue"],
    queryFn: () => Promise.resolve(MOCK_DOCTOR_DASHBOARD.todayQueue),
    initialData: MOCK_DOCTOR_DASHBOARD.todayQueue,
    staleTime: Infinity,
  })
}

export function useDoctorStats() {
  const res: DoctorStatsResponse = {
    doctor: MOCK_DOCTOR_DASHBOARD.doctor,
    stats: MOCK_DOCTOR_DASHBOARD.stats,
  }
  return useQuery<DoctorStatsResponse>({
    queryKey: ["doctor-dashboard", "stats"],
    queryFn: () => Promise.resolve(res),
    initialData: res,
    staleTime: Infinity,
  })
}
