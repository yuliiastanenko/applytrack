"use client"

import { useRouter } from "next/navigation"

export default function DeleteButton({ id }) {
  const router = useRouter()

  const handleDelete = async () => {
    await fetch(`/api/applications/${id}`, { method: "DELETE" })
    router.refresh()
  }

  return <button onClick={handleDelete}>Delete</button>
}