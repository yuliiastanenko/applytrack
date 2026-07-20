"use client"

import { useRouter } from "next/navigation"

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter()

  const handleDelete = async () => {
    await fetch(`/api/applications/${id}`, { method: "DELETE" })
    router.refresh()
  }

  return (
    <button
      onClick={handleDelete}
      className="text-red-500 text-sm hover:text-red-700"
    >
      Delete
    </button>
  )
}
