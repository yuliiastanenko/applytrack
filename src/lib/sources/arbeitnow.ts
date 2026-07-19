import type { JobSource, NormalizedJob } from "./types"

type ArbeitnowJob = {
  slug: string
  title: string
  company_name: string
  url: string
  location?: string
  description?: string
}

export const arbeitnow: JobSource = {
  name: "arbeitnow",

  async fetchJobs(keywords: string[]): Promise<NormalizedJob[]> {
    const response = await fetch("https://www.arbeitnow.com/api/job-board-api")

    if (!response.ok) {
      return []
    }

    const data = await response.json()

    const jobs = data.data.map((job: ArbeitnowJob) => ({
      externalId: job.slug,
      source: "arbeitnow",
      title: job.title,
      company: job.company_name,
      url: job.url,
      location: job.location ?? null,
      description: job.description ?? null,
    }))

    return jobs.filter((job: NormalizedJob) =>
      keywords.some(
        (keyword) =>
          job.title.toLowerCase().includes(keyword.toLowerCase()) ||
          (job.description ?? "").toLowerCase().includes(keyword.toLowerCase())
      )
    )
  },
}
