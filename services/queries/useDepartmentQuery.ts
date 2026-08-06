"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { MOCK_DEPARTMENTS, paginate, mockDelay } from "@/lib/mock-data"
import type {
  CreateDepartmentInput,
  Department,
  Paginated,
  UpdateDepartmentInput,
} from "@/types"
import { toast } from "sonner"

export interface DepartmentParams {
  page?: number
  limit?: number
  [key: string]: unknown
}

export function useDepartments(params: DepartmentParams = {}) {
  const data = paginate(MOCK_DEPARTMENTS, params.page ?? 1, params.limit ?? 10)
  return useQuery<Paginated<Department>>({
    queryKey: ["departments", params],
    queryFn: () => Promise.resolve(data),
    initialData: data,
    staleTime: Infinity,
  })
}

export function useDepartment(id: string) {
  const dept = MOCK_DEPARTMENTS.find((d) => d._id === id) ?? MOCK_DEPARTMENTS[0]
  return useQuery<Department>({
    queryKey: ["departments", "detail", id],
    queryFn: () => Promise.resolve(dept),
    initialData: dept,
    enabled: !!id,
    staleTime: Infinity,
  })
}

export function useCreateDepartment() {
  const qc = useQueryClient()
  return useMutation<Department, Error, CreateDepartmentInput>({
    mutationFn: async () => {
      await mockDelay()
      return MOCK_DEPARTMENTS[0]
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["departments"] })
      toast.success("Department created (demo mode)")
    },
  })
}

export function useUpdateDepartment() {
  const qc = useQueryClient()
  return useMutation<Department, Error, { id: string; body: UpdateDepartmentInput }>({
    mutationFn: async ({ id }) => {
      await mockDelay()
      return MOCK_DEPARTMENTS.find((d) => d._id === id) ?? MOCK_DEPARTMENTS[0]
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["departments"] })
      toast.success("Department updated (demo mode)")
    },
  })
}

export function useDeleteDepartment() {
  const qc = useQueryClient()
  return useMutation<Department, Error, string>({
    mutationFn: async () => {
      await mockDelay()
      return MOCK_DEPARTMENTS[0]
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["departments"] })
      toast.success("Department deleted (demo mode)")
    },
  })
}

export function useUploadDepartmentImage() {
  const qc = useQueryClient()
  return useMutation<Department, Error, { id: string; file: File }>({
    mutationFn: async () => {
      await mockDelay(800)
      return MOCK_DEPARTMENTS[0]
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["departments"] })
      toast.success("Image uploaded (demo mode)")
    },
  })
}
