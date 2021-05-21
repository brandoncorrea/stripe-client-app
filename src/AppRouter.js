import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Routes } from './Config';
import ItemManagement from "./views/itemManagement/itemManagement";
import CreateItem from './views/createItem/createItem';
import Home from './views/home/home';
import EditItem from './views/editItem/editItem';

export default class AppRouter extends Component {
  static navigate = (path) =>
    window.location.href = path;

  render = () =>
    <Router>
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
    </Router>;
}