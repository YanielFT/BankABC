import classes from './ContactItem.module.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { MdDelete } from "react-icons/md";
import { MdOutlineInfo } from "react-icons/md";
import useHttp from '../../hooks/use-http';
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from '../../store/cart-slice';
const ContactItem = (props) => {

  const {id,firstName,lastName,addreess,phone,photo,birthday} = props.contact;
  const { isLoading, error, sendRequest: sendContactRequest } = useHttp();
  const disptach = useDispatch();
  const items = useSelector(state => state.cart.items)
  const onAddContactHandler = (contact) => {
   

    const createdContact = (taskData) => {
      
      disptach(cartActions.setData(
        items.filter(item => item.id !== id)
      ))
    };
    sendContactRequest(
      {
        url: `http://localhost:8080/api/v1/contacts/${id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      },
      createdContact
    );
  };

  return (
    <li className={classes.item}>

      <figure className={classes.detail}>
        <div className={classes.photo}>
        <img src={photo} alt="user"/>
        </div>
        <section className={classes.info}>
        <blockquote>
          <h3>{`${firstName} ${lastName}`}</h3>
        </blockquote>
        <figcaption>+{phone}</figcaption>
        </section>
      </figure>
    
    <div className={classes.actions}>
      <button className={classes.action} onClick={onAddContactHandler}>
      <MdDelete className={`${classes.icon} ${classes.delete}`}/>
      </button>
      <Link className={classes.btn} to = {`contacts/${props.contact.id}`}>
      <MdOutlineInfo className={`${classes.icon} ${classes.info} `}/>
      </Link>
      </div>
    </li>
  );
};

export default ContactItem;
