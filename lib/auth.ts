/**
 * In-memory access-token store.
 *
 * The access token is NEVER persisted to localStorage: a stolen token dies
 * within ~15 min (its own expiry), and the long-lived refresh token lives in an
 * httpOnly cookie the browser manages for us — invisible to JS. On reload, the
 * AuthProvider rehydrates this store via POST /auth/refresh (the cookie is sent
 * automatically).
 *
 * This is a client-only module: it's imported solely by client components /
 * the apiClient, so the module-level state is never shared across server
 * requests.
 */
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
