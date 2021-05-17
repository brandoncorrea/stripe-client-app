import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import ItemManagement from "./views/itemManagement/itemManagement";
import CreateItem from './views/createItem/createItem';
import App from './App';

export default function AppRouter() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/itemManagement">Item Management</Link>
          </li>
          <li>
            <Link to="/createItem">Create Item</Link>
          </li>
        </ul>

        <hr />

        <Switch>
          <Route exact path="/">
            <App />
          </Route>
          <Route path="/itemManagement">
            <ItemManagement />
          </Route>
          <Route path="/createItem">
            <CreateItem />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}