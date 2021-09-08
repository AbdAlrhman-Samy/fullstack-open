const Form = ({ handleSubmit, handleNameChange, handleNumChange, newName, number }) => {
  

  
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="contact-name">Name</label>
      <input
        type="text"
        id="contact-name"
        value={newName}
        onChange={handleNameChange}
        required
      />
      <br />

      <label htmlFor="contact-number">Number</label>
      <input
        type="tel"
        id="contact-number"
        value={number}
        onChange={handleNumChange}
        pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
        required
      />
      <small>xxx-xx-xxx</small>
      <br />

      <button type="submit">Add Contact</button>
    </form>
  );
};

export default Form;
