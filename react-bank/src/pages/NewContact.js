import useHttp from "../hooks/use-http";
import ContactForm from "../components/contacts/ContactForm";
import { Fragment } from "react";

const NewContact = () => {
  const { isLoading, error, sendRequest: sendContactRequest } = useHttp();

  const onAddContactHandler = (contact) => {
   

    const createdContact = (taskData) => {
      
      // props.onAddTask(createdTask);
    };

    sendContactRequest(
      {
        url: "http://localhost:8080/api/v1/contacts/save",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: contact,
      },
      createdContact
    );
  };

  const contact = {
    id:null,
    firstName:null,
    lastName:null,
    address:null,
    birthday:null,
    photo:null
  }

  return (
    <Fragment>
      <ContactForm contact = {contact} onAddContact={onAddContactHandler} isLoading={isLoading} error={error} />
    </Fragment>
  );
};
export default NewContact;
