import classes from './NoContactFound.module.css';
import { Link } from 'react-router-dom';
const NoContactFound = () => {
  return (
    <div className={classes.noquotes}>
      <p>No contacts found!</p>
      <Link className='btn' to = '/new-contact'>
        Add a contact
      </Link>
    </div>
  );
};

export default NoContactFound;
