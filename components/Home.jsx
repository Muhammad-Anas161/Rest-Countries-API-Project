import React from 'react'
import { useState } from "react"
import Searchbar from "./Searchbar"
import Dropdown from "./Dropdown"
import CountriesList from "./CountriesList"

export default function Home() {
    const [search, setSearch] = useState("")
    const [region, setFilterRegion] = useState("")
  return (
    <main>
            <div className="search-filter-container">
            <Searchbar setSearch={setSearch}/>
            <Dropdown setFilterRegion={setFilterRegion}/>
            </div>
            <CountriesList search={search} region={region}/>
            </main>
  )
}
