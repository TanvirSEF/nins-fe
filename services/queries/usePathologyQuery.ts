"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { MOCK_PATHOLOGY, paginate, mockDelay } from "@/lib/mock-data"
import type {
  AddResultInput,
  CreatePathologyInput,
  Paginated,
  PathologyParams,
  PathologyReport,
} from "@/types"
import { toast } from "sonner"

export function useMyReports(params: PathologyParams = {}) {
  let filtered = MOCK_PATHOLOGY
  if (params.status) filtered = filtered.filter((r) => r.status === params.status)
  if (params.testCategory) filtered = filtered.filter((r) => r.testCategory === params.testCategory)
  const data = paginate(filtered, params.page ?? 1, params.limit ?? 10)
  return useQuery<Paginated<PathologyReport>>({
    queryKey: ["pathology", "my", params],
    queryFn: () => Promise.resolve(data),
    initialData: data,
    staleTime: Infinity,
  })
}

export function usePatientReports(
  patientId: string | undefined,
  params: PathologyParams = {},
) {
  let filtered = MOCK_PATHOLOGY.filter((r) => {
    const pid = typeof r.patientId === "object" ? r.patientId._id : r.patientId
    return pid === patientId
  })
  if (params.status) filtered = filtered.filter((r) => r.status === params.status)
  const data = paginate(filtered, params.page ?? 1, params.limit ?? 10)
  return useQuery<Paginated<PathologyReport>>({
    queryKey: ["pathology", "patient", patientId, params],
    queryFn: () => Promise.resolve(data),
    initialData: data,
    enabled: !!patientId,
    staleTime: Infinity,
  })
}

export function useAllReports(params: PathologyParams = {}) {
  let filtered = MOCK_PATHOLOGY
  if (params.status) filtered = filtered.filter((r) => r.status === params.status)
  if (params.testCategory) filtered = filtered.filter((r) => r.testCategory === params.testCategory)
  const data = paginate(filtered, params.page ?? 1, params.limit ?? 10)
  return useQuery<Paginated<PathologyReport>>({
    queryKey: ["pathology", "all", params],
    queryFn: () => Promise.resolve(data),
    initialData: data,
    staleTime: Infinity,
  })
}

export function useReport(id: string | undefined) {
  const report = MOCK_PATHOLOGY.find((r) => r._id === id) ?? MOCK_PATHOLOGY[0]
  return useQuery<PathologyReport>({
    queryKey: ["pathology", "detail", id],
    queryFn: () => Promise.resolve(report),
    initialData: report,
    enabled: !!id,
    staleTime: Infinity,
  })
}

export function useOrderTest() {
  const qc = useQueryClient()
  return useMutation<PathologyReport, Error, CreatePathologyInput>({
    mutationFn: async () => {
      await mockDelay()
      return MOCK_PATHOLOGY[0]
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["pathology"] })
      toast.success("Test ordered (demo mode)")
    },
  })
}

export function useAddResult() {
  const qc = useQueryClient()
  return useMutation<PathologyReport, Error, { id: string; body: AddResultInput }>({
    mutationFn: async ({ id }) => {
      await mockDelay()
      return MOCK_PATHOLOGY.find((r) => r._id === id) ?? MOCK_PATHOLOGY[0]
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["pathology"] })
      toast.success("Result added (demo mode)")
    },
  })
}

export function useDeleteReport() {
  const qc = useQueryClient()
  return useMutation<PathologyReport, Error, string>({
    mutationFn: async (id) => {
      await mockDelay()
      return MOCK_PATHOLOGY.find((r) => r._id === id) ?? MOCK_PATHOLOGY[0]
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["pathology"] })
      toast.success("Report deleted (demo mode)")
    },
  })
}
