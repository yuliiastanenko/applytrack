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
    <div>
      <h1>Applications</h1>

      <form>
        <input
          name="search"
          placeholder="Search company"
          defaultValue={search}
        />
        <select name="status" defaultValue={status}>
          <option value="">All statuses</option>
          <option value="WISHLIST">Wishlist</option>
          <option value="APPLIED">Applied</option>
          <option value="SCREENING">Screening</option>
          <option value="INTERVIEW">Interview</option>
          <option value="OFFER">Offer</option>
          <option value="REJECTED">Rejected</option>
        </select>
        <button type="submit">Filter</button>
      </form>

      <NewApplicationForm />

      <ul>
        {applications.map((app) => (
          <li key={app.id}>
            <Link href={`/applications/${app.id}`}>
              {app.company} — {app.position}
            </Link>{" "}
            <StatusButton id={app.id} currentStatus={app.status} />{" "}
            <DeleteButton id={app.id} />
          </li>
        ))}
      </ul>
    </div>
  )
}
