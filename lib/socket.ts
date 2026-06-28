import { io, type Socket } from "socket.io-client"

const BASE =
  process.env.NEXT_PUBLIC_API_URL || "https://nins.zephlotech.com/api"

/** The notification gateway is at the `/notifications` namespace (not under `/api`); strip the trailing `/api` from the HTTP base. */
export function getNotificationSocketUrl(): string {
  return `${BASE.replace(/\/api\/?$/, "")}/notifications`
}

/** Authenticated Socket.IO connection. The gateway reads the JWT from `handshake.auth.token` and joins room `user:<sub>` — pass the raw token, no manual room join. */
export function connectNotifications(token: string): Socket {
  return io(getNotificationSocketUrl(), {
    auth: { token },
    transports: ["websocket"],
    autoConnect: true,
    reconnection: true,
  })
}
