import React, {useState} from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export default function NavBar() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
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
            <Button variant="primary" onClick={handleShow}>Login</Button>
            </Form>
            </Navbar.Collapse>
        </Navbar>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>Login fields go here</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>        
    </>
    )



}