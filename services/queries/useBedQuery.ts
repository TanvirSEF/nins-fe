"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "@/lib/api-client"
import { qk } from "@/lib/query-keys"
import type { Bed, BedAvailability, BedType } from "@/types"

/**
 * Live ICU/HDU availability summary (public). Backend returns an array of
 * `BedAvailability` (ICU then HDU), cached 60s server-side, busted on bed PATCH.
 */
export function useLiveBoard() {
  return useQuery<BedAvailability[]>({
    queryKey: qk.liveBoard,
    queryFn: () =>
      apiClient<BedAvailability[]>("/bed-management/live-board", {
        method: "GET",
        token: null, // public — no auth header for anonymous visitors
      }),
    staleTime: 5 * 60 * 1000,
  })
}

/** Beds of a given type (public). Plain array, sorted by type then bedNumber. */
export function useBeds(type: BedType) {
  return useQuery<Bed[]>({
    queryKey: qk.beds(type),
    queryFn: () =>
      apiClient<Bed[]>("/bed-management/beds", {
        method: "GET",
        params: { type },
        token: null, // public
      }),
    staleTime: 5 * 60 * 1000,
  })
}

export interface UpdateBedStatusPayload {
  isOccupied: boolean
  /** Required by the backend when isOccupied === true. */
  currentPatientName?: string
}

/**
 * Staff mutation: occupy/release a bed. Authed (token auto-injected). On
 * success, invalidate the `["beds"]` prefix so both live-board and the bed
 * grid refresh.
 */
export function useUpdateBedStatus() {
  const queryClient = useQueryClient()

  return useMutation<
    Bed,
    Error,
    { id: string; body: UpdateBedStatusPayload }
  >({
    mutationFn: ({ id, body }) =>
      apiClient<Bed>(`/bed-management/beds/${id}`, {
        method: "PATCH",
        json: body,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["beds"] })
    },
  })
}
