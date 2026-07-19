import { db } from "@/lib/db"
import { sendDigestEmail } from "@/lib/email"
import { remotive } from "@/lib/sources/remotive"
import { arbeitnow } from "@/lib/sources/arbeitnow"
import { NextResponse } from "next/server"

const sources = [remotive, arbeitnow]

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization")
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const allCriteria = await db.searchCriteria.findMany()
  let emailsSent = 0

  for (const criterion of allCriteria) {
    const daysSinceLastSent = criterion.lastSentAt
      ? (Date.now() - criterion.lastSentAt.getTime()) / (1000 * 60 * 60 * 24)
      : Infinity

    if (daysSinceLastSent < criterion.intervalDays) {
      continue
    }

    for (const source of sources) {
      const foundJobs = await source.fetchJobs(criterion.keywords)

      const matchedJobs = foundJobs.filter((job) => {
        const titleMatch = job.title
          .toLowerCase()
          .includes(criterion.label.toLowerCase())
        const keywordsMatch = criterion.keywords.every((kw) =>
          (job.description ?? "").toLowerCase().includes(kw.toLowerCase())
        )
        return titleMatch && keywordsMatch
      })

      for (const job of matchedJobs) {
        await db.jobListing.upsert({
          where: {
            userId_source_externalId: {
              userId: criterion.userId,
              source: job.source,
              externalId: job.externalId,
            },
          },
          update: {},
          create: {
            userId: criterion.userId,
            criteriaId: criterion.id,
            source: job.source,
            externalId: job.externalId,
            title: job.title,
            company: job.company,
            url: job.url,
            location: job.location,
            description: job.description,
          },
        })
      }
    }

    const jobsForEmail = await db.jobListing.findMany({
      where: { criteriaId: criterion.id, seen: false, dismissed: false },
      take: 10,
    })

    await sendDigestEmail(criterion.notifyEmail, criterion.label, jobsForEmail)

    await db.searchCriteria.update({
      where: { id: criterion.id },
      data: { lastSentAt: new Date() },
    })

    await db.digestLog.create({
      data: {
        criteriaId: criterion.id,
        jobCount: jobsForEmail.length,
        status: "sent",
      },
    })

    emailsSent++
  }

  return NextResponse.json({ emailsSent })
}
