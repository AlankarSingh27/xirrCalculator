import React from 'react';
import { Link } from 'react-router-dom';
import { IContactView } from '../models/IContactView';

interface IProps {
  contact: IContactView;
  clickDeleteContact: (contactId: string | undefined) => void;
}

export const ContactTable: React.FC<IProps> = (props) => {
  const { contact, clickDeleteContact } = props;

  return (
    <>
     
        <tr key={contact._id}>
          <td>{contact.name}</td>
          <td>
            {/* {contact.imageUrl && <img src={contact.imageUrl} alt={contact.name} width="50" height="50" />} */}
          </td>
          <td>{contact.mobile}</td>
          <td>{contact.address}</td>
          <td>{contact.loan_Amount}</td>
        </tr>
      
    </>
  );
};

export default ContactTable;
