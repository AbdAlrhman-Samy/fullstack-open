import React from 'react'

const List = ({contacts}) => {
    return (
        <ul>
            {contacts.map((contact)=> <li key={contact.id}> <strong>{contact.name}:</strong> {contact.number} </li>)}
        </ul>
    )
}

export default List
