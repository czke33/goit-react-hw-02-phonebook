import React, { Component } from "react";
import style from "./app.module.css";
import { nanoid } from "nanoid";
import ContactForm from "./ContactForm/ContactForm";
import Filter from "./Filter/Filter";
import ContactList from "./ContactList/ContactList";

class App extends Component {
  state = {
    contacts: [
      { id: nanoid(), name: "Molnar Katalin", number: "478-789-231" },
      { id: nanoid(), name: "Kicsi Tucsok", number: "789-456-123" },
      { id: nanoid(), name: "Molnar Tamas", number: "789-789-789" },
      { id: nanoid(), name: "Molnar-Aczel Zsuzsanna", number: "0774-956-541" },
    ],
    filter: "",
  };

  checkContact = (newContact) => {
    const { contacts } = this.state;
    const isInBase = contacts.some((contact) => contact.name === newContact.name);
    return isInBase;
  };

  addContact = (newContact) => {
    const check = this.checkContact(newContact);
    if (!check) {
      const { contacts } = this.state;
      this.setState({contacts: [...contacts, newContact]})
    } else {
      alert(`${newContact.name} is already in contacts`);
    }
  };

  changeFilterValue = (e) => {
    this.setState({ filter: e.target.value });
  };

  deleteUser = (e) => {
    const { contacts } = this.state;
    const filtered = contacts.filter((contact) => contact.id !== e.target.id);
    this.setState({ contacts: filtered });
  };

  render() {
    return (
      <div className={style.contact}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />

        <h2>Contacts</h2>
        <Filter changeHandler={this.changeFilterValue} />
        <ContactList
          filter={this.state.filter}
          contacts={this.state.contacts}
          deleteFunction={this.deleteUser}
        ></ContactList>
      </div>
    );
  }
}

export default App;