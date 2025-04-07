import { useEffect, useState } from "react";

export default function useFilteredCountries(search, region) {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(res => res.json())
      .then(data => {
        setCountries(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching countries:", err);
        setLoading(false);
      });
  }, []);

  const filteredCountries = countries
    .filter(country =>
      country.name.common.toLowerCase().includes(search.toLowerCase())
    )
    .filter(country => region ? country.region === region : true);

  return { filteredCountries, loading };
}
