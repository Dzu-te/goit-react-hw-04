import { Contact } from "../Contact/Contact";

export const ContactList = ({ contacts, handleContactDelete }) => {
  return (
    <ul>
      {contacts.map((contact) => (
        <Contact
          key={contact.id}
          onDelete={() => handleContactDelete(contact.id)}
          name={contact.name}
          number={contact.number}
        />
      ))}
    </ul>
  );
};
