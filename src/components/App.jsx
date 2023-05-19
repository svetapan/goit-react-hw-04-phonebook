import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactsList from './ContactsList/ContactsList';

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const localData = localStorage.getItem('contacts');
    if (localData) {
      setContacts(JSON.parse(localData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleSubmit = ({ name, number }) => {
    const isNameContain = contacts.some(contact => contact.name === name);
    if (isNameContain) {
      alert(`${name} is already in contacts`);
      return;
    }

    const newContact = {
      name,
      number,
      id: nanoid(5),
    };

    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const changeFilter = evt => {
    setFilter(evt.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handleSubmit} />
      <div>
        <h2>Contacts</h2>
        <Filter value={filter} onChange={changeFilter} />
        <ContactsList
          contacts={getVisibleContacts()}
          onDeleteContact={deleteContact}
        />
      </div>
    </div>
  );
}

App.propTypes = {
  onSubmit: PropTypes.func,
  contacts: PropTypes.array,
  filter: PropTypes.string,
};