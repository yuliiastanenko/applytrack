export type Listing = {
  userId: string
  source: string
  externalId: string
}

export function isDuplicate(existing: Listing[], candidate: Listing): boolean {
  return existing.some(
    (item) =>
      item.userId === candidate.userId &&
      item.source === candidate.source &&
      item.externalId === candidate.externalId
  )
}

export function deduplicateListings(listings: Listing[]): Listing[] {
  const seen: Listing[] = []

  for (const listing of listings) {
    if (!isDuplicate(seen, listing)) {
      seen.push(listing)
    }
  }

  return seen
}