import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await request.json()

  const event = await db.event.create({
    data: {
      type: body.type,
      note: body.note,
      applicationId: id,
    },
  })

  return NextResponse.json(event)
}