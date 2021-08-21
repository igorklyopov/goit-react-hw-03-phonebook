import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import Container from "./components/Container/Container";
import ContactsList from "./components/ContactsList/ContactsList";
import ContactForm from "./components/ContactForm/ContactForm";
import Filter from "./components/Filter/Filter";
import Section from "./components/Section/Section";

class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  static propTypes = {};

  addContact = (name, number) => {
    const contactsItem = {
      id: uuidv4(),
      name,
      number,
    };

    const { contacts } = this.state;

    const duplicateContactName = contacts.find(
      (contact) => contact.name === contactsItem.name
    );
    const duplicateContactNumber = contacts.find(
      (contact) => contact.number === contactsItem.number
    );

    if (duplicateContactName) {
      alert(`${contactsItem.name} is already in contacts!`);
      return;
    }
    if (duplicateContactNumber) {
      alert(
        `${contactsItem.number} is already in contacts! (${duplicateContactNumber.name} has this number)`
      );
      return;
    }

    this.setState(({ contacts }) => ({
      contacts: [contactsItem, ...contacts],
    }));
  };

  onFilterChange = (e) => {
    this.setState({ filter: e.target.value });
  };

  getFilteredContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilterValue = filter.toLocaleLowerCase().trim();

    return contacts.filter((contact) =>
      contact.name.toLocaleLowerCase().includes(normalizedFilterValue)
    );
  };

  deleteContact = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(
        (contact) => contact.id !== contactId
      ),
    }));
  };

  render() {
    const filteredContacts = this.getFilteredContacts();

    return (
      <Section>
        <Container>
          <h1 className="mainTitle">Phonebook</h1>
          <ContactForm onSubmitData={this.addContact} />
          <h2 className="title">Contacts</h2>
          <Filter onFilterChange={this.onFilterChange} />
          <ContactsList
            contacts={filteredContacts}
            onDeleteContactBtnClick={this.deleteContact}
          />
        </Container>
      </Section>
    );
  }
}

export default App;
