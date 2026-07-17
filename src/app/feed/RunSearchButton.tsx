"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function RunSearchButton() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleClick = async () => {
    setLoading(true)
    await fetch("/api/search-jobs")
    setLoading(false)
    router.refresh()
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="border border-gray-300 rounded-lg px-4 py-2 text-sm mb-4"
    >
      {loading ? "Searching..." : "Search now"}
    </button>
  )
}
