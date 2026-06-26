import { describe, it, expect } from "vitest"
import { qk } from "@/lib/query-keys"

describe("query keys", () => {
  it("exposes a stable profile key", () => {
    expect(qk.profile).toEqual(["auth", "profile"])
  })

  it("scopes doctor detail by id", () => {
    expect(qk.doctor("d1")).toEqual(["doctors", "d1"])
  })

  it("scopes schedules to a doctor", () => {
    expect(qk.schedules("doc")).toEqual(["schedules", "doctor", "doc"])
  })

  it("myTickets namespaces under appointments/mine", () => {
    expect(qk.myTickets({ page: 2 })).toEqual([
      "appointments",
      "mine",
      { page: 2 },
    ])
  })

  it("search key is parameterized", () => {
    expect(qk.search({ q: "x" })).toEqual(["search", { q: "x" }])
  })
})
