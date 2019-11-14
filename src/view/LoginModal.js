// react
import React, {useState} from "react";

// react-bootstrap
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Nav from 'react-bootstrap/Nav';
import Alert from 'react-bootstrap/Alert';

// redux
import { useSelector, useDispatch } from 'react-redux';

// views
import Spinner from 'react-bootstrap/Spinner';

// actions
import { dismissLoginError, login } from '../actions/auth';

const LoginModal = ({show, onClose, onLogin, switchToRegister}) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const auth = useSelector(state=>state.auth);
  const dispatch = useDispatch();

  const close = () => {
    if (auth.isError) {
      dispatch(dismissLoginError());
    };
    onClose();
  };

  const moveToRegister = () => {
    close();
    switchToRegister();
  };

  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {
          auth.isFetching ?
          <div className="text-center">
            <Spinner animation="border" />
          </div> :
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
              <Nav.Link onClick={moveToRegister}>
                Don't have an account? Create one here
              </Nav.Link>
            </Nav.Item>
          </Form>
        }
        
        {
          auth.isError &&
          <Alert variant="danger" onClose={() => dispatch(dismissLoginError())} dismissible>
          <Alert.Heading>Login Error!</Alert.Heading>
          <p>{auth.errorMessage}</p>
        </Alert>
        }
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={()=>dispatch(login(email,password))} disabled={auth.isFetching}>
          Login
        </Button>
        <Button variant="secondary" onClick={close} disabled={auth.isFetching}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>  
  );
};

export default LoginModal;