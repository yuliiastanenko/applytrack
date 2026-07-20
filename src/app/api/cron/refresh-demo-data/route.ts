import { db } from "@/lib/db"
import { NextResponse } from "next/server"

const DEMO_USER_ID = "cmrrzom9v0000kgt9pazqfqn9"

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization")
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const applications = await db.application.findMany({
    where: { userId: DEMO_USER_ID },
  })

  const now = new Date()
  const currentWeekMonday = new Date(now)
  const day = currentWeekMonday.getDay()
  const diffToMonday = day === 0 ? -6 : 1 - day
  currentWeekMonday.setDate(currentWeekMonday.getDate() + diffToMonday)
  currentWeekMonday.setHours(0, 0, 0, 0)

  let updated = 0

  for (const app of applications) {
    const original = new Date(app.createdAt)
    const originalDay = original.getDay()

    const newDate = new Date(currentWeekMonday)
    const dayOffset = (originalDay === 0 ? 6 : originalDay - 1)
    newDate.setDate(currentWeekMonday.getDate() + dayOffset)
    newDate.setHours(original.getHours(), original.getMinutes(), original.getSeconds())

    await db.application.update({
      where: { id: app.id },
      data: { createdAt: newDate },
    })

    updated++
  }

  return NextResponse.json({ updated })
}