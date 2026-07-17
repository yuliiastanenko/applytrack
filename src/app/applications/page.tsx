import { db } from "@/lib/db"
import { getCurrentUserId } from "@/lib/auth"
import NewApplicationForm from "./NewApplicationForm"
import StatusButton from "./StatusButton"
import DeleteButton from "./DeleteButton"
import Link from "next/link"

export default async function Applications({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; search?: string }>
}) {
  const { status, search } = await searchParams
  const userId = await getCurrentUserId()

  const applications = await db.application.findMany({
    where: {
      userId,
      ...(status ? { status } : {}),
      ...(search ? { company: { contains: search, mode: "insensitive" } } : {}),
    },
  })

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Applications</h1>

      <form className="flex gap-2 mb-4">
        <input
          name="search"
          placeholder="Search company"
          defaultValue={search}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm flex-1"
        />
        <select
          name="status"
          defaultValue={status}
          className="border border-gray-300 rounded-lg pl-3 pr-8 py-2 text-sm"
        >
          <option value="">All statuses</option>
          <option value="WISHLIST">Wishlist</option>
          <option value="APPLIED">Applied</option>
          <option value="SCREENING">Screening</option>
          <option value="INTERVIEW">Interview</option>
          <option value="OFFER">Offer</option>
          <option value="REJECTED">Rejected</option>
        </select>
        <button className="border border-gray-300 rounded-lg px-4 py-2 text-sm">
          Filter
        </button>
      </form>

      <NewApplicationForm />

      <div className="flex flex-col gap-3 mt-4">
        {applications.map((app) => (
          <div
            key={app.id}
            className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4"
          >
            <Link href={`/applications/${app.id}`} className="text-sm">
              <p className="font-medium">{app.company}</p>
              <p className="text-gray-500">{app.position}</p>
            </Link>
            <div className="flex items-center gap-2">
              <StatusButton id={app.id} currentStatus={app.status} />
              <DeleteButton id={app.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
