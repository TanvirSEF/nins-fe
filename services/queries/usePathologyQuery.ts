"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { apiClient, ApiError } from "@/lib/api-client"
import { qk } from "@/lib/query-keys"
import { useAuth } from "@/hooks/useAuth"
import type {
  AddResultInput,
  CreatePathologyInput,
  Paginated,
  PathologyParams,
  PathologyReport,
} from "@/types"

/**
 * Pathology data layer (mirrors backend `pathology-reports` module). Patient
 * views own reports; DOCTOR/STAFF order tests + add results; SUPER_ADMIN
 * deletes. Backend emits TEST_ORDERED + PATHOLOGY_REPORT_READY notifications
 * on create/result — the UI just invalidates `['pathology']` after mutations.
 */

/** Patient's own reports (GET /pathology-reports/my-reports). */
export function useMyReports(params: PathologyParams = {}) {
  const { token } = useAuth()
  return useQuery<Paginated<PathologyReport>>({
    queryKey: qk.myReports(params),
    queryFn: () =>
      apiClient<Paginated<PathologyReport>>("/pathology-reports/my-reports", {
        method: "GET",
        params: {
          page: params.page,
          limit: params.limit,
          status: params.status,
          testCategory: params.testCategory,
        },
      }),
    enabled: !!token,
    staleTime: 30 * 1000,
  })
}

/** A specific patient's reports (GET /pathology-reports/patient/:id — DOCTOR/STAFF/ADMIN). */
export function usePatientReports(
  patientId: string | undefined,
  params: PathologyParams = {},
) {
  const { token } = useAuth()
  return useQuery<Paginated<PathologyReport>>({
    queryKey: qk.patientReports(patientId ?? "none", params),
    queryFn: () =>
      apiClient<Paginated<PathologyReport>>(
        `/pathology-reports/patient/${patientId}`,
        {
          method: "GET",
          params: {
            page: params.page,
            limit: params.limit,
            status: params.status,
            testCategory: params.testCategory,
          },
        },
      ),
    enabled: !!token && !!patientId,
    staleTime: 30 * 1000,
  })
}

/** All reports (GET /pathology-reports — STAFF+ADMIN). */
export function useAllReports(params: PathologyParams = {}) {
  const { token } = useAuth()
  return useQuery<Paginated<PathologyReport>>({
    queryKey: qk.reports(params),
    queryFn: () =>
      apiClient<Paginated<PathologyReport>>("/pathology-reports", {
        method: "GET",
        params: {
          page: params.page,
          limit: params.limit,
          status: params.status,
          testCategory: params.testCategory,
          patientId: params.patientId,
          doctorId: params.doctorId,
        },
      }),
    enabled: !!token,
    staleTime: 30 * 1000,
  })
}

/** Single report, populated (GET /pathology-reports/:id). */
export function useReport(id: string | undefined) {
  const { token } = useAuth()
  return useQuery<PathologyReport>({
    queryKey: id ? qk.report(id) : ["pathology", "detail", "none"],
    queryFn: () =>
      apiClient<PathologyReport>(`/pathology-reports/${id}`, {
        method: "GET",
      }),
    enabled: !!token && !!id,
    staleTime: 30 * 1000,
  })
}

/** Order a pathology test (DOCTOR/STAFF). */
export function useOrderTest() {
  const qc = useQueryClient()
  return useMutation<PathologyReport, ApiError, CreatePathologyInput>({
    mutationFn: (payload) =>
      apiClient<PathologyReport>("/pathology-reports", {
        method: "POST",
        json: payload,
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["pathology"] }),
  })
}

/** Add/upload a result (STAFF/DOCTOR). Defaults to COMPLETED. */
export function useAddResult() {
  const qc = useQueryClient()
  return useMutation<PathologyReport, ApiError, { id: string; body: AddResultInput }>({
    mutationFn: ({ id, body }) =>
      apiClient<PathologyReport>(`/pathology-reports/${id}/result`, {
        method: "PATCH",
        json: body,
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["pathology"] }),
  })
}

/** Delete a report (SUPER_ADMIN). */
export function useDeleteReport() {
  const qc = useQueryClient()
  return useMutation<PathologyReport, ApiError, string>({
    mutationFn: (id) =>
      apiClient<PathologyReport>(`/pathology-reports/${id}`, {
        method: "DELETE",
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["pathology"] }),
  })
}
