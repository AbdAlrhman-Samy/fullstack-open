import React, { useState } from "react";
import List from "./components/List";
import Form from "./components/Form";
import Filter from "./components/Filter";

const App = () => {
  const [contacts, setContacts] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);

  const [filtered, setFiltered] = useState([]);
  const [filter, setFilter] = useState(false)

  const handleFilterChange = (e) => {
    const keyword = e.target.value.toLowerCase();
    if (keyword === null) {
      setFiltered(contacts);

    } else {
      setFilter(true)

      const filteredContacts = contacts.filter((contact) => {
        return contact.name.toLowerCase().includes(keyword);
      });
      
      setFiltered(filteredContacts);
    }
  };


  return (
    <div>
      <h1>My Phonebook</h1>
      <Filter handleFilterChange={handleFilterChange} />
      <h2>Add a Contact</h2>
      <Form setContacts={setContacts} contacts={contacts} />
      <h2>Contacts</h2>
      <List contacts={filter? filtered : contacts} />
    </div>
  );
};
export default App;
