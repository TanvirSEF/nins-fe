import { describe, it, expect } from "vitest"
import { cn } from "@/lib/utils"

describe("cn (className helper)", () => {
  it("joins truthy class fragments and drops falsy ones", () => {
    expect(cn("a", false && "b", "c")).toBe("a c")
  })

  it("resolves tailwind conflicts — last definition wins", () => {
    expect(cn("p-1", "p-2")).toBe("p-2")
  })
})
