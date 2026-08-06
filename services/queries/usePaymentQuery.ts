"use client"

import { useQuery } from "@tanstack/react-query"
import { MOCK_PAYMENTS, paginate } from "@/lib/mock-data"
import type { Paginated, Payment, PaymentStatus, TransactionLookup } from "@/types"

export interface MyPaymentsParams {
  page: number
  limit: number
  status?: PaymentStatus
  [key: string]: unknown
}

export function useMyPayments(params: MyPaymentsParams) {
  let filtered = MOCK_PAYMENTS
  if (params.status) filtered = filtered.filter((p) => p.status === params.status)
  const data = paginate(filtered, params.page, params.limit)
  return useQuery<Paginated<Payment>>({
    queryKey: ["payments", "my", params],
    queryFn: () => Promise.resolve(data),
    initialData: data,
    staleTime: Infinity,
  })
}

export function useAllPayments(params: { page?: number; limit?: number; status?: PaymentStatus; appointmentId?: string; [key: string]: unknown } = {}) {
  let filtered = MOCK_PAYMENTS
  if (params.status) filtered = filtered.filter((p) => p.status === params.status)
  if (params.appointmentId) {
    filtered = filtered.filter((p) => {
      const aid = typeof p.appointmentId === "object" ? p.appointmentId._id : p.appointmentId
      return aid === params.appointmentId
    })
  }
  const data = paginate(filtered, params.page ?? 1, params.limit ?? 10)
  return useQuery<Paginated<Payment>>({
    queryKey: ["payments", "all", params],
    queryFn: () => Promise.resolve(data),
    initialData: data,
    staleTime: Infinity,
  })
}

export function usePayment(id: string | undefined) {
  const payment = MOCK_PAYMENTS.find((p) => p._id === id) ?? MOCK_PAYMENTS[0]
  return useQuery<Payment>({
    queryKey: ["payments", "detail", id],
    queryFn: () => Promise.resolve(payment),
    initialData: payment,
    enabled: !!id,
    staleTime: Infinity,
  })
}

export function useTransactionStatus(tranId: string | undefined) {
  const payment = MOCK_PAYMENTS.find((p) => p.tranId === tranId) ?? MOCK_PAYMENTS[0]
  const lookup: TransactionLookup = {
    local: {
      tranId: payment.tranId,
      status: payment.status,
      amount: payment.amount,
      paidAt: payment.paidAt,
    },
    sslcommerz: { status: "VALID", tran_id: payment.tranId, amount: String(payment.amount), currency: "BDT", card_type: "bKash" },
  }
  return useQuery<TransactionLookup>({
    queryKey: ["payments", "transaction", tranId],
    queryFn: () => Promise.resolve(lookup),
    initialData: lookup,
    enabled: !!tranId,
    staleTime: Infinity,
  })
}
