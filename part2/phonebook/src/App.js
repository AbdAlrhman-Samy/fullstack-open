import React, { useState, useEffect } from "react";
import List from "./components/List";
import Form from "./components/Form";
import Filter from "./components/Filter";
import Notification from './components/Notification'
import contactsService from './services/contacts'

const App = () => {


  const [contacts, setContacts] = useState([]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [opClass, setOpClass] = useState(null)
  const [filtered, setFiltered] = useState(contacts);
  const [filter, setFilter] = useState(false);
  const [message, setMessage] = useState(null)


  useEffect(()=>{
    contactsService.getAll()
    .then(myContacts=>{
      setContacts(myContacts)
    })
  },[])

  //submitting handling function
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
          setMessage(`Updated ${newName}'s number`)
          setOpClass('success-msg')
          setTimeout(() => {
          setMessage(null)
          setOpClass(null)
        }, 5000)
        })
      }
      return;

    } else {
      contactsService.create(contactObject)
      .then(returnedContatc=> {
        setContacts(contacts.concat(returnedContatc))
        setNewName("");
        setNumber("");
        setMessage(`Added ${newName} to contacts`)
        setOpClass('success-msg')
        setTimeout(() => {
          setMessage(null)
          setOpClass(null)
        }, 5000)
      })
    }
  };

  const handleNameChange = (e) => setNewName(e.target.value);

  const handleNumChange = (e) => setNumber(e.target.value);

  //filtering handle function
  const handleFilterChange = (e) => {
    const keyword = e.target.value;
    setFilter(keyword);
    const filteredContacts = contacts.filter((contact) => {
      return contact.name.toLowerCase().includes(keyword.toLowerCase());
    });

    setFiltered(filteredContacts);
  };

  //deleteing handling function
  const deleteContact = (id) => {
    const deletedContact = contacts.find(contact=> contact.id === id)
    const confirm = window.confirm(`Are you sre you want to delete ${deletedContact.name}?`)

    if (confirm){
      contactsService.deleteContact(id)
      .then(()=>setContacts(contacts.filter(contact=> contact.id !== id)))
      .catch(err=> {
        setMessage('Already deleted.')
        setOpClass('error-msg')
        setTimeout(() => {
          setMessage(null)
          setOpClass(null)
        }, 5000)
      })
      console.log(`deleted ${id}`);
      return
    } 
    console.log('cool');
    return
  }

  return (
    <div>
      <h1>My Phonebook</h1>
      <Notification message={message} opClass={opClass}/>
      <Filter handleFilterChange={handleFilterChange} />

      <h2>Add a Contact</h2>
      <Form
        handleSubmit={handleSubmit}
        handleNameChange={handleNameChange}
        handleNumChange={handleNumChange}
        newName={newName}
        number={number}
      />

      <h2>Contacts</h2>
      <List contacts={filter ? filtered : contacts} deleteContact={deleteContact}/>
    </div>
  );
};
export default App;