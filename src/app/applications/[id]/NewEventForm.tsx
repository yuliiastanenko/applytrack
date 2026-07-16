"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

const eventTypes = [
  "APPLIED",
  "SCREENING_CALL",
  "TECH_INTERVIEW",
  "FINAL_INTERVIEW",
  "OFFER",
  "REJECTION",
  "FOLLOW_UP",
]

export default function NewEventForm({ applicationId }: { applicationId: string }) {
  const [type, setType] = useState(eventTypes[0])
  const [note, setNote] = useState("")
  const router = useRouter()

  const handleSubmit = async (event) => {
    event.preventDefault()

    await fetch(`/api/applications/${applicationId}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, note }),
    })

    setNote("")
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit}>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        {eventTypes.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Note (optional)"
      />
      <button type="submit">Add event</button>
    </form>
  )
}