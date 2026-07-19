import { db } from "@/lib/db"
import { NextResponse } from "next/server"
import { eventSchema } from "@/lib/validations"

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await request.json()

  const result = eventSchema.safeParse(body)
  if (!result.success) {
    return NextResponse.json({ error: result.error.flatten() }, { status: 400 })
  }

  const event = await db.event.create({
    data: {
      type: result.data.type,
      note: result.data.note,
      applicationId: id,
    },
  })

  return NextResponse.json(event)
}
