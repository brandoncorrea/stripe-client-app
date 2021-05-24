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
import Login from './components/Login';
import UpdateProduct from "./components/UpdateProduct";

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
          path={Routes.updateProduct}
          component={UpdateProduct}
          />
      </Switch>
    </Router>;
}