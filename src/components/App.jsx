import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Component } from 'react';
import { Section } from 'components/Section/Section';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import { ChildrenBox, Container, Notification } from './App.styled';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };
  onBtnDeleteClick = id => {
    this.setState(prevState => {
      const contacts = prevState.contacts.filter(contact => contact.id !== id);

      return { contacts };
    });
  };

  addNewContact = obj => {
    const { contacts } = this.state;
    const findName = contacts.find(
      ({ name }) => name.toLowerCase() === obj.name.toLowerCase()
    );
    const findNumber = contacts.find(
      ({ number }) => number.toLowerCase() === obj.number.toLowerCase()
    );

    if (findName) {
      Notify.failure(`${findName.name} is already in contacts`);
      return;
    }
    if (findNumber) {
      Notify.failure(`this is ${findNumber.name} phone number`);
      return;
    }

    Notify.success(`${obj.name} add to the contacts`);

    this.setState(prevState => ({
      contacts: [...prevState.contacts, { ...obj, id: nanoid() }],
    }));
  };

  filterContacts = name => this.setState({ filter: name });

  getFilteredContacts(filterName, contacts) {
    return contacts.filter(item => {
      return item.name.toLowerCase().includes(filterName.toLowerCase());
    });
  }

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = this.getFilteredContacts(filter, contacts);
    return (
      <Container>
        <Section title="Phonebook">
          <ContactForm onSubmit={this.addNewContact} />
        </Section>
        <Section title="Contacts">
          {contacts.length ? (
            <ChildrenBox>
              <Filter onChange={this.filterContacts} />
              <ContactList
                contactList={filteredContacts}
                onBtnClick={this.onBtnDeleteClick}
              />
            </ChildrenBox>
          ) : (
            <Notification>There are no contacts in the phone book</Notification>
          )}
        </Section>
      </Container>
    );
  }
}
