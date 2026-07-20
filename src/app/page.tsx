import { db } from "@/lib/db"
import { getCurrentUserId } from "@/lib/auth"
import WeeklyChart from "./WeeklyChart"

export default async function Dashboard({
  searchParams,
}: {
  searchParams: Promise<{ week?: string }>
}) {
  const { week } = await searchParams
  const weekOffset = week ? parseInt(week) : 0

  const userId = await getCurrentUserId()
  const applications = await db.application.findMany({ where: { userId } })

  const applied = applications.filter((a) => a.status !== "WISHLIST").length
  const interviews = applications.filter((a) =>
    ["INTERVIEW", "OFFER"].includes(a.status)
  ).length
  const responseRate =
    applied > 0 ? Math.round((interviews / applied) * 100) : 0

  const now = new Date()
  const overdueFollowUps = applications.filter(
    (a) => a.followUpAt && a.followUpAt < now
  ).length

  const appliedOnly = applications.filter((a) => a.status !== "WISHLIST")
  const { days, weekStart } = getDailyCountsForWeek(appliedOnly, weekOffset)

  return (
    <div className="w-175 mx-auto px-6 py-6">
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>

      <div className="grid grid-cols-4 gap-3 mb-6">
        <div className="bg-green-100 rounded-lg p-4">
          <p className="text-xs text-gray-500 mb-1">Applied</p>
          <p className="text-2xl font-semibold">{applied}</p>
        </div>
        <div className="bg-yellow-100 rounded-lg p-4">
          <p className="text-xs text-gray-500 mb-1">Interviews</p>
          <p className="text-2xl font-semibold">{interviews}</p>
        </div>
        <div className="bg-red-100 rounded-lg p-4">
          <p className="text-xs text-gray-500 mb-1">Response rate</p>
          <p className="text-2xl font-semibold">{responseRate}%</p>
        </div>
        <div className="bg-blue-100 rounded-lg p-4">
          <p className="text-xs text-gray-500 mb-1">Follow-ups due</p>
          <p className="text-2xl font-semibold text-amber-600">
            {overdueFollowUps}
          </p>
        </div>
      </div>

      <WeeklyChart data={days} weekOffset={weekOffset} weekStart={weekStart} />
    </div>
  )
}

function getDailyCountsForWeek(
  applications: { createdAt: Date }[],
  weekOffset: number
) {
  const now = new Date()
  const currentWeekStart = new Date(now)
  currentWeekStart.setDate(now.getDate() - now.getDay() + weekOffset * 7)
  currentWeekStart.setHours(0, 0, 0, 0)

  const days = []
  for (let i = 0; i < 7; i++) {
    const day = new Date(currentWeekStart)
    day.setDate(currentWeekStart.getDate() + i)

    const count = applications.filter((app) => {
      const created = new Date(app.createdAt)
      return (
        created.getFullYear() === day.getFullYear() &&
        created.getMonth() === day.getMonth() &&
        created.getDate() === day.getDate()
      )
    }).length

    days.push({
      day: day.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      }),
      count,
    })
  }

  return { days, weekStart: currentWeekStart }
}
