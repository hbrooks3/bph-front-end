// react
import React, {useState} from "react";

import { useSelector, useDispatch } from 'react-redux';

// react-bootstrap
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import InputGroup from 'react-bootstrap/InputGroup';

// views
import ErrorAlert from './ErrorAlert';
import LoadingUserCard from './cards/LoadingUserCard';

// actions
import { editUser, dismissUserError } from '../actions/users'

export default function ProfilePage(props) {
  const user = useSelector(state=>state.users[state.auth.uid]);

  if (!user || !user.loaded) {
    return <LoadingUserCard />;
  }

  return (
    <>
      <ContactCard user={user}/>
      <GeneralCard user={user}/>
    </>
    );
}


function ContactCard({user}) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState(user.email || '');
  const [firstName, setFirstName] = useState(user.firstName || '');
  const [lastName, setLastName] = useState(user.lastName || '');

  const [locked, setLock] = useState(true);

  const resetForm = () => {
    setEmail(user.email || '');
    setFirstName(user.firstName || '');
    setLastName(user.lastName || '');
    setLock(true);
  };

  const pushUpdate = () => {
    dispatch(
      editUser({
        ...user,
        email,
        firstName,
        lastName,
      })
    );
  };

  return (
    <Card>
      <Card.Header>Contact Information</Card.Header>
      <Card.Body>
        <Form>
          <Form.Group>
            <Form.Label>First Name</Form.Label>
            <Form.Control 
              readOnly={locked}
              value={firstName}
              onChange={event => setFirstName(event.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Last Name</Form.Label>
            <Form.Control 
              readOnly={locked}
              value={lastName}
              onChange={event => setLastName(event.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              readOnly={locked}
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
          </Form.Group> 
        </Form>
      </Card.Body>
      <Card.Body>
        <ButtonBar
          user={user}
          locked={locked}
          dismissError={()=>{
            dispatch(dismissUserError(user.id));
            setLock(true);
          }}
          onSubmit={pushUpdate}
          onEdit={()=>setLock(false)}
          onCancel={resetForm}
        />
      </Card.Body>
    </Card>
  );
}

const heightToFeet = (height) => height ? Math.floor(height) : 0;
const heightToInches = (height) => height ? Math.round(12 * (height - heightToFeet(height))) : 0;
const backToHeight = (feet, inches) => Number(feet) + Number(inches / 12);

function GeneralCard({user}) {
  const dispatch = useDispatch();

  const [feet, setFeet] = useState(heightToFeet(user.height));
  const [inches, setInches] = useState(heightToInches(user.height));
  const [weight, setWeight] = useState(user.weight || 0);

  const [locked, setLock] = useState(true);

  const resetForm = () => {
    setFeet(heightToFeet(user.height));
    setInches(heightToInches(user.height));
    setWeight(user.weight || 0);
    setLock(true);
  };

  const pushUpdate = () => {
    dispatch(
      editUser({
        ...user,
        height: backToHeight(feet, inches),
        weight,
      })
    );
  }

  return (
    <Card>
      <Card.Header>General Information</Card.Header>
      <Card.Body>
        <Form>
          <Form.Group>
            <Form.Label>Weight</Form.Label>
            <InputGroup>
              <Form.Control
                readOnly={locked}
                value={weight}
                type='number'
                onChange={event => setWeight(event.target.value)}
              />
              <InputGroup.Append>
                <InputGroup.Text>lbs</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>
          <Form.Group>
            <Form.Label>Height</Form.Label>
            <InputGroup>
              <Form.Control 
                type='number'
                readOnly={locked}
                value={feet}
                onChange={event => setFeet(event.target.value)}
              />
              <InputGroup.Append>
                <InputGroup.Text>ft</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>
          <Form.Group>
            <InputGroup>
              <Form.Control 
                type='number'
                readOnly={locked}
                value={inches}
                onChange={event => setInches(event.target.value)}
              />
              <InputGroup.Append>
                <InputGroup.Text>inches</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>
        </Form>
      </Card.Body>
      <Card.Body>
        <ButtonBar
          user={user}
          locked={locked}
          dismissError={()=>{
            dispatch(dismissUserError(user.id));
            setLock(true);
          }}
          onSubmit={pushUpdate}
          onEdit={()=>setLock(false)}
          onCancel={resetForm}
        />
      </Card.Body>
    </Card>
  );
}

function ButtonBar({user, locked, dismissError, onSubmit, onEdit, onCancel}) {
  if (locked) {
    return (
      <Button 
        disabled={user.loading || user.error}
        onClick={onEdit}>Edit
      </Button>
    );
  }

  return (
    <>
    
    {user.loading &&
      <Spinner animation="border" />
    }

    {user.error &&
      <ErrorAlert
        heading='Unable to update user'
        message={user.errorMessage}
        callback={dismissError}  
      />
    }

    {!user.loading && !user.error &&
      <>
        <Button onClick={onSubmit} className='mr-2'>Submit</Button>
        <Button onClick={onCancel}>Cancel</Button>
      </>
    }
    </>
  );
}