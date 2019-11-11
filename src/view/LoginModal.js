// react
import React, {useState} from "react";

// react-bootstrap
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Nav from 'react-bootstrap/Nav';

// redux

const LoginModal = ({
  openRegister, handleLogin
}) => {
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const closeLoginModal = () => setShowLogin(false);

  return (
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
              value={email}
              onChange={event => setEmail(event.target.value)}
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
              value={password}
              onChange={event => setPassword(event.target.value)}
            />
          </Form.Group>
          <Nav.Item>
            <Nav.Link eventKey="link-1" onClick={openRegister}>Don't have an account? Create one here</Nav.Link>
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
  );
};

export default LoginModal;