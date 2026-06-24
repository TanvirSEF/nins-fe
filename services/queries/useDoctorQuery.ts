"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "@/lib/api-client"
import { qk } from "@/lib/query-keys"
import type {
  CreateDoctorInput,
  DoctorProfile,
  Paginated,
  UpdateDoctorInput,
} from "@/types"

export interface DoctorParams {
  page?: number
  limit?: number
  /** Exact MongoId match. */
  departmentId?: string
  /** Exact match. */
  designation?: string
  /** Fuzzy / case-insensitive regex over `specialties`. */
  specialty?: string
  [key: string]: unknown
}

/** Public doctor directory (paginated + filterable). */
export function useDoctors(params: DoctorParams = {}) {
  return useQuery<Paginated<DoctorProfile>>({
    queryKey: qk.doctors(params),
    queryFn: () =>
      apiClient<Paginated<DoctorProfile>>("/doctors", {
        method: "GET",
        params: {
          page: params.page,
          limit: params.limit,
          departmentId: params.departmentId,
          designation: params.designation,
          specialty: params.specialty,
        },
        token: null, // public
      }),
    staleTime: 5 * 60 * 1000,
  })
}

/** Public single doctor (populated userId + departmentId). */
export function useDoctor(id: string) {
  return useQuery<DoctorProfile>({
    queryKey: qk.doctor(id),
    queryFn: () =>
      apiClient<DoctorProfile>(`/doctors/${id}`, {
        method: "GET",
        token: null, // public
      }),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  })
}

/** Create a doctor profile (SUPER_ADMIN, HOSPITAL_STAFF). Requires a DOCTOR userId. */
export function useCreateDoctor() {
  const qc = useQueryClient()
  return useMutation<DoctorProfile, Error, CreateDoctorInput>({
    mutationFn: (payload) =>
      apiClient<DoctorProfile>("/doctors", { method: "POST", json: payload }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["doctors"] }),
  })
}

/** Update a doctor profile (SUPER_ADMIN). */
export function useUpdateDoctor() {
  const qc = useQueryClient()
  return useMutation<
    DoctorProfile,
    Error,
    { id: string; body: UpdateDoctorInput }
  >({
    mutationFn: ({ id, body }) =>
      apiClient<DoctorProfile>(`/doctors/${id}`, {
        method: "PATCH",
        json: body,
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["doctors"] }),
  })
}

/** Delete a doctor profile (SUPER_ADMIN). */
export function useDeleteDoctor() {
  const qc = useQueryClient()
  return useMutation<DoctorProfile, Error, string>({
    mutationFn: (id) =>
      apiClient<DoctorProfile>(`/doctors/${id}`, { method: "DELETE" }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["doctors"] }),
  })
}

/** Upload a doctor profile picture (SUPER_ADMIN). Multipart field `file`. */
export function useUploadDoctorPicture() {
  const qc = useQueryClient()
  return useMutation<DoctorProfile, Error, { id: string; file: File }>({
    mutationFn: ({ id, file }) => {
      const form = new FormData()
      form.append("file", file)
      return apiClient<DoctorProfile>(`/doctors/${id}/profile-picture`, {
        method: "PATCH",
        form,
      })
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["doctors"] }),
  })
}
