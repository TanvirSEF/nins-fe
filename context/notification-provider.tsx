"use client"

import * as React from "react"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { useAuth } from "@/hooks/useAuth"
import { connectNotifications } from "@/lib/socket"
import type { AppNotification } from "@/types"

/**
 * Owns a single Socket.IO connection to the `/notifications` namespace for the
 * logged-in user. On each server-emitted `notification` event it shows a toast
 * and invalidates the notification caches (list + unread count) so the bell
 * stays fresh. Renders nothing; must live inside AuthProvider +
 * QueryClientProvider.
 */
export function NotificationProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { token } = useAuth()
  const qc = useQueryClient()

  React.useEffect(() => {
    if (!token) return

    const socket = connectNotifications(token)

    const onNotification = (payload: AppNotification) => {
      toast(payload.title, { description: payload.message })
      // Covers both the list query and the unread-count query.
      qc.invalidateQueries({ queryKey: ["notifications"] })
    }

    socket.on("notification", onNotification)

    return () => {
      socket.off("notification", onNotification)
      socket.disconnect()
    }
  }, [token, qc])

  return <>{children}</>
}
