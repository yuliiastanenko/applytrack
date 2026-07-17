import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const body = await request.json()

  const user = await db.user.create({
    data: {
      email: body.email,
      name: body.name,
      password: body.password,
    },
  })

  return NextResponse.json(user)
}
