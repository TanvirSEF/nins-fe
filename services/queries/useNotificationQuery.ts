"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  MOCK_NOTIFICATIONS,
  MOCK_UNREAD_COUNT,
  paginate,
  mockDelay,
} from "@/lib/mock-data"
import type {
  AppNotification,
  MarkAllReadResult,
  NotificationParams,
  Paginated,
  UnreadCount,
} from "@/types"
import { toast } from "sonner"

export function useNotifications(params: NotificationParams) {
  let filtered = MOCK_NOTIFICATIONS
  if (params.read !== undefined) {
    filtered = filtered.filter((n) => n.read === params.read)
  }
  const data = paginate(filtered, params.page, params.limit)
  return useQuery<Paginated<AppNotification>>({
    queryKey: ["notifications", params],
    queryFn: () => Promise.resolve(data),
    initialData: data,
    staleTime: Infinity,
  })
}

export function useUnreadCount() {
  return useQuery<UnreadCount>({
    queryKey: ["notifications", "unread-count"],
    queryFn: () => Promise.resolve(MOCK_UNREAD_COUNT),
    initialData: MOCK_UNREAD_COUNT,
    staleTime: Infinity,
  })
}

export function useMarkAllRead() {
  const qc = useQueryClient()
  return useMutation<MarkAllReadResult, Error, void>({
    mutationFn: async () => {
      await mockDelay(400)
      return { modified: MOCK_NOTIFICATIONS.filter((n) => !n.read).length }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notifications"] })
      toast.success("All notifications marked as read (demo mode)")
    },
  })
}

export function useMarkRead() {
  const qc = useQueryClient()
  return useMutation<AppNotification, Error, string>({
    mutationFn: async (id) => {
      await mockDelay(300)
      return MOCK_NOTIFICATIONS.find((n) => n._id === id) ?? MOCK_NOTIFICATIONS[0]
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notifications"] })
    },
  })
}

export function useDeleteNotification() {
  const qc = useQueryClient()
  return useMutation<AppNotification, Error, string>({
    mutationFn: async (id) => {
      await mockDelay(300)
      return MOCK_NOTIFICATIONS.find((n) => n._id === id) ?? MOCK_NOTIFICATIONS[0]
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notifications"] })
      toast.success("Notification deleted (demo mode)")
    },
  })
}
