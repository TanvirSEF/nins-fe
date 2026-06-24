"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "@/lib/api-client"
import { qk } from "@/lib/query-keys"
import type {
  CreateScheduleInput,
  Schedule,
  UpdateScheduleInput,
} from "@/types"

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

/** Create a schedule (SUPER_ADMIN, HOSPITAL_STAFF). */
export function useCreateSchedule() {
  const qc = useQueryClient()
  return useMutation<Schedule, Error, CreateScheduleInput>({
    mutationFn: (payload) =>
      apiClient<Schedule>("/schedules", { method: "POST", json: payload }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["schedules"] }),
  })
}

/** Update a schedule (SUPER_ADMIN, HOSPITAL_STAFF). */
export function useUpdateSchedule() {
  const qc = useQueryClient()
  return useMutation<
    Schedule,
    Error,
    { id: string; body: UpdateScheduleInput }
  >({
    mutationFn: ({ id, body }) =>
      apiClient<Schedule>(`/schedules/${id}`, { method: "PATCH", json: body }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["schedules"] }),
  })
}

/** Delete a schedule (SUPER_ADMIN). */
export function useDeleteSchedule() {
  const qc = useQueryClient()
  return useMutation<Schedule, Error, string>({
    mutationFn: (id) =>
      apiClient<Schedule>(`/schedules/${id}`, { method: "DELETE" }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["schedules"] }),
  })
}
