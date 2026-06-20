"use client"

import { useQuery } from "@tanstack/react-query"
import { apiClient } from "@/lib/api-client"
import { qk } from "@/lib/query-keys"
import type { Paginated, Payment, PaymentStatus } from "@/types"

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
