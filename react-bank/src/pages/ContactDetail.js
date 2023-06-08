import { Fragment } from "react";
import { useParams } from "react-router-dom";
import NotFound from "./NotFound";
import { useSelector } from "react-redux";
import ContactForm from "../components/contacts/ContactForm";
import useHttp from "../hooks/use-http";


const ContactDetail = () => {
  const params = useParams();
  const contacts = useSelector(state => state.cart.items);
  const { isLoading, error, sendRequest: sendContactRequest } = useHttp();

  const onAddContactHandler = (contact,id) => {
    

    const createdContact = (taskData) => {
      
      // props.onAddTask(createdTask);
    };

    sendContactRequest(
      {
        url: `http://localhost:8080/api/v1/contacts/edit/${id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: contact,
      },
      createdContact
    );
  };

  const quote = contacts.find(quote => quote.id === parseInt(params.contactId));
    if(!quote){
        return <NotFound/>
    }

  return (
    <Fragment>
       <ContactForm contact = {quote} onAddContact={onAddContactHandler} isLoading={isLoading} error={error} />
    </Fragment>
  );
};
export default ContactDetail;
