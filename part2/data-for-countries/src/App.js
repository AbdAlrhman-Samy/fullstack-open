import axios from "axios";
import { useEffect, useState } from "react";

import Search from './components/Search'
import List from './components/List'

function App() {
  const [results, setResults] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [show, setShow] = useState(true)

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

        } else {
          setResults([]);
          setShow(true)
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
    </div>
  );
}

export default App;
