import { describe, it, expect, vi, afterEach } from "vitest"
import { apiClient, ApiError } from "@/lib/api-client"

/**
 * Guards the contract the entire data layer depends on: envelope unwrap,
 * error normalization (string | string[]), query-param building, Bearer auth,
 * raw downloads, and the 401 → auth:unauthorized signal.
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
  afterEach(() => vi.unstubAllGlobals())

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

  it("dispatches auth:unauthorized on a 401", async () => {
    mockFetch(async () => json(401, { statusCode: 401, message: "no" }))
    const handler = vi.fn()
    window.addEventListener("auth:unauthorized", handler)
    await expect(apiClient("/x")).rejects.toBeInstanceOf(ApiError)
    expect(handler).toHaveBeenCalledTimes(1)
    window.removeEventListener("auth:unauthorized", handler)
  })
})
