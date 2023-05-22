import React, { useState } from 'react';
import css from './ContactListItem.module.css';

const ContactListItem = ({ contact, onDelete, onEdit }) => {
  const [name, setName] = useState(contact.name);
  const [number, setNumber] = useState(contact.number);
  const [isEdit, setIsEdit] = useState(false);

  const toggleEdit = () => {
    setIsEdit(prevState => !prevState);
    if (isEdit) {
      onEdit({
        name,
        number,
        id: contact.id
      });
    }
  };
  return (
    <>
      <li className={css.item} key={contact.id}>
        <span className={css.decor}></span>
        {isEdit ? (
          <>
            <input type="text" value={name} onChange={e => setName(e.target.value)} />
            <input type="number" value={number} onChange={e => setNumber(e.target.value)} />
          </>
        ) : (
          <>
            {contact.name}: {contact.number}
          </>
        )}
        <button
          className={css.btn}
          type="button"
          onClick={toggleEdit}
        >
          {isEdit ? 'Save' : 'Edit'}
        </button>
        <button
          className={css.btn}
          type="button"
          onClick={() => onDelete(contact.id)}
        >
          Delete
        </button>
      </li>
    </>
  );
}

export default ContactListItem;