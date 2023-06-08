import Card from "../UI/Card";
import classes from "./ContactSerachByNameAddresss.module.css";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import useHttp from "../../hooks/use-http";
import LoadingSpinner from "../UI/LoadingSpinner";

const ContactSerachByNameAddresss = () => {
  const nameRef = useRef();
  const addressRef = useRef();

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
    if (nameRef.current.value != '' > 0 && addressRef.current.value != '') {
      fetchContacts(
        {
          url: `http://localhost:8080/api/v1/contacts/name/${nameRef.current.value}/address/${addressRef.current.value}`,
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
            <label htmlFor="name">Name (First)</label>
            <input id="name" type="text" ref={nameRef} />
          </div>
          <div className="form-control">
            <label htmlFor="address">Address</label>
            <input id="address" type="text" ref={addressRef} />
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
      <h2 className={classes.descrip}>By name and address</h2>
      </div>
      }
 

    </Card>
  );
};
export default ContactSerachByNameAddresss;
