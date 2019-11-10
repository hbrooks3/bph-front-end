// React imports
import React, {useState} from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { Link } from "react-router-dom";

// Presenter imports
import { createAccount, loginUser, useSession, logoutUser} from "../dummy-presenter/User";
// import { createAccount, loginUser, useSession, logoutUser } from "../presenter/User";

export default function NavBar() {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const activeSession = useSession();

  const closeLoginModal = () => setShowLogin(false);
  const openLoginModal = () => setShowLogin(true);
  const closeRegisterModal = () => setShowRegister(false);
  
  const openRegisterModal = () => {
    setShowLogin(false);
    setShowRegister(true);
  }

  const handleLogin = () => {
    closeLoginModal();
    loginUser(loginEmail, loginPassword);
  }

  const handleRegister = () => {
    createAccount(registerEmail, registerPassword);
    closeRegisterModal();
    openLoginModal();
  }

  const handleLogout = () => {
    logoutUser();
  }
  
  return (
  <>
    <Navbar bg="primary" variant="dark" expand="lg">
      <Navbar.Brand href="/">
      Badger Powerlifting Hub
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Link className="nav-link" to="/home">Home</Link>
        <Link className="nav-link" to="/plans">Plans</Link>
        <Link className="nav-link" to="/profile">Profile</Link>
        <Link className="nav-link" to="/create-plan">Create Plan</Link>
      </Nav>
      {activeSession ? 
        <Button variant="primary" onClick={handleLogout}>Logout</Button> :
        <Button variant="primary" onClick={openLoginModal}>Login</Button>
      }
      </Navbar.Collapse>
    </Navbar>

    <Modal show={showLogin} onHide={closeLoginModal}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>  
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={loginEmail}
              onChange={event => setLoginEmail(event.target.value)}
              placeholder="Enter email"
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={event => setLoginPassword(event.target.value)}
            />
          </Form.Group>
          <Nav.Item>
            <Nav.Link eventKey="link-1" onClick={openRegisterModal}>Don't have an account? Create one here</Nav.Link>
          </Nav.Item>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleLogin}>
          Login
        </Button>
        <Button variant="secondary" onClick={closeLoginModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>   

    <Modal show={showRegister} onHide={closeRegisterModal}>
      <Modal.Header closeButton>
        <Modal.Title>Create Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>  
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={registerEmail}
              onChange={event => setRegisterEmail(event.target.value)}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={registerPassword}
              onChange={event => setRegisterPassword(event.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleRegister}>
          Create
        </Button>
        <Button variant="secondary" onClick={closeRegisterModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal> 
  </>
  )
}