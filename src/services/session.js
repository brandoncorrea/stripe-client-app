import * as Cookies from "js-cookie";
import React from 'react';
import jwt_decode from 'jwt-decode';
import * as appSettings from '../appSettings.json';

const tokenName = 'google-token';

// Sets the user auth token
export const setSessionCookie = token => {
  Cookies.remove(tokenName);
  Cookies.set(tokenName, token, { expires: 14 });
};

// Deletes the google token from the cookies
export const removeSessionCookie = () => 
  Cookies.remove(tokenName);

// Returns the current google token from the cookies
// Returns null if it is not found or expired
export function getSessionCookie() {
  var token = Cookies.get(tokenName);
  if (token === null || token === undefined)
    return token;

  if (jwt_decode(token).exp * 1000 > Date.now())
    return token;

  removeSessionCookie();
  return null;
}

// Returns the decoded user token
export function getUser() {
  var token = getSessionCookie();
  if (token === null || token === undefined)
    return null;

  return jwt_decode(token);
}

// Returns the user's current permission set
export function getUserPermission() {
  var currentUser = getUser();
  if (currentUser === null || currentUser.email === undefined)
    return 0;

  var user = appSettings.Users[currentUser.email];
  if (user === undefined)
    return 0;
  
  return user.PermissionID;
}

export const SessionContext = React.createContext(getSessionCookie());