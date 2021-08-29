import React from 'react'

const List = ({contacts}) => {
    return (
        <ul>
            {contacts.map((contact)=> <li key={contact.name}> <strong>{contact.name}:</strong> {contact.number} </li>)}
        </ul>
    )
}

export default List
