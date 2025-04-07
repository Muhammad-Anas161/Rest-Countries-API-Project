import React from "react";
import CountriesData from "../CountriesData";
import CountryCard from "./CountryCard";

export default function CountriesList({ search, region }) {
  return (
    <div id="countries-container">
      {CountriesData.filter((country) => country.name.common.toLowerCase().includes(search)
      ).filter((country) => region ? country.region == region : true)
      .map((country, i) => {
        return (
          <CountryCard
            key={country.name.common}
            name={country.name.common}
            flag={country.flags.svg}
            population={country.population.toLocaleString("en-PK")}
            region={country.region}
            capital={
              Array.isArray(country.capital)
                ? country.capital.join(", ")
                : country.capital || "N/A"
            }
          />
        );
      })}
    </div>
  );
}
