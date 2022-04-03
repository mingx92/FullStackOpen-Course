import { useState, useEffect, useRef } from 'react'
import axios from 'axios'


const CountryList = ({allCountriesData, filterCountryByName}) => {
  const clickStatus = useRef(false)
  const [returnView, changeReturnView] = useState ("");
  // common name of all Countries
  const allCountriesName = allCountriesData.map (country => {return country.name.common});
  // common name of all countries in allCountries Data similar to filter string
  const filterCountries = allCountriesName.filter(country => country.toLowerCase().includes(filterCountryByName.toLowerCase()))
  
  //Render view for Single Country - reusable function
  const renderSingleCountryView = (allCountriesData, selectedCountryName) => {
    const selectedCountryDetails = allCountriesData.filter(country => { 
      return country.name.common === selectedCountryName
      })[0];
    const selectedCountryLanguage = Object.keys(selectedCountryDetails.languages).map(k => (
      <li key={k}>{selectedCountryDetails.languages[k]}</li>
    ))
    return (
      <div>
        <h2>{selectedCountryName}</h2>
        <div />
        <div>capital {selectedCountryDetails.capital[0]}</div>
        <div>area {selectedCountryDetails.area}</div>
        <div />
        <h3>languages</h3>
        <ul>
          {selectedCountryLanguage}
        </ul>
        <img src= {selectedCountryDetails.flags.png} alt = "flagc"></img>
      </div>
    )
  }

  const countryClickHandler =(e) => {
    changeReturnView(renderSingleCountryView(allCountriesData, e.target.id));
    clickStatus.current=true;
    //No idea why the view is not returned for child component. Please let me know if anyone knows how to address this..
  }


  switch (true) {

    case (filterCountries.length > 10):
      return (
      <div> Too many matches, specify another filter </div>
      );

    case (filterCountries.length>1 && filterCountries.length<=10):
      if (returnView !== "" && clickStatus.current ==true) {
        clickStatus.current = !clickStatus.current;
        return (<div>{returnView}</div>)
      } else {
        return (
        <div>
          {filterCountries.map(country => <div key={country}>{country} <button onClick = {countryClickHandler} id={country}>show</button></div> )}
        </div>
        )
      }

    case (filterCountries.length === 1):
      const selectedCountryName = filterCountries[0];
      return(renderSingleCountryView(allCountriesData, selectedCountryName))

    default:
        return (<div></div>)   
    }
  }


const App = () => {

  const [filter, updateFilter] = useState("");
  const [allCountriesData, setAllCountriesData] = useState([])
  // const [filterCountries, setFilterCountries] = useState([]);

  const filterChangeHandler = (e) => {
    updateFilter(e.target.value);
    // setFilterCountries(allCountries.filter(country => country.toLowerCase().includes(e.target.value.toLowerCase())));
  }

  useEffect(() => {
    console.log('effect');
    axios
      .get('https://restcountries.com/v3.1/all')
      .then( response => {
        console.log('promise fulfilled for useEffect');
        setAllCountriesData(response.data)
        // setAllCountries(response.data.map (country => {return country.name.common}));
        // setFilterCountries(allCountries);
      })
  }, [])


    return (
      <div>
        find countries <input value={filter} onChange={filterChangeHandler}/>
        selected {filter}
        <CountryList allCountriesData={allCountriesData} filterCountryByName= {filter} />
      </div>
    );
}

export default App;
