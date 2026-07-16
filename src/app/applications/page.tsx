import { db } from '@/lib/db'
import { getCurrentUserId } from '@/lib/auth'
import NewApplicationForm from './NewApplicationForm'
import StatusButton from './StatusButton'
import DeleteButton from './DeleteButton'

export default async function Applications() {
  const userId = await getCurrentUserId()
  const applications = await db.application.findMany({ where: { userId } })

  return (
    <div>
      <h1>Applications</h1>
      <NewApplicationForm />
      <ul>
        {applications.map((app) => (
          <li key={app.id}>
            {app.company} — {app.position} <StatusButton id={app.id} currentStatus={app.status} /> <DeleteButton id={app.id} />
          </li>
        ))}
      </ul>
    </div>
  )
}