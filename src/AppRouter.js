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
import { getUserPermission } from './services/session';

export default class AppRouter extends Component {
  static navigate = path =>
    window.location.href = path;

  static getSearchParam = name =>
    new URLSearchParams(window.location.search).get(name);

  GuardedRoute(props) {
    if (props.permissionSet <= getUserPermission())
      return <Route
        path={props.path}
        component={props.component} 
        />;
    
    return <Route exact 
      path={props.path}
      component={props.defaultComponent}
      />
  }

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
        <this.GuardedRoute 
          permissionSet={2}
          path={Routes.itemManagement}
          component={ItemManagement}
          defaultComponent={Home}
          />
        <this.GuardedRoute
          permissionSet={2} 
          path={Routes.createItem}
          component={CreateItem}
          defaultComponent={Home}
          />
        <this.GuardedRoute
          permissionSet={2} 
          path={Routes.createPrice}
          component={CreatePrice}
          defaultComponent={Home}
          />
        <this.GuardedRoute
          permissionSet={2} 
          path={Routes.updateProduct}
          component={UpdateProduct}
          defaultComponent={Home}
          />
        <this.GuardedRoute
          permissionSet={2} 
          path={Routes.updatePrice}
          component={UpdatePrice}
          defaultComponent={Home}
          />
      </Switch>
    </Router>;
}