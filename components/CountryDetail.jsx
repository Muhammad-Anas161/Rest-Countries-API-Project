import React, { useEffect, useState } from 'react'

import './CountryDetail.css'
import { Link, useLocation, useParams } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import CountryDetailShimmer from './CountryDetailShimmer'

export default function CountryDetail() {
  const [isDark] = useTheme()
  const params = useParams()
  const { state } = useLocation()
  const countryName = params.country

  const [countryData, setCountryData] = useState(null)
  const [notFound, setNotFound] = useState(false)

  function updateCountryData(country) {
      setCountryData({
        name: country.name.common || country.name,
        nativeName: Object.values(country.name.nativeName || {})[0]?.common,
        population: country.population,
        region: country.region,
        subregion: country.subregion,
        capital: country.capital,
        flag: country.flags.svg,
        tld: country.tld,
        languages: Object.values(country.languages || {}).join(', '),
        currencies: Object.values(country.currencies || {})
          .map((currency) => currency.name)
          .join(', '),
        borders: [],
      })
  
      if (!country.borders) {
        country.borders = []
      }
  
      Promise.all(
        country.borders.map((border) => {
          return fetch(`https://restcountries.com/v3.1/alpha/${border}`)
            .then((res) => res.json())
            .then(([borderCountry]) => borderCountry.name.common)
        })
      ).then((borders) => {
        setTimeout(() =>
          setCountryData((prevState) => ({ ...prevState, borders }))
        )
      })
    }
  

  useEffect(() => {
    if (state) {
      updateCountryData(state)
      return
    }

    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
      .then((res) => res.json())
      .then(([country]) => {
        updateCountryData(country)
      })
      .catch((err) => {
        console.log(err)
        setNotFound(true)
      })
  }, [countryName])

  if (notFound) {
    return <div>Country Not Found</div>
  }
  return (
    <main className={`${isDark ? 'dark' : ''}`}>
      <div className="country-details-container">
      <span className="back-btn" onClick={() => history.back()}>
        <i className="fa-solid fa-arrow-left"></i>&nbsp;&nbsp;Back
      </span>
      {countryData === null ? (
          <CountryDetailShimmer />
        ) : (
      <div className="country-details">
        <img src={countryData.flag} alt="" className="flag" />
        <div className="country-content">
          <h1 className="country-name">{countryData.name}</h1>
          <div className="text">
            <div className="left">
              <p>
                <b>Native Name:</b> <span className="native-name">{countryData.nativeName || countryData.name}</span>
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
        )}
    </div>
    </main>
  );
}
