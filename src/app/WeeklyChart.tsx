"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import Link from "next/link"

export default function WeeklyChart({
  data,
  weekOffset,
  weekStart,
}: {
  data: { day: string; count: number }[]
  weekOffset: number
  weekStart: Date
}) {
  const weekEnd = new Date(weekStart)
  weekEnd.setDate(weekStart.getDate() + 6)

  const weekLabel = `${weekStart.toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${weekEnd.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`

  return (
    <div className="bg-blue-50 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-gray-500">Applications {weekLabel}</p>
        <div className="flex gap-2">
          <Link
            href={`/?week=${weekOffset - 1}`}
            className="text-sm px-2 py-1 border border-gray-300 rounded-lg"
          >
            ← Prev
          </Link>
          <Link
            href={`/?week=${weekOffset + 1}`}
            className="text-sm px-2 py-1 border border-gray-300 rounded-lg"
          >
            Next →
          </Link>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="day" tick={{ fontSize: 12 }} />
          <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#000"
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
