"use client"

import { useState } from "react"
import {
  DndContext,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
  PointerSensor,
  DragEndEvent,
} from "@dnd-kit/core"
import { statusColors } from "@/lib/statusColors"
import Link from "next/link"

type Application = {
  id: string
  company: string
  position: string
  status: string
}

const statuses = [
  "WISHLIST",
  "APPLIED",
  "SCREENING",
  "INTERVIEW",
  "OFFER",
  "REJECTED",
]

function Card({ app }: { app: Application }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: app.id,
  })

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)`, zIndex: 10 }
    : undefined

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="bg-white border border-gray-200 rounded-lg p-3 mb-2 cursor-grab text-sm"
    >
      <Link href={`/applications/${app.id}`} className="block">
        <p className="font-medium wrap-break-word">{app.company}</p>
        <p className="text-gray-500 wrap-break-word">{app.position}</p>
      </Link>
    </div>
  )
}

function Column({ status, apps }: { status: string; apps: Application[] }) {
  const { setNodeRef, isOver } = useDroppable({ id: status })
  const colors = statusColors[status]?.badge ?? "bg-gray-100 text-gray-700"

  return (
    <div
      ref={setNodeRef}
      className={`flex-1 min-w-45 max-w-55 rounded-xl p-3 ${isOver ? "ring-2 ring-blue-400" : ""} ${colors}`}
    >
      <p className="text-xs font-medium uppercase mb-2 opacity-70">{status}</p>
      {apps.map((app) => (
        <Card key={app.id} app={app} />
      ))}
    </div>
  )
}

export default function BoardClient({
  initialApplications,
}: {
  initialApplications: Application[]
}) {
  const [applications, setApplications] = useState(initialApplications)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  )

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    if (!over) return

    const newStatus = over.id as string
    const appId = active.id as string

    setApplications((prev) =>
      prev.map((app) =>
        app.id === appId ? { ...app, status: newStatus } : app
      )
    )

    await fetch(`/api/applications/${appId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    })
  }

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="flex gap-3 overflow-x-auto">
        {statuses.map((status) => (
          <Column
            key={status}
            status={status}
            apps={applications.filter((a) => a.status === status)}
          />
        ))}
      </div>
    </DndContext>
  )
}
