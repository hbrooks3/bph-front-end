// React imports
import React, {useState} from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

// Presenter imports
import { createAccount } from "../dummy-presenter/User";
// import { createAccount } from "../presenter/User";

export default function NavBar() {
    const [show, setShow] = useState(false);
    const handleCloseLogin = () => setShow(false);
    const handleShowLogin = () => setShow(true);

    const [display, setDisplay] = useState(false);
    const handleCloseAccount = () => setDisplay(false);
    const handleShowAccount = () => setDisplay(true);


  
    return (

    <>
        <Navbar bg="primary" variant="dark" expand="lg">
            <Navbar.Brand href="/">
            {`Badger Powerlifting Hub`}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/plans">Plans</Nav.Link>
                <Nav.Link href="/profile">Profile</Nav.Link>
            </Nav>
            <Form inline>
              <Button variant="primary" onClick={handleShowLogin}>Login</Button>
            </Form>
            </Navbar.Collapse>
        </Navbar>

      <Modal show={show} onHide={handleCloseLogin}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>  
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Nav.Item>
              <Nav.Link eventKey="link-1" onClick={onNeedAccountClick}>Don't have an account? Create one here</Nav.Link>
            </Nav.Item>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseLogin}>
            Login
          </Button>
          <Button variant="secondary" onClick={handleCloseLogin}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>   

      <Modal show={display} onHide={handleCloseAccount}>
        <Modal.Header closeButton>
          <Modal.Title>Create Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>  
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={onCreateAccountClick}>
            Create
          </Button>
          <Button variant="secondary" onClick={handleCloseAccount}>
            Close
          </Button>
        </Modal.Footer>
      </Modal> 
    </>
    )


    function onNeedAccountClick(event){
      handleShowAccount();
      handleCloseLogin();
    }

    function onCreateAccountClick(event){
      handleCloseAccount();
      handleShowLogin();
    }
}