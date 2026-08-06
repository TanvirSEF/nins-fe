"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { MOCK_PRESCRIPTIONS, paginate, mockDelay } from "@/lib/mock-data"
import type { CreatePrescriptionInput, Paginated, Prescription } from "@/types"
import { toast } from "sonner"

export interface MyPrescriptionsParams {
  page: number
  limit: number
  [key: string]: unknown
}

export function useMyPrescriptions(params: MyPrescriptionsParams) {
  const data = paginate(MOCK_PRESCRIPTIONS, params.page, params.limit)
  return useQuery<Paginated<Prescription>>({
    queryKey: ["prescriptions", "my", params],
    queryFn: () => Promise.resolve(data),
    initialData: data,
    staleTime: Infinity,
  })
}

export function usePrescriptionByAppointment(appointmentId: string | undefined) {
  const presc = MOCK_PRESCRIPTIONS.find((p) => {
    const aid = typeof p.appointmentId === "object" ? p.appointmentId._id : p.appointmentId
    return aid === appointmentId
  }) ?? null
  return useQuery<Prescription | null>({
    queryKey: ["prescriptions", "by-appointment", appointmentId],
    queryFn: () => Promise.resolve(presc),
    initialData: presc,
    enabled: !!appointmentId,
    staleTime: Infinity,
  })
}

export function useCreatePrescription() {
  const qc = useQueryClient()
  return useMutation<Prescription, Error, CreatePrescriptionInput>({
    mutationFn: async () => {
      await mockDelay()
      return MOCK_PRESCRIPTIONS[0]
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["prescriptions"] })
      toast.success("Prescription saved (demo mode)")
    },
  })
}
