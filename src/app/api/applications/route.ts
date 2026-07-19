import { db } from "@/lib/db"
import { NextResponse } from "next/server"
import { getCurrentUserId } from "@/lib/auth"
import { applicationSchema } from "@/lib/validations"

export async function GET(request: Request) {
  const userId = await getCurrentUserId()
  const { searchParams } = new URL(request.url)
  const status = searchParams.get("status")
  const search = searchParams.get("search")

  const applications = await db.application.findMany({
    where: {
      userId,
      ...(status ? { status } : {}),
      ...(search ? { company: { contains: search, mode: "insensitive" } } : {}),
    },
  })

  return NextResponse.json(applications)
}

export async function POST(request: Request) {
  const body = await request.json()
  const userId = await getCurrentUserId()

  const result = applicationSchema.safeParse(body)

  if (!result.success) {
    return NextResponse.json({ error: result.error.flatten() }, { status: 400 })
  }

  const application = await db.application.create({
    data: {
      company: result.data.company,
      position: result.data.position,
      userId,
    },
  })

  return NextResponse.json(application)
}
