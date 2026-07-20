"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function FollowUpInput({
  applicationId,
  initialDate,
}: {
  applicationId: string
  initialDate: string
}) {
  const [date, setDate] = useState(initialDate)
  const router = useRouter()

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = event.target.value
    setDate(newDate)

    await fetch(`/api/applications/${applicationId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        followUpAt: newDate ? new Date(newDate).toISOString() : null,
      }),
    })

    router.refresh()
  }

  return (
    <div className="flex items-center gap-2 mb-4">
      <label className="text-sm text-gray-600">Follow-up date</label>
      <input
        type="date"
        value={date}
        onChange={handleChange}
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
      />
    </div>
  )
}
