import { db } from "@/lib/db"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
  const body = await request.json()

  const user = await db.user.findUnique({ where: { email: body.email } })

  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  }

  const passwordMatches = await bcrypt.compare(body.password, user.password)

  if (!passwordMatches) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  }

  const response = NextResponse.json({ success: true })
  response.cookies.set("userId", user.id)
  return response
}
