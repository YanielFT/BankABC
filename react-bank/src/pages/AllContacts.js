import ContactList from "../components/contacts/ContactList";
import { useEffect, Fragment } from "react";
import useHttp from "../hooks/use-http";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../store/cart-slice";
import ContactSearch from "../components/search/ContactSearch";
import ContactSerachByNameAddresss from "../components/search/ContactSerachByNameAddresss";


const AllContacts = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.cart.items);
  console.log(contacts)
  const {sendRequest:fetchContacts, isLoading, error} = useHttp();
  
 

  useEffect(() => {
    const transformeContacts =  contactObject => {

      const items = [];
  
       
      for(const taskKey in contactObject){
        items.push({
          id:contactObject[taskKey].id,
          firstName:contactObject[taskKey].firstName,
          lastName:contactObject[taskKey].lastName,
          address:contactObject[taskKey].address,
          phone:contactObject[taskKey].phone,
          photo:contactObject[taskKey].photo,
          birthday:contactObject[taskKey].birthday},
          )
      }
  
      dispatch(cartActions.setData(items))
    };
    
    fetchContacts( 
     {url: 'http://localhost:8080/api/v1/contacts/'}
    ,transformeContacts
    );

  }, [fetchContacts]);


  let content;

  if (error) {
    content = <button onClick={fetchContacts} className="btn">Try again</button>;
  } 

  if (isLoading) {
    content = <div className="loading"><LoadingSpinner/></div> 
  }

  if(!error && !isLoading){
    if(contacts.length > 0)
    content =  <ContactList contacts = {contacts}/>
    else <h2>No contacts found. Start adding some!</h2>;
  }

 return <Fragment>
  <ContactSearch/>
  <ContactSerachByNameAddresss/>
  {content}
 </Fragment> 
};
export default AllContacts;
