export default function Dropdown({setFilterRegion}) {
  return (
    <div className="custom-select-wrapper">
  <select name="" id="" className="search-filter" onChange={(e) => setFilterRegion(e.target.value)} >
    <option hidden="">Filter By Region:</option>
    <option value="Africa">Africa</option>
    <option value="America">America</option>
    <option value="Asia">Asia</option>
    <option value="Europe">Europe</option>
    <option value="Oceania">Oceania</option>
  </select>
</div>

  )
}
