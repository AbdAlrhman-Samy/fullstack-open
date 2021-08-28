import React, { useState } from 'react'
import List from './components/List'
const App = () => {

  const [ contacts, setContacts ] = useState([{ name: 'Arto Hellas', id: 1 }])

  const [ newName, setNewName ] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const nameObject = { name: newName, id: contacts.length+1}
    setContacts(contacts.concat(nameObject))
    setNewName('')
    console.log(nameObject);
  }

  const handleInputChange = (e) => {
    setNewName(e.target.value)
  }  

  return (
    <div>
      <h1>My Phonebook</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="contact-name">Name</label>
        <input type="text" id="contact-name" value={newName} onChange={handleInputChange}/> <br/>
        <button type="submit">Add Contact</button>
      </form>

      <h2>Contacts</h2>
      <List contacts={contacts}/>
    </div>
  )
}
export default App;
