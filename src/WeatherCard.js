import React from 'react'

function WeatherCard({title, value}) {
  return (
    <div className='weather-card'>
        <h3>{title}</h3>
        <p>{value}
            {title==="Temperature" && <>&deg;C</>}
        </p>
    </div>
  )
}

export default WeatherCard