import { db } from "@/lib/db"
import { getCurrentUserId } from "@/lib/auth"
import AddToTrackerButton from "./AddToTrackerButton"
import DismissButton from "./DismissButton"
import RunSearchButton from "./RunSearchButton"

export default async function Feed() {
  const userId = await getCurrentUserId()

  const listings = await db.jobListing.findMany({
    where: { userId, dismissed: false },
    orderBy: { fetchedAt: "desc" },
    take: 20,
  })

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">New matches</h1>
      <RunSearchButton />

      {listings.length === 0 ? (
        <p className="text-gray-500 text-sm">
          No new matches yet. Make sure you have active search criteria, then
          run a search.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {listings.map((job) => (
            <div
              key={job.id}
              className="border border-gray-200 rounded-xl p-4 flex items-center justify-between gap-4"
            >
              <div className="min-w-0">
                <p className="font-medium truncate">{job.title}</p>
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
