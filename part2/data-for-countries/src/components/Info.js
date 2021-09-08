const Info = ({ country }) => {

    if (country === null){
        return null
    }

    return (
      <div>
        Capital: {country.capital} <br />
        Population: {country.population} <br />

        Languages: 
        <ul>
            {country.languages.map(lang => {
               return <li key={lang.iso639_1}>{lang.name}</li>
            })}
        </ul>

        <img src={country.flag} width="300"/>
      </div>
    );
  };
  
  export default Info;
  