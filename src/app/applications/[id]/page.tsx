import { db } from "@/lib/db"
import StatusButton from "../StatusButton"
import NewEventForm from "./NewEventForm"
import { eventColors } from "@/lib/statusColors"

export default async function ApplicationDetail({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const application = await db.application.findUnique({
    where: { id },
    include: { events: true },
  })

  if (!application) {
    return <p>Application not found</p>
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">{application.company}</h1>
          <p className="text-gray-500">{application.position}</p>
        </div>
        <StatusButton id={application.id} currentStatus={application.status} />
      </div>

      <h2 className="text-sm font-medium text-gray-500 uppercase mb-3">
        Timeline
      </h2>
      <div className="flex flex-col gap-3 mb-6">
        {application.events.map((event) => (
          <div
            key={event.id}
            className={`border-l-2 pl-4 py-1 ${eventColors[event.type] ?? "border-gray-400"}`}
          >
            <p className="text-sm font-medium">{event.type}</p>
            <p className="text-xs text-gray-500">
              {new Date(event.date).toLocaleDateString()}
            </p>
            {event.note && (
              <p className="text-sm text-gray-700 mt-1">{event.note}</p>
            )}
          </div>
        ))}
      </div>

      <NewEventForm applicationId={application.id} />
    </div>
  )
}
