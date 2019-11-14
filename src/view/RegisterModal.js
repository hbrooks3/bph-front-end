// react
import React, {useState} from "react";

// react-bootstrap
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';

// redux
import { useSelector, useDispatch } from 'react-redux';

// views
import Spinner from 'react-bootstrap/Spinner';

// actions
import { dissmissRegisterError, register } from '../actions/auth';


const RegisterModal = ({show, onClose, onRegister}) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const auth = useSelector(state=>state.auth);
  const dispatch = useDispatch();

  const close = () => {
    if (auth.isError) {
      dispatch(dissmissRegisterError());
    };
    onClose();
  };

  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>Create Account</Modal.Title>
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
                placeholder="Enter email"
                value={email}
                onChange={event => setEmail(event.target.value)}
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
          </Form>
        }

        {
          auth.isError &&
          <Alert variant="danger" onClose={() => dispatch(dissmissRegisterError())} dismissible>
          <Alert.Heading>Register Error!</Alert.Heading>
          <p>{auth.errorMessage}</p>
        </Alert>
        }
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={()=>dispatch(register(email, password))} disabled={auth.isFetching}>
          Create
        </Button>
        <Button variant="secondary" onClick={close} disabled={auth.isFetching}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>   
  );
};

export default RegisterModal;