import { describe, it, expect, vi, afterEach } from "vitest"
import {
  getToken,
  setToken,
  clearToken,
  subscribe,
} from "@/lib/auth"

describe("in-memory access-token store", () => {
  // The store is module-level, so reset it between tests for isolation.
  afterEach(() => clearToken())

  it("returns null by default", () => {
    expect(getToken()).toBeNull()
  })

  it("round-trips a token through the in-memory store", () => {
    setToken("jwt-123")
    expect(getToken()).toBe("jwt-123")
    clearToken()
    expect(getToken()).toBeNull()
  })

  it("notifies subscribers on set and clear, and stops after unsubscribe", () => {
    const listener = vi.fn()
    const unsubscribe = subscribe(listener)

    setToken("jwt-456")
    expect(listener).toHaveBeenCalledTimes(1)

    clearToken()
    expect(listener).toHaveBeenCalledTimes(2)

    unsubscribe()
    setToken("ignored")
    expect(listener).toHaveBeenCalledTimes(2) // no further notifications
  })
})
