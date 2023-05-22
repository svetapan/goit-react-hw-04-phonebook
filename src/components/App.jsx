import { useState } from 'react';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactsList from './ContactsList/ContactsList';
import { useLocalStorage } from 'hooks/useLocalStorage';

export default function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  const handleSubmit = (newContact ) => {
    const isNameContain = contacts.some(contact => contact.name === newContact.name);
    if (isNameContain) {
      alert(`${newContact.name} is already in contacts`);
      return;
    }

    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const changeFilter = evt => {
    setFilter(evt.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase().trim();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const editContact = contact => {
    setContacts((prevContacts) => prevContacts.map((item) => {
      if (item.id === contact.id) {
        return contact;
      }
      return item;
    }))
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handleSubmit} />
      <div>
        <h2>Contacts</h2>
        <Filter value={filter} onChange={changeFilter} />
        <ContactsList
          contacts={getVisibleContacts()}
          onDelete={deleteContact}
          onEdit={editContact}
        />
      </div>
    </div>
  );
}