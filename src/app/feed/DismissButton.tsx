"use client"

import { useRouter } from "next/navigation"

export default function DismissButton({ jobId }: { jobId: string }) {
  const router = useRouter()

  const handleClick = async () => {
    await fetch(`/api/listings/${jobId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dismissed: true }),
    })
    router.refresh()
  }

  return (
    <button
      onClick={handleClick}
      className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm whitespace-nowrap"
    >
      Dismiss
    </button>
  )
}
