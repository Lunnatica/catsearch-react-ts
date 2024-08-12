import { Cat } from "./types"

export async function fetchSearchResultsFromAPI(
  searchTerm: string
): Promise<Cat[]> {
  // Note: this API seems a bit unstable and sometimes it takes a long time to respond, especially
  // for broad searches
  try {
    const response = await fetch(
      `https://cat-api-bjoerge.sanity-io1.now.sh/cats?query=${encodeURIComponent(
        searchTerm
      )}`
    )

    if (!response.ok) {
      console.error("Error fetching search results:", response.statusText)
      throw new Error("Failed to fetch search results")
    }

    return response.json()
  } catch (error) {
    console.error("Error fetching search results:", error)
    throw new Error("Failed to fetch search results")
  }
}
