"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { MOCK_MEDICAL_RECORDS, paginate, mockDelay } from "@/lib/mock-data"
import type { CreateMedicalRecordInput, MedicalRecord, Paginated } from "@/types"
import { toast } from "sonner"

export interface MyRecordsParams {
  page: number
  limit: number
  [key: string]: unknown
}

export function useMyRecords(params: MyRecordsParams) {
  const data = paginate(MOCK_MEDICAL_RECORDS, params.page, params.limit)
  return useQuery<Paginated<MedicalRecord>>({
    queryKey: ["medical-records", "my", params],
    queryFn: () => Promise.resolve(data),
    initialData: data,
    staleTime: Infinity,
  })
}

export function useMedicalRecordByAppointment(appointmentId: string | undefined) {
  const record = MOCK_MEDICAL_RECORDS.find((r) => {
    const aid = typeof r.appointmentId === "object" ? r.appointmentId._id : r.appointmentId
    return aid === appointmentId
  }) ?? null
  return useQuery<MedicalRecord | null>({
    queryKey: ["medical-records", "by-appointment", appointmentId],
    queryFn: () => Promise.resolve(record),
    initialData: record,
    enabled: !!appointmentId,
    staleTime: Infinity,
  })
}

export function useCreateMedicalRecord() {
  const qc = useQueryClient()
  return useMutation<MedicalRecord, Error, CreateMedicalRecordInput>({
    mutationFn: async () => {
      await mockDelay()
      return MOCK_MEDICAL_RECORDS[0]
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["medical-records"] })
      toast.success("Medical record saved (demo mode)")
    },
  })
}
