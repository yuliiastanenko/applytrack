"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function NewApplicationForm() {
  const [company, setCompany] = useState("")
  const [position, setPosition] = useState("")
  const router = useRouter()

  const handleSubmit = async (event) => {
    event.preventDefault()

    await fetch("/api/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ company, position }),
    })

    setCompany("")
    setPosition("")
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        placeholder="Company"
      />
      <input
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        placeholder="Position"
      />
      <button type="submit">Add</button>
    </form>
  )
}