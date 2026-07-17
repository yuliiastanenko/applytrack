import { remotive } from "@/lib/sources/remotive"
import { db } from "@/lib/db"
import { getCurrentUserId } from "@/lib/auth"
import { NextResponse } from "next/server"

export async function GET() {
  const userId = await getCurrentUserId()

  const activeCriteria = await db.searchCriteria.findMany({
    where: { userId },
  })

  let totalFound = 0

  for (const criterion of activeCriteria) {
    const jobs = await remotive.fetchJobs(criterion.keywords)

    for (const job of jobs) {
      await db.jobListing.upsert({
        where: {
          userId_source_externalId: {
            userId,
            source: job.source,
            externalId: job.externalId,
          },
        },
        update: {},
        create: {
          userId,
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
      totalFound++
    }
  }

  return NextResponse.json({
    criteriaChecked: activeCriteria.length,
    jobsFound: totalFound,
  })
}
