import { useEffect, useState } from "react";
import AppMenu from './AppMenu';
import Login from "./components/Login";
import { getSessionCookie, SessionContext } from "./services/session";

export default function App() {
  const [session, setSession] = useState(getSessionCookie());
  useEffect(
    () => {
      setSession(getSessionCookie());
    },
    [session]
  );

  const onSuccess = res => setSession(getSessionCookie());

  if (session === null || session === undefined)
    return <Login onSuccess={onSuccess}/>

  return (
    <SessionContext.Provider value={session}>
      <AppMenu />
    </SessionContext.Provider>
  );
}