const Filter = ({ handleFilterChange, value }) => {
  

  return (
    <div>
      <label htmlFor="contact-filter">Search for a contact</label>
      <input
        type="text"
        id="contact-filter"
        value={value}
        onChange={handleFilterChange}
        required
      />
    </div>
  );
};

export default Filter;
