import ContactList from "../components/contacts/ContactList";
import { useEffect, Fragment } from "react";
import useHttp from "../hooks/use-http";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../store/cart-slice";
import ContactSearch from "../components/search/ContactSearch";
import ContactSerachByNameAddresss from "../components/search/ContactSerachByNameAddresss";
import NoContactFound from "../components/contacts/NoContactFound";


const AllContacts = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.cart.items);
  const {sendRequest:fetchContacts, isLoading, error} = useHttp();
  
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

  useEffect(() => {
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

  if(!isLoading && !error){
    if(contacts.length > 0)
    content =  <ContactList contacts = {contacts}/>
    else content = <NoContactFound/>;
  }


 return <Fragment>
  {!error  &&
  <Fragment><ContactSearch /><ContactSerachByNameAddresss /></Fragment>
  }
  {content}
 </Fragment> 
};
export default AllContacts;
