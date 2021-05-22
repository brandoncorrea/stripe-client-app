import * as Cookies from "js-cookie";
import React from 'react';

export const setSessionCookie = session => {
  Cookies.remove("session");
  Cookies.set("session", session, { expires: 14 });
};

export const removeSessionCookie = () => Cookies.remove("session");

export const getSessionCookie = () => Cookies.get("session");

export function getUser() {
  var token = getSessionCookie();
  if (token === null || token === undefined)
    return token;
  return JSON.parse(token);

}
export const SessionContext = React.createContext(getSessionCookie());