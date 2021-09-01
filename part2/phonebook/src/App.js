import React, { useState, useEffect } from "react";
import List from "./components/List";
import Form from "./components/Form";
import Filter from "./components/Filter";

import axios from "axios";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filtered, setFiltered] = useState(contacts);
  const [filter, setFilter] = useState(false);

  useEffect(()=>{
    axios.get('http://localhost:3001/persons').then(res=>{
      setContacts(res.data)
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

  return (
    <div>
      <h1>My Phonebook</h1>
      <Filter handleFilterChange={handleFilterChange} />

      <h2>Add a Contact</h2>
      <Form setContacts={setContacts} contacts={contacts} />

      <h2>Contacts</h2>
      <List contacts={filter ? filtered : contacts} />
    </div>
  );
};
export default App;