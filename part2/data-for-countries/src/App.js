import axios from "axios";
import { useEffect, useState } from "react";

import Search from './components/Search'
import List from './components/List'
import Info from './components/Info'
function App() {
  const [results, setResults] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [show, setShow] = useState(true)
  const [country, setCountry] = useState(null)

  const handleSearchChange = (e) => setSearchName(e.target.value);

  useEffect(() => {
    if (searchName === "") {
      setResults([]);
      setShow(false)
      return;
    }

    axios
      .get(`https://restcountries.eu/rest/v2/name/${searchName}`)
      .then((res) => {
        const countries = res.data;
        if (countries.length <= 10) {
          setResults(countries);
          setShow(false)

          if (countries.length === 1) {
            const countryObj = {
              capital: countries[0].capital,
              population: countries[0].population,
              flag: countries[0].flag,
              languages: countries[0].languages
            }
            setCountry(countryObj)
          }

        } 
        
        else {
          setResults([]);
          setShow(true)
          setCountry(null)
        }
      });
  }, [searchName]);

  return (
    <div>
      <Search handleChange={handleSearchChange} />
      <hr />
      {show?
        <div>Too many result, please be more specific.</div>        
        :
        <List results={results}/>
      }

      <Info country={country}/>
    </div>
  );
}

export default App;
