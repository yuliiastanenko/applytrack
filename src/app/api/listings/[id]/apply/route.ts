import { db } from "@/lib/db"
import { getCurrentUserId } from "@/lib/auth"
import { NextResponse } from "next/server"

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const userId = await getCurrentUserId()

  const listing = await db.jobListing.findUnique({ where: { id } })

  if (!listing) {
    return NextResponse.json({ error: "Listing not found" }, { status: 404 })
  }

  const application = await db.application.create({
    data: {
      company: listing.company,
      position: listing.title,
      status: "WISHLIST",
      userId,
    },
  })

  await db.jobListing.update({
    where: { id },
    data: {
      seen: true,
      applicationId: application.id,
    },
  })

  return NextResponse.json(application)
}
