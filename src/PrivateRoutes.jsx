// import {  } from "module";
import { Redirect, Route } from "react-router-dom";
import { useLogin } from "./context";

export const PrivateRoutes = ({ ...props }) => {
  const { userState } = useLogin();

  return <>{userState?.user ? <Route {...props} /> : <Redirect to="/" />}</>;
};
