import * as React from "react"
import { useState, useEffect, useCallback } from "react"
import { fetchSearchResultsFromAPI } from "./searchApiClient"
import { Cat } from "./types"

const CatItem: React.FC<{ cat: Cat }> = ({ cat }: { cat: Cat }) => {
  return (
    <li>
      <h2>🐈 {cat.breed}</h2>
      {cat.country && <div>🌍 {cat.country}</div>}
      {cat.origin && <div>🏠 {cat.origin}</div>}
      {cat["body type"] && <div>🦴 {cat["body type"]}</div>}
      {cat.coat && <div>🧥 {cat.coat}</div>}
      {cat.pattern && <div>🎨 {cat.pattern}</div>}
    </li>
  )
}

const SearchError: React.FC = () => (
  <div>Error when searching, please try again...</div>
)

const CatList: React.FC<{ cats: Cat[] }> = ({ cats }: { cats: Cat[] }) => {
  if (cats.length === 0) {
    return <div>No search results</div>
  }

  return (
    <ul>
      {cats.map((cat) => (
        <CatItem key={cat.breed} cat={cat} />
      ))}
    </ul>
  )
}

export function CatSearch() {
  const [hasErrored, setHasErrored] = useState(false)
  const [valid, setValid] = useState(false)
  const [searchResults, setSearchResults] = useState<Cat[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  const updateSearchTerm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleSearchTermChange = useCallback(updateSearchTerm, [])

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const results = await fetchSearchResultsFromAPI(searchTerm)
        setSearchResults(results)
      } catch (error) {
        setHasErrored(true)
      }
    }

    setValid(searchTerm.length >= 2)

    if (searchTerm.length < 2) {
      setSearchResults([])
      return
    }

    fetchSearchResults()
  }, [searchTerm])

  return (
    <div>
      <h2>Search for cat breed</h2>
      <input type="text" onChange={handleSearchTermChange} id="searchTerm" />
      <label htmlFor="searchTerm">
        {valid === false
          ? "Type at least two characters to start searching"
          : `You searched for ${searchTerm}`}
      </label>

      {hasErrored ? <SearchError /> : <CatList cats={searchResults} />}
    </div>
  )
}
