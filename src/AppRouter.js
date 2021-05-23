import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Routes } from './Config';
import ItemManagement from "./components/ItemManagement";
import CreateItem from './components/CreateItem';
import Home from './components/Home';
import UpdateItem from './components/UpdateItem';
import Login from './components/Login';
import PriceManagement from './components/PriceManagement';

export default class AppRouter extends Component {
  static navigate = path =>
    window.location.href = path;

  static getSearchParam = name =>
    new URLSearchParams(window.location.search).get(name);

  render = () =>
    <Router>
      <Switch>
        <Route exact 
          path={Routes.home}
          component={Home}
          />
        <Route
          path={Routes.priceManagement}
          component={PriceManagement}
          />
        <Route 
          path={Routes.login}
          component={Login}
          />
        <Route 
          path={Routes.itemManagement}
          component={ItemManagement}
          />
        <Route 
          path={Routes.createItem}
          component={CreateItem}
          />
        <Route 
          path={Routes.editItem}
          component={UpdateItem}
          />
      </Switch>
    </Router>;
}