import { describe, it, expect } from "vitest"
import { getToken, setToken, clearToken } from "@/lib/auth"

describe("JWT token storage", () => {
  it("returns null when nothing is stored", () => {
    expect(getToken()).toBeNull()
  })

  it("round-trips a token through localStorage", () => {
    setToken("jwt-123")
    expect(getToken()).toBe("jwt-123")
    clearToken()
    expect(getToken()).toBeNull()
  })
})
