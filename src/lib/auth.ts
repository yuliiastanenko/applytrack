import { cookies } from "next/headers"

export async function getCurrentUserId() {
  const cookieStore = await cookies()
  return cookieStore.get("userId")?.value
}
