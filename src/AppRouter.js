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
import ShoppingCart from "./components/ShoppingCart";
import LookupMenu from "./components/LookupMenu";
import GuardedRoute from "./components/GuardedRoute";
import CheckoutMenu from "./components/CheckoutMenu";
import ManualCardTender from "./components/ManualCardTender";
import CreateSku from "./components/CreateSku";
import CashTender from "./components/CashTender";

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
          path={Routes.manualCardTender}
          component={ManualCardTender}
          defaultComponent={Home}
          />
        <GuardedRoute 
          permissionSet={1}
          path={Routes.cashTender}
          component={CashTender}
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
          path={Routes.createSku}
          component={CreateSku}
          defaultComponent={Home}
          />
        <GuardedRoute
          permissionSet={2} 
          path={Routes.updateProduct}
          component={UpdateProduct}
          defaultComponent={Home}
          />
      </Switch>
    </Router>;
}