import { useEffect, useState } from "react";
import AppRouter from './AppRouter';
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
      <AppRouter />
    </SessionContext.Provider>
  );
}