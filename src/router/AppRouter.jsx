import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth";
import { Calendar } from "../calendar";

export const AppRouter = () => {

  const authStatus = 'notauthenticated';
  return (
    <Routes>
      {
        (authStatus === 'notauthenticated')
        ? <Route path="/auth/*" element={ <LoginPage /> }/>
        : <Route path="/*" element={ <Calendar /> }/>
      }
      
      <Route path="/*" element={ <Navigate to="/auth/login" /> }/>
    </Routes>
  );
};
