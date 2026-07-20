"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export default function TagInput() {
  const [value, setValue] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()
  const tags = searchParams.get("tags")?.split(",").filter(Boolean) ?? []

  const addTag = () => {
    const trimmed = value.trim()
    if (!trimmed || tags.includes(trimmed)) return
    const newTags = [...tags, trimmed]
    setValue("")
    router.push(`/feed?tags=${encodeURIComponent(newTags.join(","))}`)
  }

  const removeTag = (tag: string) => {
    const newTags = tags.filter((t) => t !== tag)
    router.push(
      newTags.length > 0
        ? `/feed?tags=${encodeURIComponent(newTags.join(","))}`
        : "/feed"
    )
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault()
      addTag()
    }
  }

  return (
    <div className="mb-4">
      <div className="flex gap-2 mb-2">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add keyword (e.g. junior)"
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm flex-1"
        />
        <button
          onClick={addTag}
          className="bg-blue-500 text-white rounded-lg px-4 py-2 text-sm"
        >
          Add
        </button>
      </div>
      {tags.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 flex items-center gap-1"
            >
              #{tag}
              <button
                onClick={() => removeTag(tag)}
                className="text-blue-500 hover:text-blue-900"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
