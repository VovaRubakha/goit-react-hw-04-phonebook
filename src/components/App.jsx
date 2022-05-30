import { useState, useEffect, useRef } from "react";
import { nanoid } from "nanoid";
import ContactList from "./ContactList";
import ContactForm from "./ContactForm";
import Filter from "./Filter";

import styles from './App.module.css'

const App = () => {
  const [state, setState] = useState({
  contacts: [
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
  ],
  filter: '',
  })

  const firstRef = useRef(true);

  useEffect(() => {
    if (firstRef.current) {
      const getContacts = localStorage.getItem('contacts')
      const contacts = JSON.parse(getContacts);      
        if (contacts?.length) {
          this.setState({ contacts: contacts });
        }
      }
  }, [])
  
  useEffect(() => {
    if (!firstRef.current) {
      localStorage.setItem('contacts', JSON.stringify(state.contacts));
    }
  }, [state.contacts])

  const addContact = (data) => {
    const { contacts } = state;

    const dublicate = contacts.find(item => item.name === data.name);
    if(dublicate){
          alert(`${data.name} is already in contacts list`);
          return;
    }

    setState(prevState => {
      const { contacts } = prevState;
      const { name, number } = data;
      const newContact = {
        name,
        number,
        id: nanoid()
      };
      return {
        contacts: [...contacts, newContact],
        name: "",
        
      }
    });
  }

  const deleteContact = (id) => {
    setState(prevState => {
      const { contacts } = prevState;

      return {
        contacts: contacts.filter(contact => contact.id !== id)
      }
    });
  }

  const changeFilter = ({target}) => {
    setState({
      filter: target.value
    })
  }

  const getFilteredContacts = () => {
    const { contacts, filter } = state;
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
      <Filter changeFilter={changeFilter} />
        <ContactList contacts={filteredContacts} deleteContact={deleteContact} />
      </div>
  );
}

export default App;