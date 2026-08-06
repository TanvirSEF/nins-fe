"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { MOCK_SCHEDULES, mockDelay } from "@/lib/mock-data"
import type { CreateScheduleInput, Schedule, UpdateScheduleInput } from "@/types"
import { toast } from "sonner"

export function useSchedules(doctorId: string | undefined) {
  const schedules = doctorId
    ? MOCK_SCHEDULES.filter((s) => {
        const doc = typeof s.doctorId === "object" ? s.doctorId._id : s.doctorId
        return doc === doctorId
      })
    : MOCK_SCHEDULES
  return useQuery<Schedule[]>({
    queryKey: ["schedules", doctorId ?? "all"],
    queryFn: () => Promise.resolve(schedules),
    initialData: schedules,
    enabled: !!doctorId,
    staleTime: Infinity,
  })
}

export function useCreateSchedule() {
  const qc = useQueryClient()
  return useMutation<Schedule, Error, CreateScheduleInput>({
    mutationFn: async () => {
      await mockDelay()
      return MOCK_SCHEDULES[0]
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["schedules"] })
      toast.success("Schedule created (demo mode)")
    },
  })
}

export function useUpdateSchedule() {
  const qc = useQueryClient()
  return useMutation<Schedule, Error, { id: string; body: UpdateScheduleInput }>({
    mutationFn: async ({ id }) => {
      await mockDelay()
      return MOCK_SCHEDULES.find((s) => s._id === id) ?? MOCK_SCHEDULES[0]
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["schedules"] })
      toast.success("Schedule updated (demo mode)")
    },
  })
}

export function useDeleteSchedule() {
  const qc = useQueryClient()
  return useMutation<Schedule, Error, string>({
    mutationFn: async (id) => {
      await mockDelay()
      return MOCK_SCHEDULES.find((s) => s._id === id) ?? MOCK_SCHEDULES[0]
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["schedules"] })
      toast.success("Schedule deleted (demo mode)")
    },
  })
}
