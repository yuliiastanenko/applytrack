export type NormalizedJob = {
  externalId: string
  source: string
  title: string
  company: string
  url: string
  location: string | null
  description: string | null
}

export interface JobSource {
  name: string
  fetchJobs(keywords: string[]): Promise<NormalizedJob[]>
}
