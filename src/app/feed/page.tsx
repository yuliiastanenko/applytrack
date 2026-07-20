import { db } from "@/lib/db"
import { getCurrentUserId } from "@/lib/auth"
import AddToTrackerButton from "./AddToTrackerButton"
import DismissButton from "./DismissButton"
import RunSearchButton from "./RunSearchButton"
import Link from "next/link"
import TagInput from "./TagInput"

export default async function Feed({
  searchParams,
}: {
  searchParams: Promise<{ source?: string; tags?: string }>
}) {
  const { source, tags } = await searchParams
  const keywordList = tags ? tags.split(",").filter(Boolean) : []
  const userId = await getCurrentUserId()

  const listings =
    keywordList.length > 0
      ? await db.jobListing.findMany({
          where: {
            userId,
            dismissed: false,
            ...(source ? { source } : {}),
            AND: keywordList.map((kw) => ({
              OR: [
                { title: { contains: kw, mode: "insensitive" as const } },
                { description: { contains: kw, mode: "insensitive" as const } },
              ],
            })),
          },
          orderBy: { fetchedAt: "desc" },
          take: 20,
        })
      : []

  return (
    <div className="w-175 mx-auto px-6 py-6">
      <h1 className="text-2xl font-semibold mb-4">New matches</h1>
      <TagInput />
      <RunSearchButton />

      <div className="flex gap-2 mb-4">
        <Link
          href={tags ? `/feed?tags=${encodeURIComponent(tags)}` : "/feed"}
          className={`text-sm px-3 py-1.5 rounded-lg border ${!source ? "bg-green-400 text-white border-green" : "border-gray-300"}`}
        >
          All
        </Link>
        <Link
          href={`/feed?source=remotive${tags ? `&tags=${encodeURIComponent(tags)}` : ""}`}
          className={`text-sm px-3 py-1.5 rounded-lg border ${source === "remotive" ? "bg-red-400 text-white border-red" : "border-gray-300"}`}
        >
          Remotive
        </Link>
        <Link
          href={`/feed?source=arbeitnow${tags ? `&tags=${encodeURIComponent(tags)}` : ""}`}
          className={`text-sm px-3 py-1.5 rounded-lg border ${source === "arbeitnow" ? "bg-yellow-400 text-white border-yellow" : "border-gray-300"}`}
        >
          Arbeitnow
        </Link>
      </div>

      {listings.length === 0 ? (
        <p className="text-gray-500 text-sm">
          {keywordList.length === 0
            ? "Enter a keyword to search for jobs."
            : "No matches for these keywords yet. Try Search now, or adjust your tags."}
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {listings.map((job) => (
            <div
              key={job.id}
              className="border border-gray-200 rounded-xl p-4 flex items-center justify-between gap-4"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                    {job.source}
                  </span>
                </div>
                <a
                  href={job.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium truncate hover:underline block"
                >
                  {job.title}
                </a>
                <p className="text-sm text-gray-500 truncate">
                  {job.company} · {job.location ?? "—"}
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <DismissButton jobId={job.id} />
                <AddToTrackerButton jobId={job.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
