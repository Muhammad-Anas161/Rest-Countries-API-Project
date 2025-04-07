import React from 'react'
import { useState } from "react"
import Searchbar from "./Searchbar"
import Dropdown from "./Dropdown"
import CountriesList from "./CountriesList"
import { useTheme } from '../hooks/useTheme'

export default function Home() {
    const [search, setSearch] = useState("")
    const [region, setFilterRegion] = useState("")
    const [isDark] = useTheme()
  return (
    <main className={`${isDark ? 'dark' : ''}`}>
            <div className="search-filter-container">
            <Searchbar setSearch={setSearch}/>
            <Dropdown setFilterRegion={setFilterRegion}/>
            </div>
            <CountriesList search={search} region={region}/>
            </main>
  )
}
