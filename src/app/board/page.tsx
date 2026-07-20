import { db } from "@/lib/db"
import { getCurrentUserId } from "@/lib/auth"
import BoardClient from "./BoardClient"

export default async function Board() {
  const userId = await getCurrentUserId()
  const applications = await db.application.findMany({ where: { userId } })

  return (
    <div className="w-175 mx-auto px-6 py-6">
      <h1 className="text-2xl font-semibold mb-4">Board</h1>
      <div className="w-screen relative left-1/2 -translate-x-1/2 px-16">
        <BoardClient initialApplications={applications} />
      </div>
    </div>
  )
}
