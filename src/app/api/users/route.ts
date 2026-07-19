import { db } from "@/lib/db"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { userSchema } from "@/lib/validations"

export async function POST(request: Request) {
  const body = await request.json()

  const result = userSchema.safeParse(body)
  if (!result.success) {
    return NextResponse.json({ error: result.error.flatten() }, { status: 400 })
  }

  const existing = await db.user.findUnique({
    where: { email: result.data.email },
  })
  if (existing) {
    return NextResponse.json(
      { error: "Email already registered" },
      { status: 409 }
    )
  }

  const hashedPassword = await bcrypt.hash(result.data.password, 10)

  const user = await db.user.create({
    data: {
      email: result.data.email,
      name: result.data.name,
      password: hashedPassword,
    },
  })

  return NextResponse.json({ id: user.id, email: user.email })
}
