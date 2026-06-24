"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "@/lib/api-client"
import { qk } from "@/lib/query-keys"
import { useAuth } from "@/hooks/useAuth"
import type {
  CreateMedicalRecordInput,
  MedicalRecord,
  Paginated,
} from "@/types"

export interface MyRecordsParams {
  page: number
  limit: number
  [key: string]: unknown
}

/** The logged-in patient's medical records (paginated). */
export function useMyRecords(params: MyRecordsParams) {
  const { token } = useAuth()
  return useQuery<Paginated<MedicalRecord>>({
    queryKey: qk.myRecords(params),
    queryFn: () =>
      apiClient<Paginated<MedicalRecord>>(
        "/medical-records/patient/my-records",
        { method: "GET", params: { page: params.page, limit: params.limit } },
      ),
    enabled: !!token,
    staleTime: 30 * 1000,
  })
}

/** Medical record for a given appointment (used in the doctor consultation). */
export function useMedicalRecordByAppointment(
  appointmentId: string | undefined,
) {
  return useQuery<MedicalRecord>({
    queryKey: qk.medicalRecordByAppointment(appointmentId ?? ""),
    queryFn: () =>
      apiClient<MedicalRecord>(
        `/medical-records/appointment/${appointmentId}`,
        { method: "GET" },
      ),
    enabled: !!appointmentId,
    staleTime: 30 * 1000,
  })
}

/** Create a medical record (DOCTOR). Requires a COMPLETED appointment. */
export function useCreateMedicalRecord() {
  const qc = useQueryClient()
  return useMutation<MedicalRecord, Error, CreateMedicalRecordInput>({
    mutationFn: (payload) =>
      apiClient<MedicalRecord>("/medical-records", {
        method: "POST",
        json: payload,
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["medical-records"] })
    },
  })
}
