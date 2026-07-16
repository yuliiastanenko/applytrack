"use client"

import { useRouter } from "next/navigation"

const statuses = ["WISHLIST", "APPLIED", "SCREENING", "INTERVIEW", "OFFER", "REJECTED"]

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
    <select value={currentStatus} onChange={handleChange}>
      {statuses.map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </select>
  )
}