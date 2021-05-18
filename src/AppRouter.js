import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Routes } from './Config';
import ItemManagement from "./views/itemManagement/itemManagement";
import CreateItem from './views/createItem/createItem';
import Home from './views/home/home';

export default function AppRouter() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to={Routes.home}>Home</Link>
          </li>
          <li>
            <Link to={Routes.itemManagement}>Item Management</Link>
          </li>
          <li>
            <Link to={Routes.createItem}>Create Item</Link>
          </li>
        </ul>

        <hr />

        <Switch>
          <Route exact path={Routes.home}>
            <Home />
          </Route>
          <Route path={Routes.itemManagement}>
            <ItemManagement />
          </Route>
          <Route path={Routes.createItem}>
            <CreateItem />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}