import { db } from "@/lib/db"
import { getCurrentUserId } from "@/lib/auth"
import { NextResponse } from "next/server"

export async function GET() {
  const userId = await getCurrentUserId()
  const criteria = await db.searchCriteria.findMany({ where: { userId } })
  return NextResponse.json(criteria)
}

export async function POST(request: Request) {
  const body = await request.json()
  const userId = await getCurrentUserId()

  const criteria = await db.searchCriteria.create({
    data: {
      label: body.label,
      keywords: body.keywords,
      notifyEmail: body.notifyEmail,
      intervalDays: body.intervalDays,
      userId,
    },
  })

  return NextResponse.json(criteria)
}
