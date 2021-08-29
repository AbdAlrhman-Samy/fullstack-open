import React, { useState } from "react";

const Form = ({ setContacts, contacts }) => {
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const allNames = contacts.map((contact) => {
      return contact.name;
    });
    const contactObject = { name: newName, number: number };

    if (allNames.includes(newName)) {
      alert(`${newName} already exists`);
      setNewName("");
      return;
    } else {
      setContacts(contacts.concat(contactObject));
    }

    setNewName("");
    setNumber('')
    console.log(contactObject);
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumChange = (e) => {
    setNumber(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="contact-name">Name</label>
      <input
        type="text"
        id="contact-name"
        value={newName}
        onChange={handleNameChange}
        required
      />{" "}
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
