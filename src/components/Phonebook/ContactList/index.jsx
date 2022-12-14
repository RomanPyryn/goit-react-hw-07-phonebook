import { TailSpin } from 'react-loader-spinner';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchItems, removeItem } from '../../../redux/itemsApi';
import {
  ContactListUl,
  ContactItem,
  ContactInfoContainer,
  ContactBtn,
  SpinerBox,
} from './ContactList.styled';

const ContactList = () => {
  const filter = useSelector(state => state.filter.value);
  const { contacts, isLoading, error } = useSelector(state => state.items);
  const dispatch = useDispatch();

  const deleteContact = contactId => {
    dispatch(removeItem(contactId));
  };

  const getfiltredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  return (
    <>
      {error && <p>{error}</p>}
      {!contacts ? (
        <SpinerBox>
          <TailSpin color="#000" height={25} width={25} />
        </SpinerBox>
      ) : (
        <ContactListUl>
          {getfiltredContacts().map(contact => (
            <ContactItem key={contact.id}>
              <ContactInfoContainer>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/64/64572.png"
                  alt="contact-icon"
                  width="15px"
                  height="15px"
                />
                <span>{contact.name}</span>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/455/455705.png"
                  alt="contact-icon"
                  width="15px"
                  height="15px"
                />
                <span>{contact.phone}</span>
              </ContactInfoContainer>
              <ContactBtn
                type="button"
                onClick={() => deleteContact(contact.id, contact.name)}
                disabled={isLoading}
              />
            </ContactItem>
          ))}
        </ContactListUl>
      )}
    </>
  );
};

export default ContactList;
