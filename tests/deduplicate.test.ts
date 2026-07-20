import { describe, it, expect } from "vitest"
import { isDuplicate, deduplicateListings } from "@/lib/deduplicate"

describe("isDuplicate", () => {
  it("detects an existing duplicate", () => {
    const existing = [{ userId: "u1", source: "remotive", externalId: "123" }]
    const candidate = { userId: "u1", source: "remotive", externalId: "123" }

    expect(isDuplicate(existing, candidate)).toBe(true)
  })

  it("does not flag different externalId as duplicate", () => {
    const existing = [{ userId: "u1", source: "remotive", externalId: "123" }]
    const candidate = { userId: "u1", source: "remotive", externalId: "456" }

    expect(isDuplicate(existing, candidate)).toBe(false)
  })

  it("does not flag same externalId from a different source as duplicate", () => {
    const existing = [{ userId: "u1", source: "remotive", externalId: "123" }]
    const candidate = { userId: "u1", source: "arbeitnow", externalId: "123" }

    expect(isDuplicate(existing, candidate)).toBe(false)
  })
})

describe("deduplicateListings", () => {
  it("removes duplicates while keeping unique entries", () => {
    const listings = [
      { userId: "u1", source: "remotive", externalId: "1" },
      { userId: "u1", source: "remotive", externalId: "1" },
      { userId: "u1", source: "remotive", externalId: "2" },
    ]

    const result = deduplicateListings(listings)
    expect(result).toHaveLength(2)
  })
})
