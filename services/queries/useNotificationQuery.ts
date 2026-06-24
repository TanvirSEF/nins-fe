"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "@/lib/api-client"
import { qk } from "@/lib/query-keys"
import { useAuth } from "@/hooks/useAuth"
import type {
  AppNotification,
  MarkAllReadResult,
  NotificationParams,
  Paginated,
  UnreadCount,
} from "@/types"

/** Current user's notifications (paginated, optional read/type filter). */
export function useNotifications(params: NotificationParams) {
  const { token } = useAuth()
  return useQuery<Paginated<AppNotification>>({
    queryKey: qk.notifications(params),
    queryFn: () =>
      apiClient<Paginated<AppNotification>>("/notifications", {
        method: "GET",
        params: {
          page: params.page,
          limit: params.limit,
          read:
            params.read === undefined ? undefined : String(params.read),
          type: params.type,
        },
      }),
    enabled: !!token,
    staleTime: 30 * 1000,
    // Polling fallback: the socket push is the primary signal, but until the
    // backend's Redis adapter is deployed (and as a resilience net if a socket
    // drops), refresh the list periodically so the bell stays current.
    refetchInterval: 30 * 1000,
  })
}

/** Unread notification count (drives the bell badge). */
export function useUnreadCount() {
  const { token } = useAuth()
  return useQuery<UnreadCount>({
    queryKey: qk.unreadCount,
    queryFn: () =>
      apiClient<UnreadCount>("/notifications/unread-count", {
        method: "GET",
      }),
    enabled: !!token,
    staleTime: 30 * 1000,
    // Polling fallback so the badge updates even without the socket push.
    refetchInterval: 20 * 1000,
  })
}

export function useMarkAllRead() {
  const qc = useQueryClient()
  return useMutation<MarkAllReadResult, Error, void>({
    mutationFn: () =>
      apiClient<MarkAllReadResult>("/notifications/read-all", {
        method: "PATCH",
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notifications"] })
    },
  })
}

export function useMarkRead() {
  const qc = useQueryClient()
  return useMutation<AppNotification, Error, string>({
    mutationFn: (id) =>
      apiClient<AppNotification>(`/notifications/${id}/read`, {
        method: "PATCH",
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notifications"] })
    },
  })
}

export function useDeleteNotification() {
  const qc = useQueryClient()
  return useMutation<AppNotification, Error, string>({
    mutationFn: (id) =>
      apiClient<AppNotification>(`/notifications/${id}`, {
        method: "DELETE",
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notifications"] })
    },
  })
}
