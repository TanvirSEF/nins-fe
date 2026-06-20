import { getToken } from "@/lib/auth"

const BASE =
  process.env.NEXT_PUBLIC_API_URL || "https://nins.zephlotech.com/api"

/**
 * Endpoints whose 401 must NOT trigger an auto-logout. A 401 on login/register
 * means "bad credentials" / "email taken" — a normal form error the caller must
 * render — not an expired session. The auth layer filters these out of the
 * `auth:unauthorized` event it listens for.
 */
export const AUTH_ENDPOINTS = ["/auth/login", "/auth/register"] as const

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
   * - `undefined` (default): fall back to the stored token (localStorage).
   * - `null`: force an unauthenticated request (public endpoints).
   * - string: use exactly this token (e.g. before it has been persisted).
   */
  token?: string | null
  /** return raw Response (for blob/PDF downloads) instead of parsed JSON */
  raw?: boolean
}

/**
 * Broadcast a session-expiry signal. The auth context listens for this and
 * performs logout + redirect. Only fires for requests routed through apiClient
 * (unlike the old global window.fetch override), and skips auth endpoints.
 */
function notifyUnauthorized(endpoint: string): void {
  if (typeof window === "undefined") return
  window.dispatchEvent(
    new CustomEvent("auth:unauthorized", { detail: { endpoint } })
  )
}

export async function apiClient<T>(
  endpoint: string,
  opts: Options = {}
): Promise<T> {
  const { json, params, token, raw, headers, ...rest } = opts

  // Token resolution: explicit override wins; otherwise read from storage.
  const effectiveToken = token === undefined ? getToken() : token

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

  const res = await fetch(url, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(effectiveToken ? { Authorization: `Bearer ${effectiveToken}` } : {}),
      ...headers,
    },
    body: json ? JSON.stringify(json) : rest.body,
    cache: "no-store", // Backend handles caching; disable Next fetch caching
  })

  if (raw) {
    if (!res.ok) {
      if (res.status === 401) notifyUnauthorized(endpoint)
      throw await ApiError.fromResponse(res)
    }
    return res as unknown as T // Caller reads .blob() or similar
  }

  if (!res.ok) {
    if (res.status === 401) notifyUnauthorized(endpoint)
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
