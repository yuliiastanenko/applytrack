import { remotive } from "@/lib/sources/remotive"
import { arbeitnow } from "@/lib/sources/arbeitnow"
import { db } from "@/lib/db"
import { getCurrentUserId } from "@/lib/auth"
import { NextResponse } from "next/server"

const sources = [remotive, arbeitnow]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const tagsParam = searchParams.get("tags")
  const userId = await getCurrentUserId()
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const criteriaToRun = tagsParam
    ? [
        {
          id: null as string | null,
          keywords: tagsParam.split(",").filter(Boolean),
        },
      ]
    : await db.searchCriteria.findMany({ where: { userId } })

  let totalFound = 0

  for (const criterion of criteriaToRun) {
    if (criterion.id) {
      await db.jobListing.deleteMany({
        where: { criteriaId: criterion.id, applicationId: null },
      })
    }
    for (const source of sources) {
      const jobs = await source.fetchJobs(criterion.keywords)
      console.log(
        `${source.name}: found ${jobs.length} jobs for keywords`,
        criterion.keywords
      )

      for (const job of jobs) {
        console.log("saving job:", job.source, job.externalId)
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
  }

  return NextResponse.json({
    criteriaChecked: criteriaToRun.length,
    jobsFound: totalFound,
  })
}
