import React, { useEffect, useState } from "react";
import './CountryDetail.css'
import { Link, useParams } from "react-router-dom";

export default function CountryDetail() {
  const countryName = useParams().country;
  const [countryData, setCountryData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
      .then(response => response.json())
      .then(([country]) => {
        console.log(country);

        setCountryData({
          name: country.name.common,
          flag: country.flags.svg,
          nativeName: Object.values(country.name.nativeName)[0].official,
          population: country.population,
          region: country.region,
          subregion: country.subregion,
          capital: country.capital,
          tld: country.tld,
          currenciesName: Object.values(country.currencies)[0].name,
          currenciesSybmol: Object.values(country.currencies)[0].symbol,
          languages: Object.values(country.languages).join(", "),
          borders: country.borders || [], // Default to empty array if no borders
        });

        // Fetch border countries only if borders exist
        if (country.borders?.length > 0) {
          Promise.all(
            country.borders.map(border =>
              fetch(`https://restcountries.com/v3.1/alpha/${border}`)
                .then(res => res.json())
                .then(([borderCountry]) => borderCountry.name.common)
                .catch(err => {
                  console.error(`Error fetching border country ${border}: `, err);
                  return null; // Return null if there's an error
                })
            )
          )
            .then(borders => {
              // Filter out any null values (in case fetch failed for some borders)
              setCountryData(prev => ({
                ...prev,
                borders: borders.filter(border => border !== null),
              }));
            })
            .catch(err => {
              console.error("Failed to fetch border countries", err);
              setError("Failed to fetch border countries.");
            });
        }
      })
      .catch(err => {
        console.error("Failed to fetch country data", err);
        setError("Failed to fetch country data.");
      });
  }, [countryName]);

  // Show error message if any error occurred
  if (error) return <div className="error-message">❌ {error}</div>;

  if (!countryData) return <div>Loading...</div>;

  return (
    <div className="country-details-container">
      <span className="back-btn" onClick={() => window.history.back()}>
        <i className="fa-solid fa-arrow-left"></i>&nbsp;&nbsp;Back
      </span>
      <div className="country-details">
        <img src={countryData.flag} alt="" className="flag" />
        <div className="country-content">
          <h1 className="country-name">{countryData.name}</h1>
          <div className="text">
            <div className="left">
              <p>
                <b>Native Name:</b> <span className="native-name">{countryData.nativeName}</span>
              </p>
              <p>
                <b>Population:</b> <span className="population">{countryData.population.toLocaleString("en-PK")}</span>
              </p>
              <p>
                <b>Region:</b> <span className="region">{countryData.region}</span>
              </p>
              <p>
                <b>Sub Region:</b> <span className="sub-region">{countryData.subregion}</span>
              </p>
              <p>
                <b>Capital:</b> <span className="capital">{countryData.capital?.join(", ")}</span>
              </p>
            </div>
            <div className="right">
              <p>
                <b>Top-Level-Domain:</b>&nbsp;<span className="domain">{countryData.tld?.join(", ")}</span>
              </p>
              <p>
                <b>Currencies:</b>&nbsp;<span className="currencies">{countryData.currenciesName}</span>
              </p>
              <p>
                <b>Currency Symbol:</b>&nbsp;
                <span className="currency-symbol">{countryData.currenciesSybmol}</span>
              </p>
              <p>
                <b>Languages:</b>&nbsp;<span className="languages">{countryData.languages}</span>
              </p>
            </div>
          </div>
          {countryData.borders.length > 0 && (
            <div className="border-countries">
              <b>Border Countries:</b>{" "}
              {countryData.borders.map((border, index) => (
                <Link key={index} to={`/${border}`}>
                  {border}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
