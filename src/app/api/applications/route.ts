import { db } from '@/lib/db'
import { NextResponse } from 'next/server'
import { getCurrentUserId } from '@/lib/auth'

export async function GET() {
  const applications = await db.application.findMany()
  return NextResponse.json(applications)
}

export async function POST(request: Request) {
  const body = await request.json()
  const userId = await getCurrentUserId()

  const application = await db.application.create({
    data: {
      company: body.company,
      position: body.position,
      userId,
    },
  })

  return NextResponse.json(application)
}