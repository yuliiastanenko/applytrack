"use client"

import { useRouter } from "next/navigation"

export default function AddToTrackerButton({ jobId }: { jobId: string }) {
  const router = useRouter()

  const handleClick = async () => {
    await fetch(`/api/listings/${jobId}/apply`, { method: "POST" })
    router.refresh()
  }

  return (
    <button
      onClick={handleClick}
      className="bg-blue-500 text-white rounded-lg px-3 py-1.5 text-sm whitespace-nowrap"
    >
      Add
    </button>
  )
}
