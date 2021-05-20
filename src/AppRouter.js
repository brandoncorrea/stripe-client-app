import React, { Component } from "react";
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
import EditItem from './views/editItem/editItem';
import { createBrowserHistory } from "history";

export default class AppRouter extends Component {
  static history = createBrowserHistory();

  static navigate = (path) =>
    window.location.href = path;

  render = () =>
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
          <li>
            <Link to={Routes.editItem}>Edit Item</Link>
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
          <Route path={Routes.editItem}>
            <EditItem />
          </Route>
        </Switch>
      </div>
    </Router>;
}