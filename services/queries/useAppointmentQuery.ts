"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { MOCK_APPOINTMENTS, paginate, mockDelay } from "@/lib/mock-data"
import type { Appointment, Paginated } from "@/types"
import { AppointmentStatus } from "@/types"
import { toast } from "sonner"

export interface CreateAppointmentPayload {
  doctorId: string
  scheduleId: string
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

export interface MyTicketsParams {
  page: number
  limit: number
  status?: AppointmentStatus
  [key: string]: unknown
}

export interface UpdateAppointmentStatusPayload {
  id: string
  status: AppointmentStatus
}

export function useDoctorAppointments(
  doctorId: string | undefined,
  date: string | undefined,
) {
  const appointments = MOCK_APPOINTMENTS.filter((a) => {
    const doc = typeof a.doctorId === "object" ? a.doctorId._id : a.doctorId
    return doc === doctorId && (!date || a.appointmentDate === date)
  })
  const result: DoctorAppointmentsResult = {
    doctorId: doctorId ?? "",
    date,
    appointments,
    totalBooked: appointments.length,
  }
  return useQuery<DoctorAppointmentsResult>({
    queryKey: ["appointments", "doctor", doctorId, date],
    queryFn: () => Promise.resolve(result),
    initialData: result,
    enabled: !!(doctorId && date),
    staleTime: Infinity,
  })
}

export function useMyDoctorAppointments(
  doctorId: string | undefined,
  date?: string,
) {
  const appointments = MOCK_APPOINTMENTS.filter((a) => {
    const doc = typeof a.doctorId === "object" ? a.doctorId._id : a.doctorId
    return doc === doctorId && (!date || a.appointmentDate === date)
  })
  const result: DoctorAppointmentsResult = {
    doctorId: doctorId ?? "",
    date,
    appointments,
    totalBooked: appointments.length,
  }
  return useQuery<DoctorAppointmentsResult>({
    queryKey: ["appointments", "doctor", "mine", date ?? "all"],
    queryFn: () => Promise.resolve(result),
    initialData: result,
    enabled: !!doctorId,
    staleTime: Infinity,
  })
}

export function useAppointment(id: string | undefined, opts?: { poll?: boolean }) {
  const appt = MOCK_APPOINTMENTS.find((a) => a._id === id) ?? MOCK_APPOINTMENTS[0]
  return useQuery<Appointment>({
    queryKey: ["appointments", "detail", id],
    queryFn: () => Promise.resolve(appt),
    initialData: appt,
    enabled: !!id,
    staleTime: Infinity,
    refetchInterval: false,
  })
}

export function useBookWithPayment() {
  const qc = useQueryClient()
  return useMutation<BookWithPaymentResult, Error, CreateAppointmentPayload>({
    mutationFn: async () => {
      await mockDelay(800)
      return {
        appointmentId: "appt-demo-new",
        tranId: "TXN-DEMO-" + Date.now(),
        gatewayPageURL: "/dashboard/patient/book?demo=success",
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["appointments"] })
      toast.success("Appointment booked (demo mode)")
    },
  })
}

export function useMyTickets(params: MyTicketsParams) {
  let filtered = MOCK_APPOINTMENTS
  if (params.status) {
    filtered = filtered.filter((a) => a.status === params.status)
  }
  const data = paginate(filtered, params.page, params.limit)
  return useQuery<Paginated<Appointment>>({
    queryKey: ["appointments", "my-tickets", params],
    queryFn: () => Promise.resolve(data),
    initialData: data,
    staleTime: Infinity,
  })
}

export function useCancelAppointment() {
  const qc = useQueryClient()
  return useMutation<Appointment, Error, string>({
    mutationFn: async (id) => {
      await mockDelay()
      const a = MOCK_APPOINTMENTS.find((a) => a._id === id) ?? MOCK_APPOINTMENTS[0]
      return { ...a, status: AppointmentStatus.CANCELLED }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["appointments"] })
      toast.success("Appointment cancelled (demo mode)")
    },
  })
}

export function useUpdateAppointmentStatus() {
  const qc = useQueryClient()
  return useMutation<Appointment, Error, UpdateAppointmentStatusPayload>({
    mutationFn: async ({ id, status }) => {
      await mockDelay()
      const a = MOCK_APPOINTMENTS.find((a) => a._id === id) ?? MOCK_APPOINTMENTS[0]
      return { ...a, status }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["appointments"] })
      toast.success("Appointment status updated (demo mode)")
    },
  })
}

// Admin all-appointments list
export function useAllAppointments(params: { page?: number; limit?: number; status?: AppointmentStatus; [key: string]: unknown } = {}) {
  let filtered = MOCK_APPOINTMENTS
  if (params.status) filtered = filtered.filter((a) => a.status === params.status)
  const data = paginate(filtered, params.page ?? 1, params.limit ?? 10)
  return useQuery<Paginated<Appointment>>({
    queryKey: ["appointments", "all", params],
    queryFn: () => Promise.resolve(data),
    initialData: data,
    staleTime: Infinity,
  })
}
