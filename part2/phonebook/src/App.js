import React, { useState, useEffect } from "react";
import List from "./components/List";
import Form from "./components/Form";
import Filter from "./components/Filter";

import contactsService from './services/contacts'

const App = () => {


  const [contacts, setContacts] = useState([]);
  const [filtered, setFiltered] = useState(contacts);
  const [filter, setFilter] = useState(false);

  useEffect(()=>{
    contactsService.getAll()
    .then(myContacts=>{
      setContacts(myContacts)
    })
  },[])

  const handleFilterChange = (e) => {
    const keyword = e.target.value;
    setFilter(keyword);
    const filteredContacts = contacts.filter((contact) => {
      return contact.name.toLowerCase().includes(keyword.toLowerCase());
    });

    setFiltered(filteredContacts);
  };

  const deleteContact = (id) => {
    const deletedContact = contacts.find(contact=> contact.id === id)
    const confirm = window.confirm(`Are you sre you want to delete ${deletedContact.name}?`)

    if (confirm){
      contactsService.deleteContact(id)
      .then(()=>setContacts(contacts.filter(contact=> contact.id !== id)))
      .catch(err=> alert('already deleted.'))
      console.log(`deleted ${id}`);
      return
    } 
    console.log('cool');
    return
  }

  return (
    <div>
      <h1>My Phonebook</h1>
      <Filter handleFilterChange={handleFilterChange} />

      <h2>Add a Contact</h2>
      <Form setContacts={setContacts} contacts={contacts} />

      <h2>Contacts</h2>
      <List contacts={filter ? filtered : contacts} deleteContact={deleteContact}/>
    </div>
  );
};
export default App;