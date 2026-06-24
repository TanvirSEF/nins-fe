import { io, type Socket } from "socket.io-client"

const BASE =
  process.env.NEXT_PUBLIC_API_URL || "https://nins.zephlotech.com/api"

/**
 * The notification gateway lives at the `/notifications` namespace — NOT under
 * `/api` (see backend `notification.gateway.ts`). Derive the socket URL by
 * stripping the trailing `/api` from the HTTP base.
 */
export function getNotificationSocketUrl(): string {
  return `${BASE.replace(/\/api\/?$/, "")}/notifications`
}

/**
 * Open an authenticated Socket.IO connection to the notifications namespace.
 * The gateway reads the JWT from `handshake.auth.token` (also accepts
 * `query.token`) and joins the socket to room `user:<sub>`, so the client only
 * needs to pass the raw token — no manual room join.
 */
export function connectNotifications(token: string): Socket {
  return io(getNotificationSocketUrl(), {
    auth: { token },
    transports: ["websocket"],
    autoConnect: true,
    reconnection: true,
  })
}
