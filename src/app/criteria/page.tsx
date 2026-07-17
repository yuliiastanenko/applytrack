import { db } from "@/lib/db"
import { getCurrentUserId } from "@/lib/auth"
import NewCriteriaForm from "./NewCriteriaForm"
import DeleteCriteriaButton from "./DeleteCriteriaButton"

export default async function Criteria() {
  const userId = await getCurrentUserId()
  const criteria = await db.searchCriteria.findMany({ where: { userId } })

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Search criteria</h1>
      <NewCriteriaForm />
      <div className="flex flex-col gap-2 mt-4">
        {criteria.map((c) => (
          <div
            key={c.id}
            className="border border-gray-200 rounded-xl p-4 flex items-center justify-between"
          >
            <div>
              <p className="font-medium">{c.label}</p>
              <p className="text-sm text-gray-500">{c.keywords.join(", ")}</p>
            </div>
            <DeleteCriteriaButton id={c.id} />
          </div>
        ))}
      </div>
    </div>
  )
}
