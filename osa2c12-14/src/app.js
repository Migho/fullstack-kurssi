import React, { useState, useEffect } from 'react' 
import axios from 'axios'

const Rows = (props) => {
  const data = props.data
  const filterText = props.filterText
  const filteredData = data.filter(entity => entity.name.toUpperCase().includes(filterText.toUpperCase()))

  if (filteredData.length > 10) {
    return (<ul>too much data :(</ul>)
  } else if (filteredData.length > 1) {
    const rows = () => filteredData.map(entity => <li key={entity.name}>{entity.name} <button onClick={() => props.showCountyOf(entity.name)}>Show</button></li>)
    return (<ul>{rows()}</ul>)
  } else if(filteredData.length === 1) {
    const entity = filteredData[0]
    useEffect(() => {
      axios
        .get(`https://api.apixu.com/v1/current.json?key=959b0fff38684d2594d175740192401&q=${entity.capital}`)
        .then(response => {
          props.setWeather(response.data.current)
        })
    }, [])
    return (
      <div>
        <h2>{entity.name}</h2>
        <div>Capital: {entity.capital}</div>
        <h3>Language</h3>
        {entity.languages.map((lang, i) => <ul key={lang.name}>{lang.name}</ul>)}
        <img src={entity.flag} alt="Flag"/>
        {props.weather.length !== 0 &&
          <div>
            <h3>Weather in {entity.capital}</h3>
            <div>Temperature: {props.weather.temp_c} celsius</div>
            <img src={props.weather.condition.icon} alt="weather"/>
            <div>Wind speed: {props.weather.wind_kph} kph direction {props.weather.wind_dir}</div>
          </div>
        }
      </div>
    )
  }
  return (<ul>Nothing found..</ul>)
}

const App = () => {

  const [ countries, setCountries] = useState([]) 
  const [ countryFilter, setCountryFilter ] = useState('')
  const [ weather, setWeather] = useState([]) 
  
  const handleCountryFilterChange = (event) => { setCountryFilter(event.target.value) }
  const showCountyOf = name => { setCountryFilter(name) }
  
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
      <div>Rajaa näytettäviä: <input value={countryFilter} onChange={handleCountryFilterChange}/></div>
      <Rows filterText={countryFilter} data={countries} weather={weather} setWeather={setWeather} showCountyOf={showCountyOf} />
    </div>
  )
}

export default App