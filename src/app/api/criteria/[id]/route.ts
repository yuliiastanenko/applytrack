import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  await db.searchCriteria.delete({ where: { id } })
  return NextResponse.json({ deleted: true })
}
