import { useState } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { Title } from './Title/Title';
import { useLocalStorage } from 'hooks/useLocalStorage';

export const App = () => {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  const addContact = ({ name, number }) => {
    const id = nanoid();

    const existingContact = contacts.find(contact => contact.name === name);
    if (existingContact) {
      alert(`${name} is already in contacts`);
      return;
    }

    setContacts(prevContacts => [...prevContacts, { name, number, id }]);
  };

  const handleFilter = () => {
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const deleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  return (
    <div>
      <Title title={'Phonebook'} type={'h1'}></Title>
      <ContactForm onSubmit={addContact}></ContactForm>
      <Title title={'Contacts'} type={'h2'}></Title>
      <Filter
        value={filter}
        onChange={e => setFilter(e.currentTarget.value)}
      ></Filter>
      <ContactList
        contacts={handleFilter()}
        onDeleteContact={deleteContact}
      ></ContactList>
    </div>
  );
};
