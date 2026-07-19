import { describe, it, expect } from "vitest"
import { applicationSchema, criteriaSchema } from "@/lib/validations"

describe("applicationSchema", () => {
  it("accepts valid data", () => {
    const result = applicationSchema.safeParse({
      company: "Spotify",
      position: "Frontend Developer",
    })
    expect(result.success).toBe(true)
  })

  it("rejects empty company", () => {
    const result = applicationSchema.safeParse({
      company: "",
      position: "Frontend Developer",
    })
    expect(result.success).toBe(false)
  })
})

describe("criteriaSchema", () => {
  it("rejects invalid email", () => {
    const result = criteriaSchema.safeParse({
      label: "Junior",
      keywords: ["junior"],
      notifyEmail: "not-an-email",
      intervalDays: 3,
    })
    expect(result.success).toBe(false)
  })

  it("rejects negative interval", () => {
    const result = criteriaSchema.safeParse({
      label: "Junior",
      keywords: ["junior"],
      notifyEmail: "test@test.com",
      intervalDays: -1,
    })
    expect(result.success).toBe(false)
  })
})