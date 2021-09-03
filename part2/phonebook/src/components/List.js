import React from "react";

const List = ({ contacts, deleteContact }) => {
  return (
    <ul>
      {contacts.map((contact) => (
        <li key={contact.id}>
          <strong>{contact.name}:</strong> {contact.number}
          <button onClick={()=>deleteContact(contact.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default List;
