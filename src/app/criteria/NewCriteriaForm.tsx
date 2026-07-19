"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function NewCriteriaForm() {
  const [label, setLabel] = useState("")
  const [keywords, setKeywords] = useState("")
  const [email, setEmail] = useState("")
  const [intervalDays, setIntervalDays] = useState("3")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError("")

    const res = await fetch("/api/criteria", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        label,
        keywords: keywords.split(",").map((k) => k.trim()),
        notifyEmail: email,
        intervalDays: Number(intervalDays),
      }),
    })

    if (!res.ok) {
      setError("Please fill in all fields correctly.")
      return
    }

    setLabel("")
    setKeywords("")
    setEmail("")
    setIntervalDays("3")
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-4">
      <input
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        placeholder="Label (e.g. Junior React Remote)"
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
      />
      <input
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
        placeholder="Keywords, comma separated"
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Email for notifications"
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
      />
      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-600">Check every</label>
        <input
          value={intervalDays}
          onChange={(e) => setIntervalDays(e.target.value)}
          type="number"
          min="1"
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-20"
        />
        <span className="text-sm text-gray-600">days</span>
      </div>
      <button
        type="submit"
        className="bg-black text-white rounded-lg px-4 py-2 text-sm self-start"
      >
        Add
      </button>
       {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  )
}
