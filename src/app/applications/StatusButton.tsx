"use client"

import { useRouter } from "next/navigation"
import { statusColors } from "@/lib/statusColors"

const statuses = [
  "WISHLIST",
  "APPLIED",
  "SCREENING",
  "INTERVIEW",
  "OFFER",
  "REJECTED",
]

export default function StatusButton({ id, currentStatus }) {
  const router = useRouter()

  const handleChange = async (event) => {
    await fetch(`/api/applications/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: event.target.value }),
    })
    router.refresh()
  }

  return (
    <select
      value={currentStatus}
      onChange={handleChange}
      className={`rounded-full pl-3 pr-8 py-1 text-xs font-medium border-0 ${statusColors[currentStatus]?.badge ?? "bg-gray-100 text-gray-700"}`}
    >
      {statuses.map((status) => (
        <option key={status} value={status} className="bg-white text-black">
          {status}
        </option>
      ))}
    </select>
  )
}
