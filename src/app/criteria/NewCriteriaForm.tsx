"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function NewCriteriaForm() {
  const [label, setLabel] = useState("")
  const [keywords, setKeywords] = useState("")
  const router = useRouter()

  const handleSubmit = async (event) => {
    event.preventDefault()

    await fetch("/api/criteria", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        label,
        keywords: keywords.split(",").map((k) => k.trim()),
      }),
    })

    setLabel("")
    setKeywords("")
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        placeholder="Label (e.g. Junior React Remote)"
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm flex-1"
      />
      <input
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
        placeholder="Keywords, comma separated"
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm flex-1"
      />
      <button className="bg-black text-white rounded-lg px-4 py-2 text-sm">
        Add
      </button>
    </form>
  )
}
