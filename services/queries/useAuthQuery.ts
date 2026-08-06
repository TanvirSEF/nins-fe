"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { DEMO_USER, mockDelay } from "@/lib/mock-data"
import { useAuth } from "@/hooks/useAuth"
import type { UpdateProfileInput, User } from "@/types"

export function useProfile() {
  const { token } = useAuth()
  return useQuery<User>({
    queryKey: ["profile"],
    queryFn: () => Promise.resolve(DEMO_USER),
    initialData: DEMO_USER,
    enabled: !!token,
  })
}

export function useUpdateProfile() {
  const { updateUser } = useAuth()
  const qc = useQueryClient()
  return useMutation<User, Error, UpdateProfileInput>({
    mutationFn: async (payload) => {
      await mockDelay()
      const updated: User = { ...DEMO_USER, ...payload }
      return updated
    },
    onSuccess: (data) => {
      qc.setQueryData(["profile"], data)
      updateUser(data)
    },
  })
}
