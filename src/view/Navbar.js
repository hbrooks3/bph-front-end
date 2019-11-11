// react
import React from "react";

// react-bootstrap
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

// react-router
import { Link } from "react-router-dom";

// redux
import { useSelector, useDispatch } from 'react-redux';

// actions
import { logout } from '../actions/auth';

export default function NavBar() {
  const sessionStatus = useSelector(state => state.auth.loggedIn);
  const dispatch = useDispatch();
  
  return (
  <Navbar bg="primary" variant="dark" expand="lg">
    <Navbar.Brand href="/">
    Badger Powerlifting Hub
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
    {sessionStatus &&
    <>
      <Nav className="mr-auto">
        <Link className="nav-link" to="/">Home</Link>
        <Link className="nav-link" to="/plans">Plans</Link>
        <Link className="nav-link" to="/profile">Profile</Link>
        <Link className="nav-link" to="/create-plan">Create Plan</Link>
      </Nav>
      <Button
        variant="outline-light" onClick={() => dispatch( logout() )}>Logout</Button>
    </>
    }
    </Navbar.Collapse>
  </Navbar>
  )
}