import { Route, Redirect, Switch } from "react-router-dom";
import classes from "./Layout.module.css";
import NewContact from "../../pages/NewContact";
import AllContacts from "../../pages/AllContacts";
import ContactDetail from "../../pages/ContactDetail";
import NotFound from "../../pages/NotFound";
const Layout = () => {
  return (
    <main className={classes.main}>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/contacts" />
        </Route>
        <Route path="/contacts" exact>
          <AllContacts />
        </Route>
        <Route path="/contacts/:contactId">
          <ContactDetail />
        </Route>
        <Route path="/new-contact" exact>
          <NewContact />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </main>
  );
};

export default Layout;
