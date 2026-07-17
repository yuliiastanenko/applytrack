export const statusColors: Record<string, { badge: string; border: string }> = {
  WISHLIST: { badge: "bg-gray-100 text-gray-700", border: "border-gray-400" },
  APPLIED: { badge: "bg-blue-100 text-blue-700", border: "border-blue-400" },
  SCREENING: {
    badge: "bg-purple-100 text-purple-700",
    border: "border-purple-400",
  },
  INTERVIEW: {
    badge: "bg-amber-100 text-amber-700",
    border: "border-amber-400",
  },
  OFFER: { badge: "bg-green-100 text-green-700", border: "border-green-400" },
  REJECTED: { badge: "bg-red-100 text-red-700", border: "border-red-400" },
}

export const eventColors: Record<string, string> = {
  APPLIED: "border-blue-400",
  SCREENING_CALL: "border-purple-400",
  TECH_INTERVIEW: "border-amber-400",
  FINAL_INTERVIEW: "border-amber-400",
  OFFER: "border-green-400",
  REJECTION: "border-red-400",
  FOLLOW_UP: "border-gray-400",
}
