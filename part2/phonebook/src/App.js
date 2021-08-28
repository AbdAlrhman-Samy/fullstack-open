import React, { useState } from 'react'
import List from './components/List'
const App = () => {

  const [ contacts, setContacts ] = useState([{ name: 'Arto Hellas'}])

  const [ newName, setNewName ] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const allNames = contacts.map(contact=> { return contact.name})
    const nameObject = { name: newName }
    
    if (allNames.includes(newName)){
      alert(`${newName} already exists`)
      setNewName('')
      return

    } else { setContacts(contacts.concat(nameObject)) }
    
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
        <input type="text" id="contact-name" value={newName} onChange={handleInputChange} required/> <br/>
        <button type="submit">Add Contact</button>
      </form>

      <h2>Contacts</h2>
      <List contacts={contacts}/>
    </div>
  )
}
export default App;
