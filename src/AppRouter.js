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
import Login from "./views/login/login";
import { useGoogleLogin } from 'react-google-login';
import * as appSettings from './appSettings.json';

export const navigate = path => 
  window.location.href = path;

export function AppRouter() {
  var isAuthenticated = false;

  const onSuccess = res =>
    isAuthenticated = res.isSignedIn();

  const onFailure = () =>
    isAuthenticated = false;

  const { signIn, loaded } = useGoogleLogin({
    clientId: appSettings.Google.ClientID,
    cookiePolicy: 'single_host_origin',
    isSignedIn: true,
    onSuccess,
    onFailure,
  });

  if (!isAuthenticated){
    console.log('not authed');
    return <Login />
  }
  else
    console.log('authed');

  return <Router>
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