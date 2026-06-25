"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { apiClient, ApiError } from "@/lib/api-client"
import { qk } from "@/lib/query-keys"
import { useAuth } from "@/hooks/useAuth"
import type {
  CreateLeaveInput,
  Leave,
  LeaveParams,
  Paginated,
  ReviewLeaveInput,
  UpdateLeaveInput,
} from "@/types"

/**
 * Leave-management data layer (PRD §6 — mirrored from backend `leave` module).
 * Doctor owns create/update/cancel of their requests; SUPER_ADMIN +
 * HOSPITAL_STAFF review (approve/reject). Backend side-effects (notifications,
 * auto-cancel of conflicting appointments on approval) happen server-side —
 * the UI just invalidates `['leave']` after every mutation.
 */

/** Doctor's own leave requests, paginated + filterable (GET /leave/my-leaves). */
export function useMyLeaves(params: LeaveParams = {}) {
  const { token } = useAuth()
  return useQuery<Paginated<Leave>>({
    queryKey: qk.myLeaves(params),
    queryFn: () =>
      apiClient<Paginated<Leave>>("/leave/my-leaves", {
        method: "GET",
        params: {
          page: params.page,
          limit: params.limit,
          status: params.status,
          type: params.type,
        },
      }),
    enabled: !!token,
    staleTime: 30 * 1000,
  })
}

/** All leave requests, paginated + filterable (GET /leave — STAFF+ADMIN). */
export function useAllLeaves(params: LeaveParams = {}) {
  const { token } = useAuth()
  return useQuery<Paginated<Leave>>({
    queryKey: qk.leaves(params),
    queryFn: () =>
      apiClient<Paginated<Leave>>("/leave", {
        method: "GET",
        params: {
          page: params.page,
          limit: params.limit,
          status: params.status,
          type: params.type,
          doctorId: params.doctorId,
        },
      }),
    enabled: !!token,
    staleTime: 30 * 1000,
  })
}

/** Single leave request, populated (GET /leave/:id). */
export function useLeave(id: string | undefined) {
  const { token } = useAuth()
  return useQuery<Leave>({
    queryKey: id ? qk.leave(id) : ["leave", "detail", "none"],
    queryFn: () => apiClient<Leave>(`/leave/${id}`, { method: "GET" }),
    enabled: !!token && !!id,
    staleTime: 30 * 1000,
  })
}

/** Request leave (DOCTOR). */
export function useCreateLeave() {
  const qc = useQueryClient()
  return useMutation<Leave, ApiError, CreateLeaveInput>({
    mutationFn: (payload) =>
      apiClient<Leave>("/leave", { method: "POST", json: payload }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["leave"] }),
  })
}

/** Update own PENDING leave request (DOCTOR). */
export function useUpdateLeave() {
  const qc = useQueryClient()
  return useMutation<Leave, ApiError, { id: string; body: UpdateLeaveInput }>({
    mutationFn: ({ id, body }) =>
      apiClient<Leave>(`/leave/${id}`, { method: "PATCH", json: body }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["leave"] }),
  })
}

/** Approve / reject a leave request (STAFF+ADMIN). */
export function useReviewLeave() {
  const qc = useQueryClient()
  return useMutation<Leave, ApiError, { id: string; body: ReviewLeaveInput }>({
    mutationFn: ({ id, body }) =>
      apiClient<Leave>(`/leave/${id}/review`, { method: "PATCH", json: body }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["leave"] }),
  })
}

/** Cancel / delete a leave request (owner or ADMIN). */
export function useCancelLeave() {
  const qc = useQueryClient()
  return useMutation<Leave, ApiError, string>({
    mutationFn: (id) => apiClient<Leave>(`/leave/${id}`, { method: "DELETE" }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["leave"] }),
  })
}
