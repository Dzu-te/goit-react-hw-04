import "./App.css";
import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";
import { SearchBox } from "./SearchBox/SearchBox";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

const initialContacts = [
  { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
  { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
  { id: "id-3", name: "Eden Clements", number: "645-17-79" },
  { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
];

export default function App() {
  const [contacts, setContacts] = useState(initialContacts);
  const [searchItem, setSearchItem] = useState("");

  const addContact = (name, number) => {
    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };
    setContacts((prevContacts) => [...prevContacts, newContact]);
  };

  const handleSearchChange = (event) => {
    setSearchItem(event.target.value);
  };

  const handleContactDelete = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchItem.toLowerCase())
  );

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="generalContainer">
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />
      <SearchBox
        handleSearchChange={handleSearchChange}
        searchItem={searchItem}
      />
      <ContactList
        contacts={filteredContacts}
        setContacts={setContacts}
        handleContactDelete={handleContactDelete}
      />
    </div>
  );
}
