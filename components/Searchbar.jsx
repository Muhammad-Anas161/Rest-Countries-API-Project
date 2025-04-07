export default function Searchbar({setSearch}) {
  return (
    <div className="search-input">
  <i className="fa-solid fa-magnifying-glass" aria-hidden="true" />
  <input
    type="search"
    className="search"
    placeholder="Search for a Country..."
    onChange={(e) => setSearch (e.target.value.toLowerCase())}
  />
</div>

  )
}
