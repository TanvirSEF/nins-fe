"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "@/lib/api-client"
import { qk } from "@/lib/query-keys"
import { useAuth } from "@/hooks/useAuth"
import type {
  CreatePrescriptionInput,
  Paginated,
  Prescription,
} from "@/types"

export interface MyPrescriptionsParams {
  page: number
  limit: number
  [key: string]: unknown
}

/** The logged-in patient's prescriptions (paginated). */
export function useMyPrescriptions(params: MyPrescriptionsParams) {
  const { token } = useAuth()
  return useQuery<Paginated<Prescription>>({
    queryKey: qk.myPrescriptions(params),
    queryFn: () =>
      apiClient<Paginated<Prescription>>(
        "/prescriptions/patient/my-prescriptions",
        { method: "GET", params: { page: params.page, limit: params.limit } },
      ),
    enabled: !!token,
    staleTime: 30 * 1000,
  })
}

/** Prescription for a given appointment (used in the doctor consultation). */
export function usePrescriptionByAppointment(
  appointmentId: string | undefined,
) {
  return useQuery<Prescription>({
    queryKey: qk.prescriptionByAppointment(appointmentId ?? ""),
    queryFn: () =>
      apiClient<Prescription>(
        `/prescriptions/appointment/${appointmentId}`,
        { method: "GET" },
      ),
    enabled: !!appointmentId,
    staleTime: 30 * 1000,
  })
}

/** Create a prescription (DOCTOR). Requires an ACTIVE medical record id. */
export function useCreatePrescription() {
  const qc = useQueryClient()
  return useMutation<Prescription, Error, CreatePrescriptionInput>({
    mutationFn: (payload) =>
      apiClient<Prescription>("/prescriptions", {
        method: "POST",
        json: payload,
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["prescriptions"] })
    },
  })
}
