import Card from "../UI/Card";
import classes from "./ContactSearch.module.css";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import useHttp from "../../hooks/use-http";
import LoadingSpinner from "../UI/LoadingSpinner";

const ContactSearch = () => {
  const date1 = useRef();
  const date2 = useRef();

  const [toggle, setToggle] = useState(false);

  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.cart.items);
  const { sendRequest: fetchContacts, isLoading, error } = useHttp();

  const transformeContacts = (contactObject) => {
    const items = [];

    for (const taskKey in contactObject) {
      items.push({
        id: contactObject[taskKey].id,
        firstName: contactObject[taskKey].firstName,
        lastName: contactObject[taskKey].lastName,
        address: contactObject[taskKey].address,
        phone: contactObject[taskKey].phone,
        photo: contactObject[taskKey].photo,
        birthday: contactObject[taskKey].birthday,
      });
    }

    dispatch(cartActions.setData(items));
  };
  const toggleHandler = () => {
    setToggle(prevstate => !prevstate);
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (date2.current.value > date1.current.value) {
      fetchContacts(
        {
          url: `http://localhost:8080/api/v1/contacts/range/from/${date1.current.value}/to/${date2.current.value}`,
        },
        transformeContacts
      );
      setToggle(prevstate => !prevstate);
    }
  };

  return (
    <Card>
      {toggle && (
        <form className={classes.form} onSubmit={onSubmitHandler}>
          {isLoading && (
            <div className="loading">
              <LoadingSpinner />
            </div>
          )}

          <div className="form-control">
            <label htmlFor="date1">From date</label>
            <input id="date1" type="date" ref={date1} />
          </div>
          <div className="form-control">
            <label htmlFor="date2">to date</label>
            <input id="date2" type="date" ref={date2} />
          </div>
          <div className={classes.buttons}>
            <button onClick={toggleHandler} className="btn">Cancel</button>
            <button className="btn">Accept</button>
          </div>
        </form>
      )}
      {!toggle && 
      <div className={classes.buttons}>
      <button onClick={toggleHandler} className="btn">Search</button>
      <h2 className={classes.descrip}>Date range</h2>
      </div>
      }
 

    </Card>
  );
};
export default ContactSearch;
