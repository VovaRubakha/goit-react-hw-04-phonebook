import { useState, useEffect, useRef } from "react";
import { nanoid } from "nanoid";
import ContactList from "./ContactList";
import ContactForm from "./ContactForm";
import Filter from "./Filter";

import styles from './App.module.css'

const App = () => {
  const [contacts, setContacts] = useState([
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
  ])
  const [filter, setFilter] = useState('')

  const firstRef = useRef(true);

  useEffect(() => {
    if (firstRef.current) {
      const getContacts = localStorage.getItem('contacts')
      const contacts = JSON.parse(getContacts);
        if (contacts?.length) {
          setContacts(contacts);
        }
      firstRef.current = false;
      }
  }, [])
  
  useEffect(() => {
    if (!firstRef.current) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }, [contacts])

  const addContact = (data) => {
    const dublicate = contacts.find(item => item.name === data.name);
    if(dublicate){
          alert(`${data.name} is already in contacts list`);
          return;
    }

    setContacts(prevState => {
      const { name, number } = data;
      const newContact = {
        name,
        number,
        id: nanoid()
      };
      return [...prevState, newContact]
    });
  }

  const deleteContact = (id) => {
    setContacts(prevState => {
      const { contacts } = prevState;

      return contacts.filter(contact => contact.id !== id)
    });
  }

  const changeFilter = ({target}) => {
    setFilter(target.value)
  }

  const getFilteredContacts = () => {
    // const { contacts } = contacts;
    // const { filter } = filter;
    if (!filter) {
      return contacts
    }
    const filterText = filter.toLowerCase();
    const filteredContacts = contacts.filter(({name}) => name.toLowerCase().includes(filterText));
    return filteredContacts;
  }

  const filteredContacts = getFilteredContacts();
  return (
      <div className={styles.container}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={addContact} />
        <h2>Contacts</h2>
        <Filter filter={filter} changeFilter={changeFilter} />
        <ContactList contacts={filteredContacts} deleteContact={deleteContact} />
      </div>
  );
}

export default App;