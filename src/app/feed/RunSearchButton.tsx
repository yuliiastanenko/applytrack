"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

export default function RunSearchButton() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const tags = searchParams.get("tags")

  const handleClick = async () => {
    setLoading(true)
    const url = tags
      ? `/api/search-jobs?tags=${encodeURIComponent(tags)}`
      : "/api/search-jobs"
    await fetch(url)
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
