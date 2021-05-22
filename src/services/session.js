import * as Cookies from "js-cookie";
import React from 'react';
import jwt_decode from 'jwt-decode';

const tokenName = 'google-token';

export const setSessionCookie = token => {
  Cookies.remove(tokenName);
  Cookies.set(tokenName, token, { expires: 14 });
};

export const removeSessionCookie = () => Cookies.remove(tokenName);

export function getSessionCookie() {
  var token = Cookies.get(tokenName);
  if (token === null || token === undefined)
    return token;

  if (jwt_decode(token).exp * 1000 > Date.now())
    return token;

  removeSessionCookie();
  return null;
}
export function getUser() {
  var token = getSessionCookie();
  if (token === null || token === undefined)
    return null;

  return jwt_decode(token);
}

export const SessionContext = React.createContext(getSessionCookie());