// react
import React, {useState, useEffect} from "react";

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
import { dissmissAuthError, register } from '../actions/auth';


const RegisterModal = ({show, onClose, onRegister}) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');

  const hasNumber = new RegExp("[0-9]+");
  const hasNoWhiteSpace = new RegExp(/\s/);
  const hasUppercase = new RegExp("[A-Z]+");
  const hasLowercase = new RegExp("[a-z]+");
  const hasLength = new RegExp(".{8,15}");
  const hasSymbol = new RegExp(/[~`!#$%^&*+=\-[\]\\';,/{}|\\":<>?]/g);
  
  const auth = useSelector(state=>state.auth);
  const dispatch = useDispatch();

  const [displayPasswordMatch, setDisplayPasswordMatch] = useState(false);
  const [displayNumCheck, setDisplayNumCheck] = useState(true);
  const [displayUpperCaseCheck, setDisplayUpperCaseCheck] = useState(true);
  const [displayLowerCaseCheck, setDisplayLowerCaseCheck] = useState(true);
  const [displayLengthCheck, setDisplayLengthCheck] = useState(true);
  const [displaySymbolCheck, setDisplaySymbolCheck] = useState(true);
  const [displayWhiteSpaceCheck, setDisplayWhiteSpaceCheck] = useState(true);

  const close = () => {
    if (auth.error) {
      dispatch(dissmissAuthError());
    };
    onClose();
  };

  useEffect(() => {
    const value = password
    let counter = 0;

    if (hasNumber.test(value)){
      setDisplayNumCheck(false); 
      counter++;   
    }
    else {
      setDisplayNumCheck(true);  
    }
    if (hasUppercase.test(value)){
      setDisplayUpperCaseCheck(false);
      counter++;      
    }
    else {
      setDisplayUpperCaseCheck(true);
        }
    if (hasLowercase.test(value)){
      setDisplayLowerCaseCheck(false);
      counter++;      
    }
    else {
      setDisplayLowerCaseCheck(true);    
    }
    if (hasLength.test(value)){
      setDisplayLengthCheck(false);
      counter++;      
    }
    else {
      setDisplayLengthCheck(true);
    }
    if (hasSymbol.test(value)){
      setDisplaySymbolCheck(false);
      counter++;      
    }
    else {
      setDisplaySymbolCheck(true);
    }
    if (hasNoWhiteSpace.test(value)){
      setDisplayWhiteSpaceCheck(true);
    }
    else{
      setDisplayWhiteSpaceCheck(false);
      counter++;
    }
    if ((value === confirmPassword) && (counter >= 6)){
      setDisplayPasswordMatch(true);
    }
    else {
      setDisplayPasswordMatch(false);
    }

  }, [confirmPassword, hasLength, hasLowercase, hasNoWhiteSpace, hasNumber, hasSymbol, hasUppercase, password]);
  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>Create Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {
          auth.loading ?
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
            <Form.Group controlId="formBasicConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={event => setConfirmPassword(event.target.value)}
              />
              <Form.Text className="text-muted">
                { displayPasswordMatch && <p>Your Password is Valid!</p>}
                { !displayPasswordMatch && <p>Your Password Must:</p> }
                { displayWhiteSpaceCheck && <p>Not Include Whitespace</p>}
                { displayUpperCaseCheck && <p>Include 1 Uppercase Character</p>}
                { displayLowerCaseCheck && <p>Include 1 Lowercase Character</p>}
                { displayNumCheck && <p>Include 1 Number</p>}
                { displaySymbolCheck && <p>Include 1 Special Character</p>}
                { displayLengthCheck && <p>Be Between 8 and 15 Characters</p>}
                { !displayPasswordMatch && <p>Match with Confirm Password</p>}
              </Form.Text>
            </Form.Group>
          </Form>
        }

        {
          auth.error &&
          <Alert variant="danger" onClose={() => dispatch(dissmissAuthError())} dismissible>
          <Alert.Heading>Register Error!</Alert.Heading>
          <p>{auth.errorMessage}</p>
        </Alert>
        }
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={()=>dispatch(register(email, password))} disabled={(!displayPasswordMatch || auth.loading)}>
          Create
        </Button>
        <Button variant="secondary" onClick={close} disabled={auth.loading}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>   
  );
};

export default RegisterModal;