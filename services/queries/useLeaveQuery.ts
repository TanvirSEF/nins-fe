"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { MOCK_LEAVES, paginate, mockDelay } from "@/lib/mock-data"
import { DEMO_USER } from "@/lib/mock-data"
import type {
  CreateLeaveInput,
  Leave,
  LeaveParams,
  Paginated,
  ReviewLeaveInput,
  UpdateLeaveInput,
} from "@/types"
import { LeaveStatus } from "@/types"
import { toast } from "sonner"

export function useMyLeaves(params: LeaveParams = {}) {
  let filtered = MOCK_LEAVES
  if (params.status) filtered = filtered.filter((l) => l.status === params.status)
  if (params.type) filtered = filtered.filter((l) => l.type === params.type)
  const data = paginate(filtered, params.page ?? 1, params.limit ?? 10)
  return useQuery<Paginated<Leave>>({
    queryKey: ["leave", "my", params],
    queryFn: () => Promise.resolve(data),
    initialData: data,
    staleTime: Infinity,
  })
}

export function useAllLeaves(params: LeaveParams = {}) {
  let filtered = MOCK_LEAVES
  if (params.status) filtered = filtered.filter((l) => l.status === params.status)
  if (params.type) filtered = filtered.filter((l) => l.type === params.type)
  const data = paginate(filtered, params.page ?? 1, params.limit ?? 10)
  return useQuery<Paginated<Leave>>({
    queryKey: ["leave", "all", params],
    queryFn: () => Promise.resolve(data),
    initialData: data,
    staleTime: Infinity,
  })
}

export function useLeave(id: string | undefined) {
  const leave = MOCK_LEAVES.find((l) => l._id === id) ?? MOCK_LEAVES[0]
  return useQuery<Leave>({
    queryKey: ["leave", "detail", id],
    queryFn: () => Promise.resolve(leave),
    initialData: leave,
    enabled: !!id,
    staleTime: Infinity,
  })
}

export function useCreateLeave() {
  const qc = useQueryClient()
  return useMutation<Leave, Error, CreateLeaveInput>({
    mutationFn: async (payload) => {
      await mockDelay()
      return { ...MOCK_LEAVES[0], ...payload, _id: "leave-new-" + Date.now() }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["leave"] })
      toast.success("Leave request submitted (demo mode)")
    },
  })
}

export function useUpdateLeave() {
  const qc = useQueryClient()
  return useMutation<Leave, Error, { id: string; body: UpdateLeaveInput }>({
    mutationFn: async ({ id }) => {
      await mockDelay()
      return MOCK_LEAVES.find((l) => l._id === id) ?? MOCK_LEAVES[0]
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["leave"] })
      toast.success("Leave request updated (demo mode)")
    },
  })
}

export function useReviewLeave() {
  const qc = useQueryClient()
  return useMutation<Leave, Error, { id: string; body: ReviewLeaveInput }>({
    mutationFn: async ({ id, body }) => {
      await mockDelay()
      const leave = MOCK_LEAVES.find((l) => l._id === id) ?? MOCK_LEAVES[0]
      return {
        ...leave,
        status: body.status,
        reviewedBy: DEMO_USER,
        reviewedAt: new Date().toISOString(),
        rejectionReason: body.rejectionReason,
      }
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ["leave"] })
      toast.success(
        vars.body.status === LeaveStatus.APPROVED
          ? "Leave approved (demo mode)"
          : "Leave rejected (demo mode)"
      )
    },
  })
}

export function useCancelLeave() {
  const qc = useQueryClient()
  return useMutation<Leave, Error, string>({
    mutationFn: async (id) => {
      await mockDelay()
      return MOCK_LEAVES.find((l) => l._id === id) ?? MOCK_LEAVES[0]
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["leave"] })
      toast.success("Leave request cancelled (demo mode)")
    },
  })
}
