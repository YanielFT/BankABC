import classes from "./MainNavigation.module.css";
import { NavLink } from "react-router-dom";

const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <span className={classes.logo}>ABC Bank</span>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink activeClassName={classes.active} to="/contacts">
              All Contacts
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={classes.active} to="/new-contact">
              Add a contact
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
