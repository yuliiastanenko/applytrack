import { db } from "@/lib/db"
import { getCurrentUserId } from "@/lib/auth"
import WeeklyChart from "./WeeklyChart"

export default async function Dashboard() {
  const userId = await getCurrentUserId()
  const applications = await db.application.findMany({ where: { userId } })

  const total = applications.length
  const applied = applications.filter((a) => a.status !== "WISHLIST").length
  const interviews = applications.filter((a) =>
    ["INTERVIEW", "OFFER"].includes(a.status)
  ).length
  const responseRate = applied > 0 ? Math.round((interviews / applied) * 100) : 0

  const now = new Date()
  const overdueFollowUps = applications.filter(
    (a) => a.followUpAt && a.followUpAt < now
  ).length

  const weeklyData = getWeeklyCounts(applications)

  return (
    <div className="w-[1000px] mx-auto px-6 py-6">
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>

      <div className="grid grid-cols-4 gap-3 mb-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-xs text-gray-500 mb-1">Applied</p>
          <p className="text-2xl font-semibold">{applied}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-xs text-gray-500 mb-1">Interviews</p>
          <p className="text-2xl font-semibold">{interviews}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-xs text-gray-500 mb-1">Response rate</p>
          <p className="text-2xl font-semibold">{responseRate}%</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-xs text-gray-500 mb-1">Follow-ups due</p>
          <p className="text-2xl font-semibold text-amber-600">{overdueFollowUps}</p>
        </div>
      </div>

      <WeeklyChart data={weeklyData} />
    </div>
  )
}

function getWeeklyCounts(applications: { createdAt: Date }[]) {
  const counts: Record<string, number> = {}

  for (const app of applications) {
    const weekStart = new Date(app.createdAt)
    weekStart.setDate(weekStart.getDate() - weekStart.getDay())
    const key = weekStart.toISOString().slice(0, 10)
    counts[key] = (counts[key] ?? 0) + 1
  }

  return Object.entries(counts)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([week, count]) => ({ week, count }))
}