
import { useSelector, useDispatch } from "react-redux";
import MainNavigation from "./components/layout/MainNavigation";
import Notification from "./components/UI/Notification";
import Layout from "./components/layout/Layout";
import { useEffect } from "react";
import { cartActions } from "./store/cart-slice";
import useHttp from "./hooks/use-http";

function App() {
  const notification = useSelector((state) => state.ui.notification);

  const dispatch = useDispatch();
  const contacts = useSelector(state => state.cart.items);
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


  return (
    <div>
      <div className="container-header">
          {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />)}
      <MainNavigation/>
      </div>
      <Layout/>
    </div>
  );
}

export default App;
