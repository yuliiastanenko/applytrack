import type { JobSource, NormalizedJob } from "./types"

type RemotiveJob = {
  id: number
  title: string
  company_name: string
  url: string
  candidate_required_location?: string
  description?: string
}

export const remotive: JobSource = {
  name: "remotive",

  async fetchJobs(keywords: string[]): Promise<NormalizedJob[]> {
    const query = keywords.join(" ")
    const response = await fetch(
      `https://remotive.com/api/remote-jobs?search=${encodeURIComponent(query)}`
    )

    if (!response.ok) {
      return []
    }

    const data = await response.json()

    const jobs = data.jobs.map((job: RemotiveJob) => ({
      externalId: String(job.id),
      source: "remotive",
      title: job.title,
      company: job.company_name,
      url: job.url,
      location: job.candidate_required_location ?? null,
      description: job.description ?? null,
    }))

    return jobs.filter((job) =>
      keywords.every((keyword) =>
        job.title.toLowerCase().includes(keyword.toLowerCase())
      )
    )
  },
}
