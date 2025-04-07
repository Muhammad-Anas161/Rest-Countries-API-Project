import React from 'react'
import './CountriesListShimmer.css'

const CountriesListShimmer = () => {
  return (
    <div id='countries-container'>
        {
            Array.from({length:10}).map((el,i ) => {
                return <div key={i} className="country-card shimmer-card">
                        <div className='flag-container'></div>
                        <div className="card-text">
                          <h3 className="card-title"></h3>
                          <p className='loading-p'></p>
                          <p className='loading-p'></p>
                          <p className='loading-p'></p>
                        </div>
                    </div> 
            })
        }
      
    </div>
  )
}

export default CountriesListShimmer
