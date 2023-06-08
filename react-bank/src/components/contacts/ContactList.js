import { Fragment } from 'react';

import QuoteItem from './ContactItem';
import classes from './ContactList.module.css';

const ContactList = (props) => {
  return (
    <Fragment>
      <ul className={classes.list}>
        {props.contacts.map((contact) => (
          <QuoteItem
            key={contact.id}
            contact={contact}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default ContactList;
