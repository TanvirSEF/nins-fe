import { getToken, setToken, clearToken } from "@/lib/auth"
import type { User } from "@/types"

const BASE =
  process.env.NEXT_PUBLIC_API_URL || "https://nins.zephlotech.com/api"

/**
 * Endpoints whose 401 must NOT trigger the silent-refresh-retry or an auto-logout.
 * - login/register: a 401 means bad credentials / email taken — a normal form
 *   error the caller must render, not an expired session.
 * - refresh: a 401 means the refresh cookie is gone and the session is over. It's
 *   handled by `refreshSession` returning null; letting it retry/notify here would
 *   recurse (refresh → 401 → refresh → …).
 */
export const AUTH_ENDPOINTS = [
  "/auth/login",
  "/auth/register",
  "/auth/refresh",
] as const

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public messages: string[]
  ) {
    super(messages.join("; "))
    this.name = "ApiError"
  }

  static async fromResponse(res: Response): Promise<ApiError> {
    const body = await res.json().catch(() => ({}))
    const msgs = Array.isArray(body.message)
      ? body.message
      : [body.message || "Request failed"]
    return new ApiError(body.statusCode ?? res.status, msgs)
  }
}

type Options = RequestInit & {
  json?: unknown
  params?: Record<string, string | number | undefined>
  /**
   * Explicit Bearer token override.
   * - `undefined` (default): fall back to the in-memory token.
   * - `null`: force an unauthenticated request (public endpoints / refresh).
   * - string: use exactly this token.
   */
  token?: string | null
  /** return raw Response (for blob/PDF downloads) instead of parsed JSON */
  raw?: boolean
  /**
   * Multipart file upload. Sent WITHOUT a Content-Type header so the browser can
   * set the multipart boundary. The { success, data } envelope is still unwrapped.
   */
  form?: FormData
}

/** A refreshed session returned by POST /auth/refresh. */
export interface AuthSession {
  user: User
  accessToken: string
}

/**
 * Broadcast a session-expiry signal. The auth context listens for this and
 * performs logout + redirect. Only fires for requests routed through apiClient,
 * and skips auth endpoints.
 */
function notifyUnauthorized(endpoint: string): void {
  if (typeof window === "undefined") return
  window.dispatchEvent(
    new CustomEvent("auth:unauthorized", { detail: { endpoint } })
  )
}

/** Build the URL + fetch init for a request, applying JSON/params/token/cookie. */
function buildRequest(
  endpoint: string,
  opts: Omit<Options, "token" | "raw">,
  effectiveToken: string | null
): { url: string; init: RequestInit } {
  const { json, params, form, headers, ...rest } = opts

  let url = `${BASE}${endpoint}`
  if (params) {
    const sp = new URLSearchParams()
    for (const [k, v] of Object.entries(params)) {
      if (v !== undefined) {
        sp.set(k, String(v))
      }
    }
    const queryString = sp.toString()
    if (queryString) {
      url += `?${queryString}`
    }
  }

  const init: RequestInit = {
    ...rest,
    credentials: "include", // send the httpOnly refresh cookie
    headers: {
      // For multipart/form-data uploads let the browser set the boundary.
      ...(form ? {} : { "Content-Type": "application/json" }),
      ...(effectiveToken ? { Authorization: `Bearer ${effectiveToken}` } : {}),
      ...headers,
    },
    body: json ? JSON.stringify(json) : (form ?? rest.body),
  }
  return { url, init }
}

let inflightRefresh: Promise<AuthSession | null> | null = null

/**
 * Silently rotate the access token using the httpOnly refresh cookie. Single-
 * flight: many concurrent 401s (and the AuthProvider hydration) share one
 * network round-trip. Returns the session on success and pushes the new access
 * token into the in-memory store; returns null when the refresh cookie is absent
 * or expired (session truly over).
 */
export function refreshSession(): Promise<AuthSession | null> {
  if (!inflightRefresh) {
    inflightRefresh = (async () => {
      try {
        const session = await apiClient<AuthSession>("/auth/refresh", {
          method: "POST",
          token: null, // unauthenticated — the cookie authenticates us
        })
        setToken(session.accessToken)
        return session
      } catch {
        clearToken()
        return null
      } finally {
        inflightRefresh = null
      }
    })()
  }
  return inflightRefresh
}

export async function apiClient<T>(
  endpoint: string,
  opts: Options = {}
): Promise<T> {
  const { token, raw, ...requestOpts } = opts
  const isAuthEndpoint = (AUTH_ENDPOINTS as readonly string[]).includes(endpoint)

  const effectiveToken = token === undefined ? getToken() : token

  let built = buildRequest(endpoint, requestOpts, effectiveToken)
  let res = await fetch(built.url, built.init)

  // Access token expired? Try ONE silent refresh + retry. Skipped for auth
  // endpoints (a 401 there is final — refresh would otherwise recurse).
  if (res.status === 401 && !isAuthEndpoint) {
    const refreshed = await refreshSession()
    if (refreshed) {
      built = buildRequest(endpoint, requestOpts, refreshed.accessToken)
      res = await fetch(built.url, built.init)
    }
  }

  if (raw) {
    if (!res.ok) {
      if (res.status === 401 && !isAuthEndpoint) notifyUnauthorized(endpoint)
      throw await ApiError.fromResponse(res)
    }
    return res as unknown as T // Caller reads .blob() or similar
  }

  if (!res.ok) {
    if (res.status === 401 && !isAuthEndpoint) notifyUnauthorized(endpoint)
    const body = await res.json().catch(() => ({}))
    const msgs = Array.isArray(body.message)
      ? body.message
      : [body.message || "Request failed"]
    throw new ApiError(body.statusCode ?? res.status, msgs)
  }

  const payload = await res.json()
  // Unwrap the { success, data } envelope
  return (payload?.data ?? payload) as T
}
