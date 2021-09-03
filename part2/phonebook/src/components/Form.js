import contactsService from '../services/contacts'
import React, { useState } from "react";

const Form = ({ setContacts, contacts }) => {
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const contactObject = { name: newName, number: number };
    const allNames = contacts.map( contact => contact.name );

    if (allNames.includes(newName)) {
      const confirm = window.confirm(`${newName} already exists, update the number?`);
      if (confirm){
        const exisitingContact = contacts.find(contact=> contact.name === newName)
        const updatedContact = {...exisitingContact, number: number}

        contactsService.update(updatedContact.id, updatedContact)
        .then(returnedContact => {
          setContacts(contacts.map(contact => contact.name === newName? returnedContact : contact))
          setNewName("");
          setNumber("");
        })
      }
      return;

    } else {
      contactsService.create(contactObject)
      .then(returnedContatc=> {
        setContacts(contacts.concat(returnedContatc))
        setNewName("");
        setNumber("");
      })
    }
  };

  const handleNameChange = (e) => setNewName(e.target.value);

  const handleNumChange = (e) => setNumber(e.target.value);

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
