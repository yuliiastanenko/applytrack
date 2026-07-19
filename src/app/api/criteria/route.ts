import { db } from "@/lib/db"
import { getCurrentUserId } from "@/lib/auth"
import { NextResponse } from "next/server"
import { criteriaSchema } from "@/lib/validations"

export async function GET() {
  const userId = await getCurrentUserId()
  const criteria = await db.searchCriteria.findMany({ where: { userId } })
  return NextResponse.json(criteria)
}

export async function POST(request: Request) {
  const body = await request.json()
  const userId = await getCurrentUserId()

  const result = criteriaSchema.safeParse(body)
  if (!result.success) {
    return NextResponse.json({ error: result.error.flatten() }, { status: 400 })
  }

  const criteria = await db.searchCriteria.create({
    data: {
      label: result.data.label,
      keywords: result.data.keywords,
      notifyEmail: result.data.notifyEmail,
      intervalDays: result.data.intervalDays,
      userId,
    },
  })

  return NextResponse.json(criteria)
}
