"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "@/lib/api-client"
import { qk } from "@/lib/query-keys"
import type { Appointment, Paginated } from "@/types"
import { AppointmentStatus } from "@/types"

export interface CreateAppointmentPayload {
  doctorId: string
  scheduleId: string
  /** YYYY-MM-DD */
  appointmentDate: string
}

export interface BookWithPaymentResult {
  appointmentId: string
  tranId: string
  gatewayPageURL: string
}

export interface DoctorAppointmentsResult {
  doctorId: string
  date?: string
  appointments: Appointment[]
  totalBooked: number
}

/** Public capacity preview for a doctor on a given date. */
export function useDoctorAppointments(
  doctorId: string | undefined,
  date: string | undefined,
) {
  return useQuery<DoctorAppointmentsResult>({
    queryKey: qk.doctorAppts(doctorId ?? "", date),
    queryFn: () =>
      apiClient<DoctorAppointmentsResult>(
        `/appointments/doctor/${doctorId}`,
        { method: "GET", params: { date }, token: null },
      ),
    enabled: !!(doctorId && date),
    staleTime: 30 * 1000,
  })
}

/**
 * The signed-in doctor's OWN appointments (optionally scoped to a date).
 * Unlike `useDoctorAppointments` (a public capacity preview that requires a
 * date), this fetches the doctor's full non-cancelled history and is gated
 * only on `doctorId`. The public `/appointments/doctor/:id` endpoint returns
 * every appointment when no `date` is supplied.
 */
export function useMyDoctorAppointments(
  doctorId: string | undefined,
  date?: string,
) {
  return useQuery<DoctorAppointmentsResult>({
    queryKey: ["appointments", "doctor", "mine", date ?? "all"],
    queryFn: () =>
      apiClient<DoctorAppointmentsResult>(
        `/appointments/doctor/${doctorId}`,
        { method: "GET", params: date ? { date } : undefined },
      ),
    enabled: !!doctorId,
    staleTime: 30 * 1000,
  })
}

/** Single appointment (authed). `poll` refetches every 2s while PENDING. */
export function useAppointment(
  id: string | undefined,
  opts?: { poll?: boolean },
) {
  return useQuery<Appointment>({
    queryKey: ["appointments", "detail", id],
    queryFn: () =>
      apiClient<Appointment>(`/appointments/${id}`, { method: "GET" }),
    enabled: !!id,
    staleTime: 2 * 1000,
    refetchInterval: opts?.poll
      ? (q) =>
          q.state.data?.status === AppointmentStatus.PENDING ? 2000 : false
      : false,
  })
}

/** Book an appointment + initiate SSLCommerz payment (PATIENT). */
export function useBookWithPayment() {
  const qc = useQueryClient()
  return useMutation<BookWithPaymentResult, Error, CreateAppointmentPayload>({
    mutationFn: (payload) =>
      apiClient<BookWithPaymentResult>("/appointments/book", {
        method: "POST",
        json: payload,
        // authed — token auto-injected
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["appointments"] })
    },
  })
}

export interface MyTicketsParams {
  page: number
  limit: number
  status?: AppointmentStatus
  [key: string]: unknown
}

/** The logged-in patient's appointments (paginated, optional status filter). */
export function useMyTickets(params: MyTicketsParams) {
  return useQuery<Paginated<Appointment>>({
    queryKey: qk.myTickets(params),
    queryFn: () =>
      apiClient<Paginated<Appointment>>("/appointments/my-tickets", {
        method: "GET",
        params: {
          page: params.page,
          limit: params.limit,
          status: params.status,
        },
      }),
    staleTime: 30 * 1000,
  })
}

/** Cancel one of the patient's own appointments (PATCH status → CANCELLED). */
export function useCancelAppointment() {
  const qc = useQueryClient()
  return useMutation<Appointment, Error, string>({
    mutationFn: (id) =>
      apiClient<Appointment>(`/appointments/${id}/status`, {
        method: "PATCH",
        json: { status: AppointmentStatus.CANCELLED },
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["appointments", "mine"] })
    },
  })
}

export interface UpdateAppointmentStatusPayload {
  id: string
  status: AppointmentStatus
}

/**
 * Set an appointment's status. Backend (`appointment.service.ts`) only gates
 * PATIENT (cancel-own); DOCTOR, HOSPITAL_STAFF and SUPER_ADMIN can set any
 * status. Invalidates appointment + doctor-dashboard caches.
 */
export function useUpdateAppointmentStatus() {
  const qc = useQueryClient()
  return useMutation<Appointment, Error, UpdateAppointmentStatusPayload>({
    mutationFn: ({ id, status }) =>
      apiClient<Appointment>(`/appointments/${id}/status`, {
        method: "PATCH",
        json: { status },
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["appointments"] })
      qc.invalidateQueries({ queryKey: ["doctor-dashboard"] })
      qc.invalidateQueries({ queryKey: ["dashboard"] })
    },
  })
}
