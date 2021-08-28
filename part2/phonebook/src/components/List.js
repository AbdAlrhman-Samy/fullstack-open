import React from 'react'

const List = ({contacts}) => {
    return (
        <ul>
            {contacts.map((contact, i)=> <li key={i}> {contact.name} </li>)}
        </ul>
    )
}

export default List
