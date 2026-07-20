"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function NewApplicationForm() {
  const [company, setCompany] = useState("")
  const [position, setPosition] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError("")

    const res = await fetch("/api/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ company, position }),
    })

    if (!res.ok) {
      setError("Please fill in both company and position.")
      return
    }

    setCompany("")
    setPosition("")
    router.refresh()
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <input
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Company"
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm flex-1"
        />
        <input
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          placeholder="Position"
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm flex-1"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-lg px-4 py-2 text-sm"
        >
          Add
        </button>
      </form>
      {error && <p className="text-red-500 text-sm -mt-4 mb-4">{error}</p>}
    </div>
  )
}
