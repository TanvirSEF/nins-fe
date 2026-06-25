"use client"

import { useQuery } from "@tanstack/react-query"
import { apiClient } from "@/lib/api-client"
import { qk } from "@/lib/query-keys"
import { useAuth } from "@/hooks/useAuth"
import type {
  Paginated,
  Payment,
  PaymentParams,
  PaymentStatus,
  TransactionLookup,
} from "@/types"

export interface MyPaymentsParams {
  page: number
  limit: number
  status?: PaymentStatus
  [key: string]: unknown
}

/** The logged-in patient's payments (paginated, optional status filter). */
export function useMyPayments(params: MyPaymentsParams) {
  return useQuery<Paginated<Payment>>({
    queryKey: qk.myPayments(params),
    queryFn: () =>
      apiClient<Paginated<Payment>>("/payments/history", {
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

/** All payments — staff/admin oversight (GET /payments). */
export function useAllPayments(params: PaymentParams = {}) {
  const { token } = useAuth()
  return useQuery<Paginated<Payment>>({
    queryKey: qk.payments(params),
    queryFn: () =>
      apiClient<Paginated<Payment>>("/payments", {
        method: "GET",
        params: {
          page: params.page,
          limit: params.limit,
          status: params.status,
          appointmentId: params.appointmentId,
        },
      }),
    enabled: !!token,
    staleTime: 30 * 1000,
  })
}

/** Single payment detail, populated (GET /payments/:id). */
export function usePayment(id: string | undefined) {
  const { token } = useAuth()
  return useQuery<Payment>({
    queryKey: id ? qk.payment(id) : ["payments", "detail", "none"],
    queryFn: () => apiClient<Payment>(`/payments/${id}`, { method: "GET" }),
    enabled: !!token && !!id,
    staleTime: 30 * 1000,
  })
}

/**
 * Live transaction status — our record + SSLCommerz's real-time status
 * (GET /payments/transaction/:tranId). Fires only when a tranId is supplied
 * (the staff enters one and clicks "Verify").
 */
export function useTransactionStatus(tranId: string | undefined) {
  const { token } = useAuth()
  return useQuery<TransactionLookup>({
    queryKey: tranId ? qk.transaction(tranId) : ["payments", "transaction", "none"],
    queryFn: () =>
      apiClient<TransactionLookup>(`/payments/transaction/${tranId}`, {
        method: "GET",
      }),
    enabled: !!token && !!tranId,
    staleTime: 0, // always re-query on demand — this is live gateway data
  })
}
