import { z } from "zod"

export const applicationSchema = z.object({
  company: z.string().min(1, "Company is required"),
  position: z.string().min(1, "Position is required"),
  status: z
    .enum([
      "WISHLIST",
      "APPLIED",
      "SCREENING",
      "INTERVIEW",
      "OFFER",
      "REJECTED",
    ])
    .optional(),
})

export const eventSchema = z.object({
  type: z.string().min(1, "Type is required"),
  note: z.string().optional(),
})

export const userSchema = z.object({
  email: z.string().email("Invalid email"),
  name: z.string().optional(),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export const criteriaSchema = z.object({
  label: z.string().min(1, "Label is required"),
  keywords: z.array(z.string()).min(1, "At least one keyword is required"),
  notifyEmail: z.string().email("Invalid email"),
  intervalDays: z.number().int().positive(),
})
