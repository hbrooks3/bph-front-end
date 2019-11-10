import React from "react";

import Button from 'react-bootstrap/Button';

// Presenter imports
import { loginUser } from "../dummy-presenter/User";
// import { createAccount, loginUser, useSession, logoutUser } from "../presenter/User";

import {
  useHistory,
  useLocation,
} from "react-router-dom";


export function LoginButton() {
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/home" } };

  let login = () => {
    loginUser("", "", () => {
      history.replace(from);
    });
  };

  return (
    <Button onClick={login}>Login</Button>
  );
}