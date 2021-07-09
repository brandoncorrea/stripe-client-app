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
import CreatePrice from "./components/CreatePrice";
import UpdatePrice from "./components/UpdatePrice";
import ShoppingCart from "./components/ShoppingCart";
import LookupMenu from "./components/LookupMenu";
import GuardedRoute from "./components/GuardedRoute";
import CheckoutMenu from "./components/CheckoutMenu";

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
        <GuardedRoute 
          permissionSet={2}
          path={Routes.itemManagement}
          component={ItemManagement}
          defaultComponent={Home}
          />
        <GuardedRoute 
          permissionSet={1}
          path={Routes.cart}
          component={ShoppingCart}
          defaultComponent={Home}
          />
        <GuardedRoute 
          permissionSet={1}
          path={Routes.checkout}
          component={CheckoutMenu}
          defaultComponent={Home}
          />
        <GuardedRoute
          permissionSet={1} 
          path={Routes.lookup}
          component={LookupMenu}
          defaultComponent={Home} 
          />
        <GuardedRoute
          permissionSet={2} 
          path={Routes.createItem}
          component={CreateItem}
          defaultComponent={Home}
          />
        <GuardedRoute
          permissionSet={2} 
          path={Routes.createPrice}
          component={CreatePrice}
          defaultComponent={Home}
          />
        <GuardedRoute
          permissionSet={2} 
          path={Routes.updateProduct}
          component={UpdateProduct}
          defaultComponent={Home}
          />
        <GuardedRoute
          permissionSet={2} 
          path={Routes.updatePrice}
          component={UpdatePrice}
          defaultComponent={Home}
          />
      </Switch>
    </Router>;
}