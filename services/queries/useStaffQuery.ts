"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { MOCK_USERS, paginate, mockDelay } from "@/lib/mock-data"
import type { CreateStaffInput, Paginated, UpdateStaffInput, User } from "@/types"
import { toast } from "sonner"

export interface StaffParams {
  page?: number
  limit?: number
  [key: string]: unknown
}

export function useStaff(params: StaffParams = {}) {
  const data = paginate(MOCK_USERS, params.page ?? 1, params.limit ?? 10)
  return useQuery<Paginated<User>>({
    queryKey: ["staff", params],
    queryFn: () => Promise.resolve(data),
    initialData: data,
    staleTime: Infinity,
  })
}

export function useCreateStaff() {
  const qc = useQueryClient()
  return useMutation<User, Error, CreateStaffInput>({
    mutationFn: async () => {
      await mockDelay()
      return MOCK_USERS[0]
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["staff"] })
      toast.success("Staff account created (demo mode)")
    },
  })
}

export function useUpdateStaff() {
  const qc = useQueryClient()
  return useMutation<User, Error, { id: string; body: UpdateStaffInput }>({
    mutationFn: async ({ id }) => {
      await mockDelay()
      return MOCK_USERS.find((u) => u._id === id) ?? MOCK_USERS[0]
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["staff"] })
      toast.success("Staff account updated (demo mode)")
    },
  })
}

export function useDeleteStaff() {
  const qc = useQueryClient()
  return useMutation<User, Error, string>({
    mutationFn: async (id) => {
      await mockDelay()
      return MOCK_USERS.find((u) => u._id === id) ?? MOCK_USERS[0]
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["staff"] })
      toast.success("Staff account deleted (demo mode)")
    },
  })
}
