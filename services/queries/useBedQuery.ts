"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { MOCK_BEDS, MOCK_LIVE_BOARD, mockDelay } from "@/lib/mock-data"
import type { Bed, BedAvailability, BedType } from "@/types"
import { toast } from "sonner"

export interface UpdateBedStatusPayload {
  isOccupied: boolean
  currentPatientName?: string
}

export function useLiveBoard() {
  return useQuery<BedAvailability[]>({
    queryKey: ["beds", "live-board"],
    queryFn: () => Promise.resolve(MOCK_LIVE_BOARD),
    initialData: MOCK_LIVE_BOARD,
    staleTime: Infinity,
  })
}

export function useBeds(type: BedType) {
  const beds = MOCK_BEDS.filter((b) => b.type === type)
  return useQuery<Bed[]>({
    queryKey: ["beds", "list", type],
    queryFn: () => Promise.resolve(beds),
    initialData: beds,
    staleTime: Infinity,
  })
}

export function useUpdateBedStatus() {
  const qc = useQueryClient()
  return useMutation<Bed, Error, { id: string; body: UpdateBedStatusPayload }>({
    mutationFn: async ({ id, body }) => {
      await mockDelay()
      const bed = MOCK_BEDS.find((b) => b._id === id)!
      return { ...bed, ...body }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["beds"] })
      toast.success("Bed status updated (demo mode)")
    },
  })
}
