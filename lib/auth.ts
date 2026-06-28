/** In-memory access-token store (never persisted — a stolen token dies at its ~15m expiry; the long-lived refresh token lives in an httpOnly cookie). AuthProvider rehydrates this on reload via POST /auth/refresh. Client-only. */
let accessToken: string | null = null
const listeners = new Set<() => void>()

function emit(): void {
  for (const listener of listeners) listener()
}

export function getToken(): string | null {
  return accessToken
}

export function setToken(token: string): void {
  accessToken = token
  emit()
}

export function clearToken(): void {
  if (accessToken === null) return
  accessToken = null
  emit()
}

/**
 * Subscribe to token changes. Used by AuthProvider to mirror the store into React
 * state (so the socket and any `useAuth().token` consumers re-render on rotation).
 * Returns an unsubscribe function.
 */
export function subscribe(listener: () => void): () => void {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}
