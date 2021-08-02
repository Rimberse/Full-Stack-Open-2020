import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// ex 2.12
function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data);
      })
  }, []);

  const handleSearchChange = event => setSearch(event.target.value);

  return (
    <div>
      <input value={search} onChange={handleSearchChange} />
      <SearchResult countries={countries} search={search} />
    </div>
  );
}

const SearchResult = ({ countries, search }) => {
  const [showCountry, setShowCountry] = useState({name: ''});

  // This cleans up our state after showing one specific country. 
  // Without this effect every time we search for another country, we get stuck with the first country's information
  // This effect updates the state every time the search query is changed
  useEffect(() => {
    setShowCountry({name: ''});
  }, [search]);

  const matches = country => {
    for (let i = 0; i < search.length; i++) {
      if (country.toLowerCase().charAt(i) !== search.toLowerCase().charAt(i)) {
        return false;
      }
    }

    return true;
  };

  const handleShowClick = country => setShowCountry(country);

  let countriesToRender = search.length > 0 ? countries.filter(country => matches(country.name)) : countries;

  if (search.length === 0) {
    return countriesToRender.map(country => <div key={country.name}>{country.name}</div>);
  } else if (countriesToRender.length === 1) {
    return countriesToRender.map(country => <Country  key={country.name} country={country} />)
  } else if (countriesToRender.length > 10) {
    return <p>Too many matches, specify another filter</p>
  } else {
    // ex. 2.13
    return showCountry.name.length === 0
      ? countriesToRender.map(country => <div key={country.name}>{country.name} <button onClick={() => handleShowClick(country)}>Show</button></div>)
      : <Country country={showCountry} />
  }
}

const Country = ({ country }) => (
  <>
    <h2>{country.name}</h2>
    <p>Native name: <b>{country.nativeName}</b></p>
    <p>Region: <b>{country.region}</b></p>
    <p>Capital: <b>{country.capital}</b></p>
    <p>Population: <b>{country.population}</b></p>
    <p>Demonym: <b>{country.demonym}</b></p>
    <h3>Spoken languages:</h3>
    <ul>{(country.languages).map(language => <li key={language.name}>{language.name}</li>)}</ul>
    <embed src={country.flag}></embed>
    <h2>Weather in {country.capital}</h2>
    <Weather city={country.capital} />
  </>
);

// ex. 2.14
const Weather = ({ city }) => {
  // Need to define an object with all it's properties, otherwise React will complain about undefined property
  const [currentWeather, setCurrentWeather] = useState({
    request: {
      unit: ''
    },
    location: {
      localtime: ''
    },
    current: {
      observation_time: '',
      temperature: '',
      weather_descriptions: [],
      wind_speed: '',
      wind_dir: '',
      weather_icons: []
    }
  });

  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${city}`)
      .then(response => {
        setCurrentWeather(response.data);
      })
  }, [city]);

  const formatLocalTime = time => {
    const localTime = time.split(' ');
    const dateReversed = localTime[0].split('-').reverse().join('-');
    return `${dateReversed} ${localTime[1]}`;
  };
  
  return (
    <>
      <p><b>Time: </b>{formatLocalTime(currentWeather.location.localtime)}</p>
      <p><b>Temperature: </b>{currentWeather.current.temperature} {currentWeather.request.unit === 'm' ? '°C' : '°F'}</p>
      <p><b>Wind: </b>{currentWeather.current.wind_speed} {currentWeather.request.unit === 'm' ? 'km/h' : 'mph'} direction {currentWeather.current.wind_dir}</p>
      <div>{currentWeather.current.weather_descriptions.map(description => <span key={description}>{description} </span>)}</div>
      {currentWeather.current.weather_icons.map(icon => <embed src={icon} key={icon}></embed>)}
    </>
  )
};

export default App;