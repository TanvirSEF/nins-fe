"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { MOCK_DOCTORS, paginate, mockDelay } from "@/lib/mock-data"
import type {
  CreateDoctorInput,
  DoctorProfile,
  Paginated,
  UpdateDoctorInput,
} from "@/types"
import { toast } from "sonner"

export interface DoctorParams {
  page?: number
  limit?: number
  departmentId?: string
  designation?: string
  specialty?: string
  [key: string]: unknown
}

export function useDoctors(params: DoctorParams = {}) {
  let filtered = MOCK_DOCTORS
  if (params.departmentId) {
    filtered = filtered.filter((d) => {
      const dept = typeof d.departmentId === "object" ? d.departmentId._id : d.departmentId
      return dept === params.departmentId
    })
  }
  const data = paginate(filtered, params.page ?? 1, params.limit ?? 10)
  return useQuery<Paginated<DoctorProfile>>({
    queryKey: ["doctors", params],
    queryFn: () => Promise.resolve(data),
    initialData: data,
    staleTime: Infinity,
  })
}

export function useDoctor(id: string) {
  const doctor = MOCK_DOCTORS.find((d) => d._id === id) ?? MOCK_DOCTORS[0]
  return useQuery<DoctorProfile>({
    queryKey: ["doctors", "detail", id],
    queryFn: () => Promise.resolve(doctor),
    initialData: doctor,
    enabled: !!id,
    staleTime: Infinity,
  })
}

export function useCreateDoctor() {
  const qc = useQueryClient()
  return useMutation<DoctorProfile, Error, CreateDoctorInput>({
    mutationFn: async () => {
      await mockDelay()
      return MOCK_DOCTORS[0]
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["doctors"] })
      toast.success("Doctor created (demo mode)")
    },
  })
}

export function useUpdateDoctor() {
  const qc = useQueryClient()
  return useMutation<DoctorProfile, Error, { id: string; body: UpdateDoctorInput }>({
    mutationFn: async ({ id }) => {
      await mockDelay()
      return MOCK_DOCTORS.find((d) => d._id === id) ?? MOCK_DOCTORS[0]
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["doctors"] })
      toast.success("Doctor updated (demo mode)")
    },
  })
}

export function useDeleteDoctor() {
  const qc = useQueryClient()
  return useMutation<DoctorProfile, Error, string>({
    mutationFn: async (id) => {
      await mockDelay()
      return MOCK_DOCTORS.find((d) => d._id === id) ?? MOCK_DOCTORS[0]
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["doctors"] })
      toast.success("Doctor removed (demo mode)")
    },
  })
}

export function useUploadDoctorPicture() {
  const qc = useQueryClient()
  return useMutation<DoctorProfile, Error, { id: string; file: File }>({
    mutationFn: async () => {
      await mockDelay(800)
      return MOCK_DOCTORS[0]
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["doctors"] })
      toast.success("Profile picture uploaded (demo mode)")
    },
  })
}
