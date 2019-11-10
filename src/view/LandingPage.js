import React from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

// Presenter imports
// import { loginUser } from "../dummy-presenter/User";
// import { createAccount, loginUser, useSession, logoutUser } from "../presenter/User";

import {
  // Link,
  // useHistory,
} from "react-router-dom";

// Custom Components
import {LoginButton} from './Login';

export default function LandingPage(props) {
  // const history = useHistory;

  return (
    <>

      <Card className="text-center">
        <Card.Body>
          <h1>You need to login to access Badger Powerlifting Hub</h1>
        </Card.Body>
        <Card.Body>
          <LoginButton />
          <Button>Register</Button>
        </Card.Body>
      </Card>

    </>
  );
}

