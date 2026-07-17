import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const application = await db.application.findUnique({ where: { id } })
  return NextResponse.json(application)
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await request.json()
  const application = await db.application.update({
    where: { id },
    data: body,
  })
  return NextResponse.json(application)
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  await db.application.delete({ where: { id } })
  return NextResponse.json({ deleted: true })
}
