import { Component } from "react";
import { nanoid } from "nanoid";
import ContactList from "./ContactList";
import ContactForm from "./ContactForm";
import Filter from "./Filter";

import styles from './App.module.css'

class App extends Component {
  state = {
  contacts: [
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
  ],
  filter: '',
  }
  componentDidMount() {
    const getContacts = localStorage.getItem('contacts')
    const contacts = JSON.parse(getContacts);
    
    if (contacts?.length) {
    this.setState({ contacts: contacts });
    }
  }
  
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = (data) => {
    const { contacts } = this.state;

    const dublicate = contacts.find(item => item.name === data.name);
    if(dublicate){
          alert(`${data.name} is already in contacts list`);
          return;
    }

    this.setState(prevState => {
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
  deleteContact = (id) => {
    this.setState(prevState => {
      const { contacts } = prevState;

      return {
        contacts: contacts.filter(contact => contact.id !== id)
      }
    });
  }
  changeFilter = ({target}) => {
    this.setState({
      filter: target.value
    })
  }

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    if (!filter) {
      return contacts
    }
    const filterText = filter.toLowerCase();
    const filteredContacts = contacts.filter(contact => contact.name.toLowerCase().includes(filterText));
    return filteredContacts;
  }

  render() {
    const { addContact, deleteContact, changeFilter } = this;
    const {  filter } = this.state;

    const items = this.getFilteredContacts();
    return (
    <>
      <div className={styles.container}>
        <h1>Phonebook</h1>
          <ContactForm onSubmit={addContact}/>
        <h2>Contacts</h2>
          <Filter changeFilter={changeFilter} value={filter}/>
          <ContactList contacts={items} deleteContact={deleteContact}/>
      </div>
    </>
    );
  }
};

export default App;