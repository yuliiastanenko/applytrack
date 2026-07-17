import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await request.json()

  const listing = await db.jobListing.update({
    where: { id },
    data: body,
  })

  return NextResponse.json(listing)
}
