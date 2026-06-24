"use client"

import * as React from "react"
import {
  useDeleteNotification,
  useMarkAllRead,
  useMarkRead,
  useNotifications,
  useUnreadCount,
} from "@/services/queries/useNotificationQuery"
import { ApiError } from "@/lib/api-client"
import type { AppNotification } from "@/types"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "sonner"
import { Bell, CheckCheck, Trash2, BellOff } from "lucide-react"
import { formatDistanceToNow, parseISO } from "date-fns"
import { cn } from "@/lib/utils"

export function NotificationBell() {
  const { data: unread, isLoading: unreadLoading } = useUnreadCount()
  const count = unread?.count ?? 0

  const { data, isLoading, isError, refetch } = useNotifications({
    page: 1,
    limit: 10,
  })
  const markRead = useMarkRead()
  const markAll = useMarkAllRead()
  const remove = useDeleteNotification()
  const [busyId, setBusyId] = React.useState<string>()

  const handleError = (error: unknown, fallback: string) => {
    const msgs = error instanceof ApiError ? error.messages : [fallback]
    msgs.forEach((m) => toast.error(m))
  }

  const onMarkRead = async (id: string) => {
    setBusyId(id)
    try {
      await markRead.mutateAsync(id)
    } catch (error) {
      handleError(error, "Couldn't mark as read.")
    } finally {
      setBusyId(undefined)
    }
  }

  const onMarkAll = async () => {
    try {
      await markAll.mutateAsync()
      toast.success("All caught up")
    } catch (error) {
      handleError(error, "Couldn't mark all as read.")
    }
  }

  const onDelete = async (id: string) => {
    setBusyId(id)
    try {
      await remove.mutateAsync(id)
    } catch (error) {
      handleError(error, "Couldn't delete.")
    } finally {
      setBusyId(undefined)
    }
  }

  const items = data?.data ?? []

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label="Notifications"
        >
          <Bell className="size-5" />
          {!unreadLoading && count > 0 && (
            <span className="absolute top-1 right-1 flex min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground">
              {count > 9 ? "9+" : count}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between border-b border-border px-3 py-2.5">
          <span className="font-heading text-sm font-bold">Notifications</span>
          {count > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 gap-1.5 px-2 text-xs"
              onClick={onMarkAll}
              disabled={markAll.isPending}
            >
              <CheckCheck className="size-3.5" />
              Mark all read
            </Button>
          )}
        </div>

        <ScrollArea className="max-h-80">
          {isLoading ? (
            <div className="space-y-2 p-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full rounded-lg" />
              ))}
            </div>
          ) : isError ? (
            <div className="p-6 text-center text-sm text-muted-foreground">
              Couldn&apos;t load notifications.
              <Button
                variant="outline"
                size="sm"
                className="mt-2 block w-full"
                onClick={() => refetch()}
              >
                Retry
              </Button>
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center gap-2 p-8 text-center text-sm text-muted-foreground">
              <BellOff className="size-5" />
              You&apos;re all caught up.
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {items.map((n) => (
                <NotificationRow
                  key={n._id}
                  notification={n}
                  busy={busyId === n._id}
                  onMarkRead={() => onMarkRead(n._id)}
                  onDelete={() => onDelete(n._id)}
                />
              ))}
            </ul>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}

function NotificationRow({
  notification,
  busy,
  onMarkRead,
  onDelete,
}: {
  notification: AppNotification
  busy: boolean
  onMarkRead: () => void
  onDelete: () => void
}) {
  return (
    <li
      className={cn(
        "group flex gap-2 px-3 py-2.5 transition-colors",
        notification.read ? "bg-transparent" : "bg-primary/5",
      )}
    >
      <span
        className={cn(
          "mt-1.5 size-2 shrink-0 rounded-full",
          notification.read ? "bg-transparent" : "bg-primary",
        )}
      />
      <div className="min-w-0 flex-1 space-y-0.5">
        <p className="text-sm font-medium text-foreground">
          {notification.title}
        </p>
        <p className="line-clamp-2 text-xs text-muted-foreground">
          {notification.message}
        </p>
        <p className="text-[10px] text-muted-foreground">
          {notification.createdAt &&
            formatDistanceToNow(parseISO(notification.createdAt), {
              addSuffix: true,
            })}
        </p>
      </div>
      <div className="flex shrink-0 flex-col gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
        {!notification.read && (
          <Button
            variant="ghost"
            size="icon-sm"
            className="size-7"
            onClick={onMarkRead}
            disabled={busy}
            aria-label="Mark as read"
          >
            <CheckCheck className="size-3.5" />
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon-sm"
          className="size-7 text-muted-foreground hover:text-destructive"
          onClick={onDelete}
          disabled={busy}
          aria-label="Delete"
        >
          <Trash2 className="size-3.5" />
        </Button>
      </div>
    </li>
  )
}
