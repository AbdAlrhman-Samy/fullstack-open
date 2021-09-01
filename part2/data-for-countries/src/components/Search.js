const Search = ({ handleChange }) => {
  return (
    <div>
      <label htmlFor="country-name">Find Countries: </label>
      <input type="text" id="country-name" onChange={handleChange} />
    </div>
  );
};

export default Search;
