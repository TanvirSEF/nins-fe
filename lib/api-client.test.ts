import { describe, it, expect, vi, afterEach } from "vitest"
import { apiClient, ApiError } from "@/lib/api-client"
import { clearToken, getToken } from "@/lib/auth"

/**
 * Guards the contract the entire data layer depends on: envelope unwrap,
 * error normalization (string | string[]), query-param building, Bearer auth,
 * cookie credentials, raw downloads, and the 401 → silent-refresh → retry flow.
 */

function mockFetch(
  impl: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>,
) {
  const fn = vi.fn(impl)
  vi.stubGlobal("fetch", fn)
  return fn
}

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  })

describe("apiClient", () => {
  afterEach(() => {
    vi.unstubAllGlobals()
    clearToken()
  })

  it("unwraps the { success, data } envelope", async () => {
    mockFetch(async () => json(200, { success: true, data: { id: 1 } }))
    await expect(apiClient<{ id: number }>("/x")).resolves.toEqual({ id: 1 })
  })

  it("falls back to the raw payload when there is no data field", async () => {
    mockFetch(async () => json(200, { foo: "bar" }))
    await expect(apiClient("/x")).resolves.toEqual({ foo: "bar" })
  })

  it("builds query params and skips undefined values", async () => {
    const fn = mockFetch(async () => json(200, { success: true, data: {} }))
    await apiClient("/x", { params: { a: 1, b: undefined, c: "s" } })
    const url = String(fn.mock.calls[0]?.[0])
    expect(url).toContain("a=1")
    expect(url).toContain("c=s")
    expect(url).not.toContain("b=")
  })

  it("attaches the Bearer token when provided", async () => {
    const fn = mockFetch(async () => json(200, { success: true, data: {} }))
    await apiClient("/x", { token: "abc" })
    const init = (fn.mock.calls[0]?.[1] ?? {}) as RequestInit
    const headers = (init.headers ?? {}) as Record<string, string>
    expect(headers.Authorization).toBe("Bearer abc")
  })

  it("sends credentials: include so the refresh cookie travels", async () => {
    const fn = mockFetch(async () => json(200, { success: true, data: {} }))
    await apiClient("/x")
    const init = (fn.mock.calls[0]?.[1] ?? {}) as RequestInit
    expect(init.credentials).toBe("include")
  })

  it("returns the raw Response when raw:true", async () => {
    mockFetch(async () => new Response("blob-bytes", { status: 200 }))
    const res = await apiClient<Response>("/x", { raw: true })
    expect(res).toBeInstanceOf(Response)
  })

  it("normalizes a string error message into ApiError", async () => {
    mockFetch(async () => json(400, { statusCode: 400, message: "bad" }))
    await expect(apiClient("/x")).rejects.toMatchObject({
      statusCode: 400,
      messages: ["bad"],
    })
  })

  it("normalizes an array of error messages", async () => {
    mockFetch(async () =>
      json(422, { statusCode: 422, message: ["field a", "field b"] }),
    )
    await expect(apiClient("/x")).rejects.toMatchObject({
      statusCode: 422,
      messages: ["field a", "field b"],
    })
  })

  describe("401 silent-refresh retry", () => {
    it("refreshes once, stores the new token, and retries with it", async () => {
      const fn = mockFetch(async (input) => {
        const url = String(input)
        if (url.endsWith("/auth/refresh")) {
          return json(200, {
            success: true,
            data: { user: { id: "u1" }, accessToken: "fresh-token" },
          })
        }
        // First /x call expires, the retry (after refresh) succeeds.
        const seen = (fn.mock.calls ?? []).filter(
          (c) => !String(c[0]).endsWith("/auth/refresh"),
        ).length
        return seen === 1
          ? json(401, { statusCode: 401, message: "expired" })
          : json(200, { success: true, data: { ok: true } })
      })

      const result = await apiClient<{ ok: boolean }>("/x")
      expect(result).toEqual({ ok: true })
      expect(getToken()).toBe("fresh-token")

      // call order: /x (401) → /auth/refresh → /x retry (200)
      const calls = fn.mock.calls.map((c) => String(c[0]))
      expect(calls).toEqual(["/x", "/auth/refresh", "/x"])
      const retryInit = (fn.mock.calls[2]?.[1] ?? {}) as RequestInit
      const headers = (retryInit.headers ?? {}) as Record<string, string>
      expect(headers.Authorization).toBe("Bearer fresh-token")
    })

    it("dispatches auth:unauthorized once when the refresh also fails", async () => {
      mockFetch(async (input) =>
        String(input).endsWith("/auth/refresh")
          ? json(401, { statusCode: 401, message: "no cookie" })
          : json(401, { statusCode: 401, message: "expired" }),
      )
      const handler = vi.fn()
      window.addEventListener("auth:unauthorized", handler)
      await expect(apiClient("/x")).rejects.toBeInstanceOf(ApiError)
      expect(handler).toHaveBeenCalledTimes(1)
      window.removeEventListener("auth:unauthorized", handler)
    })

    it("does not recurse on a 401 from /auth/refresh", async () => {
      const fn = mockFetch(async (input) =>
        json(401, { statusCode: 401, message: String(input) }),
      )
      await expect(apiClient("/auth/refresh")).rejects.toBeInstanceOf(ApiError)
      // Exactly one fetch — no refresh-of-the-refresh.
      expect(fn).toHaveBeenCalledTimes(1)
    })
  })
})
