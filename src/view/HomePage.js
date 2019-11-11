// react
import React, {useState} from "react";

// react-bootstrap
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import CardColumns from 'react-bootstrap/CardColumns';

// redux
import { useDispatch, useSelector } from 'react-redux';

// actions
import { login } from '../actions/auth';

// views
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

function PrivatePage(props) {
  return (
    <CardColumns>
    <Card className="text-center">
        <Card.Header>
          Notifications
        </Card.Header>
        <Card.Body>
          <Card.Text>Notification 1</Card.Text>
          <Card.Text>Notification 2</Card.Text>
          <Card.Text>Notification 3</Card.Text>
          <Card.Text>Notification 4</Card.Text>
        </Card.Body>
      </Card>
      <Card className="text-center">
        <Card.Header>
          Today's Training
        </Card.Header>
        <Card.Body>
          <Card.Text>*</Card.Text>
          <Card.Text>*</Card.Text>
          <Card.Text>* Workout shown here *</Card.Text>
          <Card.Text>*</Card.Text>
          <Card.Text>*</Card.Text>
          <Button variant="primary">View Workout</Button>
        </Card.Body>    
      </Card>
      </CardColumns>
  );
}

function PublicPage(props) {
  const dispatch = useDispatch();

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleLogin = (email, password) => dispatch(login(email,password));

  const handleRegister = (email, password) => {
    console.log(`Creating account for ${email} with password: ${password}`);
    setShowRegister(false);
  };

  const switchToRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  return (
    <>

    <Card className="text-center">
      <Card.Body>
        <h1>You need to login to access Badger Powerlifting Hub</h1>
      </Card.Body>
      <Card.Body>
        <Button onClick={()=>setShowLogin(true)}>Login</Button>
        <Button onClick={()=>setShowRegister(true)}>Register</Button>
      </Card.Body>
    </Card>

    <LoginModal
      show={showLogin}
      onClose={()=>setShowLogin(false)}
      onLogin={handleLogin}
      switchToRegister={switchToRegister}
    />

    <RegisterModal
      show={showRegister}
      onClose={()=>setShowRegister(false)}
      onRegister={handleRegister}
    />

    </>
  );
}

export default function HomePage(props) {
  const sessionStatus = useSelector(state => state.auth.loggedIn);

  return sessionStatus ? <PrivatePage /> : <PublicPage />;
}
