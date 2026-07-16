import { db } from '@/lib/db'
import StatusButton from '../StatusButton'
import NewEventForm from './NewEventForm'

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
    <div>
      <h1>{application.company} — {application.position}</h1>
      <StatusButton id={application.id} currentStatus={application.status} />

      <h2>Timeline</h2>
      <ul>
        {application.events.map((event) => (
          <li key={event.id}>
            {event.type} — {new Date(event.date).toLocaleDateString()}
            {event.note ? ` — ${event.note}` : ''}
          </li>
        ))}
      </ul>
      <NewEventForm applicationId={application.id} />
    </div>
  )
}