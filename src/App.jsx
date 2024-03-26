import { useState, useEffect } from 'react';
import phoneContacts from './contact.json';
import ContactForm from './components/ContactForm/ContactForm';
import SearchBox from './components/SearchBox/SearchBox';
import ContactList from './components/ContactList/ContactList';

const LS_KEY = 'saved-contacts';

export default function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem(LS_KEY)) ?? phoneContacts;
  });
  const [filter, setFilter] = useState('');

  function addContact(newContact) {
    setContacts(prevContacts => [...prevContacts, newContact]);
  }

  function deleteContact(contactId) {
    setContacts(prevContacts =>
      prevContacts.filter(prevContact => prevContact.id !== contactId)
    );
  }

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLocaleLowerCase())
  );

  useEffect(() => {
    window.localStorage.setItem(LS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />
      <SearchBox state={filter} setState={setFilter} />
      <ContactList contacts={filteredContacts} deleteContact={deleteContact} />
    </div>
  );
}